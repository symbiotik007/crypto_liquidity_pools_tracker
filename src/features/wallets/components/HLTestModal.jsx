import { useState, useEffect } from "react";
import { hlGetAllMids, hlGetOpenOrders, hlGetMeta, hlPlaceOrder, hlSignAndSend, hlGetPositions } from "../services/hlService";

export default function HLTestModal({ onClose }) {
  const hlWallets = (() => {
    try { return JSON.parse(localStorage.getItem("hl_wallets") || "[]"); } catch { return []; }
  })();

  const [selectedWallet, setSelectedWallet] = useState(hlWallets[0]?.id || "");
  const [coin, setCoin]         = useState("ETH");
  const [side, setSide]         = useState("B");
  const [orderType, setOrderType] = useState("market");
  const [size, setSize]         = useState("0.001");
  const [price, setPrice]       = useState("");
  const [leverage, setLeverage] = useState(2);
  const [logs, setLogs]         = useState([]);
  const [loading, setLoading]   = useState(false);
  const [mids, setMids]         = useState({});

  const log = (msg, type = "info") => {
    const colors = { info:"#7ab8d4", success:"#00ff88", error:"#ff4f6e", warn:"#ffb347", data:"#c8a0ff" };
    setLogs(prev => [...prev, { msg, color: colors[type] || "#7ab8d4", ts: new Date().toLocaleTimeString("es-CO") }]);
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

  const currentPrice = parseFloat(mids[coin] || 0);
  const estimatedCost = currentPrice * parseFloat(size || 0);

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

    const mainAddr  = w.address;
    const agentAddr = w.agentAddress || "(no derivada)";

    log(`📊 Cuenta Principal: ${mainAddr}`, "info");
    log(`🔑 Agent Wallet: ${agentAddr}`, "info");

    setLoading(true);
    log(`▶ Consultando balance de cuenta principal...`, "info");
    try {
      const data = await hlGetPositions(mainAddr);
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
    } catch(e) {
      log(`✗ Error: ${e.message}`, "error");
    }
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
    if (!window.ethers) { log("✗ ethers.js no está cargado — revisa index.html", "error"); return; }
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
      } catch(e) {
        log(`  ⚠ No se pudo verificar agent: ${e.message}`, "warn");
      }
    }

    setLoading(true);
    log(`▶ Obteniendo meta y precio...`, "info");
    try {
      const result = await hlPlaceOrder({
        privateKey: w.privateKey,
        coin,
        side,
        size: parseFloat(size),
        price: orderType === "limit" ? parseFloat(price) : null,
        reduceOnly: false,
      });

      log(`  Respuesta completa: ${JSON.stringify(result)}`, "data");

      if (result?.status === "ok") {
        log(`✓ ¡ORDEN ENVIADA EXITOSAMENTE!`, "success");
        const filled = result?.response?.data?.statuses?.[0];
        if (filled?.filled) {
          log(`  Filled: ${filled.filled.totalSz} @ $${filled.filled.avgPx}`, "success");
        } else if (filled?.resting) {
          log(`  Orden en libro: oid ${filled.resting.oid}`, "success");
        }
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
    if (!window.ethers) { log("✗ ethers.js no cargado", "error"); return; }
    await runTest(async () => {
      const orders = await hlGetOpenOrders(w.address);
      if (!orders?.length) { log("  No hay órdenes abiertas que cancelar", "warn"); return { cancelled: 0 }; }
      const meta  = await hlGetMeta();
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

  return (
    <div style={{ position:"fixed",inset:0,background:"rgba(5,10,15,0.88)",zIndex:500,display:"flex",alignItems:"center",justifyContent:"center",padding:16,backdropFilter:"blur(10px)" }}
      onClick={e => e.target===e.currentTarget && onClose()}>
      <div style={{ background:"#070d14",border:"1px solid #00e5ff",width:"100%",maxWidth:720,maxHeight:"92vh",display:"flex",flexDirection:"column" }}>

        <div style={{ padding:"18px 24px",borderBottom:"1px solid #0e2435",display:"flex",justifyContent:"space-between",alignItems:"center" }}>
          <div>
            <div style={{ fontSize:16,fontWeight:700,color:"#00e5ff",display:"flex",alignItems:"center",gap:10 }}>
              <span style={{ background:"#ffb347",color:"#050a0f",fontSize:10,fontWeight:800,padding:"2px 8px",letterSpacing:1 }}>BETA TEST</span>
              Hyperliquid API — Test de Órdenes
            </div>
            <div style={{ fontSize:12,color:"#4a7a96",marginTop:3 }}>
              Prueba órdenes reales antes de conectar a pools · Usa tamaños mínimos
            </div>
          </div>
          <button onClick={onClose} style={{ background:"none",border:"none",color:"#2a5a72",fontSize:20,cursor:"pointer" }}>✕</button>
        </div>

        <div style={{ display:"flex",flex:1,overflow:"hidden" }}>

          <div style={{ width:300,flexShrink:0,padding:"18px 20px",borderRight:"1px solid #0e2435",display:"flex",flexDirection:"column",gap:14,overflowY:"auto" }}>

            <div>
              <div style={{ fontSize:10,color:"#4a7a96",letterSpacing:1,textTransform:"uppercase",marginBottom:6 }}>Wallet</div>
              {hlWallets.length === 0
                ? <div style={{ fontSize:12,color:"#ff4f6e" }}>No hay wallets — ve a la pestaña Wallets</div>
                : <select value={selectedWallet} onChange={e => setSelectedWallet(e.target.value)}
                    style={{ width:"100%",background:"#0a1520",border:"1px solid #1a3a5e",color:"#c8e6f0",padding:"8px 10px",fontFamily:"Outfit,sans-serif",fontSize:13,outline:"none" }}>
                    {hlWallets.map(w => <option key={w.id} value={w.id}>{w.label} ({w.address?.slice(0,8)}...)</option>)}
                  </select>
              }
            </div>

            <div>
              <div style={{ fontSize:10,color:"#4a7a96",letterSpacing:1,textTransform:"uppercase",marginBottom:6 }}>
                Activo · Precio live: <span style={{ color:"#00e5ff" }}>${currentPrice.toFixed(2)}</span>
              </div>
              <div style={{ display:"flex",flexWrap:"wrap",gap:6 }}>
                {COINS.map(c => (
                  <button key={c} onClick={() => setCoin(c)} style={{
                    padding:"4px 10px",background:"transparent",cursor:"pointer",fontFamily:"Outfit,sans-serif",fontSize:12,fontWeight:600,
                    border:`1px solid ${coin===c?"#00e5ff":"#1a3a5e"}`,color:coin===c?"#00e5ff":"#4a7a96",
                  }}>{c}</button>
                ))}
              </div>
            </div>

            <div>
              <div style={{ fontSize:10,color:"#4a7a96",letterSpacing:1,textTransform:"uppercase",marginBottom:6 }}>Dirección</div>
              <div style={{ display:"flex",gap:8 }}>
                {[["B","🟢 BUY / LONG"],["A","🔴 SELL / SHORT"]].map(([v,l]) => (
                  <button key={v} onClick={() => setSide(v)} style={{
                    flex:1,padding:"8px 0",background:"transparent",cursor:"pointer",fontFamily:"Outfit,sans-serif",fontSize:12,fontWeight:700,
                    border:`1px solid ${side===v?(v==="B"?"#00ff88":"#ff4f6e"):"#1a3a5e"}`,
                    color:side===v?(v==="B"?"#00ff88":"#ff4f6e"):"#4a7a96",
                  }}>{l}</button>
                ))}
              </div>
            </div>

            <div>
              <div style={{ fontSize:10,color:"#4a7a96",letterSpacing:1,textTransform:"uppercase",marginBottom:6 }}>Tipo de Orden</div>
              <div style={{ display:"flex",gap:8 }}>
                {[["market","Market"],["limit","Limit"]].map(([v,l]) => (
                  <button key={v} onClick={() => setOrderType(v)} style={{
                    flex:1,padding:"7px 0",background:"transparent",cursor:"pointer",fontFamily:"Outfit,sans-serif",fontSize:12,fontWeight:600,
                    border:`1px solid ${orderType===v?"#00e5ff":"#1a3a5e"}`,color:orderType===v?"#00e5ff":"#4a7a96",
                  }}>{l}</button>
                ))}
              </div>
            </div>

            <div>
              <div style={{ fontSize:10,color:"#4a7a96",letterSpacing:1,textTransform:"uppercase",marginBottom:6 }}>
                Size ({coin}) · ~${estimatedCost.toFixed(2)} USD
              </div>
              <input value={size} onChange={e => setSize(e.target.value)} type="number" step="0.001" min="0.001"
                style={{ width:"100%",background:"#0a1520",border:"1px solid #1a3a5e",color:"#c8e6f0",padding:"9px 12px",fontFamily:"Outfit,sans-serif",fontSize:14,outline:"none" }}
                placeholder="0.001" />
              <div style={{ display:"flex",gap:6,marginTop:6 }}>
                {[0.001,0.005,0.01,0.05].map(v => (
                  <button key={v} onClick={() => setSize(String(v))} style={{
                    flex:1,padding:"3px 0",fontSize:11,background:"transparent",cursor:"pointer",fontFamily:"Outfit,sans-serif",
                    border:"1px solid #1a3a5e",color:"#4a7a96",
                  }}>{v}</button>
                ))}
              </div>
            </div>

            {orderType === "limit" && (
              <div>
                <div style={{ fontSize:10,color:"#4a7a96",letterSpacing:1,textTransform:"uppercase",marginBottom:6 }}>Precio Límite</div>
                <input value={price} onChange={e => setPrice(e.target.value)} type="number"
                  style={{ width:"100%",background:"#0a1520",border:"1px solid #1a3a5e",color:"#c8e6f0",padding:"9px 12px",fontFamily:"Outfit,sans-serif",fontSize:14,outline:"none" }}
                  placeholder={currentPrice.toFixed(2)} />
              </div>
            )}

            <div>
              <div style={{ display:"flex",justifyContent:"space-between",marginBottom:6 }}>
                <div style={{ fontSize:10,color:"#4a7a96",letterSpacing:1,textTransform:"uppercase" }}>Leverage</div>
                <span style={{ fontSize:12,color:"#00e5ff",fontWeight:700 }}>{leverage}x</span>
              </div>
              <input type="range" min={1} max={50} value={leverage} onChange={e => setLeverage(Number(e.target.value))}
                style={{ width:"100%",accentColor:"#00e5ff" }} />
              <div style={{ display:"flex",justifyContent:"space-between",fontSize:10,color:"#2a5a72" }}><span>1x</span><span>50x</span></div>
            </div>

            <div style={{ borderTop:"1px solid #0e2435",paddingTop:14,display:"flex",flexDirection:"column",gap:8 }}>
              <div style={{ fontSize:10,color:"#2a5a72",letterSpacing:1,textTransform:"uppercase",marginBottom:2 }}>Acciones de Prueba</div>

              <button onClick={testAccount} disabled={loading} style={{ width:"100%",padding:"9px 0",background:"transparent",border:"1px solid #1a3a5e",color:"#7ab8d4",fontFamily:"Outfit,sans-serif",fontSize:12,cursor:"pointer" }}>
                📊 Ver Cuenta y Balance
              </button>
              <button onClick={testOpenOrders} disabled={loading} style={{ width:"100%",padding:"9px 0",background:"transparent",border:"1px solid #1a3a5e",color:"#7ab8d4",fontFamily:"Outfit,sans-serif",fontSize:12,cursor:"pointer" }}>
                📋 Ver Órdenes Abiertas
              </button>
              <button onClick={testPlaceOrder} disabled={loading} style={{
                width:"100%",padding:"11px 0",background:"transparent",fontFamily:"Outfit,sans-serif",fontSize:13,fontWeight:700,cursor:"pointer",
                border:`1px solid ${side==="B"?"#00ff88":"#ff4f6e"}`,color:side==="B"?"#00ff88":"#ff4f6e",
              }}>
                {loading ? "⟳ Enviando..." : side === "B" ? `🟢 Abrir BUY ${size} ${coin}` : `🔴 Abrir SELL ${size} ${coin}`}
              </button>
              <button onClick={testCancelAll} disabled={loading} style={{ width:"100%",padding:"9px 0",background:"transparent",border:"1px solid #5a3a00",color:"#ffb347",fontFamily:"Outfit,sans-serif",fontSize:12,cursor:"pointer" }}>
                ✕ Cancelar Todas las Órdenes
              </button>
            </div>
          </div>

          <div style={{ flex:1,padding:"14px 16px",overflowY:"auto",background:"#050a0f",display:"flex",flexDirection:"column",gap:1 }}>
            <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10 }}>
              <div style={{ fontSize:10,color:"#2a5a72",letterSpacing:1,textTransform:"uppercase" }}>Console Output</div>
              <button onClick={() => setLogs([])} style={{ background:"none",border:"none",color:"#2a5a72",cursor:"pointer",fontSize:11,fontFamily:"Outfit,sans-serif" }}>Limpiar</button>
            </div>
            {logs.length === 0
              ? <div style={{ fontSize:12,color:"#1a3a5e",fontStyle:"italic" }}>Los resultados de las pruebas aparecerán aquí...</div>
              : logs.map((l, i) => (
                  <div key={i} style={{ fontSize:12,color:l.color,lineHeight:1.7,fontFamily:"monospace",borderBottom:"1px solid #070d14",paddingBottom:1 }}>
                    <span style={{ color:"#1a3a5e",marginRight:8 }}>{l.ts}</span>{l.msg}
                  </div>
                ))
            }
          </div>
        </div>

        <div style={{ padding:"10px 24px",borderTop:"1px solid #0e2435",background:"#0a0800",display:"flex",alignItems:"center",gap:10 }}>
          <span style={{ fontSize:18 }}>⚠</span>
          <span style={{ fontSize:11,color:"#5a4a00",lineHeight:1.5 }}>
            <strong style={{ color:"#ffb347" }}>ÓRDENES REALES:</strong> Este panel envía órdenes al mercado real de Hyperliquid.
            Usa tamaños mínimos (0.001 ETH ≈ $2) para probar. Asegúrate de tener fondos suficientes.
          </span>
        </div>
      </div>
    </div>
  );
}
