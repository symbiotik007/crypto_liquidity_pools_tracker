import { useState, useEffect } from "react";
import { useAuth } from "../../../lib/AuthContext";
import { useTradingConfigs } from "../../../lib/useSupabaseSync";
import { hlGetPositions, hlPlaceOrder } from "../../wallets/services/hlService";

export default function TradingModal({ pos, s, onClose }) {
  const { user } = useAuth();
  const { guardar: guardarTrading } = useTradingConfigs(user?.id);
  const sym0 = pos.token0Symbol || "ETH";
  const coin = sym0.replace("W","") + "-PERP";

  const hlWallets = (() => {
    try { return JSON.parse(localStorage.getItem("hl_wallets") || "[]"); } catch { return []; }
  })();

  const [selectedWallet, setSelectedWallet] = useState(hlWallets[0]?.id || "");
  const [walletBalance, setWalletBalance]   = useState(null);
  const [direction, setDirection]           = useState("both");
  const [buffer, setBuffer]                 = useState(20);
  const [breakoutBuffer, setBreakoutBuffer] = useState(0.1);
  const [leverage, setLeverage]             = useState(20);
  const [stopLoss, setStopLoss]             = useState("0.1");
  const [breakeven, setBreakeven]           = useState(1);
  const [trailingStop, setTrailingStop]     = useState(false);
  const [takeProfit, setTakeProfit]         = useState("");
  const [autoRearm, setAutoRearm]           = useState(true);
  const [activating, setActivating]         = useState(false);
  const [error, setError]                   = useState("");
  const [success, setSuccess]               = useState("");

  const poolValue  = s.valueUsd || 0;
  const capital    = poolValue * (1 + buffer / 100);
  const margin     = capital / leverage;
  const canActivate = walletBalance !== null && walletBalance >= margin;

  useEffect(() => {
    const w = hlWallets.find(w => w.id === selectedWallet);
    if (!w) return;
    hlGetPositions(w.address).then(d => setWalletBalance(d.balance)).catch(() => {});
  }, [selectedWallet]);

  const autoOptimize = () => {
    if (!walletBalance) return;
    for (const buf of [0, 20, 40, 60, 80, 100]) {
      const cap = poolValue * (1 + buf / 100);
      if (walletBalance >= cap / 50) { setBuffer(buf); setLeverage(50); return; }
    }
    setBuffer(0); setLeverage(50);
  };

  const handleActivate = async () => {
    setError(""); setSuccess("");
    const w = hlWallets.find(w => w.id === selectedWallet);
    if (!w) return setError("Selecciona una wallet");
    if (!w.privateKey) return setError("Vuelve a añadir la wallet");
    if (!canActivate) return setError(`Faltan $${(margin - walletBalance).toFixed(2)} en balance`);
    setActivating(true);
    try {
      await guardarTrading({
        poolId: pos.tokenId, walletId: w.id, coin, direction,
        capital: parseFloat(capital.toFixed(2)), leverage, buffer, breakoutBuffer,
        stopLoss: parseFloat(stopLoss), breakeven, trailingStop,
        takeProfit: takeProfit || null, autoRearm,
      });
      setSuccess(`✓ Bot de trading activado · ${direction === "both" ? "LONG+SHORT" : direction.toUpperCase()} · ${coin}`);
    } catch(e) { setError(e.message); }
    setActivating(false);
  };

  const S = {
    overlay: { position:"fixed",inset:0,background:"rgba(5,10,15,0.78)",zIndex:1000,display:"flex",alignItems:"center",justifyContent:"center",padding:16,backdropFilter:"blur(8px)" },
    modal:   { background:"#070d14",border:"1px solid #4a1a7a",width:"100%",maxWidth:480,maxHeight:"90vh",overflowY:"auto" },
    label:   { fontSize:11,color:"#4a7a96",letterSpacing:"0.8px",textTransform:"uppercase",marginBottom:6 },
    row:     { display:"flex",justifyContent:"space-between",alignItems:"center" },
    input:   { width:"100%",background:"#0a1520",border:"1px solid #2a1a4e",color:"#c8e6f0",padding:"9px 12px",fontSize:14,fontFamily:"Outfit,sans-serif",outline:"none" },
  };

  const bufferOpts = [
    {l:"Sin",v:0},{l:"+20%",v:20},{l:"+40%",v:40},{l:"+60%",v:60},{l:"+80%",v:80},{l:"+100%",v:100}
  ];
  const dirOpts = [
    {l:"LONG + SHORT",v:"both",sub:"Abre LONG arriba y SHORT abajo del rango"},
    {l:"Solo LONG",v:"long",sub:"Solo cuando rompe arriba"},
    {l:"Solo SHORT",v:"short",sub:"Solo cuando rompe abajo"},
  ];

  return (
    <div style={S.overlay} onClick={e => e.target===e.currentTarget && onClose()}>
      <div style={S.modal}>

        <div style={{ padding:"20px 24px",borderBottom:"1px solid #2a1a4e",display:"flex",justifyContent:"space-between",alignItems:"flex-start" }}>
          <div>
            <div style={{ fontSize:16,fontWeight:700,color:"#c8a0ff",display:"flex",alignItems:"center",gap:8 }}>
              📈 Configurar Trading
            </div>
            <div style={{ fontSize:12,color:"#6a4a96",marginTop:3 }}>
              {sym0}/{pos.token1Symbol} · Rango {s.priceLower?.toFixed(2)} – {s.priceUpper?.toFixed(2)}
            </div>
          </div>
          <button onClick={onClose} style={{ background:"none",border:"none",color:"#4a7a96",fontSize:18,cursor:"pointer" }}>✕</button>
        </div>

        <div style={{ padding:"20px 24px",display:"flex",flexDirection:"column",gap:16 }}>

          <div>
            <div style={S.label}>🔑 Wallet de Trading</div>
            {hlWallets.length === 0
              ? <div style={{ color:"#ff4f6e",fontSize:12 }}>No hay wallets. Ve a la pestaña Wallets.</div>
              : <>
                  <select style={{ ...S.input,width:"100%" }} value={selectedWallet} onChange={e => setSelectedWallet(e.target.value)}>
                    {hlWallets.map(w => <option key={w.id} value={w.id}>{w.label} ({w.address?.slice(0,8)}...)</option>)}
                  </select>
                  {walletBalance !== null && <div style={{ fontSize:12,color:"#00ff88",marginTop:4 }}>Balance: ${walletBalance.toFixed(2)}</div>}
                </>
            }
          </div>

          <div>
            <div style={S.label}>📊 Dirección del Breakout</div>
            <div style={{ display:"flex",gap:8 }}>
              {dirOpts.map(d => (
                <button key={d.v} onClick={() => setDirection(d.v)} style={{
                  flex:1,padding:"9px 6px",background:"transparent",cursor:"pointer",fontFamily:"Outfit,sans-serif",
                  fontSize:12,fontWeight:700,
                  border:`1px solid ${direction===d.v?"#a060ff":"#2a1a4e"}`,
                  color:direction===d.v?"#c8a0ff":"#4a7a96",
                  transition:"all 0.15s",
                }}>{d.l}</button>
              ))}
            </div>
            <div style={{ fontSize:11,color:"#4a5a72",marginTop:5 }}>
              {dirOpts.find(d=>d.v===direction)?.sub}
            </div>
          </div>

          <div>
            <div style={{ ...S.row,marginBottom:8 }}>
              <div style={S.label}>⚡ Capital por Operación</div>
              <div style={{ fontSize:16,fontWeight:700,color:"#c8a0ff" }}>${capital.toFixed(2)}</div>
            </div>
            <div style={{ fontSize:11,color:"#4a7a96",marginBottom:4 }}>pool ${poolValue.toFixed(0)} + {buffer}%</div>

            <div style={{ display:"flex",gap:6,flexWrap:"wrap",marginBottom:12 }}>
              {bufferOpts.map(opt => (
                <button key={opt.v} onClick={() => setBuffer(opt.v)} style={{
                  padding:"4px 10px",fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"Outfit,sans-serif",
                  background:"transparent",
                  border:`1px solid ${buffer===opt.v?"#a060ff":"#2a1a4e"}`,
                  color:buffer===opt.v?"#c8a0ff":"#4a7a96",
                }}>{opt.l}</button>
              ))}
            </div>

            <div style={{ ...S.row,marginBottom:6 }}>
              <span style={{ fontSize:11,color:"#4a7a96" }}>Buffer de Breakout</span>
              <span style={{ fontSize:12,fontWeight:700,color:"#c8a0ff" }}>{breakoutBuffer.toFixed(1)}%</span>
            </div>
            <input type="range" min={0.1} max={5} step={0.1} value={breakoutBuffer}
              onChange={e => setBreakoutBuffer(parseFloat(e.target.value))}
              style={{ width:"100%",accentColor:"#a060ff",marginBottom:4 }} />
            <div style={{ ...S.row,fontSize:10,color:"#2a1a4e" }}><span>0.1%</span><span>5%</span></div>
            <div style={{ fontSize:11,color:"#4a5a72",marginTop:4 }}>
              El precio debe moverse {breakoutBuffer.toFixed(1)}% fuera del rango antes de entrar
            </div>

            <div style={{ ...S.row,marginTop:14,marginBottom:6 }}>
              <span style={{ fontSize:11,color:"#4a7a96" }}>Leverage (Isolated)</span>
              <span style={{ fontSize:12,fontWeight:700,color:"#c8a0ff" }}>{leverage}x</span>
            </div>
            <input type="range" min={1} max={50} value={leverage}
              onChange={e => setLeverage(Number(e.target.value))}
              style={{ width:"100%",accentColor:"#a060ff" }} />
            <div style={{ ...S.row,fontSize:10,color:"#2a1a4e" }}><span>1x</span><span>50x max</span></div>

            {walletBalance !== null && (
              <div style={{
                background:canActivate?"#0a0a1a":"#1a0810",
                border:`1px solid ${canActivate?"#2a1a4e":"#5a1a28"}`,
                padding:"10px 12px",marginTop:10,fontSize:12,
                color:canActivate?"#c8a0ff":"#ff6b88",lineHeight:1.6,
              }}>
                <div style={{display:"flex",justifyContent:"space-between"}}><span>Margen requerido:</span><span style={{fontWeight:700}}>${margin.toFixed(2)}</span></div>
                <div style={{display:"flex",justifyContent:"space-between"}}><span>Balance wallet:</span><span>${walletBalance.toFixed(2)}</span></div>
                {canActivate
                  ? <div style={{color:"#c8a0ff",marginTop:4}}>✓ Balance suficiente</div>
                  : <div style={{display:"flex",gap:8,marginTop:8,flexWrap:"wrap"}}>
                      <button onClick={autoOptimize} style={{flex:1,padding:"5px 8px",background:"#0a1520",border:"1px solid #a060ff",color:"#c8a0ff",fontSize:11,fontWeight:700,cursor:"pointer",fontFamily:"Outfit,sans-serif"}}>
                        ⚡ Auto-optimizar
                      </button>
                      <a href="https://app.hyperliquid.xyz/portfolio" target="_blank" rel="noreferrer"
                        style={{flex:1,padding:"5px 8px",background:"#0a1520",border:"1px solid #4a7aff",color:"#4a7aff",fontSize:11,fontWeight:700,textDecoration:"none",display:"flex",alignItems:"center",justifyContent:"center"}}>
                        💳 Depositar en HL
                      </a>
                    </div>
                }
              </div>
            )}
          </div>

          <div>
            <div style={S.label}>🔴 Stop Loss Fijo (%) *</div>
            <input style={S.input} value={stopLoss}
              onChange={e => setStopLoss(e.target.value)} placeholder="0.1" />
            <div style={{ fontSize:11,color:"#4a7a96",marginTop:4 }}>Cierra la posición si pierde este % desde la entrada</div>
          </div>

          <div>
            <div style={{ ...S.row,marginBottom:6 }}>
              <div style={S.label}>📈 Breakeven (% ganancia para mover SL a entrada)</div>
              <span style={{ fontSize:12,color:"#c8a0ff",fontWeight:700 }}>{breakeven}%</span>
            </div>
            <input type="range" min={1} max={5} step={0.5} value={breakeven}
              onChange={e => setBreakeven(Number(e.target.value))}
              style={{ width:"100%",accentColor:"#a060ff" }} />
            <div style={{ ...S.row,fontSize:10,color:"#2a1a4e" }}><span>1%</span><span>5%</span></div>
          </div>

          <label style={{ display:"flex",alignItems:"center",gap:10,cursor:"pointer",fontSize:13,color:"#c8a0ff" }}>
            <input type="checkbox" checked={trailingStop} onChange={e => setTrailingStop(e.target.checked)}
              style={{ accentColor:"#a060ff",width:15,height:15 }} />
            <div>
              <div>Trailing Stop</div>
              <div style={{ fontSize:11,color:"#4a5a72",marginTop:2 }}>El SL sigue al precio cuando el trade está en ganancia</div>
            </div>
          </label>

          <div>
            <div style={S.label}>🎯 Take Profit (%) — opcional</div>
            <input style={S.input} value={takeProfit}
              onChange={e => setTakeProfit(e.target.value)} placeholder="-" />
            <div style={{ fontSize:11,color:"#4a7a96",marginTop:4 }}>Deja vacío para no usar TP</div>
          </div>

          <label style={{ display:"flex",alignItems:"flex-start",gap:10,cursor:"pointer",fontSize:13,color:"#c8a0ff",padding:"12px",background:"#0a0a1a",border:"1px solid #2a1a4e" }}>
            <input type="checkbox" checked={autoRearm} onChange={e => setAutoRearm(e.target.checked)}
              style={{ accentColor:"#a060ff",width:15,height:15,marginTop:2 }} />
            <div>
              <div style={{ fontWeight:600 }}>Auto-rearm</div>
              <div style={{ fontSize:11,color:"#4a5a72",marginTop:2,lineHeight:1.5 }}>
                Tras el SL, el bot vuelve a buscar breakouts automáticamente
              </div>
            </div>
          </label>

          {error   && <div style={{ background:"#1a0810",border:"1px solid #5a1a28",padding:"10px 12px",fontSize:12,color:"#ff6b88" }}>⚠ {error}</div>}
          {success && <div style={{ background:"#0a0a1a",border:"1px solid #4a1a7a",padding:"10px 12px",fontSize:12,color:"#c8a0ff" }}>{success}</div>}
        </div>

        <div style={{ padding:"14px 24px",borderTop:"1px solid #2a1a4e",display:"flex",gap:10 }}>
          <button onClick={onClose} style={{ flex:1,padding:"10px 0",background:"transparent",border:"1px solid #2a1a4e",color:"#4a7a96",fontSize:13,cursor:"pointer",fontFamily:"Outfit,sans-serif" }}>
            Cancelar
          </button>
          <button onClick={handleActivate}
            disabled={activating||!!success||hlWallets.length===0||!canActivate}
            style={{
              flex:2,padding:"10px 0",background:success?"#0a0a1a":"transparent",
              border:`1px solid ${success?"#4a1a7a":!canActivate?"#5a1a28":"#a060ff"}`,
              color:success?"#c8a0ff":!canActivate?"#ff4f6e":"#c8a0ff",
              fontSize:13,fontWeight:700,cursor:canActivate&&!success?"pointer":"not-allowed",
              fontFamily:"Outfit,sans-serif",
            }}>
            {success ? "✓ Trading Activo"
              : activating ? "Activando..."
              : !canActivate ? `⚠ Faltan $${(margin-(walletBalance||0)).toFixed(2)}`
              : "📈 Activar Trading"}
          </button>
        </div>
      </div>
    </div>
  );
}
