import { useState, useEffect } from "react";
import { hlGetAllMids, hlGetOpenOrders, hlGetMeta, hlPlaceOrder, hlSignAndSend, hlGetPositions } from "../services/hlService";

export default function HLTestModal({ onClose }) {
  const hlWallets = (() => {
    try { return JSON.parse(localStorage.getItem("hl_wallets") || "[]"); } catch { return []; }
  })();

  const [selectedWallet, setSelectedWallet] = useState(hlWallets[0]?.id || "");
  const [coin, setCoin]           = useState("ETH");
  const [side, setSide]           = useState("B");
  const [orderType, setOrderType] = useState("market");
  const [size, setSize]           = useState("0.001");
  const [price, setPrice]         = useState("");
  const [leverage, setLeverage]   = useState(2);
  const [logs, setLogs]           = useState([]);
  const [loading, setLoading]     = useState(false);
  const [mids, setMids]           = useState({});

  const log = (msg, type = "info") => {
    const colors = { info:"var(--color-accent)", success:"#00ff88", error:"#ff4f6e", warn:"#ffb347", data:"#a78bfa" };
    setLogs(prev => [...prev, { msg, color: colors[type] || "var(--color-accent)", ts: new Date().toLocaleTimeString("es-CO") }]);
  };

  useEffect(() => {
    log("Cargando precios live de Hyperliquid...", "info");
    hlGetAllMids()
      .then(m => {
        setMids(m);
        log(`✓ Precios cargados — ETH: $${parseFloat(m.ETH||0).toFixed(2)} | BTC: $${parseFloat(m.BTC||0).toFixed(2)}`, "success");
      })
      .catch(() => log("✗ Error cargando precios", "error"));
  }, []);

  const currentPrice   = parseFloat(mids[coin] || 0);
  const estimatedCost  = currentPrice * parseFloat(size || 0);

  const runTest = async (testFn, label) => {
    setLoading(true);
    log(`▶ ${label}...`, "info");
    try {
      const result = await testFn();
      log(`✓ Resultado: ${JSON.stringify(result).slice(0, 200)}`, "success");
    } catch(e) {
      log(`✗ Error: ${e.message}`, "error");
    }
    setLoading(false);
  };

  const testAccount = async () => {
    const w = hlWallets.find(w => w.id === selectedWallet);
    if (!w) { log("✗ Selecciona una wallet", "error"); return; }
    log(`📊 Cuenta Principal: ${w.address}`, "info");
    log(`🔑 Agent Wallet: ${w.agentAddress || "(no derivada)"}`, "info");
    setLoading(true);
    log(`▶ Consultando balance de cuenta principal...`, "info");
    try {
      const data = await hlGetPositions(w.address);
      log(`  Balance perp USDC: $${data.perpEquity?.toFixed(2) ?? "0.00"}`, "data");
      log(`  Balance spot USDC: $${data.spotTotal?.toFixed(2) ?? "0.00"}`, "data");
      log(`  Balance total: $${data.balance?.toFixed(2) ?? "0.00"}`, "data");
      log(`  Posiciones abiertas: ${data.positions?.length || 0}`, "data");
      data.positions?.forEach(p =>
        log(`  · ${p.side} ${p.coin} size:${p.size} entry:$${p.entryPrice} pnl:$${parseFloat(p.pnl||0).toFixed(2)}`, "data")
      );
      if (data.spotBalances?.length) {
        log(`  Spot balances:`, "data");
        data.spotBalances.forEach(b => log(`    · ${b.coin}: ${b.total}`, "data"));
      }
      log(`✓ Consulta exitosa`, "success");
    } catch(e) { log(`✗ Error: ${e.message}`, "error"); }
    setLoading(false);
  };

  const testOpenOrders = async () => {
    const w = hlWallets.find(w => w.id === selectedWallet);
    if (!w) { log("✗ Selecciona una wallet", "error"); return; }
    setLoading(true);
    log(`▶ Consultando órdenes de ${w.address}...`, "info");
    try {
      const orders = await hlGetOpenOrders(w.address);
      log(`  Órdenes abiertas: ${orders?.length || 0}`, "data");
      orders?.slice(0,10).forEach(o =>
        log(`  · ${o.side} ${o.coin} sz:${o.sz} @ $${o.limitPx} oid:${o.oid}`, "data")
      );
      log(`✓ Consulta exitosa`, "success");
    } catch(e) { log(`✗ Error: ${e.message}`, "error"); }
    setLoading(false);
  };

  const testPlaceOrder = async () => {
    const w = hlWallets.find(w => w.id === selectedWallet);
    if (!w) { log("✗ Selecciona una wallet", "error"); return; }
    if (!w.privateKey) { log("✗ Wallet sin private key — vuelve a añadirla en la pestaña Wallets", "error"); return; }
    if (!window.ethers)  { log("✗ ethers.js no está cargado — revisa index.html", "error"); return; }
    if (parseFloat(size) <= 0) { log("✗ Size debe ser mayor a 0", "error"); return; }

    const sideLabel = side === "B" ? "BUY (LONG)" : "SELL (SHORT)";
    log(`⚠ Abriendo orden REAL: ${sideLabel} ${size} ${coin}-PERP @ ${orderType === "market" ? "MARKET" : "$" + price}`, "warn");
    log(`  Valor estimado: $${estimatedCost.toFixed(2)} · Leverage: ${leverage}x`, "warn");
    log(`  Wallet: ${w.address}`, "info");
    log(`  ethers.js: v${window.ethers?.version || "cargado"}`, "info");
    log(`  msgpack: ✓ inline (sin CDN externo)`, "success");

    if (window.ethers) {
      try {
        const derived = new window.ethers.Wallet(w.privateKey).address;
        const stored  = w.agentAddress;
        const match   = stored && derived.toLowerCase() === stored.toLowerCase();
        log(`  Agent derivado: ${derived}`, match ? "success" : "warn");
        log(`  Agent guardado: ${stored || "(no guardado)"}`, match ? "success" : "warn");
        if (!match && stored) {
          log(`  ⚠ MISMATCH — el agent derivado no coincide con el guardado`, "error");
          log(`  Asegúrate de que la private key corresponde a tu API Wallet en HL`, "error");
        } else if (match) {
          log(`  ✓ Agent address verificado correctamente`, "success");
        }
      } catch(e) { log(`  ⚠ No se pudo verificar agent: ${e.message}`, "warn"); }
    }

    setLoading(true);
    log(`▶ Obteniendo meta y precio...`, "info");
    try {
      const result = await hlPlaceOrder({
        privateKey: w.privateKey, coin, side,
        size: parseFloat(size),
        price: orderType === "limit" ? parseFloat(price) : null,
        reduceOnly: false,
      });
      log(`  Respuesta completa: ${JSON.stringify(result)}`, "data");
      if (result?.status === "ok") {
        log(`✓ ¡ORDEN ENVIADA EXITOSAMENTE!`, "success");
        const filled = result?.response?.data?.statuses?.[0];
        if (filled?.filled)  log(`  Filled: ${filled.filled.totalSz} @ $${filled.filled.avgPx}`, "success");
        else if (filled?.resting) log(`  Orden en libro: oid ${filled.resting.oid}`, "success");
      } else if (result?.status === "err") {
        log(`✗ Error de HL: ${result.response}`, "error");
      } else {
        log(`⚠ Respuesta inesperada: ${JSON.stringify(result)}`, "warn");
      }
    } catch(e) {
      log(`✗ Error: ${e.message}`, "error");
      if (e.message.includes("HL response:")) {
        log(`  Tip: Esto puede ser un error de firma o de permisos de la API Key`, "warn");
        log(`  Verifica que la API Key tiene permisos de trading en Hyperliquid`, "warn");
      }
    }
    setLoading(false);
  };

  const testCancelAll = async () => {
    const w = hlWallets.find(w => w.id === selectedWallet);
    if (!w?.privateKey) { log("✗ Wallet sin private key", "error"); return; }
    if (!window.ethers)  { log("✗ ethers.js no cargado", "error"); return; }
    await runTest(async () => {
      const orders = await hlGetOpenOrders(w.address);
      if (!orders?.length) { log("  No hay órdenes abiertas que cancelar", "warn"); return { cancelled: 0 }; }
      const meta = await hlGetMeta();
      let cancelled = 0;
      for (const o of orders) {
        const asset = meta?.universe?.findIndex(a => a.name === o.coin);
        if (asset >= 0) {
          await hlSignAndSend({ type:"cancel", cancels:[{ a:asset, o:o.oid }] }, w.privateKey);
          log(`  ✓ Cancelada: ${o.side} ${o.coin} @ $${o.limitPx}`, "success");
          cancelled++;
        }
      }
      return { cancelled };
    }, `Cancelando todas las órdenes (${coin})`);
  };

  const COINS = ["ETH","BTC","SOL","ARB","AVAX","MATIC","LINK"];

  const btn = (onClick, children, extra = {}) => (
    <button onClick={onClick} disabled={loading}
      style={{ width:"100%", padding:"9px 0", background:"transparent", fontFamily:"Outfit,sans-serif",
        fontSize:12, cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.5 : 1,
        border:"1px solid var(--border-muted)", color:"var(--text-secondary)",
        borderRadius:6, transition:"all 0.15s", ...extra }}
      onMouseEnter={e => { if (!loading) { e.currentTarget.style.borderColor="var(--color-accent)"; e.currentTarget.style.color="var(--color-accent)" }}}
      onMouseLeave={e => { e.currentTarget.style.borderColor = extra.borderColor || "var(--border-muted)"; e.currentTarget.style.color = extra.color || "var(--text-secondary)" }}
    >{children}</button>
  );

  return (
    <div
      style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.45)", zIndex:500,
        display:"flex", alignItems:"center", justifyContent:"center", padding:16, backdropFilter:"blur(6px)" }}
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div style={{ background:"var(--bg-surface)", border:"1px solid var(--border-muted)",
        borderRadius:12, width:"100%", maxWidth:720, maxHeight:"92vh",
        display:"flex", flexDirection:"column", boxShadow:"var(--shadow-card)", overflow:"hidden" }}>

        {/* Header */}
        <div style={{ padding:"16px 24px", borderBottom:"1px solid var(--border-dim)",
          display:"flex", justifyContent:"space-between", alignItems:"center",
          background:"var(--bg-elevated)", flexShrink:0 }}>
          <div>
            <div style={{ fontSize:15, fontWeight:700, color:"var(--text-primary)", display:"flex", alignItems:"center", gap:10, fontFamily:"Outfit,sans-serif" }}>
              <span style={{ background:"#ffb347", color:"#1a0a00", fontSize:9, fontWeight:800, padding:"2px 8px", letterSpacing:1, borderRadius:4, textTransform:"uppercase" }}>BETA TEST</span>
              Hyperliquid API — Test de Órdenes
            </div>
            <div style={{ fontSize:11, color:"var(--text-dim)", marginTop:3, fontFamily:"Outfit,sans-serif" }}>
              Prueba órdenes reales antes de conectar a pools · Usa tamaños mínimos
            </div>
          </div>
          <button onClick={onClose}
            style={{ background:"none", border:"none", color:"var(--text-faint)", fontSize:20, cursor:"pointer", lineHeight:1 }}>✕</button>
        </div>

        <div style={{ display:"flex", flex:1, overflow:"hidden", minHeight:0 }}>

          {/* ── Left panel ── */}
          <div style={{ width:300, flexShrink:0, padding:"16px 18px", borderRight:"1px solid var(--border-dim)",
            display:"flex", flexDirection:"column", gap:14, overflowY:"auto", background:"var(--bg-surface)" }}>

            {/* Wallet */}
            <div>
              <div style={{ fontSize:10, color:"var(--text-label)", letterSpacing:1, textTransform:"uppercase", marginBottom:6, fontFamily:"Outfit,sans-serif" }}>Wallet</div>
              {hlWallets.length === 0
                ? <div style={{ fontSize:12, color:"var(--color-danger)", fontFamily:"Outfit,sans-serif" }}>No hay wallets — ve a la pestaña Wallets</div>
                : <select value={selectedWallet} onChange={e => setSelectedWallet(e.target.value)}
                    style={{ width:"100%", background:"var(--bg-input)", border:"1px solid var(--border-muted)",
                      color:"var(--text-primary)", padding:"8px 10px", fontFamily:"Outfit,sans-serif",
                      fontSize:13, outline:"none", borderRadius:6 }}>
                    {hlWallets.map(w => <option key={w.id} value={w.id}>{w.label} ({w.address?.slice(0,8)}...)</option>)}
                  </select>
              }
            </div>

            {/* Coin */}
            <div>
              <div style={{ fontSize:10, color:"var(--text-label)", letterSpacing:1, textTransform:"uppercase", marginBottom:6, fontFamily:"Outfit,sans-serif" }}>
                Activo · Precio live: <span style={{ color:"var(--color-accent)", fontWeight:700 }}>${currentPrice.toFixed(2)}</span>
              </div>
              <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                {COINS.map(c => (
                  <button key={c} onClick={() => setCoin(c)} style={{
                    padding:"4px 10px", background: coin===c ? "rgba(var(--color-accent-rgb),0.1)" : "transparent",
                    cursor:"pointer", fontFamily:"Outfit,sans-serif", fontSize:12, fontWeight:600,
                    border:`1px solid ${coin===c ? "var(--border-blue)" : "var(--border-muted)"}`,
                    color: coin===c ? "var(--color-accent)" : "var(--text-dim)",
                    borderRadius:6, transition:"all 0.12s",
                  }}>{c}</button>
                ))}
              </div>
            </div>

            {/* Side */}
            <div>
              <div style={{ fontSize:10, color:"var(--text-label)", letterSpacing:1, textTransform:"uppercase", marginBottom:6, fontFamily:"Outfit,sans-serif" }}>Dirección</div>
              <div style={{ display:"flex", gap:8 }}>
                {[["B","🟢 BUY / LONG","#00ff88"],["A","🔴 SELL / SHORT","#ff4f6e"]].map(([v,l,c]) => (
                  <button key={v} onClick={() => setSide(v)} style={{
                    flex:1, padding:"8px 0", background: side===v ? `${c}14` : "transparent",
                    cursor:"pointer", fontFamily:"Outfit,sans-serif", fontSize:11, fontWeight:700,
                    border:`1px solid ${side===v ? c : "var(--border-muted)"}`,
                    color: side===v ? c : "var(--text-dim)", borderRadius:6, transition:"all 0.12s",
                  }}>{l}</button>
                ))}
              </div>
            </div>

            {/* Order type */}
            <div>
              <div style={{ fontSize:10, color:"var(--text-label)", letterSpacing:1, textTransform:"uppercase", marginBottom:6, fontFamily:"Outfit,sans-serif" }}>Tipo de Orden</div>
              <div style={{ display:"flex", gap:8 }}>
                {[["market","Market"],["limit","Limit"]].map(([v,l]) => (
                  <button key={v} onClick={() => setOrderType(v)} style={{
                    flex:1, padding:"7px 0", background: orderType===v ? "rgba(var(--color-accent-rgb),0.08)" : "transparent",
                    cursor:"pointer", fontFamily:"Outfit,sans-serif", fontSize:12, fontWeight:600,
                    border:`1px solid ${orderType===v ? "var(--border-blue)" : "var(--border-muted)"}`,
                    color: orderType===v ? "var(--color-accent)" : "var(--text-dim)",
                    borderRadius:6, transition:"all 0.12s",
                  }}>{l}</button>
                ))}
              </div>
            </div>

            {/* Size */}
            <div>
              <div style={{ fontSize:10, color:"var(--text-label)", letterSpacing:1, textTransform:"uppercase", marginBottom:6, fontFamily:"Outfit,sans-serif" }}>
                Size ({coin}) · ~${estimatedCost.toFixed(2)} USD
              </div>
              <input value={size} onChange={e => setSize(e.target.value)} type="number" step="0.001" min="0.001"
                placeholder="0.001"
                style={{ width:"100%", background:"var(--bg-input)", border:"1px solid var(--border-muted)",
                  color:"var(--text-primary)", padding:"9px 12px", fontFamily:"Outfit,sans-serif",
                  fontSize:14, outline:"none", borderRadius:6, boxSizing:"border-box" }} />
              <div style={{ display:"flex", gap:6, marginTop:6 }}>
                {[0.001,0.005,0.01,0.05].map(v => (
                  <button key={v} onClick={() => setSize(String(v))} style={{
                    flex:1, padding:"3px 0", fontSize:11, background:"transparent", cursor:"pointer",
                    fontFamily:"Outfit,sans-serif", border:"1px solid var(--border-muted)",
                    color:"var(--text-dim)", borderRadius:4, transition:"all 0.12s",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor="var(--color-accent)"; e.currentTarget.style.color="var(--color-accent)" }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor="var(--border-muted)"; e.currentTarget.style.color="var(--text-dim)" }}
                  >{v}</button>
                ))}
              </div>
            </div>

            {/* Limit price */}
            {orderType === "limit" && (
              <div>
                <div style={{ fontSize:10, color:"var(--text-label)", letterSpacing:1, textTransform:"uppercase", marginBottom:6, fontFamily:"Outfit,sans-serif" }}>Precio Límite</div>
                <input value={price} onChange={e => setPrice(e.target.value)} type="number"
                  placeholder={currentPrice.toFixed(2)}
                  style={{ width:"100%", background:"var(--bg-input)", border:"1px solid var(--border-muted)",
                    color:"var(--text-primary)", padding:"9px 12px", fontFamily:"Outfit,sans-serif",
                    fontSize:14, outline:"none", borderRadius:6, boxSizing:"border-box" }} />
              </div>
            )}

            {/* Leverage */}
            <div>
              <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
                <div style={{ fontSize:10, color:"var(--text-label)", letterSpacing:1, textTransform:"uppercase", fontFamily:"Outfit,sans-serif" }}>Leverage</div>
                <span style={{ fontSize:12, color:"var(--color-accent)", fontWeight:700, fontFamily:"Outfit,sans-serif" }}>{leverage}x</span>
              </div>
              <input type="range" min={1} max={50} value={leverage} onChange={e => setLeverage(Number(e.target.value))}
                style={{ width:"100%", accentColor:"var(--color-accent)" }} />
              <div style={{ display:"flex", justifyContent:"space-between", fontSize:10, color:"var(--text-faint)", fontFamily:"Outfit,sans-serif" }}>
                <span>1x</span><span>50x</span>
              </div>
            </div>

            {/* Actions */}
            <div style={{ borderTop:"1px solid var(--border-dim)", paddingTop:14, display:"flex", flexDirection:"column", gap:8 }}>
              <div style={{ fontSize:10, color:"var(--text-faint)", letterSpacing:1, textTransform:"uppercase", marginBottom:2, fontFamily:"Outfit,sans-serif" }}>Acciones de Prueba</div>
              {btn(testAccount,     "📊 Ver Cuenta y Balance")}
              {btn(testOpenOrders, "📋 Ver Órdenes Abiertas")}
              <button onClick={testPlaceOrder} disabled={loading} style={{
                width:"100%", padding:"11px 0", background: side==="B" ? "rgba(0,255,136,0.08)" : "rgba(255,79,110,0.08)",
                fontFamily:"Outfit,sans-serif", fontSize:13, fontWeight:700,
                cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.5 : 1,
                border:`1px solid ${side==="B" ? "#00ff88" : "#ff4f6e"}`,
                color: side==="B" ? "#00ff88" : "#ff4f6e", borderRadius:6, transition:"all 0.15s",
              }}>
                {loading ? "⟳ Enviando..." : side==="B" ? `🟢 Abrir BUY ${size} ${coin}` : `🔴 Abrir SELL ${size} ${coin}`}
              </button>
              {btn(testCancelAll, "✕ Cancelar Todas las Órdenes", { borderColor:"#ffb34744", color:"#ffb347" })}
            </div>
          </div>

          {/* ── Console ── */}
          <div style={{ flex:1, padding:"14px 16px", overflowY:"auto", background:"var(--bg-base)",
            display:"flex", flexDirection:"column", gap:1 }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10, flexShrink:0 }}>
              <div style={{ fontSize:10, color:"var(--text-faint)", letterSpacing:1, textTransform:"uppercase", fontFamily:"Outfit,sans-serif" }}>Console Output</div>
              <button onClick={() => setLogs([])}
                style={{ background:"none", border:"none", color:"var(--text-faint)", cursor:"pointer", fontSize:11, fontFamily:"Outfit,sans-serif" }}>Limpiar</button>
            </div>
            {logs.length === 0
              ? <div style={{ fontSize:12, color:"var(--text-faint)", fontStyle:"italic", fontFamily:"monospace" }}>Los resultados de las pruebas aparecerán aquí...</div>
              : logs.map((l, i) => (
                  <div key={i} style={{ fontSize:12, color:l.color, lineHeight:1.7, fontFamily:"monospace",
                    borderBottom:"1px solid var(--border-dim)", paddingBottom:1 }}>
                    <span style={{ color:"var(--text-faint)", marginRight:8 }}>{l.ts}</span>{l.msg}
                  </div>
                ))
            }
          </div>
        </div>

        {/* Footer warning */}
        <div style={{ padding:"10px 24px", borderTop:"1px solid var(--border-dim)",
          background:"var(--bg-elevated)", display:"flex", alignItems:"center", gap:10, flexShrink:0 }}>
          <span style={{ fontSize:18 }}>⚠</span>
          <span style={{ fontSize:11, color:"var(--text-dim)", lineHeight:1.5, fontFamily:"Outfit,sans-serif" }}>
            <strong style={{ color:"#ffb347" }}>ÓRDENES REALES:</strong> Este panel envía órdenes al mercado real de Hyperliquid.
            Usa tamaños mínimos (0.001 ETH ≈ $2) para probar. Asegúrate de tener fondos suficientes.
          </span>
        </div>
      </div>
    </div>
  );
}
