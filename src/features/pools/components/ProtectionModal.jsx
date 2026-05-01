import { useState, useEffect } from "react";
import { hlGetPositions, hlPlaceOrder } from "../../wallets/services/hlService";

export default function ProtectionModal({ pos, s, onClose }) {
  const sym0 = pos.token0Symbol || "ETH";
  const coin = sym0.replace("W","") + "-PERP";

  const hlWallets = (() => {
    try { return JSON.parse(localStorage.getItem("hl_wallets") || "[]"); } catch { return []; }
  })();

  const [selectedWallet, setSelectedWallet] = useState(hlWallets[0]?.id || "");
  const [walletBalance, setWalletBalance]   = useState(null);
  const [leverage, setLeverage]             = useState(50);
  const [buffer, setBuffer]                 = useState(100);
  const [stopLoss, setStopLoss]             = useState("3.0");
  const [breakeven, setBreakeven]           = useState(1);
  const [tp1Pct, setTp1Pct]                = useState("1");
  const [tp1Close, setTp1Close]             = useState("40");
  const [tp2Pct, setTp2Pct]                = useState("2");
  const [tp2Close, setTp2Close]             = useState("60");
  const [noProtectReentry, setNoProtectReentry] = useState(false);
  const [activating, setActivating]         = useState(false);
  const [error, setError]                   = useState("");
  const [success, setSuccess]               = useState("");

  const isOor = !s.inRange && s.currentPrice < s.priceLower;

  const poolValue    = s.valueUsd || 0;
  const bufferMult   = 1 + buffer / 100;
  const capital      = poolValue * bufferMult;
  const margin       = capital / leverage;
  const slPct        = parseFloat(stopLoss) || 0;

  const autoOptimize = () => {
    if (!walletBalance || walletBalance <= 0) return;
    for (const buf of [0, 20, 40, 60, 80, 100]) {
      const cap = poolValue * (1 + buf / 100);
      const needed = cap / 50;
      if (walletBalance >= needed) {
        setBuffer(buf);
        setLeverage(50);
        return;
      }
    }
    setBuffer(0);
    setLeverage(50);
  };

  const autoFixSl = () => {
    const safeSl = Math.ceil(Math.abs(distToRange) * 1.2 * 10) / 10;
    setStopLoss(String(Math.max(safeSl, 1).toFixed(1)));
  };

  const distToRange = s.priceLower > 0 && s.currentPrice > 0
    ? ((s.priceLower - s.currentPrice) / s.currentPrice * 100)
    : 0;
  const slTooTight  = slPct < Math.abs(distToRange) && isOor;
  const canActivate = walletBalance !== null && walletBalance >= margin;

  useEffect(() => {
    const w = hlWallets.find(w => w.id === selectedWallet);
    if (!w) return;
    hlGetPositions(w.address).then(d => setWalletBalance(d.balance)).catch(() => {});
  }, [selectedWallet]);

  const handleActivate = async () => {
    setError(""); setSuccess("");
    const w = hlWallets.find(w => w.id === selectedWallet);
    if (!w) return setError("Selecciona una wallet");
    if (!w.privateKey) return setError("No se encontró la API Key — vuelve a añadir la wallet");
    if (walletBalance !== null && walletBalance < margin)
      return setError(`Balance insuficiente. Necesitas $${margin.toFixed(2)}, tienes $${walletBalance.toFixed(2)}`);

    setActivating(true);
    try {
      const size = capital / s.currentPrice;
      const result = await hlPlaceOrder({
        privateKey: w.privateKey.startsWith("0x") ? w.privateKey : "0x" + w.privateKey,
        coin:       sym0.replace("W",""),
        side:       "A",
        size:       parseFloat(size.toFixed(4)),
        price:      null,
        reduceOnly: false,
      });
      if (result?.status === "ok") {
        setSuccess(`✓ SHORT abierto: ${size.toFixed(4)} ${sym0} @ ~$${s.currentPrice.toFixed(2)}`);
        const newProt = {
          id:             crypto.randomUUID(),
          poolId:         pos.tokenId,
          walletId:       w.id,
          coin,
          size:           size.toFixed(4),
          leverage,       buffer,
          stopLoss:       slPct,
          breakeven,      tp1Pct, tp1Close, tp2Pct, tp2Close,
          noProtectReentry,
          openedAt:       Date.now(),
          openPrice:      s.currentPrice,
          sym0,           sym1:  pos.token1Symbol || "USDC",
          chainName:      pos.chainName,
          poolPair:       `${sym0}/${pos.token1Symbol || "USDC"}`,
        };
        const protections = JSON.parse(localStorage.getItem("hl_protections") || "[]");
        protections.push(newProt);
        localStorage.setItem("hl_protections", JSON.stringify(protections));
      } else {
        setError(JSON.stringify(result?.response || result));
      }
    } catch (e) {
      setError(e.message || "Error al activar protección");
    }
    setActivating(false);
  };

  const bufferOptions = [
    { label: "Sin", value: 0 },
    { label: "+20%", value: 20 },
    { label: "+40%", value: 40 },
    { label: "+60%", value: 60 },
    { label: "+80%", value: 80 },
    { label: "+100%", value: 100 },
  ];

  const S = {
    overlay: { position:"fixed",inset:0,background:"rgba(0,0,0,0.75)",zIndex:1000,display:"flex",alignItems:"center",justifyContent:"center",padding:16 },
    modal:   { background:"#070d14",border:"1px solid #1a3a5e",width:"100%",maxWidth:480,maxHeight:"90vh",overflowY:"auto",display:"flex",flexDirection:"column" },
    header:  { padding:"16px 20px",borderBottom:"1px solid #0e2435",display:"flex",justifyContent:"space-between",alignItems:"flex-start" },
    title:   { fontSize:16,fontWeight:700,color:"#c8e6f0",display:"flex",alignItems:"center",gap:8 },
    sub:     { fontSize:12,color:"#4a7a96",marginTop:4 },
    body:    { padding:"16px 20px",display:"flex",flexDirection:"column",gap:16 },
    label:   { fontSize:11,color:"#4a7a96",letterSpacing:"0.8px",textTransform:"uppercase",marginBottom:6,display:"flex",alignItems:"center",gap:6 },
    select:  { width:"100%",background:"#0a1520",border:"1px solid #1a3a5e",color:"#c8e6f0",padding:"8px 12px",fontSize:13,fontFamily:"Outfit,sans-serif",outline:"none" },
    input:   { width:"100%",background:"#0a1520",border:"1px solid #1a3a5e",color:"#c8e6f0",padding:"8px 12px",fontSize:14,fontFamily:"Outfit,sans-serif",outline:"none",boxSizing:"border-box" },
    row:     { display:"flex",justifyContent:"space-between",alignItems:"center" },
    val:     { fontSize:16,fontWeight:700,color:"#ffb347" },
    footer:  { padding:"14px 20px",borderTop:"1px solid #0e2435",display:"flex",gap:10 },
  };

  return (
    <div style={S.overlay} onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={S.modal}>

        <div style={S.header}>
          <div>
            <div style={S.title}>🛡 Configurar Protección</div>
            <div style={S.sub}>
              {sym0}/{pos.token1Symbol} · Rango {s.priceLower?.toLocaleString("en-US",{minimumFractionDigits:2})} – {s.priceUpper?.toLocaleString("en-US",{minimumFractionDigits:2})}
            </div>
          </div>
          <button onClick={onClose} style={{ background:"none",border:"none",color:"#4a7a96",fontSize:18,cursor:"pointer",lineHeight:1 }}>✕</button>
        </div>

        <div style={S.body}>

          {isOor && (
            <div style={{ background:"#1a0e00",border:"1px solid #5a3a00",padding:"12px 14px",fontSize:12,color:"#ffb347",lineHeight:1.6 }}>
              <div style={{ fontWeight:700,marginBottom:6 }}>⚠ Pool fuera de rango — lee esto antes de activar</div>
              <div>Tu posición es <strong>100% {s.currentPrice < s.priceLower ? sym0 : pos.token1Symbol}</strong>. El SHORT se abrirá <strong>inmediatamente</strong> al precio actual (~{s.currentPrice?.toFixed(2)}).</div>
              <div style={{marginTop:6}}>El <strong>Stop Loss</strong> está pre-configurado a <strong>{stopLoss}%</strong> = precio del borde inferior de tu rango ({s.priceLower?.toFixed(2)}). Si {sym0} sube hasta ahí, el pool vuelve a rango y el SHORT se cierra.</div>
              <div style={{marginTop:6,color:"#ff9944"}}>Si pones un SL menor que {Math.abs(distToRange).toFixed(1)}%, cualquier rebote normal cerrará el SHORT con pérdida.</div>
            </div>
          )}

          <div>
            <div style={S.label}>🔑 Wallet</div>
            {hlWallets.length === 0 ? (
              <div style={{ color:"#ff4f6e",fontSize:12 }}>No hay wallets configuradas. Ve a la pestaña Wallets.</div>
            ) : (
              <>
                <select style={S.select} value={selectedWallet} onChange={e => setSelectedWallet(e.target.value)}>
                  {hlWallets.map(w => (
                    <option key={w.id} value={w.id}>{w.label} ({w.address?.slice(0,8)}...)</option>
                  ))}
                </select>
                {walletBalance !== null && (
                  <div style={{ fontSize:12,color:"#00ff88",marginTop:4 }}>Balance: ${walletBalance.toFixed(2)}</div>
                )}
              </>
            )}
          </div>

          <div>
            <div style={S.label}>📊 Perp (SHORT)</div>
            <div style={{ background:"#0a1520",border:"1px solid #1a3a5e",padding:"8px 12px",fontSize:14,fontWeight:700,color:"#c8e6f0" }}>{coin}</div>
          </div>

          <div>
            <div style={{ ...S.row, marginBottom:8 }}>
              <div style={S.label}>⚡ Capital por Operación</div>
              <div style={S.val}>${capital.toFixed(2)}</div>
            </div>
            <div style={{ ...S.row, marginBottom:6, fontSize:12, color:"#4a7a96" }}>
              <span>Leverage (Isolated)</span>
              <span style={{ color:"#ffb347",fontWeight:700 }}>{leverage}x</span>
            </div>
            <input type="range" min={1} max={50} value={leverage}
              onChange={e => setLeverage(Number(e.target.value))}
              style={{ width:"100%",accentColor:"#ffb347" }} />
            <div style={{ ...S.row,fontSize:10,color:"#2a5a72" }}><span>1x</span><span>50x max (HL)</span></div>

            {walletBalance !== null && (
              <div style={{
                background: canActivate ? "#001a0e" : "#1a0810",
                border: `1px solid ${canActivate ? "#003a22" : "#5a1a28"}`,
                padding:"10px 12px", marginTop:10, fontSize:12,
                color: canActivate ? "#00ff88" : "#ff6b88", lineHeight:1.6,
              }}>
                <div style={{display:"flex",justifyContent:"space-between"}}>
                  <span>Margen requerido:</span>
                  <span style={{fontWeight:700}}>${margin.toFixed(2)}</span>
                </div>
                <div style={{display:"flex",justifyContent:"space-between"}}>
                  <span>Balance wallet:</span>
                  <span>${walletBalance.toFixed(2)}</span>
                </div>
                {canActivate ? (
                  <div style={{color:"#00ff88",marginTop:4}}>✓ Balance suficiente</div>
                ) : (
                  <>
                    <div style={{display:"flex",justifyContent:"space-between",color:"#ff4f6e"}}>
                      <span>Faltan:</span>
                      <span>${(margin - walletBalance).toFixed(2)}</span>
                    </div>
                    <div style={{marginTop:8,display:"flex",gap:8,flexWrap:"wrap"}}>
                      <button onClick={autoOptimize} style={{
                        flex:1,padding:"5px 10px",background:"#0a1520",border:"1px solid #ffb347",
                        color:"#ffb347",fontSize:11,fontWeight:700,cursor:"pointer",fontFamily:"Outfit,sans-serif",
                      }}>⚡ Auto-optimizar config</button>
                      <a href="https://app.hyperliquid.xyz/portfolio" target="_blank" rel="noreferrer" style={{
                        flex:1,padding:"5px 10px",background:"#0a1520",border:"1px solid #4a7aff",
                        color:"#4a7aff",fontSize:11,fontWeight:700,textDecoration:"none",
                        display:"flex",alignItems:"center",justifyContent:"center",
                      }}>💳 Depositar en HL</a>
                    </div>
                    <div style={{fontSize:10,color:"#2a5a72",marginTop:4}}>
                      Necesitas depositar ${(margin - walletBalance).toFixed(2)} más en Hyperliquid, o usa Auto-optimizar.
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          <div>
            <div style={S.label}>🛡 Buffer de Capital</div>
            <div style={{ display:"flex",gap:6,flexWrap:"wrap" }}>
              {bufferOptions.map(opt => (
                <button key={opt.value} onClick={() => setBuffer(opt.value)} style={{
                  padding:"5px 12px",fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"Outfit,sans-serif",
                  background: "transparent",
                  border: `1px solid ${buffer === opt.value ? "#ffb347" : "#1a3a5e"}`,
                  color: buffer === opt.value ? "#ffb347" : "#4a7a96",
                }}>{opt.label}</button>
              ))}
            </div>
            <div style={{ fontSize:11,color:"#ffb347",marginTop:6 }}>
              Posición efectiva: ${capital.toFixed(0)} (pool ${poolValue.toFixed(0)} + {buffer}%)
            </div>
          </div>

          <div>
            <div style={{...S.label,justifyContent:"space-between"}}>
              <span>🔴 Stop Loss Fijo (%)</span>
              {slTooTight && (
                <button onClick={autoFixSl} style={{
                  fontSize:10,padding:"2px 8px",background:"transparent",
                  border:"1px solid #ffb347",color:"#ffb347",cursor:"pointer",fontFamily:"Outfit,sans-serif",
                }}>⚡ Auto-corregir</button>
              )}
            </div>
            <input style={{ ...S.input, border:`1px solid ${slTooTight?"#ff4f6e":"#1a3a5e"}` }}
              value={stopLoss} onChange={e => setStopLoss(e.target.value)} placeholder="3.0" />
            <div style={{ fontSize:11,color:"#4a7a96",marginTop:4 }}>
              Cierra el short si el precio sube este % desde la entrada
              {distToRange !== 0 && <span style={{color:"#4a7aff"}}> · Distancia al rango: {Math.abs(distToRange).toFixed(1)}%</span>}
            </div>
            {slTooTight && (
              <div style={{ background:"#1a0810",border:"1px solid #5a1a28",padding:"10px 12px",marginTop:8,fontSize:12,color:"#ff6b88",lineHeight:1.5 }}>
                SL de {stopLoss}% es menor que la distancia al rango ({Math.abs(distToRange).toFixed(2)}%). Usa <strong>Auto-corregir</strong> para ajustarlo automáticamente a {(Math.abs(distToRange)*1.2).toFixed(1)}%.
              </div>
            )}
          </div>

          <div>
            <div style={{ ...S.row,marginBottom:6 }}>
              <div style={S.label}>📈 Breakeven (% ganancia para mover SL)</div>
              <span style={{ fontSize:12,color:"#00ff88",fontWeight:700 }}>{breakeven}%</span>
            </div>
            <input type="range" min={1} max={5} step={0.5} value={breakeven}
              onChange={e => setBreakeven(Number(e.target.value))}
              style={{ width:"100%",accentColor:"#00ff88" }} />
            <div style={{ ...S.row,fontSize:10,color:"#2a5a72" }}><span>1%</span><span>5%</span></div>
          </div>

          <div>
            <div style={S.label}>🎯 Take Profits (opcional)</div>
            <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:8 }}>
              {[
                { label:"TP1 — % ganancia", val:tp1Pct, set:setTp1Pct },
                { label:"TP1 — % cierre",   val:tp1Close, set:setTp1Close },
                { label:"TP2 — % ganancia", val:tp2Pct, set:setTp2Pct },
                { label:"TP2 — % cierre",   val:tp2Close, set:setTp2Close },
              ].map((f,i) => (
                <div key={i}>
                  <div style={{ fontSize:10,color:"#4a7a96",marginBottom:3 }}>{f.label}</div>
                  <input style={S.input} value={f.val} onChange={e => f.set(e.target.value)} />
                </div>
              ))}
            </div>
            <div style={{ fontSize:11,color:"#00ff88",marginTop:6 }}>
              TPs {tp1Pct}%/{tp1Close}% · {tp2Pct}%/{tp2Close}%
            </div>
          </div>

          <label style={{ display:"flex",alignItems:"flex-start",gap:10,cursor:"pointer",fontSize:13,color:"#c8e6f0" }}>
            <input type="checkbox" checked={noProtectReentry} onChange={e => setNoProtectReentry(e.target.checked)}
              style={{ marginTop:2,accentColor:"#00e5ff",width:15,height:15 }} />
            <div>
              <div>No proteger cuando reentra al rango desde arriba</div>
              <div style={{ fontSize:11,color:"#4a7a96",marginTop:2 }}>Solo proteger por abajo.</div>
            </div>
          </label>

          {error   && <div style={{ color:"#ff4f6e",fontSize:12,padding:"8px 12px",border:"1px solid #5a1a28",background:"#1a0810" }}>⚠ {error}</div>}
          {success && <div style={{ color:"#00ff88",fontSize:12,padding:"8px 12px",border:"1px solid #003a22",background:"#001a0e" }}>{success}</div>}
        </div>

        <div style={S.footer}>
          <button onClick={onClose} style={{ flex:1,padding:"10px 0",background:"transparent",border:"1px solid #1a3a5e",color:"#4a7a96",fontSize:13,cursor:"pointer",fontFamily:"Outfit,sans-serif" }}>
            Cancelar
          </button>
          <button onClick={handleActivate}
            disabled={activating || !!success || hlWallets.length === 0 || !canActivate || slTooTight}
            style={{
              flex:2, padding:"10px 0",
              background: success ? "#001a0e" : "transparent",
              border: `1px solid ${success ? "#003a22" : !canActivate ? "#5a1a28" : slTooTight ? "#5a3a00" : "#ffb347"}`,
              color: success ? "#00ff88" : !canActivate ? "#ff4f6e" : slTooTight ? "#ffb347" : "#ffb347",
              fontSize:13, fontWeight:700, cursor: (canActivate && !slTooTight && !success) ? "pointer" : "not-allowed",
              fontFamily:"Outfit,sans-serif",
              opacity: (activating || hlWallets.length===0) ? 0.5 : 1,
            }}>
            {success ? "✓ Protección Activa"
              : activating ? "Activando..."
              : !canActivate ? `⚠ Faltan $${(margin - (walletBalance||0)).toFixed(2)} — Deposita o Auto-optimiza`
              : slTooTight ? `⚠ Corrige el SL primero (mín. ${(Math.abs(distToRange)*1.2).toFixed(1)}%)`
              : "Activar Protección"}
          </button>
        </div>
      </div>
    </div>
  );
}
