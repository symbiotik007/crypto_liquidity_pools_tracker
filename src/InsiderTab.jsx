import { useState, useEffect, useCallback } from "react";
import { usePoolsSync, useInsiderTrades } from "./lib/useSupabaseSync";
import { useAuth } from "./lib/AuthContext";

// ── HL helpers ────────────────────────────────────────────────────────────────
const _PROXY  = import.meta.env.VITE_REVERT_PROXY_URL ?? ''
const HL_INFO = _PROXY ? `${_PROXY}/hl-info/info`     : 'https://api.hyperliquid.xyz/info'
const HL_API  = _PROXY ? `${_PROXY}/hl-info/exchange` : 'https://api.hyperliquid.xyz/exchange'

async function fetchHlMids() {
  try {
    const res = await fetch(HL_INFO, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "allMids" }),
    });
    return await res.json();
  } catch { return {}; }
}

const fmtP   = (v) => Number(v).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const fmtUsd = (v) => `${v >= 0 ? "+" : ""}$${Math.abs(v).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
const fmtPct = (v) => `${v >= 0 ? "+" : ""}${Number(v).toFixed(1)}%`;

// ── Modal LONG ────────────────────────────────────────────────────────────────
function LongModal({ pool, mids, abrirTrade, onClose }) {
  const [leverage,   setLeverage]   = useState(5);
  const [stopLoss,   setStopLoss]   = useState("6.0");
  const [buffer,     setBuffer]     = useState(20);
  const [activating, setActivating] = useState(false);
  const [success,    setSuccess]    = useState("");
  const [error,      setError]      = useState("");

  const hlWallets = (() => { try { return JSON.parse(localStorage.getItem("hl_wallets") || "[]"); } catch { return []; } })();
  const [selectedWallet, setSelectedWallet] = useState(hlWallets[0]?.id || "");

  const sym0      = pool.token0Symbol?.replace("W","") || "ETH";
  const sym1      = pool.token1Symbol || "USDC";
  const coin      = sym0 + "-PERP";
  const currentP  = parseFloat(mids[sym0] ?? pool.priceUpper ?? 0);
  const poolValue = pool.valueUsd ?? 0;
  const capital   = poolValue * (1 + buffer / 100);
  const margin    = capital / leverage;
  const size      = capital / (currentP || 1);
  // SL price: precio al que cerramos si el precio baja de vuelta al rango superior
  const slPrice   = currentP * (1 - parseFloat(stopLoss || 0) / 100);
  const distAbove = pool.priceUpper > 0 ? ((currentP - pool.priceUpper) / pool.priceUpper * 100) : 0;

  const S = {
    overlay: { position:"fixed",inset:0,background:"rgba(0,0,0,0.78)",zIndex:2000,display:"flex",alignItems:"center",justifyContent:"center",padding:16 },
    modal:   { background:"#070d14",border:"1px solid #3730a355",width:"100%",maxWidth:480,maxHeight:"90vh",overflowY:"auto",display:"flex",flexDirection:"column",fontFamily:"Outfit,sans-serif" },
    header:  { padding:"16px 20px",borderBottom:"1px solid #0e2435",display:"flex",justifyContent:"space-between",alignItems:"flex-start" },
    body:    { padding:"16px 20px",display:"flex",flexDirection:"column",gap:14 },
    label:   { fontSize:11,color:"#8b5cf6",letterSpacing:"0.8px",textTransform:"uppercase",marginBottom:5 },
    input:   { width:"100%",background:"#0a1520",border:"1px solid #3730a355",color:"#c8e6f0",padding:"8px 12px",fontSize:14,fontFamily:"Outfit,sans-serif",outline:"none",boxSizing:"border-box" },
    footer:  { padding:"14px 20px",borderTop:"1px solid #0e2435",display:"flex",gap:10 },
  };

  const handleActivate = async () => {
    const w = hlWallets.find(w => w.id === selectedWallet);
    if (!w?.privateKey) { setError("No se encontró la API key de la wallet"); return; }
    setActivating(true); setError(""); setSuccess("");
    try {
      // Guardar long en Supabase + localStorage cache
      await abrirTrade({
        poolId: pool.tokenId, walletId: w.id, coin,
        size: size.toFixed(4), leverage, buffer, stopLoss: parseFloat(stopLoss),
        openPrice: currentP,
        sym0, sym1, poolPair: `${sym0}/${sym1}`,
        chainName: pool.chainName, priceUpper: pool.priceUpper, priceLower: pool.priceLower,
      });
      setSuccess(`✓ LONG registrado: ${size.toFixed(4)} ${sym0} @ ~$${currentP.toFixed(2)}`);
    } catch (e) { setError(e.message); }
    setActivating(false);
  };

  return (
    <div style={S.overlay} onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={S.modal}>
        <div style={S.header}>
          <div>
            <div style={{fontSize:16,fontWeight:700,color:"#c4b5fd",display:"flex",alignItems:"center",gap:8}}>
              📈 Configurar LONG — Insider Trade
            </div>
            <div style={{fontSize:12,color:"#6b5fa0",marginTop:4}}>
              {sym0}/{sym1} · Pool #{pool.tokenId} · {pool.chainName}
            </div>
          </div>
          <button onClick={onClose} style={{background:"none",border:"none",color:"#4a7a96",fontSize:18,cursor:"pointer"}}>✕</button>
        </div>

        <div style={S.body}>
          {/* Contexto */}
          <div style={{background:"#0d0a1a",border:"1px solid #4a1a7a",padding:"12px 14px",fontSize:12,color:"#c8a0ff",lineHeight:1.6}}>
            <div style={{fontWeight:700,marginBottom:6}}>⬆ Pool por encima del rango</div>
            <div>Tu pool es <strong>100% {sym1}</strong> — el precio ({fmtP(currentP)}) superó el máximo del rango ({fmtP(pool.priceUpper)}).</div>
            <div style={{marginTop:6}}>
              Estrategia: <strong>LONG {sym0}</strong> para capturar el momentum alcista mientras el pool no genera fees.
              El SL se coloca cerca del borde superior del rango ({fmtP(pool.priceUpper)}).
            </div>
            <div style={{marginTop:6,color:"#a78bfa"}}>
              Distancia sobre el rango: <strong>+{distAbove.toFixed(1)}%</strong>
            </div>
          </div>

          {/* Wallet */}
          <div>
            <div style={S.label}>🔑 Wallet</div>
            {hlWallets.length === 0 ? (
              <div style={{color:"#ff4f6e",fontSize:12}}>No hay wallets configuradas. Ve a la pestaña Wallets.</div>
            ) : (
              <select style={{...S.input,border:"1px solid #3730a355"}} value={selectedWallet} onChange={e => setSelectedWallet(e.target.value)}>
                {hlWallets.map(w => <option key={w.id} value={w.id}>{w.label} ({w.address?.slice(0,8)}...)</option>)}
              </select>
            )}
          </div>

          {/* Perp */}
          <div>
            <div style={S.label}>📊 Perp (LONG)</div>
            <div style={{background:"#0a1520",border:"1px solid #3730a355",padding:"8px 12px",fontSize:14,fontWeight:700,color:"#c4b5fd"}}>{coin}</div>
          </div>

          {/* Capital + Leverage */}
          <div>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
              <div style={S.label}>⚡ Capital</div>
              <span style={{fontSize:16,fontWeight:700,color:"#a78bfa"}}>${capital.toFixed(2)}</span>
            </div>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:6,fontSize:12,color:"#6b5fa0"}}>
              <span>Leverage</span>
              <span style={{color:"#a78bfa",fontWeight:700}}>{leverage}x</span>
            </div>
            <input type="range" min={1} max={20} value={leverage}
              onChange={e => setLeverage(Number(e.target.value))}
              style={{width:"100%",accentColor:"#8b5cf6"}} />
            <div style={{display:"flex",justifyContent:"space-between",fontSize:10,color:"#3a2a5a"}}><span>1x</span><span>20x</span></div>
            <div style={{background:"#0d0a1a",border:"1px solid #3730a344",padding:"10px 12px",marginTop:8,fontSize:12,color:"#a78bfa",lineHeight:1.6}}>
              <div style={{display:"flex",justifyContent:"space-between"}}><span>Margen requerido:</span><span style={{fontWeight:700}}>${margin.toFixed(2)}</span></div>
              <div style={{display:"flex",justifyContent:"space-between"}}><span>Tamaño LONG:</span><span>{size.toFixed(4)} {sym0}</span></div>
            </div>
          </div>

          {/* Buffer */}
          <div>
            <div style={S.label}>🛡 Buffer de Capital</div>
            <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
              {[{label:"Sin",value:0},{label:"+20%",value:20},{label:"+40%",value:40},{label:"+60%",value:60}].map(opt => (
                <button key={opt.value} onClick={() => setBuffer(opt.value)} style={{
                  padding:"5px 12px",fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"Outfit,sans-serif",
                  background:"transparent",
                  border:`1px solid ${buffer===opt.value?"#8b5cf6":"#1a3a5e"}`,
                  color: buffer===opt.value?"#a78bfa":"#4a7a96",
                }}>{opt.label}</button>
              ))}
            </div>
          </div>

          {/* Stop Loss */}
          <div>
            <div style={S.label}>🔴 Stop Loss (%)</div>
            <input style={S.input} value={stopLoss} onChange={e => setStopLoss(e.target.value)} placeholder="6.0" />
            <div style={{fontSize:11,color:"#6b5fa0",marginTop:4}}>
              Cierra el LONG si el precio baja este % · SL en ${fmtP(slPrice)}
              <span style={{color:"#6b5fa0"}}> · Rango máx: ${fmtP(pool.priceUpper)}</span>
            </div>
          </div>

          {error   && <div style={{color:"#ff4f6e",fontSize:12,padding:"8px 12px",border:"1px solid #5a1a28",background:"#1a0810"}}>⚠ {error}</div>}
          {success && <div style={{color:"#00ff88",fontSize:12,padding:"8px 12px",border:"1px solid #003a22",background:"#001a0e"}}>{success}</div>}
        </div>

        <div style={S.footer}>
          <button onClick={onClose} style={{flex:1,padding:"10px 0",background:"transparent",border:"1px solid #1a3a5e",color:"#4a7a96",fontSize:13,cursor:"pointer",fontFamily:"Outfit,sans-serif"}}>
            Cancelar
          </button>
          <button
            onClick={handleActivate}
            disabled={activating || !!success || hlWallets.length === 0}
            style={{
              flex:2,padding:"10px 0",
              background: success ? "#001a0e" : "linear-gradient(135deg,#1a0a3a,#2a0a5a)",
              border:`1px solid ${success?"#003a22":"#7a40cc"}`,
              color: success ? "#00ff88" : "#c8a0ff",
              fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:"Outfit,sans-serif",
              opacity: activating ? 0.6 : 1,
            }}>
            {success ? "✓ LONG Registrado" : activating ? "Activando..." : `📈 Activar LONG ${sym0}`}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Componente principal ──────────────────────────────────────────────────────
export default function InsiderTab() {
  const { user }  = useAuth();
  const { pools } = usePoolsSync(user?.id);
  const { activos: trades, abrir: abrirTrade, cerrar: cerrarTrade } = useInsiderTrades(user?.id);
  const [mids,    setMids]    = useState({});
  const [modalPool, setModalPool] = useState(null);
  const [lastRefresh, setLastRefresh] = useState(null);

  // Pools que están POR ENCIMA del rango
  const abovePools = pools.filter(p => {
    const currentPrice = p.currentPrice ?? 0;
    const priceUpper   = p.priceUpper ?? 0;
    return priceUpper > 0 && currentPrice > priceUpper;
  });

  const refresh = useCallback(async () => {
    const newMids = await fetchHlMids();
    setMids(newMids);
    setLastRefresh(new Date());
  }, []);

  useEffect(() => {
    refresh();
    const t = setInterval(refresh, 10000);
    return () => clearInterval(t);
  }, [refresh]);

  const removeTrade = async (trade) => {
    const currentP = parseFloat(mids[trade.sym0] ?? trade.openPrice);
    const pnl = (currentP - trade.openPrice) * parseFloat(trade.size) * (trade.leverage || 1);
    await cerrarTrade(trade.id, { closePrice: currentP, finalPnl: pnl });
  };

  return (
    <div>
      {modalPool && (
        <LongModal pool={modalPool} mids={mids} abrirTrade={abrirTrade} onClose={() => { setModalPool(null); refresh(); }} />
      )}

      {/* ── Header + concepto ── */}
      <div style={{background:"#0d0a1a",border:"1px solid #3730a355",padding:"20px 24px",marginBottom:16}}>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
          <span style={{fontSize:22}}>📈</span>
          <div>
            <div style={{fontSize:16,fontWeight:800,color:"#c4b5fd",fontFamily:"Outfit,sans-serif"}}>Insider Trading — Momentum sobre el rango</div>
            <div style={{fontSize:12,color:"#6b5fa0",marginTop:2,fontFamily:"Outfit,sans-serif"}}>
              Cuando tu pool sale hacia arriba, tu posición es 100% {"{token1}"}. Aprovecha el momentum con un LONG.
            </div>
          </div>
          {lastRefresh && (
            <span style={{marginLeft:"auto",fontSize:11,color:"#3a2a5a",fontFamily:"Outfit,sans-serif"}}>
              ↻ {lastRefresh.toLocaleTimeString("es-CO",{hour:"2-digit",minute:"2-digit",second:"2-digit"})}
            </span>
          )}
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12,marginTop:8}}>
          {[
            { icon:"⬆", title:"Pool sobre el rango", desc:"Precio superó el máximo — posición es 100% stablecoin, sin fees." },
            { icon:"📈", title:"LONG en Hyperliquid", desc:"Captura el momentum alcista mientras el pool descansa fuera de rango." },
            { icon:"🎯", title:"SL cerca del rango", desc:"Stop Loss justo debajo del borde superior del rango para limitar pérdidas." },
          ].map(({ icon, title, desc }) => (
            <div key={title} style={{background:"#080614",border:"1px solid #2a1a4a",padding:"12px 14px"}}>
              <div style={{fontSize:18,marginBottom:6}}>{icon}</div>
              <div style={{fontSize:12,fontWeight:700,color:"#a78bfa",marginBottom:4,fontFamily:"Outfit,sans-serif"}}>{title}</div>
              <div style={{fontSize:11,color:"#4a3a70",lineHeight:1.6,fontFamily:"Outfit,sans-serif"}}>{desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Pools por encima del rango ── */}
      <div style={{fontSize:10,letterSpacing:"2px",color:"#6b5fa0",textTransform:"uppercase",padding:"8px 0 6px",borderTop:"1px solid #0e2435",marginBottom:8,fontFamily:"Outfit,sans-serif",display:"flex",alignItems:"center",gap:8}}>
        📡 Pools por encima del rango
        {abovePools.length > 0 && (
          <span style={{background:"#1a0a3a",border:"1px solid #3730a3",color:"#a78bfa",fontSize:10,padding:"1px 7px",borderRadius:10}}>{abovePools.length}</span>
        )}
      </div>

      {abovePools.length === 0 ? (
        <div style={{background:"#070d14",border:"1px solid #0e2435",padding:"36px 24px",textAlign:"center",marginBottom:16}}>
          <div style={{fontSize:32,marginBottom:10}}>📡</div>
          <div style={{fontSize:14,fontWeight:700,color:"#4a3a70",marginBottom:6,fontFamily:"Outfit,sans-serif"}}>Ningún pool sobre el rango</div>
          <div style={{fontSize:12,color:"#2a1a4a",lineHeight:1.7,fontFamily:"Outfit,sans-serif"}}>
            Cuando el precio de alguno de tus pools supere el máximo del rango,<br/>
            aparecerá aquí como oportunidad de LONG en Hyperliquid.
          </div>
        </div>
      ) : (
        abovePools.map(pool => {
          const sym0       = pool.token0Symbol?.replace("W","") || "ETH";
          const sym1       = pool.token1Symbol || "USDC";
          const currentP   = parseFloat(mids[sym0] ?? pool.currentPrice ?? 0);
          const distAbove  = pool.priceUpper > 0 ? ((currentP - pool.priceUpper) / pool.priceUpper * 100) : 0;
          const alreadyOpen = trades.some(t => String(t.poolId) === String(pool.tokenId));

          return (
            <div key={pool.tokenId} style={{
              background:"#070d14",border:"1px solid #3730a355",
              boxShadow:"0 0 20px rgba(139,92,246,0.08)",
              marginBottom:10,
            }}>
              {/* Header */}
              <div style={{display:"flex",alignItems:"center",gap:10,padding:"12px 16px",borderBottom:"1px solid #0e2435",flexWrap:"wrap"}}>
                <span style={{fontSize:15,fontWeight:700,color:"#c8d8e8",fontFamily:"Outfit,sans-serif"}}>{sym0}/{sym1}</span>
                <span style={{fontSize:10,padding:"2px 8px",background:"#1a0a3a",border:"1px solid #4a1a7a",color:"#c8a0ff",fontWeight:700,textTransform:"uppercase"}}>⬆ SOBRE RANGO</span>
                <span style={{fontSize:11,padding:"2px 7px",background:"#0a1a24",border:"1px solid #1a3a4e",color:"#4a7a96"}}>{pool.chainName}</span>
                {alreadyOpen && <span style={{fontSize:10,color:"#00ff88",fontWeight:700}}>✓ LONG activo</span>}
              </div>

              {/* Métricas */}
              <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",borderBottom:"1px solid #0e2435"}}>
                {[
                  { label:"Precio Actual",  val:`$${fmtP(currentP)}`,        color:"#c4b5fd" },
                  { label:"Rango Máximo",   val:`$${fmtP(pool.priceUpper)}`, color:"#7ab8d4" },
                  { label:"Sobre el Rango", val:fmtPct(distAbove),           color:"#a78bfa" },
                  { label:"Valor Pool",     val:`$${fmtP(pool.valueUsd)}`,   color:"#7ab8d4" },
                ].map(({ label, val, color }) => (
                  <div key={label} style={{padding:"12px 14px",borderRight:"1px solid #0e2435"}}>
                    <div style={{fontSize:9,letterSpacing:"1.5px",color:"#2a1a4a",textTransform:"uppercase",marginBottom:5,fontFamily:"Outfit,sans-serif"}}>{label}</div>
                    <div style={{fontSize:14,fontWeight:700,color,fontFamily:"Outfit,sans-serif"}}>{val}</div>
                  </div>
                ))}
              </div>

              {/* Info */}
              <div style={{padding:"10px 16px",fontSize:12,color:"#6b5fa0",fontFamily:"Outfit,sans-serif",lineHeight:1.6}}>
                Tu posición es 100% <strong style={{color:"#a78bfa"}}>{sym1}</strong> — sin exposición a {sym0}.
                Abre un LONG para capturar el movimiento alcista.
              </div>

              {/* Acción */}
              <div style={{padding:"10px 16px",borderTop:"1px solid #0e2435",display:"flex",gap:8,alignItems:"center"}}>
                <button
                  onClick={() => setModalPool(pool)}
                  style={{
                    padding:"10px 24px",
                    background: alreadyOpen ? "transparent" : "linear-gradient(135deg,#1a0a3a,#2a0a5a)",
                    border:`1px solid ${alreadyOpen?"#3a2a5a":"#7a40cc"}`,
                    color: alreadyOpen ? "#4a3a70" : "#c8a0ff",
                    fontFamily:"Outfit,sans-serif",fontSize:13,fontWeight:700,cursor:"pointer",letterSpacing:"0.5px",
                  }}
                >
                  {alreadyOpen ? "✓ LONG ya configurado" : `📈 Configurar LONG ${sym0}`}
                </button>
                <a
                  href={`https://app.uniswap.org/positions/v3/${pool.chainName?.toLowerCase()}/${pool.tokenId}`}
                  target="_blank" rel="noreferrer"
                  style={{fontSize:12,color:"#7ab8d4",textDecoration:"none",padding:"5px 10px",border:"1px solid #1a3a4e"}}
                >
                  🔗 Uniswap
                </a>
              </div>
            </div>
          );
        })
      )}

      {/* ── LONGs activos ── */}
      {trades.length > 0 && (
        <>
          <div style={{fontSize:10,letterSpacing:"2px",color:"#6b5fa0",textTransform:"uppercase",padding:"12px 0 6px",borderTop:"1px solid #0e2435",marginBottom:8,fontFamily:"Outfit,sans-serif",display:"flex",alignItems:"center",gap:8}}>
            📋 LONGs Insider Activos
            <span style={{background:"#1a0a3a",border:"1px solid #3730a3",color:"#a78bfa",fontSize:10,padding:"1px 7px",borderRadius:10}}>{trades.length}</span>
          </div>
          <div style={{background:"#070d14",border:"1px solid #0e2435"}}>
            {trades.map((t, i) => {
              const currentP  = parseFloat(mids[t.sym0] ?? t.openPrice);
              const pnlEst    = (currentP - t.openPrice) * parseFloat(t.size) * t.leverage;
              const pnlPos    = pnlEst >= 0;
              const ageMs     = Date.now() - t.openedAt;
              const ageH      = Math.floor(ageMs / 3600000);
              const ageM      = Math.floor((ageMs % 3600000) / 60000);
              return (
                <div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"12px 16px",borderBottom:"1px solid #070d14",flexWrap:"wrap",fontFamily:"Outfit,sans-serif"}}>
                  <span style={{fontSize:10,padding:"2px 7px",background:"#1a0a3a",border:"1px solid #4a1a7a",color:"#c8a0ff",fontWeight:700}}>LONG</span>
                  <span style={{fontWeight:700,color:"#c8d8e8"}}>{t.coin}</span>
                  <span style={{color:"#4a7a96",fontSize:12}}>Pool #{t.poolId}</span>
                  <span style={{fontSize:12,color:"#6b5fa0"}}>{t.size} @ ${fmtP(t.openPrice)}</span>
                  <span style={{fontSize:12,color:"#7ab8d4"}}>Actual: ${fmtP(currentP)}</span>
                  <span style={{fontWeight:700,fontSize:13,color:pnlPos?"#00ff88":"#ff4f6e"}}>{fmtUsd(pnlEst)}</span>
                  <span style={{fontSize:11,color:"#2a5a72"}}>{ageH > 0 ? `${ageH}h ` : ""}{ageM}m</span>
                  <button onClick={() => removeTrade(t)} style={{marginLeft:"auto",fontSize:11,color:"#ff4f6e",background:"transparent",border:"1px solid #5a1a28",padding:"4px 10px",cursor:"pointer",fontFamily:"Outfit,sans-serif"}}>
                    ❌ Cerrar
                  </button>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
