import { useState, useEffect, useRef, Component } from "react";
import { useAuth } from "./lib/AuthContext";
import { usePoolsSync, useWalletsSync, useNotasSync, usePreguntasSync, useUsersAdmin, useNotificaciones, insertarNotificacion, useTradingConfigs, useActividadPools } from "./lib/useSupabaseSync";
import { supabase } from "./lib/supabase";
import cryptoHouseLogo from "./assets/cryptohouselogo.png";
import InactivityOverlay from "./InactivityOverlay";
import GlareCard from "./GlareCard";
import HedgeTrackerTab        from "./HedgeTrackerTab";
import InsiderTab             from "./InsiderTab";
import OutOfRangeAlertBanner  from "./OutOfRangeAlertBanner";
import { formatPrice }        from "./lib/rpcCodec";
import ScanModal              from "./features/scanner/components/ScanModal";
import { hlGetAllMids, hlGetOpenOrders, hlGetMeta, hlPlaceOrder, hlSignAndSend, hlGetAccountState } from "./features/wallets/services/hlService";
import WalletsTab             from "./features/wallets/WalletsTab";
import { CURSO }              from "./features/programa/data/cursoData";
import DashboardTab           from "./features/dashboard/DashboardTab";
import { buildWaUpgradeUrl }  from "./features/dashboard/utils";
import "./styles/app.css";



// WALLETS TAB

// ════════════════════════════════════════════════════════════════════
// Cobertura TAB
// ════════════════════════════════════════════════════════════════════
// ════════════════════════════════════════════════════════════════════
// POOL CARD COMPONENT
// ════════════════════════════════════════════════════════════════════
// ════════════════════════════════════════════════════════════════════
// POOL CARD COMPONENT — powered by Revert Finance API
// ════════════════════════════════════════════════════════════════════
function calcPoolStats(pos) {
  const r = pos.revert ?? null;

  // ── Value & PNL ────────────────────────────────────────────────
  const valueUsd        = r ? parseFloat(r.underlying_value)         : (pos.valueUsd ?? 0);
  const depositsValue   = r ? parseFloat(r.deposits_value)           : (pos.valueAtCreation ?? 0);
  const withdrawalsVal  = r ? parseFloat(r.withdrawals_value ?? "0") : 0;
  const netInvested     = depositsValue - withdrawalsVal;
  const pnlUsd          = r ? parseFloat(r.performance?.usd?.pnl ?? "0") : (valueUsd - netInvested);
  const pnlPct          = depositsValue > 0 ? (pnlUsd / depositsValue) * 100 : 0;
  const aprUsd          = r ? parseFloat(r.performance?.usd?.pool_apr ?? r.performance?.hodl?.apr ?? "0") : 0;
  const ilUsd           = r ? parseFloat(r.performance?.usd?.il  ?? "0") : 0;

  // ── PNL vs HODL ────────────────────────────────────────────────
  const pnlVsHodl       = r ? parseFloat(r.performance?.hodl?.pnl ?? "0") : 0;
  const aprVsHodl       = r ? parseFloat(r.performance?.hodl?.apr ?? "0") : 0;

  // ── PNL vs Token0/Token1 ───────────────────────────────────────
  const pnlToken0       = r ? parseFloat(r.performance?.token0?.pnl ?? "0") : 0;
  const pnlToken1       = r ? parseFloat(r.performance?.token1?.pnl ?? "0") : 0;

  // ── Fees ───────────────────────────────────────────────────────
  const feesValue       = r ? parseFloat(r.fees_value ?? "0")         : (pos.collectedFeesUsd ?? 0);
  const ageDaysRaw      = r ? parseFloat(r.age ?? "0")                : 0;
  const feesAprCalc     = (r && feesValue > 0 && depositsValue > 0 && ageDaysRaw > 0)
    ? (feesValue / depositsValue) * (365 / ageDaysRaw) * 100 : 0;
  const feesApr         = r ? (parseFloat(r.performance?.hodl?.fee_apr ?? "0") || feesAprCalc) : 0;
  const uncollected0    = r ? parseFloat(r.uncollected_fees0 ?? "0")  : 0;
  const uncollected1    = r ? parseFloat(r.uncollected_fees1 ?? "0")  : 0;
  const collected0      = r ? parseFloat(r.collected_fees0   ?? "0")  : 0;
  const collected1      = r ? parseFloat(r.collected_fees1   ?? "0")  : 0;

  // ── Age ────────────────────────────────────────────────────────
  const ageDaysFloat    = ageDaysRaw;
  const ageFromTs       = r ? null : (pos.createdAtTimestamp ? (Date.now() - pos.createdAtTimestamp) / 1000 : 0);
  const ageDays         = r ? Math.floor(ageDaysFloat) : Math.floor((ageFromTs ?? 0) / 86400);
  const ageHours        = r ? Math.floor((ageDaysFloat % 1) * 24) : Math.floor(((ageFromTs ?? 0) % 86400) / 3600);

  // ── Current amounts ────────────────────────────────────────────
  const amount0         = r ? parseFloat(r.current_amount0 ?? "0") : parseFloat(pos.amount0 ?? "0");
  const amount1         = r ? parseFloat(r.current_amount1 ?? "0") : parseFloat(pos.amount1 ?? "0");

  // ── Price & range ──────────────────────────────────────────────
  const currentPrice    = r ? parseFloat(r.pool_price ?? "0")     : (pos.currentPrice ?? 0);
  const priceLower      = r ? parseFloat(r.price_lower ?? "0")    : (pos.priceLower ?? 0);
  const priceUpper      = r ? parseFloat(r.price_upper ?? "0")    : (pos.priceUpper ?? 0);
  const entryPrice      = pos.priceAtCreation ?? currentPrice;

  // ── Range bar ──────────────────────────────────────────────────
  const span            = priceUpper - priceLower;
  const barPct          = span > 0 ? Math.max(0, Math.min(100, (currentPrice - priceLower) / span * 100)) : 0;

  // ── 24h deltas ─────────────────────────────────────────────────
  const delta24hPnl     = 0;
  const delta24hApr     = 0;

  // ── Deposits/withdrawals ───────────────────────────────────────
  const totalDep1       = r ? parseFloat(r.total_deposits1  ?? "0") : 0;
  const totalWit1       = r ? parseFloat(r.total_withdrawn1 ?? "0") : 0;

  return {
    valueUsd, depositsValue, netInvested, withdrawalsVal,
    pnlUsd, pnlPct, aprUsd, ilUsd,
    pnlVsHodl, aprVsHodl, pnlToken0, pnlToken1,
    feesValue, feesApr, uncollected0, uncollected1, collected0, collected1,
    ageDays, ageHours,
    amount0, amount1,
    currentPrice, priceLower, priceUpper, entryPrice, barPct,
    delta24hPnl, delta24hApr,
    totalDep1, totalWit1,
  };
}

// ════════════════════════════════════════════════════════════════════
// TRADING MODAL — Trading Avaro (breakout automático)
// ════════════════════════════════════════════════════════════════════
function TradingModal({ pos, s, onClose }) {
  const { user } = useAuth();
  const { guardar: guardarTrading } = useTradingConfigs(user?.id);
  const sym0 = pos.token0Symbol || "ETH";
  const coin = sym0.replace("W","") + "-PERP";

  const hlWallets = (() => {
    try { return JSON.parse(localStorage.getItem("hl_wallets") || "[]"); } catch { return []; }
  })();

  const [selectedWallet, setSelectedWallet] = useState(hlWallets[0]?.id || "");
  const [walletBalance, setWalletBalance]   = useState(null);
  const [direction, setDirection]           = useState("both");   // "both"|"long"|"short"
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
      // Save trading config — Supabase + localStorage cache
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

        {/* Header */}
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

          {/* Wallet */}
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

          {/* Direction */}
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

          {/* Capital + Leverage */}
          <div>
            <div style={{ ...S.row,marginBottom:8 }}>
              <div style={S.label}>⚡ Capital por Operación</div>
              <div style={{ fontSize:16,fontWeight:700,color:"#c8a0ff" }}>${capital.toFixed(2)}</div>
            </div>
            <div style={{ fontSize:11,color:"#4a7a96",marginBottom:4 }}>pool ${poolValue.toFixed(0)} + {buffer}%</div>

            {/* Buffer */}
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

            {/* Breakout buffer slider */}
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

            {/* Leverage */}
            <div style={{ ...S.row,marginTop:14,marginBottom:6 }}>
              <span style={{ fontSize:11,color:"#4a7a96" }}>Leverage (Isolated)</span>
              <span style={{ fontSize:12,fontWeight:700,color:"#c8a0ff" }}>{leverage}x</span>
            </div>
            <input type="range" min={1} max={50} value={leverage}
              onChange={e => setLeverage(Number(e.target.value))}
              style={{ width:"100%",accentColor:"#a060ff" }} />
            <div style={{ ...S.row,fontSize:10,color:"#2a1a4e" }}><span>1x</span><span>50x max</span></div>

            {/* Margin status */}
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

          {/* Stop Loss */}
          <div>
            <div style={S.label}>🔴 Stop Loss Fijo (%) *</div>
            <input style={S.input} value={stopLoss}
              onChange={e => setStopLoss(e.target.value)} placeholder="0.1" />
            <div style={{ fontSize:11,color:"#4a7a96",marginTop:4 }}>Cierra la posición si pierde este % desde la entrada</div>
          </div>

          {/* Breakeven slider */}
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

          {/* Trailing Stop */}
          <label style={{ display:"flex",alignItems:"center",gap:10,cursor:"pointer",fontSize:13,color:"#c8a0ff" }}>
            <input type="checkbox" checked={trailingStop} onChange={e => setTrailingStop(e.target.checked)}
              style={{ accentColor:"#a060ff",width:15,height:15 }} />
            <div>
              <div>Trailing Stop</div>
              <div style={{ fontSize:11,color:"#4a5a72",marginTop:2 }}>El SL sigue al precio cuando el trade está en ganancia</div>
            </div>
          </label>

          {/* Take Profit */}
          <div>
            <div style={S.label}>🎯 Take Profit (%) — opcional</div>
            <input style={S.input} value={takeProfit}
              onChange={e => setTakeProfit(e.target.value)} placeholder="-" />
            <div style={{ fontSize:11,color:"#4a7a96",marginTop:4 }}>Deja vacío para no usar TP</div>
          </div>

          {/* Auto-rearm */}
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

        {/* Footer */}
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


function ProtectionModal({ pos, s, onClose }) {
  const sym0 = pos.token0Symbol || "ETH";
  const coin = sym0.replace("W","") + "-PERP"; // WETH → ETH-PERP

  // Load wallets from localStorage
  const hlWallets = (() => {
    try { return JSON.parse(localStorage.getItem("hl_wallets") || "[]"); } catch { return []; }
  })();

  const [selectedWallet, setSelectedWallet] = useState(hlWallets[0]?.id || "");
  const [walletBalance, setWalletBalance]   = useState(null);
  const [leverage, setLeverage]             = useState(50);
  const [buffer, setBuffer]                 = useState(100);   // % extra capital
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

  // Capital calculations
  const poolValue    = s.valueUsd || 0;
  const bufferMult   = 1 + buffer / 100;
  const capital      = poolValue * bufferMult;
  const margin       = capital / leverage;
  const slPct        = parseFloat(stopLoss) || 0;

  // Auto-optimize: find best config for available balance
  const autoOptimize = () => {
    if (!walletBalance || walletBalance <= 0) return;
    // Try reducing buffer first, then leverage up
    for (const buf of [0, 20, 40, 60, 80, 100]) {
      const cap = poolValue * (1 + buf / 100);
      const needed = cap / 50; // max leverage
      if (walletBalance >= needed) {
        setBuffer(buf);
        setLeverage(50);
        return;
      }
    }
    // If nothing works, just max everything
    setBuffer(0);
    setLeverage(50);
  };

  // Auto-fix SL based on distance to range
  const autoFixSl = () => {
    const safeSl = Math.ceil(Math.abs(distToRange) * 1.2 * 10) / 10;
    setStopLoss(String(Math.max(safeSl, 1).toFixed(1)));
  };

  // Distance to lower bound
  const distToRange = s.priceLower > 0 && s.currentPrice > 0
    ? ((s.priceLower - s.currentPrice) / s.currentPrice * 100)
    : 0;
  const slTooTight  = slPct < Math.abs(distToRange) && isOor;
  const canActivate = walletBalance !== null && walletBalance >= margin;

  // Fetch wallet balance when wallet changes
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
    const cleanPk = w.privateKey.startsWith("0x") ? w.privateKey : "0x" + w.privateKey;
    if (walletBalance !== null && walletBalance < margin)
      return setError(`Balance insuficiente. Necesitas $${margin.toFixed(2)}, tienes $${walletBalance.toFixed(2)}`);

    setActivating(true);
    try {
      // Size = capital / currentPrice (ETH amount to short)
      const size = capital / s.currentPrice;
      const result = await hlPlaceOrder({
        privateKey: cleanPk,
        coin:       sym0.replace("W",""),   // ETH
        side:       "A",                    // Sell = SHORT
        size:       parseFloat(size.toFixed(4)),
        price:      null,                   // market order
        reduceOnly: false,
      });
      if (result?.status === "ok") {
        setSuccess(`✓ SHORT abierto: ${size.toFixed(4)} ${sym0} @ ~$${s.currentPrice.toFixed(2)}`);
        // Save protection config
        const newProt = {
          id:             crypto.randomUUID(),   // ← ID único, clave primaria
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

        {/* Header */}
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

          {/* OOR Warning */}
          {isOor && (
            <div style={{ background:"#1a0e00",border:"1px solid #5a3a00",padding:"12px 14px",fontSize:12,color:"#ffb347",lineHeight:1.6 }}>
              <div style={{ fontWeight:700,marginBottom:6 }}>⚠ Pool fuera de rango — lee esto antes de activar</div>
              <div>Tu posición es <strong>100% {s.currentPrice < s.priceLower ? sym0 : sym1}</strong>. El SHORT se abrirá <strong>inmediatamente</strong> al precio actual (~{s.currentPrice?.toFixed(2)}).</div>
              <div style={{marginTop:6}}>El <strong>Stop Loss</strong> está pre-configurado a <strong>{stopLoss}%</strong> = precio del borde inferior de tu rango ({s.priceLower?.toFixed(2)}). Si {sym0} sube hasta ahí, el pool vuelve a rango y el SHORT se cierra.</div>
              <div style={{marginTop:6,color:"#ff9944"}}>Si pones un SL menor que {Math.abs(distToRange).toFixed(1)}%, cualquier rebote normal cerrará el SHORT con pérdida.</div>
            </div>
          )}

          {/* Wallet */}
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

          {/* Perp */}
          <div>
            <div style={S.label}>📊 Perp (SHORT)</div>
            <div style={{ background:"#0a1520",border:"1px solid #1a3a5e",padding:"8px 12px",fontSize:14,fontWeight:700,color:"#c8e6f0" }}>{coin}</div>
          </div>

          {/* Capital + Leverage */}
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

            {/* Margin status */}
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

          {/* Buffer */}
          <div>
            <div style={S.label}>🛡 Buffer de Capital</div>
            <div style={{ display:"flex",gap:6,flexWrap:"wrap" }}>
              {bufferOptions.map(opt => (
                <button key={opt.value} onClick={() => setBuffer(opt.value)} style={{
                  padding:"5px 12px",fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"Outfit,sans-serif",
                  background: buffer === opt.value ? "transparent" : "transparent",
                  border: `1px solid ${buffer === opt.value ? "#ffb347" : "#1a3a5e"}`,
                  color: buffer === opt.value ? "#ffb347" : "#4a7a96",
                }}>{opt.label}</button>
              ))}
            </div>
            <div style={{ fontSize:11,color:"#ffb347",marginTop:6 }}>
              Posición efectiva: ${capital.toFixed(0)} (pool ${poolValue.toFixed(0)} + {buffer}%)
            </div>
          </div>

          {/* Stop Loss */}
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

          {/* Breakeven */}
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

          {/* Take Profits */}
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

          {/* Checkbox */}
          <label style={{ display:"flex",alignItems:"flex-start",gap:10,cursor:"pointer",fontSize:13,color:"#c8e6f0" }}>
            <input type="checkbox" checked={noProtectReentry} onChange={e => setNoProtectReentry(e.target.checked)}
              style={{ marginTop:2,accentColor:"#00e5ff",width:15,height:15 }} />
            <div>
              <div>No proteger cuando reentra al rango desde arriba</div>
              <div style={{ fontSize:11,color:"#4a7a96",marginTop:2 }}>Solo proteger por abajo.</div>
            </div>
          </label>

          {/* Feedback */}
          {error   && <div style={{ color:"#ff4f6e",fontSize:12,padding:"8px 12px",border:"1px solid #5a1a28",background:"#1a0810" }}>⚠ {error}</div>}
          {success && <div style={{ color:"#00ff88",fontSize:12,padding:"8px 12px",border:"1px solid #003a22",background:"#001a0e" }}>{success}</div>}
        </div>

        {/* Footer */}
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

const OOR_COOLDOWN_MS = 30 * 60 * 1000; // 30 minutos

async function sendOorAlert({ userId, userEmail, pair, direction, currentPrice, priceLower, priceUpper, tokenId }) {
  // ① Notificación en panel (campana)
  const dir  = direction === "below" ? "por debajo del mínimo" : "por encima del máximo";
  const icon = direction === "below" ? "⬇" : "⬆";
  await insertarNotificacion(
    userId,
    "oor_alert",
    `${icon} Pool ${pair} fuera de rango`,
    `Tu posición salió de rango (${dir}). Precio actual: ${currentPrice.toFixed(2)}.`,
  );

  // ② Email vía Supabase Edge Function + Resend
  try {
    await supabase.functions.invoke("send-oor-alert", {
      body: { userId, userEmail, pair, direction, currentPrice, priceLower, priceUpper, tokenId },
    });
  } catch (e) {
    console.warn("Edge Function OOR email:", e?.message);
  }
}

function PoolCard({ pos, onRemove, mode = "Cobertura" }) {
  const { user } = useAuth();
  const [expanded, setExpanded]             = useState(false);
  const [showProtection, setShowProtection] = useState(false);
  const [showTrading, setShowTrading]       = useState(false);
  const [viewMode, setViewMode]             = useState("normal");
  const [showBanner, setShowBanner]         = useState(false);
  const prevStatusRef                       = useRef(null);
  const s = calcPoolStats(pos);

  // ── Detecta transición En Rango → Fuera y dispara el flujo de alertas ──
  useEffect(() => {
    const currentLabel = pos.status?.label;
    const prevLabel    = prevStatusRef.current;
    prevStatusRef.current = currentLabel;

    // Solo actúa en transición real de "En Rango" → fuera
    if (prevLabel === "En Rango" && currentLabel && currentLabel !== "En Rango") {
      setShowBanner(true);

      // Cooldown anti-spam por pool
      const cooldownKey = `oor_alert_${pos.tokenId}_last`;
      const lastSent    = parseInt(localStorage.getItem(cooldownKey) || "0", 10);
      const now         = Date.now();

      if (now - lastSent >= OOR_COOLDOWN_MS && user?.id) {
        localStorage.setItem(cooldownKey, String(now));
        const direction = currentLabel === "Fuera (Abajo)" ? "below" : "above";
        sendOorAlert({
          userId:       user.id,
          userEmail:    user.email || "",
          pair:         `${pos.token0Symbol}/${pos.token1Symbol}`,
          direction,
          currentPrice: s.currentPrice,
          priceLower:   s.priceLower,
          priceUpper:   s.priceUpper,
          tokenId:      pos.tokenId,
        });
      }
    }

    if (currentLabel === "En Rango") setShowBanner(false);
  }, [pos.status?.label]); // eslint-disable-line

  const fmtUsd  = (v, decimals = 2) => `${v >= 0 ? "+" : ""}$${Math.abs(v).toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}`;
  const fmtPct  = (v, decimals = 2) => `${v >= 0 ? "+" : ""}${parseFloat(v).toFixed(decimals)}%`;
  const fmtP    = (v) => v?.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) ?? "0.00";
  const fmtAmt  = (v, d = 4) => parseFloat(v || 0).toFixed(d);
  const sym0    = pos.token0Symbol || "T0";
  const sym1    = pos.token1Symbol || "T1";
  const poolUrl = `https://app.uniswap.org/positions/v3/${pos.chainName?.toLowerCase()}/${pos.tokenId}`;
  const revertUrl = `https://revert.finance/#/uniswap-position/arbitrum/${pos.tokenId}`;

  // Status from live price
  const inRange   = pos.status?.label === "En Rango";
  const statusObj = inRange
    ? { label: "En Rango",        color: "#00ff88", bg: "#001a0e", border: "#003a22" }
    : s.currentPrice < s.priceLower
      ? { label: "Fuera (Abajo)", color: "#ff4f6e", bg: "#1a0810", border: "#5a1a28" }
      : { label: "Fuera (Arriba)",color: "#ffb347", bg: "#1a0e00", border: "#5a3a00" };

  // Check saved protection
  const savedProtection = (() => {
    try {
      const all = JSON.parse(localStorage.getItem("hl_protections") || "[]");
      return all.find(p => String(p.poolId) === String(pos.tokenId)) || null;
    } catch { return null; }
  })();

  const savedTrading = (() => {
    try {
      const all = JSON.parse(localStorage.getItem("hl_trading") || "[]");
      return all.find(p => String(p.poolId) === String(pos.tokenId) && p.status === "active") || null;
    } catch { return null; }
  })();

  return (
    <>
      {showProtection && (
        <ProtectionModal
          pos={pos} s={{ ...s, inRange }}
          onClose={() => setShowProtection(false)}
        />
      )}
      {showTrading && (
        <TradingModal
          pos={pos} s={{ ...s, inRange }}
          onClose={() => setShowTrading(false)}
        />
      )}
      <div className="pc-wrap">
      {/* ── COLLAPSED ROW ── */}
      <div className="pc-row" onClick={() => setExpanded(e => !e)}>
        <div className="pc-left">
          <span className="pc-pair">{sym0}/{sym1}</span>
          <span className="pc-status" style={{ color: statusObj.color, background: statusObj.bg, border: `1px solid ${statusObj.border}` }}>
            {statusObj.label}
          </span>
          <span className="pc-chain">{pos.chainName}</span>
        </div>
        <div className="pc-stats">
          <div className="pc-stat">
            <div className="pc-stat-label">Valor LP</div>
            <div className="pc-stat-val">${fmtP(s.valueUsd)}</div>
          </div>
          <div className="pc-stat">
            <div className="pc-stat-label">Entry</div>
            <div className="pc-stat-val">{fmtP(s.entryPrice)}</div>
          </div>
          <div className="pc-stat">
            <div className="pc-stat-label">PNL</div>
            <div className={`pc-stat-val ${s.pnlUsd >= 0 ? "green" : "red"}`}>{fmtUsd(s.pnlUsd)}</div>
          </div>
          <div className="pc-stat">
            <div className="pc-stat-label">APR</div>
            <div className={`pc-stat-val ${s.aprUsd >= 0 ? "green" : "red"}`}>{s.aprUsd.toFixed(1)}%</div>
          </div>
          <div className="pc-stat">
            <div className="pc-stat-label">Fee APR</div>
            <div className="pc-stat-val green">{s.feesApr.toFixed(1)}%</div>
          </div>
          <div className="pc-stat">
            <div className="pc-stat-label">Fees</div>
            <div className="pc-stat-val green">${fmtP(s.feesValue)}</div>
          </div>
        </div>
        <div className={`pc-chevron ${expanded ? "open" : ""}`}>›</div>
        {/* Toggle — stop propagation so no expand/collapse */}
        <div className="pc-toggle" onClick={e => e.stopPropagation()}>
          <button className={`pc-toggle-btn ${viewMode === "normal" ? "active" : ""}`} onClick={() => { setViewMode("normal"); setExpanded(true); }}>Normal</button>
          <button className={`pc-toggle-btn ${viewMode === "pro" ? "active" : ""}`} onClick={() => { setViewMode("pro"); setExpanded(true); }}>Pro</button>
        </div>
      </div>

      {/* ── NORMAL VIEW ── */}
      {expanded && viewMode === "normal" && (() => {
        const val0 = s.amount0 * s.currentPrice;
        const val1 = s.amount1;
        const totalVal = val0 + val1 || s.valueUsd || 1;
        const pct0 = Math.round((val0 / totalVal) * 100);
        const pct1 = 100 - pct0;
        const sym0d = sym0.replace("WETH","ETH");
        const sym1d = sym1;
        return (
          <div className="pcn-wrap">
            {/* Banner OOR en vista Normal */}
            {showBanner && pos.status?.label !== "En Rango" && (
              <OutOfRangeAlertBanner
                direction={pos.status?.label === "Fuera (Abajo)" ? "below" : "above"}
                pair={`${sym0d}/${sym1d}`}
                onDismiss={() => setShowBanner(false)}
              />
            )}

            {/* Position */}
            <div className="pcn-card">
              <div className="pcn-card-title">Posición</div>
              <div className="pcn-total">${fmtP(s.valueUsd)}</div>
              <div className="pcn-split-bar">
                <div className="pcn-split-bar-0" style={{ width:`${pct0}%` }} />
                <div className="pcn-split-bar-1" style={{ width:`${pct1}%` }} />
              </div>
              <div className="pcn-tokens">
                <div className="pcn-token">
                  <div className="pcn-token-pct">{pct0}% — {sym0d}</div>
                  <div className="pcn-token-usd">${fmtP(val0)}</div>
                  <div className="pcn-token-amt">{fmtAmt(s.amount0, 4)} {sym0d}</div>
                </div>
                <div className="pcn-token">
                  <div className="pcn-token-pct">{pct1}% — {sym1d}</div>
                  <div className="pcn-token-usd">${fmtP(val1)}</div>
                  <div className="pcn-token-amt">{fmtAmt(s.amount1, 2)} {sym1d}</div>
                </div>
              </div>
            </div>

            {/* Fees sin recolectar */}
            {(() => {
              const unc0usd = s.uncollected0 * s.currentPrice;
              const unc1usd = s.uncollected1;
              const totalUnc = unc0usd + unc1usd || 0.01;
              const pctUnc0 = Math.round((unc0usd / totalUnc) * 100);
              const pctUnc1 = 100 - pctUnc0;
              return (
                <div className="pcn-card">
                  <div className="pcn-card-title">Fees sin recolectar</div>
                  <div className="pcn-total">${fmtP(unc0usd + unc1usd)}</div>
                  <div className="pcn-split-bar">
                    <div className="pcn-split-bar-0" style={{ width:`${pctUnc0}%` }} />
                    <div className="pcn-split-bar-1" style={{ width:`${pctUnc1}%` }} />
                  </div>
                  <div className="pcn-tokens">
                    <div className="pcn-token">
                      <div className="pcn-token-pct">{pctUnc0}% — {sym0d}</div>
                      <div className="pcn-token-usd">${fmtP(unc0usd)}</div>
                      <div className="pcn-token-amt">{fmtAmt(s.uncollected0, 6)} {sym0d}</div>
                    </div>
                    <div className="pcn-token">
                      <div className="pcn-token-pct">{pctUnc1}% — {sym1d}</div>
                      <div className="pcn-token-usd">${fmtP(unc1usd)}</div>
                      <div className="pcn-token-amt">{fmtAmt(s.uncollected1, 2)} {sym1d}</div>
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* Price Range */}
            <div className="pcn-card">
              <div className="pcn-card-title">Rango de precio</div>
              <div className="pcn-range-grid">
                <div className="pcn-range-item">
                  <div className="pcn-range-label">Precio mín.</div>
                  <div className="pcn-range-val">{fmtP(s.priceLower)}</div>
                  <div className="pcn-range-sub">{sym1d} = 1 {sym0d}</div>
                </div>
                <div className="pcn-range-item">
                  <div className="pcn-range-label">Precio máx.</div>
                  <div className="pcn-range-val">{fmtP(s.priceUpper)}</div>
                  <div className="pcn-range-sub">{sym1d} = 1 {sym0d}</div>
                </div>
                <div className="pcn-range-item">
                  <div className="pcn-range-label">Precio mercado</div>
                  <div className="pcn-range-val market">{fmtP(s.currentPrice)}</div>
                  <div className="pcn-range-sub">{sym1d} = 1 {sym0d}</div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pc-actions">
              <a href={poolUrl} target="_blank" rel="noreferrer" className="pc-btn-link">🔗 Uniswap</a>
              <button className="pc-btn-close" onClick={() => setExpanded(false)}>Cerrar</button>
              <button className="pc-btn-remove" onClick={() => onRemove(pos.tokenId)}>🗑 Eliminar</button>
            </div>
          </div>
        );
      })()}

      {/* ── EXPANDED PANEL (PRO) ── */}
      {expanded && viewMode === "pro" && (
        <div className="pc-panel">

          {/* ── Banner OOR ── */}
          {showBanner && pos.status?.label !== "En Rango" && (
            <OutOfRangeAlertBanner
              direction={pos.status?.label === "Fuera (Abajo)" ? "below" : "above"}
              pair={`${sym0}/${sym1}`}
              onDismiss={() => setShowBanner(false)}
            />
          )}

          {/* Price + range bar */}
          <div className="pc-price-section">
            <div className="pc-current-price">{fmtP(s.currentPrice)}</div>

            {(() => {
              const pad   = 0.20;
              const span  = Math.max(s.priceUpper - s.priceLower, 1);
              const lo    = s.priceLower - span * pad;
              const hi    = s.priceUpper + span * pad;
              const total = hi - lo;
              const toP   = (v) => Math.max(1, Math.min(99, (v - lo) / total * 100));

              const loP  = toP(s.priceLower);
              const hiP  = toP(s.priceUpper);
              const curP = toP(s.currentPrice);
              const inRange = s.currentPrice >= s.priceLower && s.currentPrice <= s.priceUpper;
              const isOor = !inRange;

              return (
                <div style={{ position: "relative", marginBottom: 8 }}>

                  {/* ── ROW 1: price tag above dot ── */}
                  <div style={{ position: "relative", height: 32, marginBottom: 4 }}>
                    <div style={{
                      position: "absolute",
                      left: `${curP}%`,
                      transform: "translateX(-50%)",
                      bottom: 0,
                      background: "#070d14",
                      border: `1px solid ${isOor ? "#ff4f6e" : "#00e5ff"}`,
                      padding: "2px 8px",
                      fontSize: 12,
                      fontWeight: 700,
                      color: isOor ? "#ff4f6e" : "#00e5ff",
                      whiteSpace: "nowrap",
                      boxShadow: `0 0 10px ${isOor ? "rgba(255,79,110,0.4)" : "rgba(0,229,255,0.4)"}`,
                      zIndex: 10,
                    }}>
                      {fmtP(s.currentPrice)}
                      {/* arrow */}
                      <span style={{
                        position: "absolute", top: "100%", left: "50%",
                        transform: "translateX(-50%)",
                        borderLeft: "5px solid transparent",
                        borderRight: "5px solid transparent",
                        borderTop: `6px solid ${isOor ? "#ff4f6e" : "#00e5ff"}`,
                        display: "block", width: 0,
                      }} />
                    </div>
                  </div>

                  {/* ── ROW 2: the bar ── */}
                  <div style={{ position: "relative", height: 18 }}>
                    {/* Shell */}
                    <div style={{
                      position: "absolute", inset: 0,
                      borderRadius: 9,
                      background: "#020810",
                      border: "1px solid rgba(0,229,255,0.12)",
                      boxShadow: "inset 0 2px 6px rgba(0,0,0,0.9)",
                      overflow: "hidden",
                    }}>
                      {/* Red zone */}
                      <div style={{ position:"absolute", top:0, bottom:0, left:0, width:`${loP}%`, background:"linear-gradient(90deg,rgba(120,10,25,0.8),rgba(255,79,110,0.5))" }} />
                      {/* Green metallic zone */}
                      <div style={{
                        position:"absolute", top:0, bottom:0, left:`${loP}%`, width:`${hiP-loP}%`,
                        background:"linear-gradient(180deg,rgba(0,255,100,0.1) 0%,rgba(0,210,85,0.95) 18%,rgba(0,255,130,1) 45%,rgba(200,255,210,1) 50%,rgba(0,255,130,1) 55%,rgba(0,180,65,0.95) 82%,rgba(0,60,25,0.3) 100%)",
                        boxShadow:"inset 0 1px 0 rgba(255,255,255,0.25)",
                        overflow:"hidden",
                      }}>
                        {/* Shine sweep */}
                        <div style={{
                          position:"absolute", top:"-50%", left:"-60%", width:"35%", height:"200%",
                          background:"linear-gradient(105deg,transparent 30%,rgba(255,255,255,0.22) 50%,transparent 70%)",
                          animation:"rb-shine 3.5s ease-in-out infinite",
                        }} />
                      </div>
                      {/* Amber zone */}
                      <div style={{ position:"absolute", top:0, bottom:0, right:0, width:`${100-hiP}%`, background:"linear-gradient(90deg,rgba(255,150,30,0.3),rgba(140,60,0,0.65))" }} />
                    </div>

                    {/* Boundary lines — outside shell */}
                    {[loP, hiP].map((p, i) => (
                      <div key={i} style={{
                        position:"absolute", top:-3, bottom:-3, left:`${p}%`,
                        width:2, transform:"translateX(-50%)",
                        background:"rgba(255,255,255,0.2)", zIndex:2,
                      }} />
                    ))}

                    {/* Dot — outside shell */}
                    <div style={{
                      position:"absolute", top:"50%", left:`${curP}%`,
                      transform:"translate(-50%,-50%)", zIndex:5,
                      width:22, height:22, borderRadius:"50%",
                      background: isOor
                        ? "radial-gradient(circle at 32% 30%,#fff 0%,#ff4f6e 35%,#7a0020 80%)"
                        : "radial-gradient(circle at 32% 30%,#fff 0%,#00e5ff 35%,#006a99 80%)",
                      border:"2px solid rgba(255,255,255,0.35)",
                      animation: isOor ? "rb-glow-out 2s ease-in-out infinite" : "rb-glow-in 2s ease-in-out infinite",
                    }} />
                  </div>

                  {/* ── ROW 3: MIN MAX fixed at edges ── */}
                  <div style={{ position:"relative", height:36, marginTop:6 }}>

                    {/* MIN — always fixed at left edge */}
                    <div style={{ position:"absolute", left:0, top:0, lineHeight:1.3 }}>
                      <div style={{ fontSize:9, letterSpacing:"1.5px", textTransform:"uppercase", fontWeight:700, color:"#ff4f6e" }}>▼ MIN</div>
                      <div style={{ fontSize:13, fontWeight:700, color:"#ff6b88" }}>{fmtP(s.priceLower)}</div>
                    </div>

                    {/* MAX — always fixed at right edge */}
                    <div style={{ position:"absolute", right:0, top:0, textAlign:"right", lineHeight:1.3 }}>
                      <div style={{ fontSize:9, letterSpacing:"1.5px", textTransform:"uppercase", fontWeight:700, color:"#00ff88" }}>▲ MAX</div>
                      <div style={{ fontSize:13, fontWeight:700, color:"#00ff88" }}>{fmtP(s.priceUpper)}</div>
                    </div>
                  </div>

                </div>
              );
            })()}

            {/* Token amounts */}
            <div className="pc-amounts">
              <span>{fmtAmt(s.amount0)} {sym0}</span>
              <span>{fmtAmt(s.amount1)} {sym1}</span>
            </div>
          </div>

          {/* ── ACTION BANNER — solo Cobertura SHORT cuando precio está POR DEBAJO ── */}
          {s.currentPrice < s.priceLower && mode === "Cobertura" && (
            <div style={{ marginBottom: 16 }}>
              {savedProtection ? (
                <div style={{ background:"#001a0e",border:"1px solid #003a22",padding:"10px 14px",fontSize:12,color:"#00ff88",display:"flex",justifyContent:"space-between",alignItems:"center" }}>
                  <span>🛡 Protección activa · SHORT {savedProtection.size} {sym0} @ ${savedProtection.openPrice?.toFixed(2)}</span>
                  <span style={{ color:"#4a7a96",fontSize:11 }}>SL {savedProtection.stopLoss}%</span>
                </div>
              ) : (
                <>
                  <div style={{ background:"#1a0810",border:"1px solid #5a1a28",padding:"10px 14px",fontSize:12,color:"#ff6b88",marginBottom:8 }}>
                    ⚠ Tu posición es 100% {sym0} — el precio bajó del rango. Configura un SHORT para protegerte.
                  </div>
                  <button onClick={() => setShowProtection(true)} style={{
                    width:"100%",padding:"12px 0",background:"transparent",border:"1px solid #ff4f6e",color:"#ff4f6e",
                    fontSize:14,fontWeight:700,cursor:"pointer",fontFamily:"Outfit,sans-serif",letterSpacing:"0.5px",
                    display:"flex",alignItems:"center",justifyContent:"center",gap:8,
                  }}>
                    🛡 Configurar Cobertura SHORT (100% {sym0})
                  </button>
                </>
              )}
            </div>
          )}

          {/* ── Precio SOBRE el rango → apunta a Insider Trading ── */}
          {s.currentPrice > s.priceUpper && mode === "Cobertura" && (
            <div style={{ marginBottom:16, background:"#0a0820", border:"1px solid #3730a355", padding:"10px 14px", fontSize:12, color:"#a78bfa" }}>
              📈 Tu posición es 100% {sym1} — el precio subió del rango.
              Esta situación se gestiona desde el tab <strong style={{color:"#c4b5fd"}}>Insider (Trading)</strong> con oportunidades LONG.
            </div>
          )}

          {mode === "trading" && (
            <div style={{ marginBottom: 16 }}>
              {savedTrading ? (
                <div style={{ background:"#0a0a1a",border:"1px solid #4a1a7a",padding:"10px 14px",fontSize:12,color:"#c8a0ff",display:"flex",justifyContent:"space-between",alignItems:"center" }}>
                  <span>📈 Trading activo · {savedTrading.direction?.toUpperCase()} · {savedTrading.coin}</span>
                  <span style={{ color:"#6a4a96",fontSize:11 }}>SL {savedTrading.stopLoss}%</span>
                </div>
              ) : (
                <>
                  <div style={{ background:"#0d0a1a",border:"1px solid #3a1a6a",padding:"10px 14px",fontSize:12,color:"#9a70cc",marginBottom:8 }}>
                    📈 {inRange ? "Pool en rango — el bot entrará cuando rompa el límite." : `100% ${sym0} — oportunidad SHORT (momentum a la baja)`}
                  </div>
                  <button onClick={() => setShowTrading(true)} style={{
                    width:"100%",padding:"12px 0",background:"linear-gradient(135deg,#1a0a3a,#2a0a5a)",
                    border:"1px solid #7a40cc",color:"#c8a0ff",
                    fontSize:14,fontWeight:700,cursor:"pointer",fontFamily:"Outfit,sans-serif",letterSpacing:"0.5px",
                    display:"flex",alignItems:"center",justifyContent:"center",gap:8,
                  }}>
                    📈 Configurar Trading
                  </button>
                </>
              )}
            </div>
          )}

          {/* Resultado Total */}
          <div className="pc-section-title">Resultado Total</div>
          <div className="pc-grid4">
            <div className="pc-metric">
              <div className="pc-metric-label">PNL Total (USD)</div>
              <div className={`pc-metric-val ${s.pnlUsd >= 0 ? "green" : "red"}`}>
                {fmtUsd(s.pnlUsd)} ({fmtPct(s.pnlPct)})
              </div>
            </div>
            <div className="pc-metric">
              <div className="pc-metric-label">Invertido (neto)</div>
              <div className="pc-metric-val">${fmtP(s.netInvested)}</div>
            </div>
            <div className="pc-metric">
              <div className="pc-metric-label">Tiempo de Vida</div>
              <div className="pc-metric-val">{s.ageDays}d {s.ageHours}h</div>
            </div>
            <div className="pc-metric">
              <div className="pc-metric-label">APR Total</div>
              <div className={`pc-metric-val ${s.aprUsd >= 0 ? "green" : "red"}`}>{s.aprUsd.toFixed(1)}%</div>
            </div>
          </div>

          {/* Performance vs benchmarks */}
          <div className="pc-section-title">Performance vs Benchmark</div>
          <div className="pc-grid4">
            <div className="pc-metric">
              <div className="pc-metric-label">PNL vs HODL</div>
              <div className={`pc-metric-val ${s.pnlVsHodl >= 0 ? "green" : "red"}`}>{fmtUsd(s.pnlVsHodl)}</div>
              <div className="pc-metric-sub">APR: {s.aprVsHodl.toFixed(1)}%</div>
            </div>
            <div className="pc-metric">
              <div className="pc-metric-label">PNL vs {sym0}</div>
              <div className={`pc-metric-val ${s.pnlToken0 >= 0 ? "green" : "red"}`}>{fmtAmt(s.pnlToken0)} {sym0}</div>
            </div>
            <div className="pc-metric">
              <div className="pc-metric-label">PNL vs {sym1}</div>
              <div className={`pc-metric-val ${s.pnlToken1 >= 0 ? "green" : "red"}`}>{fmtUsd(s.pnlToken1)}</div>
            </div>
            <div className="pc-metric">
              <div className="pc-metric-label">Imperm. Loss</div>
              <div className={`pc-metric-val ${s.ilUsd >= 0 ? "green" : "red"}`}>{fmtUsd(s.ilUsd)}</div>
            </div>
          </div>

          {/* Capital */}
          <div className="pc-section-title">Capital</div>
          <div className="pc-grid4">
            <div className="pc-metric">
              <div className="pc-metric-label">PNL Capital</div>
              <div className={`pc-metric-val ${s.pnlUsd >= 0 ? "green" : "red"}`}>{fmtUsd(s.pnlUsd)} ({fmtPct(s.pnlPct)})</div>
            </div>
            <div className="pc-metric">
              <div className="pc-metric-label">Depositado</div>
              <div className="pc-metric-val">${fmtP(s.depositsValue)}</div>
              <div className="pc-metric-sub">{fmtAmt(s.totalDep1, 2)} {sym1}</div>
            </div>
            <div className="pc-metric">
              <div className="pc-metric-label">APR Capital</div>
              <div className={`pc-metric-val ${s.aprUsd >= 0 ? "green" : "red"}`}>{s.aprUsd.toFixed(1)}%</div>
            </div>
            <div className="pc-metric">
              <div className="pc-metric-label">Retirado</div>
              <div className="pc-metric-val">${fmtP(s.withdrawalsVal)}</div>
              <div className="pc-metric-sub">{fmtAmt(s.totalWit1, 2)} {sym1}</div>
            </div>
          </div>

          {/* Fees Ganadas */}
          <div className="pc-section-title">Fees Ganadas</div>
          <div className="pc-grid4">
            <div className="pc-metric">
              <div className="pc-metric-label">Total Fees (USD)</div>
              <div className="pc-metric-val green">${fmtP(s.feesValue)}</div>
              <div className="pc-metric-sub">uncollected: ${fmtP(s.uncollected0 + s.uncollected1)}</div>
            </div>
            <div className="pc-metric">
              <div className="pc-metric-label">Fees {sym0}</div>
              <div className="pc-metric-val green">{fmtAmt(s.collected0)} {sym0}</div>
              <div className="pc-metric-sub">unc: {fmtAmt(s.uncollected0)}</div>
            </div>
            <div className="pc-metric">
              <div className="pc-metric-label">Fees {sym1}</div>
              <div className="pc-metric-val green">{fmtAmt(s.collected1, 2)} {sym1}</div>
              <div className="pc-metric-sub">unc: {fmtAmt(s.uncollected1, 2)}</div>
            </div>
            <div className="pc-metric">
              <div className="pc-metric-label">APR Fees</div>
              <div className="pc-metric-val green">{s.feesApr.toFixed(1)}%</div>
            </div>
          </div>

          {/* Proyección Fees */}
          <div className="pc-section-title">Proyección Fees</div>
          <div className="pc-grid4">
            {["Diario", "Semanal", "Mensual", "Anual"].map((label, i) => {
              const mult = [1/365, 7/365, 30/365, 1][i];
              const proj = s.netInvested * (s.feesApr / 100) * mult;
              const pct  = s.feesApr * mult;
              return (
                <div key={label} className="pc-metric">
                  <div className="pc-metric-label">{label}</div>
                  <div className="pc-metric-val green">${fmtP(proj)} ({pct.toFixed(2)}%)</div>
                </div>
              );
            })}
          </div>

          {/* 24h Delta — Revert no provee este dato, sección oculta */}

          {/* Info */}
          <div className="pc-section-title">Info</div>
          <div className="pc-info-row">
            <span>Edad: {s.ageDays}d {s.ageHours}h</span>
            <span>NFT: #{pos.tokenId}</span>
            <span>Chain: {pos.chainName}</span>
            <span>DEX: uniswap_v3</span>
            <span>Fee: {((pos.fee || 500) / 10000).toFixed(2)}%</span>
            <span>Pool: <span className="pc-addr">{pos.poolAddress ? pos.poolAddress.slice(0,8)+"..."+pos.poolAddress.slice(-4) : "—"}</span></span>
          </div>

          {/* Footer actions */}
          <div className="pc-actions">
            <a href={poolUrl} target="_blank" rel="noreferrer" className="pc-btn-link">🔗 Uniswap</a>
            <a href={revertUrl} target="_blank" rel="noreferrer" className="pc-btn-link">📊 Revert</a>
            <button className="pc-btn-close" onClick={() => setExpanded(false)}>Cerrar</button>
            <button className="pc-btn-remove" onClick={() => onRemove(pos.tokenId)}>🗑 Eliminar pool</button>
          </div>
        </div>
      )}
      </div>

      {/* ── GLARE CARD — Vista premium (desactivada temporalmente) ──
      <GlareCard
        pos={pos} s={s}
        sym0={sym0} sym1={sym1}
        inRange={inRange} statusObj={statusObj}
        fmtP={fmtP} fmtUsd={fmtUsd} fmtPct={fmtPct} fmtAmt={fmtAmt}
      />
      ── */}
    </>
  );
}

// ── Revert Finance API — datos completos de posición ───────────────
const REVERT_API = "https://api.revert.finance/v1/positions/account";

async function fetchRevertPositions(walletAddress) {
  try {
    const url = `${REVERT_API}/${walletAddress.toLowerCase()}?limit=100&active=true&with-v4=true`;
    const res  = await fetch(url);
    if (!res.ok) return {};
    const data = await res.json();
    // Index by nft_id for fast lookup
    const map = {};
    for (const pos of (data.data || [])) {
      map[String(pos.nft_id)] = pos;
    }
    return map;
  } catch { return {}; }
}

// ── Extraer precios desde datos de Revert (sin llamada extra) ─────
// Revert ya incluye en cada posición: tokens[address].price (USD)
// Esta función construye el mapa de precios a partir del revertMap
function buildPriceMapFromRevert(revertMap) {
  const map = {};
  for (const pos of Object.values(revertMap)) {
    const tokens = pos.tokens || {};
    for (const t of Object.values(tokens)) {
      const sym = (t.symbol || "").toUpperCase().replace("WETH", "ETH");
      const price = parseFloat(t.price ?? "0");
      if (sym && price > 0) map[sym] = price;
    }
  }
  return map;
}

async function enrichPoolsWithMarketData(pools) {
  // Revert Finance es la fuente de verdad
  const wallets = [...new Set(pools.map(p => p.og_owner || p.walletAddress).filter(Boolean))];
  const revertMaps = await Promise.all(wallets.map(w => fetchRevertPositions(w)));
  const revertAll  = Object.assign({}, ...revertMaps);

  // Si Revert no devolvió nada, usar precios del mapa interno de Revert o 0
  const priceMap = Object.keys(revertAll).length > 0
    ? buildPriceMapFromRevert(revertAll)
    : {};

  return pools.map(pos => {
    const r   = revertAll[String(pos.tokenId)] ?? pos.revert ?? null;
    const sym0 = (pos.token0Symbol || "").toUpperCase().replace("WETH", "ETH");
    const sym1 = (pos.token1Symbol || "").toUpperCase();
    const isStable1 = sym1.includes("USD") || ["USDC","USDT","DAI"].includes(sym1);

    const livePrice = r
      ? parseFloat(r.pool_price ?? pos.currentPrice ?? 0)
      : (priceMap[sym0] ?? pos.currentPrice ?? 0);

    const inRange = r ? r.in_range : (livePrice >= pos.priceLower && livePrice <= pos.priceUpper);
    let status;
    if (inRange)                          status = { label: "En Rango",       color: "#00ff88", bg: "#001a0e", border: "#003a22" };
    else if (livePrice < pos.priceLower)  status = { label: "Fuera (Abajo)", color: "#ff4f6e", bg: "#1a0810", border: "#5a1a28" };
    else                                  status = { label: "Fuera (Arriba)",color: "#ffb347", bg: "#1a0e00", border: "#5a3a00" };

    const amount0  = r ? parseFloat(r.current_amount0 ?? pos.amount0 ?? "0") : parseFloat(pos.amount0 ?? "0");
    const amount1  = r ? parseFloat(r.current_amount1 ?? pos.amount1 ?? "0") : parseFloat(pos.amount1 ?? "0");
    const valueUsd = r
      ? parseFloat(r.underlying_value ?? "0")
      : (amount0 * (priceMap[sym0] ?? livePrice ?? 0) + amount1 * (isStable1 ? 1 : (priceMap[sym1] ?? 0)));

    return {
      ...pos,
      currentPrice: livePrice,
      status,
      valueUsd,
      amount0: String(amount0),
      amount1: String(amount1),
      revert: r,
      og_owner: pos.og_owner ?? pos.walletAddress,
    };
  });
}


function CoberturaTab() {
  const { user } = useAuth()
  const { pools, setPools, loading: poolsLoading, addPool, removePool } = usePoolsSync(user?.id)
  const { actividad: activity, registrar: registrarActividad } = useActividadPools(user?.id)

  const [scanOpen, setScanOpen]       = useState(false);
  const [lastRefresh, setLastRefresh] = useState(null);
  const [revertLoading, setRevertLoading] = useState(false);
  const poolsRef          = useRef([]);
  const initialDoneRef    = useRef(false);

  useEffect(() => {
    poolsRef.current = pools;
  }, [pools]);

  // ── Master refresh: Revert Finance data every 30s ────────────────
  const refreshAll = async () => {
    if (poolsRef.current.length === 0) return;
    setRevertLoading(true);
    const enriched = await enrichPoolsWithMarketData(poolsRef.current);
    setPools(enriched);
    localStorage.setItem("liquidity_engine_pools", JSON.stringify(enriched));
    setLastRefresh(new Date());
    setRevertLoading(false);
  };

  // Dispara el primer refresh tan pronto como Supabase entregue los pools
  useEffect(() => {
    if (pools.length > 0 && !initialDoneRef.current && !poolsLoading) {
      initialDoneRef.current = true;
      refreshAll();
    }
  }, [pools.length, poolsLoading]); // eslint-disable-line

  // Refresh periódico cada 30s
  useEffect(() => {
    const interval = setInterval(refreshAll, 30000);
    return () => clearInterval(interval);
  }, []); // eslint-disable-line

  // ── Import handler ─────────────────────────────────────────────────
  const handleImport = async (imported) => {
    const now = Date.now();
    const enriched = imported.map(pos => {
      const sym1      = (pos.token1Symbol || "").toUpperCase();
      const isStable1 = sym1.includes("USD") || ["USDC","USDT","DAI"].includes(sym1);
      const amt0      = parseFloat(pos.amount0 || "0");
      const amt1      = parseFloat(pos.amount1 || "0");
      const valueUsd  = isStable1
        ? amt0 * (pos.currentPrice ?? 0) + amt1
        : 0;

      return {
        ...pos,
        valueUsd,
        valueAtCreation:    valueUsd > 0 ? valueUsd : 0,
        priceAtCreation:    pos.currentPrice ?? 0,
        createdAtTimestamp: pos.createdAtTimestamp ?? now,
        importedAt:         now,
        walletAddress:      pos.walletAddress ?? "",
        og_owner:           pos.walletAddress ?? "",
        revert:             null,
      };
    });

    // Save each new pool to Supabase
    const existing = new Set(pools.map(p => p.tokenId));
    const toAdd    = enriched.filter(p => !existing.has(p.tokenId));

    for (const pool of toAdd) {
      try {
        await addPool(pool);
      } catch (e) {
        if (!e.message?.includes('ya está importado')) {
          console.warn('Error saving pool:', e.message);
        }
      }
    }

    // Registra cada pool importada en Supabase + localStorage
    for (const p of toAdd) {
      await registrarActividad({
        poolId: p.tokenId,
        pair:   `${p.token0Symbol}/${p.token1Symbol}`,
        chain:  p.chainName,
        action: 'imported',
      });
    }
  };

  const handleRemove = async (tokenId) => {
    await removePool(tokenId);
    await registrarActividad({
      poolId: tokenId,
      pair:   "Pool eliminada",
      chain:  "",
      action: 'removed',
    });
  };

  // ── Derived stats — prefer Revert data ───────────────────────────
  const inRange    = pools.filter(p => (p.revert ? p.revert.in_range : p.status?.label === "En Rango")).length;
  const totalValue = pools.reduce((acc, p) => {
    const v = p.revert ? parseFloat(p.revert.underlying_value ?? "0") : (p.valueUsd || 0);
    return acc + v;
  }, 0);
  const totalPnl = pools.reduce((acc, p) => {
    if (p.revert) return acc + parseFloat(p.revert.performance?.usd?.pnl ?? "0");
    const v = p.valueUsd || 0;
    const inv = p.valueAtCreation || 0;
    return acc + (inv > 0 ? v - inv : 0);
  }, 0);

  const fmtUsdStat = (v) => `${v >= 0 ? "+" : "-"}$${Math.abs(v).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  return (
    <>
      <ScanModal open={scanOpen} onClose={() => setScanOpen(false)} onImport={handleImport} />

      <div className="stats-grid">
        {[
          { label: "Pools LP",         value: pools.length.toString() },
          { label: "Valor LP",         value: `$${totalValue.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` },
          { label: "Pos. Abiertas",    value: inRange.toString() },
          { label: "PNL No Realizado", value: fmtUsdStat(totalPnl), danger: totalPnl < 0, success: totalPnl >= 0 },
        ].map(s => (
          <div key={s.label} className="stat-card">
            <div className="stat-label">{s.label}</div>
            <div className={`stat-value ${s.danger ? "danger" : s.success ? "success" : ""}`}>{s.value}</div>
          </div>
        ))}
      </div>


      <div className="section-header">
        <div className="section-title">Pools LP Monitoreados</div>
        {pools.length > 0 && <span className="count-badge">{pools.length}</span>}
        <div className="section-actions">
          {lastRefresh && (
            <span style={{ fontSize: 11, color: "#2a5a72", alignSelf: "center" }}>
              ↻ {lastRefresh.toLocaleTimeString("es-CO", { hour:"2-digit", minute:"2-digit", second:"2-digit" })}
            </span>
          )}
          <button className="action-btn" onClick={refreshAll}>
            {revertLoading ? "⟳ Actualizando..." : "↻ Actualizar"}
          </button>
          <button className="action-btn highlighted" onClick={() => setScanOpen(true)}>🔍 Escanear Wallet</button>
          <button className="action-btn"># Token ID</button>
        </div>
      </div>

      {pools.length === 0 ? (
        <div className="empty-state">
          <div className="empty-title">No tienes pools LP monitoreados.</div>
          <div className="empty-sub">Escanea tu wallet LP para detectar posiciones de Uniswap V3 automáticamente.</div>
        </div>
      ) : (
        pools.map(pos => (
          <PoolCard
            key={pos.tokenId}
            pos={pos}
            onRemove={handleRemove}
            mode="Cobertura"
          />
        ))
      )}

      <div className="section-header" style={{ marginTop: "24px" }}>
        <div className="section-title">Historial de Actividad</div>
        {activity.length > 0 && <span className="count-badge">{activity.length}</span>}
      </div>

      {activity.length === 0 ? (
        <div className="empty-state">
          <div className="empty-title">Sin actividad reciente.</div>
          <div className="empty-sub">Las pools importadas aparecerán aquí.</div>
        </div>
      ) : (
        activity.map((item, i) => (
          <div key={i} className="activity-card">
            <div className="activity-icon">◈</div>
            <div>
              <div className="activity-title">Pool importada</div>
              <div className="activity-sub">{item.pair} · {item.chain}</div>
            </div>
            <div className="activity-time">{item.time}</div>
          </div>
        ))
      )}
    </>
  );
}

// ════════════════════════════════════════════════════════════════════
// COMING SOON
// ════════════════════════════════════════════════════════════════════
// ════════════════════════════════════════════════════════════════════
// HYPERLIQUID API TEST MODAL
// Prueba órdenes reales ANTES de conectar a pools
// ════════════════════════════════════════════════════════════════════
function HLTestModal({ onClose }) {
  const hlWallets = (() => {
    try { return JSON.parse(localStorage.getItem("hl_wallets") || "[]"); } catch { return []; }
  })();

  const [selectedWallet, setSelectedWallet] = useState(hlWallets[0]?.id || "");
  const [coin, setCoin]         = useState("ETH");
  const [side, setSide]         = useState("B");      // B=Buy/Long, A=Sell/Short
  const [orderType, setOrderType] = useState("market");
  const [size, setSize]         = useState("0.001");  // ETH amount
  const [price, setPrice]       = useState("");       // only for limit
  const [leverage, setLeverage] = useState(2);
  const [logs, setLogs]         = useState([]);
  const [loading, setLoading]   = useState(false);
  const [mids, setMids]         = useState({});

  const log = (msg, type = "info") => {
    const colors = { info:"#7ab8d4", success:"#00ff88", error:"#ff4f6e", warn:"#ffb347", data:"#c8a0ff" };
    setLogs(prev => [...prev, { msg, color: colors[type] || "#7ab8d4", ts: new Date().toLocaleTimeString("es-CO") }]);
  };

  // Load live prices on open
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

  // ── 1. Check account state ──────────────────────────────────────
  const testAccount = async () => {
    const w = hlWallets.find(w => w.id === selectedWallet);
    if (!w) { log("✗ Selecciona una wallet", "error"); return; }

    // Use main account address for balance (not agent address)
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

  // ── 2. Check open orders ────────────────────────────────────────
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

  // ── 3. Place order ──────────────────────────────────────────────
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

    // Verify derived agent address matches what HL has authorized
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

  // ── 4. Cancel all orders ────────────────────────────────────────
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

        {/* Header */}
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

          {/* LEFT — Controls */}
          <div style={{ width:300,flexShrink:0,padding:"18px 20px",borderRight:"1px solid #0e2435",display:"flex",flexDirection:"column",gap:14,overflowY:"auto" }}>

            {/* Wallet */}
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

            {/* Coin */}
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

            {/* Side */}
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

            {/* Order type */}
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

            {/* Size */}
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

            {/* Price (limit only) */}
            {orderType === "limit" && (
              <div>
                <div style={{ fontSize:10,color:"#4a7a96",letterSpacing:1,textTransform:"uppercase",marginBottom:6 }}>Precio Límite</div>
                <input value={price} onChange={e => setPrice(e.target.value)} type="number"
                  style={{ width:"100%",background:"#0a1520",border:"1px solid #1a3a5e",color:"#c8e6f0",padding:"9px 12px",fontFamily:"Outfit,sans-serif",fontSize:14,outline:"none" }}
                  placeholder={currentPrice.toFixed(2)} />
              </div>
            )}

            {/* Leverage */}
            <div>
              <div style={{ display:"flex",justifyContent:"space-between",marginBottom:6 }}>
                <div style={{ fontSize:10,color:"#4a7a96",letterSpacing:1,textTransform:"uppercase" }}>Leverage</div>
                <span style={{ fontSize:12,color:"#00e5ff",fontWeight:700 }}>{leverage}x</span>
              </div>
              <input type="range" min={1} max={50} value={leverage} onChange={e => setLeverage(Number(e.target.value))}
                style={{ width:"100%",accentColor:"#00e5ff" }} />
              <div style={{ display:"flex",justifyContent:"space-between",fontSize:10,color:"#2a5a72" }}><span>1x</span><span>50x</span></div>
            </div>

            {/* Divider */}
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

          {/* RIGHT — Log console */}
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

        {/* Warning footer */}
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


function TradingTab() {
  const { user } = useAuth()
  const { pools, setPools, removePool } = usePoolsSync(user?.id)
  const { registrar: registrarActividad } = useActividadPools(user?.id)
  const poolsRef = useRef([])

  useEffect(() => {
    poolsRef.current = pools
  }, [pools])

  const refreshTradingPools = async () => {
    if (poolsRef.current.length === 0) return
    const enriched = await enrichPoolsWithMarketData(poolsRef.current)
    setPools(enriched)
    localStorage.setItem("liquidity_engine_pools", JSON.stringify(enriched))
  }

  useEffect(() => {
    refreshTradingPools()
    const interval = setInterval(refreshTradingPools, 10000)
    return () => clearInterval(interval)
  }, []) // eslint-disable-line

  useEffect(() => {
    if (pools.length > 0) refreshTradingPools()
  }, [pools.length]) // eslint-disable-line

  const handleRemove = async (tokenId) => {
    await removePool(tokenId)
    await registrarActividad({
      poolId: tokenId,
      pair:   "Pool eliminada",
      chain:  "",
      action: "removed",
    })
  }

  // Counts
  const activeBots = (() => {
    try {
      return JSON.parse(localStorage.getItem("hl_trading") || "[]")
        .filter(t => t.status === "active").length;
    } catch { return 0; }
  })();

  return (
    <>
      <div className="stats-grid">
        {[
          { label: "Pools Monitoreados", value: pools.length.toString() },
          { label: "Bots Activos",        value: activeBots.toString(), success: activeBots > 0 },
          { label: "Estrategia",          value: "Breakout" },
          { label: "Exchange",            value: "Hyperliquid" },
        ].map(s => (
          <div key={s.label} className="stat-card">
            <div className="stat-label">{s.label}</div>
            <div className={`stat-value ${s.success ? "success" : ""}`}>{s.value}</div>
          </div>
        ))}
      </div>

      <div className="section-header">
        <div className="section-title">Trading de Rango</div>
        {pools.length > 0 && <span className="count-badge">{pools.length}</span>}
        <div className="section-actions" style={{ fontSize:12,color:"#4a7a96" }}>
          Los pools se sincronizan desde Cobertura
        </div>
      </div>

      {pools.length === 0 ? (
        <div className="empty-state">
          <div className="empty-title">No tienes pools configurados.</div>
          <div className="empty-sub">Ve a la pestaña Cobertura → Escanea tu wallet → Los pools aparecerán aquí.</div>
        </div>
      ) : (
        pools.map(pos => (
          <PoolCard
            key={pos.tokenId}
            pos={pos}
            onRemove={handleRemove}
            mode="trading"
          />
        ))
      )}
    </>
  );
}

function TradingViewOperableTab() {
  const openTV = () => {
    window.open("https://www.tradingview.com/chart/", "_blank", "width=1400,height=900,menubar=no,toolbar=no,location=no,status=no");
  };

  return (
    <div style={{ position:"relative", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", height:"100%", overflow:"hidden", textAlign:"center" }}>

      {/* ── Fondo futurista ── */}
      <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse 80% 60% at 50% 40%, rgba(0,229,255,0.06) 0%, rgba(123,97,255,0.04) 40%, transparent 70%)", pointerEvents:"none" }} />
      <div style={{ position:"absolute", inset:0, backgroundImage:"linear-gradient(rgba(0,229,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.04) 1px, transparent 1px)", backgroundSize:"48px 48px", pointerEvents:"none" }} />
      <div style={{ position:"absolute", top:"15%", left:"10%", width:320, height:320, borderRadius:"50%", background:"radial-gradient(circle, rgba(123,97,255,0.08) 0%, transparent 70%)", filter:"blur(40px)", pointerEvents:"none" }} />
      <div style={{ position:"absolute", bottom:"10%", right:"8%", width:260, height:260, borderRadius:"50%", background:"radial-gradient(circle, rgba(0,229,255,0.07) 0%, transparent 70%)", filter:"blur(40px)", pointerEvents:"none" }} />

      {/* ── Astronauta flotante ── */}
      <style>{`@keyframes tvFloat{0%,100%{transform:translateY(0) rotate(-6deg)}50%{transform:translateY(-18px) rotate(-3deg)}} @keyframes tvRotate{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
      <div style={{ position:"absolute", right:"6%", top:"50%", transform:"translateY(-50%)", opacity:0.18, pointerEvents:"none", animation:"tvFloat 6s ease-in-out infinite" }}>
        <svg width="220" height="280" viewBox="0 0 220 280" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Glow behind */}
          <ellipse cx="110" cy="200" rx="60" ry="20" fill="#00e5ff" opacity="0.15" filter="url(#glow)"/>
          <defs>
            <filter id="glow"><feGaussianBlur stdDeviation="8" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
            <linearGradient id="suit" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#7b61ff"/><stop offset="1" stopColor="#00e5ff"/></linearGradient>
            <linearGradient id="visor" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#00e5ff" stopOpacity="0.9"/><stop offset="1" stopColor="#7b61ff" stopOpacity="0.7"/></linearGradient>
          </defs>
          {/* Body */}
          <rect x="60" y="120" width="100" height="110" rx="30" fill="url(#suit)" opacity="0.9"/>
          {/* Head/Helmet */}
          <circle cx="110" cy="90" r="52" fill="url(#suit)" opacity="0.85"/>
          {/* Visor */}
          <ellipse cx="110" cy="88" rx="34" ry="30" fill="url(#visor)" opacity="0.9"/>
          <ellipse cx="100" cy="80" rx="10" ry="7" fill="white" opacity="0.25"/>
          {/* Left arm */}
          <rect x="22" y="130" width="40" height="22" rx="11" fill="url(#suit)" opacity="0.85" transform="rotate(-20 42 141)"/>
          <circle cx="18" cy="148" r="12" fill="url(#suit)" opacity="0.8"/>
          {/* Right arm */}
          <rect x="158" y="130" width="40" height="22" rx="11" fill="url(#suit)" opacity="0.85" transform="rotate(20 178 141)"/>
          <circle cx="202" cy="148" r="12" fill="url(#suit)" opacity="0.8"/>
          {/* Left leg */}
          <rect x="72" y="220" width="32" height="50" rx="14" fill="url(#suit)" opacity="0.85"/>
          <ellipse cx="88" cy="272" rx="18" ry="10" fill="url(#suit)" opacity="0.8"/>
          {/* Right leg */}
          <rect x="116" y="220" width="32" height="50" rx="14" fill="url(#suit)" opacity="0.85"/>
          <ellipse cx="132" cy="272" rx="18" ry="10" fill="url(#suit)" opacity="0.8"/>
          {/* Chest detail */}
          <rect x="85" y="145" width="50" height="32" rx="8" fill="#050a0f" opacity="0.4"/>
          <circle cx="100" cy="161" r="5" fill="#00ff88" opacity="0.8"/>
          <circle cx="115" cy="161" r="5" fill="#ffb347" opacity="0.8"/>
          <circle cx="130" cy="161" r="5" fill="#00e5ff" opacity="0.8"/>
          {/* Helmet ring */}
          <circle cx="110" cy="90" r="52" fill="none" stroke="#00e5ff" strokeWidth="2" opacity="0.4"/>
          {/* Antenna */}
          <line x1="110" y1="38" x2="110" y2="22" stroke="#00e5ff" strokeWidth="2.5" opacity="0.7" strokeLinecap="round"/>
          <circle cx="110" cy="18" r="5" fill="#00e5ff" opacity="0.9"/>
          {/* Stars around */}
          {[[30,40],[180,30],[200,180],[25,200],[150,260]].map(([x,y],i)=>(
            <circle key={i} cx={x} cy={y} r={2} fill="#00e5ff" opacity={0.5}/>
          ))}
        </svg>
      </div>

      {/* ── Contenido ── */}
      <div style={{ position:"relative", zIndex:1, display:"flex", flexDirection:"column", alignItems:"center", padding:"40px 24px", maxWidth:640, width:"100%" }}>

        {/* Badge */}
        <div style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"5px 16px", border:"1px solid rgba(0,229,255,0.25)", background:"rgba(0,229,255,0.05)", borderRadius:999, fontSize:10, fontWeight:700, color:"#00e5ff", letterSpacing:2, textTransform:"uppercase", marginBottom:28 }}>
          <div style={{ width:6, height:6, borderRadius:"50%", background:"#00e5ff", boxShadow:"0 0 8px #00e5ff", animation:"tvPulse 2s infinite" }} />
          TradingView Operable
        </div>
        <style>{`@keyframes tvPulse{0%,100%{opacity:1;box-shadow:0 0 8px #00e5ff}50%{opacity:0.4;box-shadow:0 0 2px #00e5ff}} @keyframes tvGlare{0%{left:-60%;opacity:0}15%{opacity:1}45%{left:130%;opacity:0}100%{left:130%;opacity:0}}`}</style>

        <h2 style={{ fontSize:"clamp(26px,3vw,40px)", fontWeight:900, color:"#fff", marginBottom:16, lineHeight:1.1, letterSpacing:-0.5 }}>
          Opera desde tu cuenta<br /><span style={{ color:"#00e5ff" }}>de TradingView</span>
        </h2>
        <p style={{ fontSize:15, color:"#4a7a96", lineHeight:1.8, marginBottom:8 }}>
          Abre TradingView con un clic e inicia sesión con tu cuenta para analizar el mercado
          y ejecutar operaciones en tiempo real, con todas tus herramientas y configuraciones guardadas.
        </p>
        <p style={{ fontSize:12, color:"#2a5a72", marginBottom:40 }}>Tu sesión se mantiene activa entre aperturas.</p>

        {/* CTA */}
        <button onClick={openTV} style={{
          position:"relative", overflow:"hidden",
          padding:"16px 52px", borderRadius:10,
          background:"linear-gradient(135deg, #0c1e2e 0%, #071830 50%, #0a0f20 100%)",
          border:"1px solid rgba(0,229,255,0.35)",
          color:"#00e5ff", fontFamily:"Outfit,sans-serif", fontSize:16, fontWeight:800,
          cursor:"pointer", letterSpacing:0.5,
          boxShadow:"0 0 40px rgba(0,229,255,0.15), 0 0 0 1px rgba(0,229,255,0.06), 0 8px 32px rgba(0,0,0,0.6)",
          transition:"all 0.25s",
        }}
          onMouseEnter={e => { e.currentTarget.style.boxShadow="0 0 60px rgba(0,229,255,0.3), 0 0 0 1px rgba(0,229,255,0.1), 0 12px 40px rgba(0,0,0,0.7)"; e.currentTarget.style.borderColor="rgba(0,229,255,0.6)"; e.currentTarget.style.color="#fff"; }}
          onMouseLeave={e => { e.currentTarget.style.boxShadow="0 0 40px rgba(0,229,255,0.15), 0 0 0 1px rgba(0,229,255,0.06), 0 8px 32px rgba(0,0,0,0.6)"; e.currentTarget.style.borderColor="rgba(0,229,255,0.35)"; e.currentTarget.style.color="#00e5ff"; }}
        >
          <span style={{ position:"absolute", top:0, left:"-60%", width:"35%", height:"100%", background:"linear-gradient(120deg,transparent,rgba(255,255,255,0.12),transparent)", transform:"skewX(-20deg)", animation:"tvGlare 4s ease-in-out infinite" }} />
          Abrir TradingView →
        </button>

        {/* Info cards */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:12, marginTop:48, width:"100%" }}>
          {[
            { icon:"🔐", title:"Login seguro",      desc:"Inicia sesión con tu cuenta TradingView directamente",        color:"#7b61ff" },
            { icon:"📊", title:"Gráficos completos",   desc:"Todos tus indicadores, alertas y configuraciones guardadas",   color:"#00e5ff" },
            { icon:"⚡", title:"Operaciones reales", desc:"Ejecuta operaciones con tu broker/exchange conectado a TradingView",        color:"#00ff88" },
          ].map((c,i) => (
            <div key={i} style={{ background:"rgba(7,13,20,0.8)", border:`1px solid ${c.color}1a`, borderRadius:10, padding:"20px 16px", backdropFilter:"blur(4px)", position:"relative", overflow:"hidden" }}>
              <div style={{ position:"absolute", top:0, left:0, right:0, height:2, background:`linear-gradient(90deg, transparent, ${c.color}66, transparent)` }} />
              <div style={{ fontSize:26, marginBottom:10 }}>{c.icon}</div>
              <div style={{ fontSize:13, fontWeight:700, color:c.color, marginBottom:6 }}>{c.title}</div>
              <div style={{ fontSize:11, color:"#4a7a96", lineHeight:1.6 }}>{c.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TradingViewTab() {
  const [symbol, setSymbol] = useState("BINANCE:ETHUSD");
  const [interval, setInterval] = useState("60");
  const [theme] = useState("dark");
  const containerId = "tv_chart_container";

  const SYMBOLS = [
    { label: "ETH/USD",  value: "BINANCE:ETHUSD" },
    { label: "BTC/USD",  value: "BINANCE:BTCUSD" },
    { label: "ARB/USD",  value: "BINANCE:ARBUSDT" },
    { label: "UNI/USD",  value: "BINANCE:UNIUSDT" },
    { label: "LINK/USD", value: "BINANCE:LINKUSDT" },
    { label: "SOL/USD",  value: "BINANCE:SOLUSDT" },
    { label: "BNB/USD",  value: "BINANCE:BNBUSDT" },
  ];

  const INTERVALS = [
    { label: "1m",  value: "1" },
    { label: "5m",  value: "5" },
    { label: "15m", value: "15" },
    { label: "1h",  value: "60" },
    { label: "4h",  value: "240" },
    { label: "1D",  value: "D" },
    { label: "1W",  value: "W" },
  ];

  useEffect(() => {
    const existing = document.getElementById(containerId);
    if (existing) existing.innerHTML = "";

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/tv.js";
    script.async = true;
    script.onload = () => {
      if (window.TradingView) {
        new window.TradingView.widget({
          container_id: containerId,
          symbol,
          interval,
          timezone: "America/Bogota",
          theme,
          style: "1",
          locale: "es",
          toolbar_bg: "#0a1520",
          enable_publishing: false,
          hide_top_toolbar: false,
          hide_legend: false,
          save_image: true,
          studies: ["RSI@tv-basicstudies", "MACD@tv-basicstudies"],
          width: "100%",
          height: "100%",
          autosize: true,
          backgroundColor: "#050a0f",
          gridColor: "rgba(14,36,53,0.6)",
        });
      }
    };

    const container = document.getElementById(containerId);
    if (container) container.appendChild(script);

    return () => {
      if (container) container.innerHTML = "";
    };
  }, [symbol, interval]);

  const btnStyle = (active) => ({
    padding: "5px 12px", fontSize: 12, fontWeight: 600, fontFamily: "Outfit, sans-serif",
    cursor: "pointer", border: "1px solid", borderRadius: 6,
    background: active ? "rgba(0,229,255,0.12)" : "transparent",
    borderColor: active ? "#00e5ff" : "#1a3a5e",
    color: active ? "#00e5ff" : "#4a7a96",
    transition: "all 0.15s",
  });

  return (
    <div style={{ display:"flex", flexDirection:"column", height:"100%", gap:0 }}>
      {/* Toolbar */}
      <div style={{ display:"flex", alignItems:"center", gap:8, padding:"10px 0 12px", flexWrap:"wrap" }}>
        <div style={{ display:"flex", gap:4, flexWrap:"wrap" }}>
          {SYMBOLS.map(s => (
            <button key={s.value} style={btnStyle(symbol === s.value)} onClick={() => setSymbol(s.value)}>
              {s.label}
            </button>
          ))}
        </div>
        <div style={{ width:1, height:20, background:"#1a3a5e", margin:"0 4px", flexShrink:0 }} />
        <div style={{ display:"flex", gap:4 }}>
          {INTERVALS.map(iv => (
            <button key={iv.value} style={btnStyle(interval === iv.value)} onClick={() => setInterval(iv.value)}>
              {iv.label}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div
        id={containerId}
        style={{
          flex: 1, minHeight: 0, borderRadius: 8,
          border: "1px solid #0e2435", overflow: "hidden",
          background: "#050a0f",
        }}
      />
    </div>
  );
}

function ComingSoonTab({ name }) {
  return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", height:"60%", gap:12, color:"#2a5a72" }}>
      <div style={{ fontSize:36 }}>⚡</div>
      <div style={{ fontSize:18, color:"#4a7a96", fontWeight:600 }}>{name}</div>
      <div style={{ fontSize:14 }}>Esta sección estará disponible próximamente.</div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════
// PROGRAMA CRYPTO EDUCATION

const CRYPTO_BOOTCAMP = [
  { id:"crypto-01", titulo:"Introducción", lessons:4, sourcePath:"/crypto/learn/introduction" },
  { id:"crypto-02", titulo:"Bitcoin desde cero", lessons:5, sourcePath:"/crypto/learn/bitcoin-for-beginners" },
  { id:"crypto-03", titulo:"Cómo funciona la red Bitcoin", lessons:4, sourcePath:"/crypto/learn/bitcoin-network-for-beginners" },
  { id:"crypto-04", titulo:"Hashing y seguridad criptográfica", lessons:4, sourcePath:"/crypto/learn/hashing-for-beginners" },
  { id:"crypto-05", titulo:"Minería de Bitcoin y consenso", lessons:4, sourcePath:"/crypto/learn/bitcoin-mining-for-beginners" },
  { id:"crypto-06", titulo:"Fundamentos de blockchain", lessons:2, sourcePath:"/crypto/learn/blockchain-for-beginners" },
  { id:"crypto-07", titulo:"Wallets, llaves y autocustodia", lessons:8, sourcePath:"/crypto/learn/bitcoin-wallets-for-beginners" },
  { id:"crypto-08", titulo:"Firmas digitales y prueba de propiedad", lessons:7, sourcePath:"/crypto/learn/digital-signatures-for-beginners" },
  { id:"crypto-09", titulo:"Altcoins, narrativas y ciclos de mercado", lessons:4, sourcePath:"/crypto/learn/altcoins-for-beginners" },
  { id:"crypto-10", titulo:"Exchanges cripto y ejecución segura", lessons:12, sourcePath:"/crypto/learn/crypto-exchanges-for-beginners" },
  { id:"crypto-11", titulo:"Estafas cripto: señales de alerta y defensa", lessons:4, sourcePath:"/crypto/learn/crypto-scams-for-beginners" },
  { id:"crypto-12", titulo:"Ethereum, smart contracts y gas", lessons:7, sourcePath:"/crypto/learn/ethereum-for-beginners" },
  { id:"crypto-13", titulo:"Trading cripto: mercado, riesgo y estrategia", lessons:8, sourcePath:"/crypto/learn/crypto-trading-for-beginners" },
  { id:"crypto-14", titulo:"NFTs, utilidad y economía digital", lessons:9, sourcePath:"/crypto/learn/nfts-for-beginners" },
  { id:"crypto-15", titulo:"ETFs cripto y acceso institucional", lessons:5, sourcePath:"/crypto/learn/crypto-etfs-for-beginners" },
  { id:"crypto-16", titulo:"Análisis on-chain para tomar decisiones", lessons:12, sourcePath:"/crypto/learn/on-chain-analysis-for-beginners" },
].map((mod) => {
  const clasesModulo1 = [
    {
      id:"crypto-01-1",
      titulo:"¿Qué es una criptomoneda?",
      resumen:"Una criptomoneda es un nuevo tipo de dinero digital que funciona sin bancos ni gobiernos, usando criptografía y software descentralizado. En esta lección entiendes qué las hace únicas y por qué están cambiando el sistema financiero.",
      estado:"Contenido completo",
      sourceUrl:"https://www.babypips.com/crypto/learn/what-is-cryptocurrency",
      contenido:[
        {
          titulo:"¿Qué es una criptomoneda?",
          texto:"Una criptomoneda (o \"cripto\") es un término general para un nuevo tipo de \"dinero digital\" que depende de una combinación de tecnologías que le permiten existir fuera del control de autoridades centrales como gobiernos y bancos.\n\nLas criptomonedas se han vuelto extremadamente populares en los últimos años. Probablemente has visto comerciales de televisión sobre criptomonedas como \"la próxima gran cosa\", y quizás incluso a tu actor o atleta favorito promoviéndolas. Pero ¿qué son realmente? ¿En qué se diferencian de las monedas tradicionales?",
        },
        {
          titulo:"Las criptomonedas son digitales",
          texto:"Las criptomonedas no tienen forma física. No hay billetes de papel ni monedas metálicas. Son completamente digitales, lo que significa que literalmente son solo líneas de código de computadora. Todo se hace desde teléfonos y computadoras.",
          imagen:{ src:"/bootcamp/mod1-lec1/bitcoin-digital-currency.png", alt:"Bitcoin como moneda digital" },
        },
        {
          titulo:"Las criptomonedas son sin fronteras",
          texto:"Sin importar dónde vivas o quién seas, puedes enviarlas casi instantáneamente a otras personas en cualquier parte del mundo, sin preocuparte por distancias geográficas ni fronteras nacionales. Todo lo que necesitas es un dispositivo, como un teléfono o computadora, conectado a internet.",
        },
        {
          titulo:"Las criptomonedas no requieren permiso",
          texto:"Cualquier persona puede enviar y recibir criptomonedas. No necesitas registrar una cuenta ni llenar una solicitud. Ni siquiera necesitas dar tu nombre.\n\nEn lugar de nombres y números de cuenta, todo lo que necesitas proporcionar es una cadena de letras y números generada por computadora conocida como una \"dirección\". Esta dirección no está inherentemente vinculada a ninguna de tu información personal, por lo que teóricamente puedes enviar criptomonedas a otras personas sin que nunca conozcan tu identidad real.",
        },
        {
          titulo:"Las criptomonedas están descentralizadas",
          texto:"A diferencia de las monedas tradicionales (conocidas como monedas \"fiat\"), como el dólar estadounidense, las criptomonedas no están conectadas a ningún gobierno ni banco central.\n\nEl dólar estadounidense es emitido y controlado por la Reserva Federal (\"Fed\"), el euro por el Banco Central Europeo (BCE), y el yen japonés por el Banco de Japón (BOJ). Las criptomonedas no tienen este tipo de control central. Esta característica definitoria se conoce como descentralización.\n\nSi ningún banco central o gobierno emite criptomonedas, ¿entonces quién las crea? Las unidades se generan según reglas predeterminadas escritas en código, ejecutadas por software. Obviamente software que un humano creó.",
          imagen:{ src:"/bootcamp/mod1-lec1/bitcoin-decentralized-currency.png", alt:"Bitcoin como moneda descentralizada" },
        },
        {
          titulo:"Suministro: finito vs infinito",
          texto:"Dependiendo de las reglas escritas en el código del software, las criptomonedas pueden crearse y destruirse. Algunas criptomonedas tienen un suministro total finito o fijo, lo que significa que existe un número máximo de unidades que jamás estarán en circulación, creando escasez.\n\nOtras se lanzan con un suministro total infinito, lo que significa que no hay un límite máximo. Aunque puede haber un límite en el número de nuevas unidades que pueden crearse dentro de un cierto período de tiempo.",
          imagen:{ src:"/bootcamp/mod1-lec1/crypto-software.png", alt:"Las criptomonedas son creadas por software" },
        },
        {
          titulo:"Las criptomonedas son difíciles de falsificar",
          texto:"Las criptomonedas también están diseñadas para ser imposibles de falsificar. Aquí es donde entra la criptografía y cómo se utiliza para registrar y almacenar transacciones de forma segura.\n\nEn criptografía, el prefijo \"cripto\" significa \"oculto\" y el sufijo \"grafía\" significa \"escritura\". Incluso Julio César usaba criptografía para comunicarse con sus generales. En la era moderna, la criptografía está asociada con la protección de información informática mediante matemáticas avanzadas. De ahí viene el \"cripto\" en \"criptomonedas\".",
          imagen:{ src:"/bootcamp/mod1-lec1/cryptography-hidden-writing.png", alt:"Criptografía: escritura oculta" },
        },
        {
          titulo:"¿Qué hace especiales a las criptomonedas?",
          puntos:[
            "Son digitales. No tienen forma física; todo se hace desde teléfonos y computadoras.",
            "Son sin fronteras. Cualquier persona con conexión a internet puede enviar y recibirlas a cualquier parte del mundo, generalmente con comisiones menores y más rápido que las transferencias de dinero tradicionales.",
            "No requieren permiso y están disponibles para todos. No necesitas aprobación bancaria ni cuenta bancaria para usar criptomonedas.",
            "Proporcionan cierto grado de privacidad: puedes hacer transacciones sin usar tu nombre.",
            "Son descentralizadas: los gobiernos no pueden interferir ni controlarlas. Ninguna persona o entidad las posee o controla.",
            "Son creadas por software. El suministro de una criptomoneda NO está determinado por ningún banco central, sino por reglas predefinidas escritas en código de software.",
            "Son difíciles de falsificar, gracias a la forma en que la información de transacciones se registra y almacena.",
          ],
        },
        {
          titulo:"Conclusión",
          texto:"Debido a estas características especiales, las criptomonedas ofrecen el potencial de dar a las personas control total sobre su dinero sin ninguna intervención de terceros.\n\nSi la cripto puede cumplir este potencial aún está por verse. Su popularidad en el mundo financiero está creciendo y ahora se considera una clase de activo emergente.",
        },
      ],
      imagenes:[],
    },
    {
      id:"crypto-01-2",
      titulo:"Cripto como nueva clase de activo",
      resumen:"Las criptomonedas no son solo dinero digital — son una nueva clase de activo financiero en la que se puede invertir y especular. Pero ese mismo mercado también está lleno de proyectos inútiles y estafas. Aprende a distinguir.",
      estado:"Contenido completo",
      sourceUrl:"https://www.babypips.com/crypto/learn/cryptocurrencies-new-asset-class",
      contenido:[
        {
          titulo:"Cripto como activo financiero",
          texto:"Además de funcionar como un nuevo tipo de \"dinero digital\" para pagar bienes y servicios, las criptomonedas se usan más frecuentemente como activos financieros que las personas intercambian o en los que invierten.\n\nLa industria financiera tradicional (\"TradFi\") sigue dividida sobre si las criptomonedas deben considerarse un \"activo financiero\". El argumento popular es que es imposible valorarlas porque no tienen ganancias ni dividendos, pero también existen activos financieros con problemas similares como el oro y otras materias primas.",
        },
        {
          titulo:"Una nueva clase de activo",
          texto:"Las clases de activos son categorías de inversiones que tienen características similares y se comportan de manera parecida: acciones, bonos, materias primas, bienes raíces y efectivo (monedas fiat).\n\nY ahora... ¡cripto! La cripto representa la primera clase de activo verdaderamente nueva en décadas.",
          imagen:{ src:"/bootcamp/mod1-lec2/asset-classes.png", alt:"Ejemplos de clases de activos" },
        },
        {
          titulo:"Mercado cripto vs. Forex",
          texto:"Similar al mercado forex (el mercado financiero para monedas fiat), ahora existe un mercado cripto donde tanto traders como inversores pueden ganar dinero.\n\nPero mientras el mercado forex está abierto 24 horas al día, 5.5 días a la semana, ¡el mercado cripto está abierto 24 horas al día, los 7 días de la semana. Nunca cierra!\n\nIncluso Jerome Powell, el jefe de la Reserva Federal, ha dicho: \"La gente usa Bitcoin como activo especulativo. Es como el oro, solo que virtual, digital.\"",
        },
        {
          titulo:"Traders e Inversores",
          texto:"Los traders apuestan (\"especulan\") sobre la dirección del precio a corto plazo, mientras que los inversores compran y mantienen con la esperanza de que ciertas criptomonedas ganen mayor adopción y aumenten de valor a largo plazo.\n\nAgregar cripto ayuda a los inversores a diversificar sus carteras. Y los inversores cripto más experimentados incluso generan ingresos pasivos de diferentes criptomonedas que mantienen.\n\nDado que las criptomonedas son activos financieros en los que puedes invertir o hacer trading, también se les llama \"activos digitales\", \"criptoactivos\" o \"crypto assets\".",
        },
        {
          titulo:"Ejemplos de criptomonedas",
          texto:"La primera criptomoneda fue Bitcoin, y sigue siendo la más grande y conocida. También hay otras criptomonedas bien conocidas como Ether, XRP, Cardano, Solana, Dogecoin, Polkadot, Litecoin y muchas otras.",
          imagen:{ src:"/bootcamp/mod1-lec2/other-cryptocurrencies.png", alt:"Criptomonedas populares" },
        },
        {
          titulo:"Miles de criptomonedas — ojo con las estafas",
          texto:"Hoy en día existen MILES de criptomonedas, cada una intentando ofrecer nuevas funcionalidades o servir a un propósito diferente.\n\nDesafortunadamente, muchas son inútiles o, peor aún, estafas directas. Pero mucha gente las sigue comprando de todas formas.\n\n⚠ Importante: El término \"criptomoneda\" es en realidad engañoso porque, a diferencia de Bitcoin, la mayoría de las criptomonedas no funcionan como monedas reales.",
        },
        {
          titulo:"El FOMO y las monedas basura",
          texto:"Los principiantes crédulos que entran al mundo cripto escuchan sobre \"Una moneda que no solo cambiará el mundo, ¡sino también la galaxia!\". Piensan: \"¡Debo comprar esta Galaticoin!\" — compran la moneda dudosa sin entender la tecnología subyacente. Y la criptomoneda termina siendo inútil.",
          imagen:{ src:"/bootcamp/mod1-lec2/galaticoin.png", alt:"Galaticoin — ejemplo de cripto dudosa" },
        },
        {
          titulo:"No seas el ciervo de una pata",
          texto:"Algunas personas entran al mercado cripto con la mentalidad equivocada: creen que es una apuesta segura y que el dinero que ponen crecerá automáticamente.\n\nCon esta mentalidad, no es sorprendente que un estafador vea el mercado cripto actual como un tigre ve a un grupo de ciervos con una pata: muchas deliciosas oportunidades.",
          imagen:{ src:"/bootcamp/mod1-lec2/one-legged-deer.png", alt:"No seas vulnerable — no seas el ciervo de una pata" },
        },
        {
          titulo:"La misión del curso",
          puntos:[
            "No dejes que te conviertan en un \"ciervo de una pata\".",
            "Estudia antes de invertir. No todo token tiene valor real.",
            "El mercado cripto es altamente volátil — más que las acciones.",
            "Entiende qué compras, cómo funciona y qué puede salir mal.",
            "La educación es tu mejor defensa contra estafas, FOMO y decisiones impulsivas.",
          ],
        },
      ],
      imagenes:[],
    },
    {
      id:"crypto-01-3",
      titulo:"Conoce a Cryptoshi",
      resumen:"Cryptoshi es la mascota de The Crypto House, tu guía en este viaje por el mundo cripto. En esta lección conoces su misión: ayudarte a entender el mercado antes de arriesgar un solo peso.",
      estado:"Contenido completo",
      sourceUrl:"https://www.babypips.com/crypto/learn/meet-toshi-moshi",
      contenido:[
        {
          titulo:"¡Hola! Soy Cryptoshi",
          texto:"¡Bienvenido a la Escuela de Cripto de The Crypto House! Soy Cryptoshi, tu guía amigable en este recorrido.\n\nSi eres nuevo en las criptomonedas, llegaste al lugar correcto. Creé este curso para que los principiantes entiendan el mercado cripto de forma clara y práctica: Bitcoin, altcoins, tokens y cómo funciona todo esto.",
          imagen:{ src:"/bootcamp/mod1-lec3/cryptoshi-welcome.png", alt:"Cryptoshi da la bienvenida" },
        },
        {
          titulo:"El boom del cripto y sus peligros",
          texto:"La conciencia sobre cripto ha ido ganando impulso masivamente. Cada día más personas se suben al tren, ya sea por pasión genuina por el potencial de la tecnología o simplemente por FOMO (miedo a quedarse fuera).\n\nPero junto con ese mayor interés, también han llegado consejos cuestionables y desinformación. Cada día aparecen más estafadores, shillers y personajes turbios que buscan aprovecharse de quienes no saben lo que están comprando.",
          imagen:{ src:"/bootcamp/mod1-lec3/shady-coin-homeless.png", alt:"Cuidado con las estafas cripto" },
        },
        {
          titulo:"El error más común: querer enriquecerse rápido",
          texto:"Muchos nuevos inversores cometen el error de querer entrar lo más rápido posible, esperando ganancias inmediatas. Es asombroso ver cuánta gente apuesta su dinero sin entender nada — en TikTok, Twitter y Reddit abundan los que buscan comprarse un lambo.\n\nEn The Crypto House defendemos un enfoque diferente. Nunca vas a escuchar mensajes de \"hazte rico rápido\" de nuestra parte. Te animamos a ser conservador y a destinar solo una pequeña porción de tu capital total.",
        },
        {
          titulo:"Cryptoshi te advierte: sé cauteloso",
          texto:"No es exageración decir que las criptomonedas son extremadamente especulativas. Si no gestionas bien tu riesgo, la probabilidad de perder mucho (si no todo) tu dinero es alta.\n\nNo caigas en el típico discurso de ventas fáciles:\n\"¡No te preocupes si no lo entiendes. Los que sí lo entienden dicen que va a ser enorme. ¡Es la próxima gran cosa!\"\n\nNo estoy de acuerdo. TÚ sí necesitas entenderlo.",
          imagen:{ src:"/bootcamp/mod1-lec3/cryptoshi-caution.png", alt:"Cryptoshi advierte sobre el riesgo" },
        },
        {
          titulo:"La historia que no quieres contarle a tus nietos",
          texto:"En el futuro, cuando tus nietos te visiten, ¿cuál de estas dos historias quieres contarles?\n\n1. \"Perdí la oportunidad del cripto.\"\n2. \"Aposté los ahorros de mi vida en cripto, lo perdí todo porque no entendía lo que compraba y me engañó un estafador carismático.\"\n\n¡Ojalá no tengas que contar ninguna de las dos!",
          imagen:{ src:"/bootcamp/mod1-lec3/old-crypto-trader.png", alt:"El trader arruinado: una historia de advertencia" },
        },
        {
          titulo:"La misión de Cryptoshi",
          texto:"Quiero evitar que te conviertas en una víctima. Es fundamental tener al menos una comprensión básica de la tecnología y los conceptos de las criptomonedas antes de poner cualquier cantidad de dinero.\n\nEspero que este curso sirva como base sólida para quienes comienzan su viaje en el mundo cripto. Al final, podrás decidir si este mundo es para ti.",
          imagen:{ src:"/bootcamp/mod1-lec3/cryptoshi-welcome-aboard.png", alt:"Cryptoshi da la bienvenida al curso" },
        },
        {
          titulo:"Lo que vas a aprender",
          puntos:[
            "Cómo funciona realmente el mercado cripto, más allá del hype.",
            "Qué es Bitcoin, qué son las altcoins y en qué se diferencian.",
            "Cómo tomar decisiones informadas sobre qué comprar y cuándo.",
            "Cómo identificar estafas, proyectos sin valor y señales de alerta.",
            "Cómo gestionar el riesgo correctamente para proteger tu capital.",
          ],
        },
        {
          titulo:"💡 Clave del éxito",
          texto:"Educarte es la clave del éxito al hacer trading o invertir en cripto. Puede ser la diferencia entre generar riqueza y perderlo todo.",
        },
      ],
      imagenes:[],
    },
    {
      id:"crypto-01-4",
      titulo:"Primeros pasos con Bitcoin",
      resumen:"La curva de aprendizaje cripto puede ser fuerte; este inicio se enfoca en Bitcoin antes de cubrir todo el mercado.",
      estado:"Contenido cargado",
      sourceUrl:"https://www.babypips.com/crypto/learn/getting-started-bitcoin",
      contenido:[
        {
          titulo:"Por qué empezar con Bitcoin",
          texto:"El mercado cripto tiene miles de activos y puede ser abrumador. Bitcoin es el punto de partida natural porque fue la primera criptomoneda y muchos conceptos del ecosistema nacen de su diseño.",
        },
        {
          titulo:"Definición inicial",
          puntos:[
            "Bitcoin es una moneda digital descentralizada basada en software abierto.",
            "Las transacciones se registran en una blockchain pública y distribuida.",
            "La red usa conceptos como minería, prueba de trabajo, llaves públicas, firmas digitales y funciones hash.",
            "Aunque suena técnico al principio, el curso propone construir el vocabulario paso a paso.",
          ],
        },
        {
          titulo:"Meta de aprendizaje",
          texto:"La lección busca reducir la intimidación inicial. Si entiendes Bitcoin, tendrás una base más sólida para comprender otros criptoactivos, sus riesgos y sus diferencias.",
        },
      ],
      imagenes:[
        { alt:"Guía inicial de Bitcoin", src:"https://www.babypips.com/crypto/learn/getting-started-bitcoin" },
      ],
    },
  ];

  return {
    ...mod,
    clases:mod.id === "crypto-01"
      ? clasesModulo1
      : Array.from({ length:mod.lessons }, (_, i) => ({
          id:`${mod.id}-${i + 1}`,
          titulo:`Clase ${i + 1}`,
          resumen:"Contenido de la lección pendiente por cargar.",
          estado:"Contenido pendiente",
        })),
  };
});

function ProgramaTab() {
  const { user } = useAuth();
  const [moduloActivo, setModuloActivo] = useState(0);
  const [leccionActiva, setLeccionActiva] = useState(0);
  const [modulosAbiertos, setModulosAbiertos] = useState(() => new Set([CURSO[0]?.id]));
  const [completadas, setCompletadas] = useState(() => {
    try { return JSON.parse(localStorage.getItem("crypto_edu_completadas") || "[]"); }
    catch { return []; }
  });
  const [notasAbiertas, setNotasAbiertas] = useState(false);
  const [notasVista,    setNotasVista]    = useState("actual"); // "actual" | "todas"
  const [copied,        setCopied]        = useState(false);
  const { notas, notasMeta, saveNota, saving, lastSaved, syncError } = useNotasSync(user?.id);

  const totalLecciones = CURSO.reduce((a, m) => a + m.lecciones.length, 0);
  const progreso = Math.round((completadas.length / totalLecciones) * 100);

  const modulo = CURSO[moduloActivo];
  const leccion = modulo?.lecciones[leccionActiva];

  const toggleCompletada = (id) => {
    const next = completadas.includes(id)
      ? completadas.filter(x => x !== id)
      : [...completadas, id];
    setCompletadas(next);
    localStorage.setItem("crypto_edu_completadas", JSON.stringify(next));
    // Notificación al completar TODAS las lecciones
    if (!completadas.includes(id) && next.length === totalLecciones && user?.id) {
      insertarNotificacion(
        user.id,
        'curso_completado',
        '🎓 ¡Felicitaciones! Completaste el programa',
        '¡Lo lograste! Completaste el 100% del programa Trader en Formación. Oscar está orgulloso de ti.'
      )
    }
  };

  const irSiguiente = () => {
    if (leccionActiva < modulo.lecciones.length - 1) {
      if (!completadas.includes(leccion.id)) toggleCompletada(leccion.id);
      setLeccionActiva(l => l + 1);
    } else if (moduloActivo < CURSO.length - 1) {
      if (!completadas.includes(leccion.id)) toggleCompletada(leccion.id);
      const nextModulo = CURSO[moduloActivo + 1];
      if (nextModulo) setModulosAbiertos(prev => new Set([...prev, nextModulo.id]));
      setModuloActivo(m => m + 1);
      setLeccionActiva(0);
    }
  };

  const toggleModulo = (modId) => {
    setModulosAbiertos(prev => {
      const next = new Set(prev);
      if (next.has(modId)) next.delete(modId);
      else next.add(modId);
      return next;
    });
  };

  const seleccionarLeccion = (mi, li) => {
    setModuloActivo(mi);
    setLeccionActiva(li);
    setModulosAbiertos(prev => new Set([...prev, CURSO[mi].id]));
  };

  const S = {
    wrap: { display:"flex", gap:0, height:"100%", minHeight:0 },
    sidebar: {
      width:280, minWidth:240, maxWidth:300, borderRight:"1px solid #0e2435",
      overflowY:"auto", paddingBottom:16, flexShrink:0,
    },
    instrHero: {
      padding:"20px 18px 16px", borderBottom:"1px solid #0e2435",
      background:"linear-gradient(135deg,#070d14 0%,#0a1a24 100%)",
    },
    avatar: {
      width:44, height:44, background:"#00e5ff", display:"flex",
      alignItems:"center", justifyContent:"center",
      fontWeight:900, fontSize:16, color:"#050a0f", marginBottom:10,
    },
    instrNombre: { fontSize:15, fontWeight:700, color:"#e0f4ff", marginBottom:2 },
    instrTitulo: { fontSize:11, color:"#2a5a72", letterSpacing:1.5, textTransform:"uppercase" },
    progressWrap: { padding:"12px 18px", borderBottom:"1px solid #0e2435" },
    progressLabel: { display:"flex", justifyContent:"space-between", fontSize:11, color:"#2a5a72", marginBottom:6, letterSpacing:1 },
    progressBar: { height:3, background:"#0e2435", position:"relative" },
    progressFill: { height:"100%", background:"#00e5ff", transition:"width 0.4s ease" },
    moduloHeader: {
      padding:"10px 18px 6px", fontSize:11, letterSpacing:1.5,
      textTransform:"uppercase", fontWeight:700, display:"flex", alignItems:"center", gap:8,
      cursor:"pointer", userSelect:"none", transition:"background 0.15s",
    },
    moduloChevron: (open, c) => ({
      marginLeft:"auto", color:open ? c : "#1a3a5e", fontSize:14,
      transform:open ? "rotate(90deg)" : "rotate(0deg)",
      transition:"transform 0.15s, color 0.15s",
    }),
    leccionesDrop: (open) => ({
      overflow:"hidden",
      maxHeight:open ? 520 : 0,
      opacity:open ? 1 : 0,
      transition:"max-height 0.2s ease, opacity 0.15s ease",
    }),
    dot: (c) => ({ width:8, height:8, minWidth:8, borderRadius:"50%", background:c }),
    leccionItem: (activa, done) => ({
      padding:"9px 18px 9px 26px", cursor:"pointer", fontSize:13,
      color: activa ? "#e0f4ff" : done ? "#4a7a96" : "#3a6a86",
      background: activa ? "#0a1a24" : "transparent",
      borderLeft: activa ? "2px solid #00e5ff" : "2px solid transparent",
      display:"flex", alignItems:"center", gap:8, transition:"all 0.15s",
    }),
    checkCircle: (done) => ({
      width:16, height:16, minWidth:16, borderRadius:"50%",
      border: done ? "none" : "1px solid #1a3a5e",
      background: done ? "#00ff88" : "transparent",
      display:"flex", alignItems:"center", justifyContent:"center",
      fontSize:9, color:"#050a0f", fontWeight:900, flexShrink:0,
    }),
    main: { flex:1, overflowY:"auto", padding:"24px 28px", minWidth:0 },
    modBadge: (c) => ({
      display:"inline-block", padding:"2px 10px", fontSize:11,
      border:`1px solid ${c}`, color:c, letterSpacing:1.5,
      textTransform:"uppercase", marginBottom:14,
    }),
    lecTitulo: { fontSize:22, fontWeight:700, color:"#e0f4ff", marginBottom:8, lineHeight:1.3 },
    metaRow: { display:"flex", alignItems:"center", gap:16, marginBottom:20, flexWrap:"wrap" },
    metaChip: { fontSize:12, color:"#4a7a96", display:"flex", alignItems:"center", gap:5 },
    videoBox: {
      background:"#070d14", border:"1px solid #0e2435",
      aspectRatio:"16/9", display:"flex", flexDirection:"column",
      alignItems:"center", justifyContent:"center", gap:10,
      marginBottom:22, cursor:"pointer", position:"relative", overflow:"hidden",
    },
    videoIcon: {
      width:56, height:56, background:"rgba(0,229,255,0.1)",
      border:"2px solid #00e5ff", borderRadius:"50%",
      display:"flex", alignItems:"center", justifyContent:"center",
      fontSize:20, color:"#00e5ff",
    },
    videoLabel: { fontSize:13, color:"#2a5a72", letterSpacing:1 },
    sectionTitle: {
      fontSize:11, letterSpacing:2, color:"#2a5a72", textTransform:"uppercase",
      marginBottom:12, marginTop:22, paddingBottom:8, borderBottom:"1px solid #0e2435",
    },
    desc: { fontSize:14, color:"#7ab8d4", lineHeight:1.8, marginBottom:20 },
    puntoItem: {
      display:"flex", alignItems:"flex-start", gap:10, marginBottom:10,
      padding:"10px 14px", background:"#070d14", border:"1px solid #0e2435",
    },
    puntoBullet: { color:"#00e5ff", fontSize:14, marginTop:1, flexShrink:0 },
    puntoText: { fontSize:13, color:"#c8d8e8", lineHeight:1.6 },
    ejercicioBox: {
      background:"#070d14", border:"1px solid #c9a227",
      padding:"16px 18px", marginTop:8, marginBottom:24,
    },
    ejercicioLabel: { fontSize:11, letterSpacing:2, color:"#c9a227", textTransform:"uppercase", marginBottom:8 },
    ejercicioText: { fontSize:13, color:"#a08020", lineHeight:1.7 },
    actionsRow: { display:"flex", gap:10, flexWrap:"wrap", alignItems:"center", paddingTop:8 },
    btnComplete: (done) => ({
      padding:"9px 20px", fontSize:13, cursor:"pointer",
      fontFamily:"Outfit,sans-serif", fontWeight:700,
      background: done ? "transparent" : "#00ff88",
      border: done ? "1px solid #00ff88" : "1px solid #00ff88",
      color: done ? "#00ff88" : "#050a0f",
      letterSpacing:"0.5px", transition:"all 0.15s",
    }),
    btnNext: {
      padding:"9px 20px", fontSize:13, cursor:"pointer",
      fontFamily:"Outfit,sans-serif", fontWeight:700,
      background:"#00e5ff", border:"1px solid #00e5ff",
      color:"#050a0f", letterSpacing:"0.5px",
    },
    btnNota: {
      padding:"9px 16px", fontSize:13, cursor:"pointer",
      fontFamily:"Outfit,sans-serif", fontWeight:600,
      background:"transparent", border:"1px solid #1a3a5e",
      color:"#4a7a96", letterSpacing:"0.5px", display:"flex",
      alignItems:"center", gap:6, transition:"all 0.15s",
    },
    notasPanel: {
      position:"fixed", bottom:0, right:0, width:420, height:460,
      background:"#070d14", border:"1px solid #1a3a5e",
      borderBottom:"none", borderRight:"none", zIndex:50, display:"flex",
      flexDirection:"column", boxShadow:"-4px -4px 32px rgba(0,0,0,0.5)",
    },
    notasHeader: {
      padding:"12px 16px", borderBottom:"1px solid #0e2435",
      display:"flex", justifyContent:"space-between", alignItems:"center",
      fontSize:12, background:"#050a0f",
    },
    notasTabs: {
      display:"flex", borderBottom:"1px solid #0e2435",
    },
    notasTextarea: {
      flex:1, background:"transparent", border:"none", outline:"none",
      color:"#c8d8e8", fontSize:13, padding:"14px 16px", resize:"none",
      fontFamily:"Outfit,sans-serif", lineHeight:1.8,
    },
    notasFooter: {
      padding:"8px 14px", borderTop:"1px solid #0e2435",
      display:"flex", alignItems:"center", gap:8,
      background:"#050a0f", fontSize:11,
    },
  };

  return (
    <div style={S.wrap}>
      {/* ── Sidebar del curso ── */}
      <div style={S.sidebar}>
        {/* Instructor */}
        <div style={S.instrHero}>
          <div style={{ fontSize:9, letterSpacing:2.2, textTransform:"uppercase", color:"#00e5ff", fontWeight:800, marginBottom:10 }}>
            Fundador · The Crypto House
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:12 }}>
            <div style={S.avatar}>OB</div>
            <div>
              <div style={S.instrNombre}>Oscar Bolaños</div>
              <div style={{ fontSize:11, color:"#4a7a96", lineHeight:1.5 }}>
                Operador de mercados cripto<br/>Mentor de inversión estratégica
              </div>
            </div>
          </div>
          <div style={{ fontSize:12, color:"#5a8aa0", lineHeight:1.7, marginBottom:12 }}>
            Operador con más de 4 años en Prop Firms, brokers y estructuras DeFi. Fundé The Crypto House para elevar el nivel de formación, alejándome de la teoría vacía y enfocándome en metodologías prácticas aplicadas a mercados reales.
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
            {[
              "Especialista en Uniswap V3 y Liquidity Mining",
              "Creador de Liquidity Engine",
              "Prop Firms, brokers y estructuras privadas",
              "Formación 1 a 1 · Colombia y Latinoamérica",
            ].map((item, i) => (
              <div key={i} style={{ display:"flex", alignItems:"flex-start", gap:7, fontSize:11, color:"#4a7a96", lineHeight:1.5 }}>
                <span style={{ color:"#00e5ff", fontWeight:900, marginTop:1, flexShrink:0 }}>▪</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Progreso */}
        <div style={S.progressWrap}>
          <div style={S.progressLabel}>
            <span>PROGRESO DEL CURSO</span>
            <span style={{ color:"#00e5ff" }}>{progreso}%</span>
          </div>
          <div style={S.progressBar}>
            <div style={{ ...S.progressFill, width:`${progreso}%` }} />
          </div>
          <div style={{ fontSize:11, color:"#2a5a72", marginTop:6 }}>
            {completadas.length} / {totalLecciones} lecciones completadas
          </div>
        </div>

        {/* Módulos y lecciones */}
        {CURSO.map((mod, mi) => {
          const abierto = modulosAbiertos.has(mod.id);
          const leccionesCompletadas = mod.lecciones.filter(lec => completadas.includes(lec.id)).length;
          return (
          <div key={mod.id}>
            <div
              style={{
                ...S.moduloHeader,
                background: moduloActivo === mi ? "rgba(0,229,255,0.04)" : "transparent",
              }}
              onClick={() => toggleModulo(mod.id)}
            >
              <div style={S.dot(mod.color)} />
              <span style={{ color: moduloActivo === mi ? mod.color : "#2a4a5e", fontSize:11, lineHeight:1.35 }}>
                {mod.titulo}
              </span>
              <span style={{ marginLeft:"auto", fontSize:10, color:"#2a5a72", whiteSpace:"nowrap" }}>
                {leccionesCompletadas}/{mod.lecciones.length}
              </span>
              <span style={S.moduloChevron(abierto, mod.color)}>›</span>
            </div>
            <div style={S.leccionesDrop(abierto)}>
              {mod.lecciones.map((lec, li) => {
                const activa = moduloActivo === mi && leccionActiva === li;
                const done   = completadas.includes(lec.id);
                return (
                  <div key={lec.id} style={S.leccionItem(activa, done)}
                    onClick={() => seleccionarLeccion(mi, li)}>
                    <div style={S.checkCircle(done)}>{done ? "✓" : ""}</div>
                    <span style={{ lineHeight:1.4 }}>{lec.titulo}</span>
                  </div>
                );
              })}
            </div>
          </div>
          );
        })}
      </div>

      {/* ── Contenido de la lección ── */}
      <div style={S.main}>
        {leccion && (
          <>
            <div style={S.modBadge(modulo.color)}>{modulo.titulo}</div>
            <div style={S.lecTitulo}>{leccion.titulo}</div>

            <div style={S.metaRow}>
              <div style={S.metaChip}>
                <span style={{ color:"#00e5ff" }}>▷</span>
                <span>{leccion.duracion}</span>
              </div>
              <div style={S.metaChip}>
                <span>Lección {leccionActiva + 1} de {modulo.lecciones.length}</span>
              </div>
              {completadas.includes(leccion.id) && (
                <div style={{ fontSize:12, color:"#00ff88", display:"flex", alignItems:"center", gap:4 }}>
                  <span>✓</span> Completada
                </div>
              )}
            </div>

            {/* Video placeholder */}
            <div style={S.videoBox}>
              <div style={{
                position:"absolute", inset:0,
                background:"linear-gradient(135deg,#050a0f 0%,#0a1520 100%)",
              }} />
              <div style={{ position:"relative", zIndex:1, textAlign:"center" }}>
                <div style={S.videoIcon}>▷</div>
                <div style={{ ...S.videoLabel, marginTop:12 }}>VIDEO DE LA LECCIÓN</div>
                <div style={{ fontSize:11, color:"#1a3a5e", marginTop:4 }}>
                  Sube tu video aquí · YouTube / Vimeo embed
                </div>
              </div>
            </div>

            {/* Descripción */}
            <div style={S.sectionTitle}>Descripción</div>
            <p style={S.desc}>{leccion.descripcion}</p>

            {/* Puntos clave */}
            <div style={S.sectionTitle}>Puntos Clave</div>
            {leccion.puntosClave.map((p, i) => (
              <div key={i} style={S.puntoItem}>
                <span style={S.puntoBullet}>▸</span>
                <span style={S.puntoText}>{p}</span>
              </div>
            ))}

            {/* Ejercicio */}
            <div style={S.sectionTitle}>Ejercicio Práctico</div>
            <div style={S.ejercicioBox}>
              <div style={S.ejercicioLabel}>Tu tarea</div>
              <div style={S.ejercicioText}>{leccion.ejercicio}</div>
            </div>

            {/* Acciones */}
            <div style={S.actionsRow}>
              <button style={S.btnComplete(completadas.includes(leccion.id))}
                onClick={() => toggleCompletada(leccion.id)}>
                {completadas.includes(leccion.id) ? "✓ Completada" : "Marcar como completada"}
              </button>
              {(leccionActiva < modulo.lecciones.length - 1 || moduloActivo < CURSO.length - 1) && (
                <button style={S.btnNext} onClick={irSiguiente}>
                  Siguiente lección →
                </button>
              )}
              <button style={{
                ...S.btnNota,
                borderColor: notasAbiertas ? "#00e5ff" : "#1a3a5e",
                color: notasAbiertas ? "#00e5ff" : "#4a7a96",
              }} onClick={() => setNotasAbiertas(n => !n)}>
                ✎ Mis notas
                {Object.values(notas).filter(n => n?.trim()).length > 0 && (
                  <span style={{ padding:"1px 6px", background:"rgba(0,229,255,0.15)", border:"1px solid rgba(0,229,255,0.3)", borderRadius:2, fontSize:10, color:"#00e5ff", fontWeight:700 }}>
                    {Object.values(notas).filter(n => n?.trim()).length}
                  </span>
                )}
              </button>
            </div>
          </>
        )}
      </div>

      {/* ── Panel de notas flotante ── */}
      {notasAbiertas && (() => {
        const notaActual    = notas[leccion?.id] || ""
        const charCount     = notaActual.length
        const savedAt       = notasMeta?.[leccion?.id]
        const fmtTs         = (ts) => ts ? new Date(ts).toLocaleString("es-CO", { day:"numeric", month:"short", hour:"2-digit", minute:"2-digit" }) : null
        const todasConNota  = CURSO.flatMap(m => m.lecciones.map(l => ({ ...l, modulo:m.titulo }))).filter(l => notas[l.id]?.trim())
        const handleCopy    = () => { navigator.clipboard.writeText(notaActual); setCopied(true); setTimeout(()=>setCopied(false), 2000) }
        const handleClear   = () => { if(leccion && window.confirm("¿Borrar la nota de esta lección?")) saveNota(leccion.id, "") }

        return (
          <div style={S.notasPanel}>

            {/* Header */}
            <div style={S.notasHeader}>
              <div style={{ display:"flex", flexDirection:"column", gap:2, flex:1, minWidth:0 }}>
                <span style={{ fontSize:11, fontWeight:700, color:"#00e5ff", letterSpacing:1, textTransform:"uppercase" }}>✎ Mis notas</span>
                {notasVista === "actual" && leccion && (
                  <span style={{ fontSize:11, color:"#2a5a72", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
                    {leccion.titulo.slice(0, 40)}{leccion.titulo.length > 40 ? "…" : ""}
                  </span>
                )}
              </div>
              <button onClick={() => setNotasAbiertas(false)}
                style={{ background:"none", border:"none", color:"#2a5a72", fontSize:18, cursor:"pointer", padding:0, lineHeight:1, marginLeft:10, flexShrink:0 }}>✕</button>
            </div>

            {/* Tabs */}
            <div style={S.notasTabs}>
              {[["actual","Esta lección"], ["todas", `Todas (${todasConNota.length})`]].map(([k,l]) => (
                <button key={k} onClick={() => setNotasVista(k)} style={{
                  flex:1, padding:"8px 0", background:"none", border:"none", cursor:"pointer",
                  fontFamily:"Outfit,sans-serif", fontSize:12, fontWeight:600,
                  borderBottom:`2px solid ${notasVista===k?"#00e5ff":"transparent"}`,
                  color: notasVista===k ? "#00e5ff" : "#2a5a72", transition:"all 0.15s",
                }}>{l}</button>
              ))}
            </div>

            {/* Vista: Esta lección */}
            {notasVista === "actual" && (
              <>
                <textarea
                  style={S.notasTextarea}
                  placeholder="Escribe tus apuntes de esta lección... Se guardan automáticamente."
                  value={notaActual}
                  onChange={e => leccion && saveNota(leccion.id, e.target.value)}
                  maxLength={2000}
                />
                {/* Footer */}
                <div style={S.notasFooter}>
                  <span style={{ color:"#2a5a72" }}>{charCount}/2000</span>
                  <div style={{ flex:1 }} />
                  {savedAt && !saving && (
                    <span style={{ color:"#2a5a72", fontSize:10 }}>
                      🕐 {fmtTs(savedAt)}
                    </span>
                  )}
                  <span style={{ color: syncError?"#ff6b88":saving?"#ffb347":lastSaved?"#00ff88":"#2a5a72", fontWeight:600 }}>
                    {syncError?"⚠ Error":saving?"↑ Guardando":lastSaved?"✓ Sincronizado":"● Local"}
                  </span>
                  <button onClick={handleCopy} disabled={!notaActual}
                    title="Copiar nota"
                    style={{ background:"none", border:"1px solid #1a3a5e", color:copied?"#00ff88":"#4a7a96", cursor:notaActual?"pointer":"not-allowed", padding:"3px 8px", fontSize:11, fontFamily:"Outfit,sans-serif", transition:"all 0.15s" }}>
                    {copied ? "✓ Copiado" : "📋 Copiar"}
                  </button>
                  <button onClick={handleClear} disabled={!notaActual}
                    title="Borrar nota"
                    style={{ background:"none", border:"1px solid #1a3a5e", color:"#4a7a96", cursor:notaActual?"pointer":"not-allowed", padding:"3px 8px", fontSize:11, fontFamily:"Outfit,sans-serif" }}>
                    🗑
                  </button>
                </div>
                {!user && (
                  <div style={{ padding:"6px 14px", fontSize:10, color:"#4a7a96", borderTop:"1px solid #0e2435", background:"#050a0f", textAlign:"center" }}>
                    ⚠ Inicia sesión para sincronizar en todos tus dispositivos
                  </div>
                )}
              </>
            )}

            {/* Vista: Todas mis notas */}
            {notasVista === "todas" && (
              <div style={{ flex:1, overflowY:"auto", padding:"8px 0" }}>
                {todasConNota.length === 0 ? (
                  <div style={{ padding:"32px 16px", textAlign:"center", color:"#2a5a72", fontSize:13 }}>
                    Aún no tienes notas guardadas
                  </div>
                ) : (
                  todasConNota.map(l => {
                    const ts = notasMeta?.[l.id]
                    const isActive = l.id === leccion?.id
                    return (
                      <div key={l.id}
                        onClick={() => {
                          // Navegar a la lección con la nota
                          const mIdx = CURSO.findIndex(m => m.lecciones.some(ll => ll.id === l.id))
                          const lIdx = CURSO[mIdx]?.lecciones.findIndex(ll => ll.id === l.id)
                          if (mIdx >= 0 && lIdx >= 0) { seleccionarLeccion(mIdx, lIdx); setNotasVista("actual") }
                        }}
                        style={{
                          padding:"12px 16px", cursor:"pointer", borderBottom:"1px solid #0e2435",
                          background: isActive ? "rgba(0,229,255,0.04)" : "transparent",
                          borderLeft: isActive ? "2px solid #00e5ff" : "2px solid transparent",
                          transition:"background 0.15s",
                        }}
                        onMouseEnter={e => { if(!isActive) e.currentTarget.style.background="rgba(255,255,255,0.02)" }}
                        onMouseLeave={e => { if(!isActive) e.currentTarget.style.background="transparent" }}
                      >
                        <div style={{ fontSize:11, fontWeight:700, color:"#00e5ff", marginBottom:3, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
                          {l.titulo}
                        </div>
                        <div style={{ fontSize:12, color:"#4a7a96", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap", lineHeight:1.5 }}>
                          {notas[l.id]?.slice(0, 70)}{notas[l.id]?.length > 70 ? "…" : ""}
                        </div>
                        {ts && (
                          <div style={{ fontSize:10, color:"#1a3a5e", marginTop:4 }}>
                            🕐 {fmtTs(ts)}
                          </div>
                        )}
                      </div>
                    )
                  })
                )}
              </div>
            )}

          </div>
        )
      })()}
    </div>
  );
}

function CryptoBootcampTab() {
  const [abiertos, setAbiertos] = useState(() => new Set([CRYPTO_BOOTCAMP[0]?.id]));
  const [moduloActivo, setModuloActivo] = useState(0);
  const [claseActiva, setClaseActiva] = useState(0);
  const [completadas, setCompletadas] = useState(() => {
    try { return JSON.parse(localStorage.getItem("crypto_bootcamp_completadas") || "[]"); }
    catch { return []; }
  });
  const [winW, setWinW] = useState(() => window.innerWidth);
  useEffect(() => {
    const onResize = () => setWinW(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  const isMobile = winW < 768;
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);

  // Keep sidebarOpen in sync when crossing breakpoint
  useEffect(() => { setSidebarOpen(!isMobile); }, [isMobile]);

  const totalClases = CRYPTO_BOOTCAMP.reduce((acc, mod) => acc + mod.clases.length, 0);
  const progreso = Math.round((completadas.length / totalClases) * 100);
  const modulo = CRYPTO_BOOTCAMP[moduloActivo];
  const clase = modulo?.clases[claseActiva];
  const isDirectImage = (src) => /\.(png|jpe?g|webp|gif|svg)(\?|$)/i.test(src || "");

  const toggle = (id) => {
    setAbiertos(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const seleccionarClase = (mi, ci) => {
    setModuloActivo(mi);
    setClaseActiva(ci);
    setAbiertos(prev => new Set([...prev, CRYPTO_BOOTCAMP[mi].id]));
    if (isMobile) setSidebarOpen(false);
  };

  const toggleCompletada = (id) => {
    const next = completadas.includes(id)
      ? completadas.filter(x => x !== id)
      : [...completadas, id];
    setCompletadas(next);
    localStorage.setItem("crypto_bootcamp_completadas", JSON.stringify(next));
  };

  const irSiguiente = () => {
    if (!clase || !modulo) return;
    if (!completadas.includes(clase.id)) toggleCompletada(clase.id);
    if (claseActiva < modulo.clases.length - 1) {
      setClaseActiva(c => c + 1);
      return;
    }
    if (moduloActivo < CRYPTO_BOOTCAMP.length - 1) {
      const nextModulo = CRYPTO_BOOTCAMP[moduloActivo + 1];
      setModuloActivo(m => m + 1);
      setClaseActiva(0);
      setAbiertos(prev => new Set([...prev, nextModulo.id]));
    }
  };

  const S = {
    wrap:{ display:"flex", flexDirection: isMobile ? "column" : "row", gap:0, height:"100%", minHeight:0, position:"relative" },
    // Mobile toggle bar
    mobileBar:{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"10px 14px", borderBottom:"1px solid #0e2435", background:"#070d14", flexShrink:0 },
    mobileBarTitle:{ fontSize:13, fontWeight:800, color:"#e0f4ff", letterSpacing:0.5 },
    mobileBarMeta:{ fontSize:11, color:"#4a7a96" },
    toggleBtn:{ display:"flex", alignItems:"center", gap:6, padding:"7px 12px", background:"rgba(0,229,255,0.07)", border:"1px solid #1a3a5e", color:"#00e5ff", fontSize:12, fontWeight:700, cursor:"pointer", fontFamily:"Outfit,sans-serif", letterSpacing:0.5, flexShrink:0 },
    // Sidebar
    sidebar: isMobile
      ? { width:"100%", borderBottom:"1px solid #0e2435", overflowY:"auto", maxHeight: sidebarOpen ? 480 : 0, opacity: sidebarOpen ? 1 : 0, transition:"max-height 0.25s ease, opacity 0.2s ease", overflow:"hidden" }
      : { width:340, minWidth:280, maxWidth:380, borderRight:"1px solid #0e2435", overflowY:"auto", paddingBottom:16, flexShrink:0 },
    content:{ flex:1, minWidth:0, overflowY:"auto", padding: isMobile ? "16px 14px 32px" : "28px 32px 40px" },
    intro:{ padding:"20px 18px 16px", borderBottom:"1px solid #0e2435", background:"linear-gradient(135deg,#070d14 0%,#0a1a24 100%)" },
    eyebrow:{ fontSize:11, letterSpacing:2.4, textTransform:"uppercase", color:"#00e5ff", fontWeight:800, marginBottom:8 },
    title:{ fontSize:24, lineHeight:1.2, color:"#e0f4ff", fontWeight:800, marginBottom:8 },
    sub:{ fontSize:13, color:"#4a7a96", lineHeight:1.7 },
    progressWrap:{ padding:"12px 18px", borderBottom:"1px solid #0e2435" },
    progressLabel:{ display:"flex", justifyContent:"space-between", fontSize:11, color:"#2a5a72", marginBottom:6, letterSpacing:1 },
    progressBar:{ height:3, background:"#0e2435", position:"relative" },
    progressFill:{ height:"100%", background:"#00e5ff", transition:"width 0.4s ease" },
    list:{ display:"flex", flexDirection:"column", gap:0 },
    module:{ borderBottom:"1px solid #0e2435" },
    header:(open) => ({
      width:"100%", display:"flex", alignItems:"center", gap:12, padding:"14px 16px",
      background:open ? "rgba(0,229,255,0.04)" : "transparent",
      border:"none", borderBottom:open ? "1px solid #0e2435" : "1px solid transparent",
      color:"#c8e6f0", cursor:"pointer", textAlign:"left", fontFamily:"Outfit,sans-serif",
    }),
    number:{ width:30, height:30, minWidth:30, display:"flex", alignItems:"center", justifyContent:"center", background:"#0a1520", border:"1px solid #1a3a5e", color:"#00e5ff", fontSize:12, fontWeight:800 },
    moduleTitle:{ fontSize:14, color:"#e0f4ff", fontWeight:800, lineHeight:1.35 },
    meta:{ fontSize:11, color:"#4a7a96", marginTop:3 },
    chevron:(open) => ({ marginLeft:"auto", color:open ? "#00e5ff" : "#1a3a5e", fontSize:18, transform:open ? "rotate(90deg)" : "rotate(0deg)", transition:"transform 0.15s" }),
    drop:(open) => ({ overflow:"hidden", maxHeight:open ? 680 : 0, opacity:open ? 1 : 0, transition:"max-height 0.2s ease, opacity 0.15s ease" }),
    lesson:(active) => ({
      width:"100%", display:"flex", alignItems:"center", gap:10,
      padding: isMobile ? "11px 14px 11px 14px" : "10px 16px 10px 58px",
      border:"none", borderBottom:"1px solid rgba(14,36,53,0.55)",
      background:active ? "#0a1a24" : "transparent", cursor:"pointer", textAlign:"left",
      borderLeft:active ? "2px solid #00e5ff" : "2px solid transparent", fontFamily:"Outfit,sans-serif",
      boxSizing:"border-box",
    }),
    checkCircle:(done) => ({
      width:18, height:18, minWidth:18, borderRadius:"50%",
      border:done ? "none" : "1px solid #1a3a5e",
      background:done ? "#00ff88" : "transparent",
      display:"flex", alignItems:"center", justifyContent:"center",
      fontSize:10, color:"#050a0f", fontWeight:900, flexShrink:0,
    }),
    lessonTitle:(active) => ({ fontSize: isMobile ? 14 : 13, color:active ? "#e0f4ff" : "#7ab8d4", flex:1, lineHeight:1.4 }),
    pill:{ fontSize:10, color:"#2a5a72", border:"1px solid #12304a", padding:"2px 7px", whiteSpace:"nowrap" },
    badge:{ display:"inline-block", padding:"2px 10px", fontSize:11, border:"1px solid #00e5ff", color:"#00e5ff", letterSpacing:1.5, textTransform:"uppercase", marginBottom:14 },
    lessonHeader:{ fontSize: isMobile ? 20 : 26, fontWeight:800, color:"#e0f4ff", lineHeight:1.25, marginBottom:10 },
    metaRow:{ display:"flex", alignItems:"center", gap:10, flexWrap:"wrap", marginBottom:20, color:"#4a7a96", fontSize:12 },
    sectionTitle:{ fontSize:11, letterSpacing:2, color:"#2a5a72", textTransform:"uppercase", marginBottom:12, marginTop:22, paddingBottom:8, borderBottom:"1px solid #0e2435" },
    desc:{ fontSize: isMobile ? 14 : 15, color:"#7ab8d4", lineHeight:1.8, maxWidth:760, marginBottom:20 },
    pending:{ background:"#070d14", border:"1px solid #0e2435", padding:"18px 20px", color:"#4a7a96", fontSize:13, lineHeight:1.7 },
    contentBlock:{ background:"#070d14", border:"1px solid #0e2435", padding: isMobile ? "14px 14px" : "16px 18px", marginBottom:12 },
    contentTitle:{ fontSize:13, color:"#00e5ff", fontWeight:800, marginBottom:8 },
    contentText:{ fontSize:14, color:"#9ab8c8", lineHeight:1.75 },
    contentList:{ margin:0, paddingLeft:18, color:"#9ab8c8", fontSize:14, lineHeight:1.75 },
    mediaGrid:{ display:"grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(220px, 1fr))", gap:12 },
    image:{ width:"100%", border:"1px solid #0e2435", background:"#050a0f", display:"block" },
    sourceCard:{ border:"1px solid #0e2435", background:"#070d14", padding:"12px 14px", color:"#4a7a96", fontSize:12, lineHeight:1.5 },
    sourceLink:{ color:"#00e5ff", textDecoration:"none", fontSize:12, wordBreak:"break-word" },
    actions:{ display:"flex", flexDirection: isMobile ? "column" : "row", gap:10, alignItems: isMobile ? "stretch" : "center", paddingTop:18 },
    btnComplete:(done) => ({
      padding:"11px 20px", fontSize:13, cursor:"pointer", fontFamily:"Outfit,sans-serif",
      fontWeight:700, background:done ? "transparent" : "#00ff88",
      border:"1px solid #00ff88", color:done ? "#00ff88" : "#050a0f",
      letterSpacing:"0.5px", transition:"all 0.15s", textAlign:"center",
    }),
    btnNext:{
      padding:"11px 20px", fontSize:13, cursor:"pointer", fontFamily:"Outfit,sans-serif",
      fontWeight:700, background:"#00e5ff", border:"1px solid #00e5ff",
      color:"#050a0f", letterSpacing:"0.5px", textAlign:"center",
    },
  };

  const currentLessonLabel = modulo && clase
    ? `${modulo.titulo} · Clase ${claseActiva + 1}`
    : "Selecciona una lección";

  return (
    <div style={S.wrap}>
      {/* Mobile toggle bar — only shown on small screens */}
      {isMobile && (
        <div style={S.mobileBar}>
          <div>
            <div style={S.mobileBarTitle}>Crypto Bootcamp</div>
            <div style={S.mobileBarMeta}>{currentLessonLabel}</div>
          </div>
          <button style={S.toggleBtn} onClick={() => setSidebarOpen(v => !v)}>
            {sidebarOpen ? "✕ Cerrar" : "☰ Módulos"}
          </button>
        </div>
      )}

      <div style={S.sidebar}>
        <div style={S.intro}>
          <div style={S.eyebrow}>School of Crypto</div>
          <div style={S.title}>Crypto Bootcamp</div>
          <div style={S.sub}>
            Formación práctica en criptomonedas, organizada por módulos y clases.
          </div>
        </div>

        <div style={S.progressWrap}>
          <div style={S.progressLabel}>
            <span>PROGRESO DEL CURSO</span>
            <span style={{ color:"#00e5ff" }}>{progreso}%</span>
          </div>
          <div style={S.progressBar}>
            <div style={{ ...S.progressFill, width:`${progreso}%` }} />
          </div>
          <div style={{ fontSize:11, color:"#2a5a72", marginTop:6 }}>
            {completadas.length} / {totalClases} clases completadas
          </div>
        </div>

        <div style={S.list}>
          {CRYPTO_BOOTCAMP.map((mod, i) => {
            const open = abiertos.has(mod.id);
            return (
              <div key={mod.id} style={S.module}>
                <button style={S.header(open)} onClick={() => toggle(mod.id)}>
                  <span style={S.number}>{String(i + 1).padStart(2, "0")}</span>
                  <span style={{ minWidth:0 }}>
                    <div style={S.moduleTitle}>{mod.titulo}</div>
                    <div style={S.meta}>{mod.clases.length} clases</div>
                  </span>
                  <span style={S.chevron(open)}>›</span>
                </button>
                <div style={S.drop(open)}>
                  {mod.clases.map((item, ci) => {
                    const active = moduloActivo === i && claseActiva === ci;
                    const done = completadas.includes(item.id);
                    return (
                      <button key={item.id} style={S.lesson(active)} onClick={() => seleccionarClase(i, ci)}>
                        <span style={S.checkCircle(done)}>{done ? "✓" : ""}</span>
                        <span style={S.lessonTitle(active)}>{item.titulo}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div style={S.content}>
        {modulo && clase && (
          <>
            <div style={S.badge}>{modulo.titulo}</div>
            <div style={S.lessonHeader}>{clase.titulo}</div>
            <div style={S.metaRow}>
              <span>Clase {claseActiva + 1} de {modulo.clases.length}</span>
              <span>{clase.estado}</span>
              {completadas.includes(clase.id) && <span style={{ color:"#00ff88" }}>✓ Completada</span>}
            </div>

            <div style={S.sectionTitle}>Resumen</div>
            <div style={S.desc}>{clase.resumen}</div>

            <div style={S.sectionTitle}>Contenido de la clase</div>
            {clase.contenido ? (
              clase.contenido.map((bloque, i) => (
                <div key={i} style={S.contentBlock}>
                  <div style={S.contentTitle}>{bloque.titulo}</div>
                  {bloque.imagen && (
                    <img
                      src={bloque.imagen.src}
                      alt={bloque.imagen.alt}
                      style={{ width:"100%", maxWidth:520, display:"block", margin:"12px 0 14px", border:"1px solid #0e2435", borderRadius:6 }}
                    />
                  )}
                  {bloque.texto && (
                    <div style={S.contentText}>
                      {bloque.texto.split("\n\n").map((p, idx) => (
                        <p key={idx} style={{ marginBottom: idx < bloque.texto.split("\n\n").length - 1 ? 12 : 0 }}>{p}</p>
                      ))}
                    </div>
                  )}
                  {bloque.puntos && (
                    <ul style={S.contentList}>
                      {bloque.puntos.map((p, idx) => <li key={idx} style={{ marginBottom:6 }}>{p}</li>)}
                    </ul>
                  )}
                </div>
              ))
            ) : (
              <div style={S.pending}>
                Aún no se ha cargado el contenido completo de esta clase. Cuando compartas la información, la agrego aquí manteniendo esta estructura.
              </div>
            )}

            {(clase.imagenes?.length > 0 || clase.sourceUrl) && (
              <>
                <div style={S.sectionTitle}>Imágenes y fuente</div>
                <div style={S.mediaGrid}>
                  {clase.imagenes?.map((img, i) => (
                    isDirectImage(img.src) ? (
                      <figure key={i} style={{ margin:0 }}>
                        <img src={img.src} alt={img.alt} style={S.image} />
                        <figcaption style={{ color:"#2a5a72", fontSize:11, marginTop:6 }}>{img.alt}</figcaption>
                      </figure>
                    ) : (
                      <div key={i} style={S.sourceCard}>
                        <div>{img.alt}</div>
                        <a href={img.src} target="_blank" rel="noreferrer" style={S.sourceLink}>Abrir página fuente</a>
                      </div>
                    )
                  ))}
                  {clase.sourceUrl && (
                    <div style={S.sourceCard}>
                      <div>Fuente original de la lección</div>
                      <a href={clase.sourceUrl} target="_blank" rel="noreferrer" style={S.sourceLink}>{clase.sourceUrl}</a>
                    </div>
                  )}
                </div>
              </>
            )}

            <div style={S.actions}>
              <button style={S.btnComplete(completadas.includes(clase.id))} onClick={() => toggleCompletada(clase.id)}>
                {completadas.includes(clase.id) ? "✓ Completada" : "Marcar como completada"}
              </button>
              {(claseActiva < modulo.clases.length - 1 || moduloActivo < CRYPTO_BOOTCAMP.length - 1) && (
                <button style={S.btnNext} onClick={irSiguiente}>
                  Siguiente lección →
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════
// APP
// ════════════════════════════════════════════════════════════════════
const TABS = [
  { id: "Wallets",              label: "Wallets",              available: true  },
  { id: "Cobertura",            label: "Cobertura",            available: true  },
  { id: "Monitor de Cobertura", label: "Monitor de Cobertura", available: true  },
  { id: "Trading Automatizado", label: "Trading Automatizado", available: false },
  { id: "Insider (Trading)",    label: "Insider (Trading)",    available: false },
];
const NAV_ITEMS       = ["Dashboard","Programa","Crypto Bootcamp","Preguntas"];
const NAV_ITEMS_ADMIN = ["Users Admin"];

// ════════════════════════════════════════════════════════════════════
// CONTACT MODAL
// ════════════════════════════════════════════════════════════════════
function ContactModal({ onClose }) {
  const [form, setForm]       = useState({ name:"", email:"", msg:"" });
  const [sending, setSending] = useState(false);
  const [sent, setSent]       = useState(false);

  const handleWA = () => {
    const text = encodeURIComponent(`Hola. Soy ${form.name || "un usuario"} de Liquidity Engine ™. ${form.msg}`);
    window.open(`https://wa.me/573215646716?text=${text}`, "_blank");
  };

  const handleEmail = (e) => {
    e.preventDefault();
    if (!form.name || !form.msg) return;
    setSending(true);
    const subject = encodeURIComponent(`Liquidity Engine — Mensaje de ${form.name}`);
    const body    = encodeURIComponent(`Nombre: ${form.name}\nEmail: ${form.email}\n\n${form.msg}`);
    window.location.href = `mailto:profeoscarbol@gmail.com?subject=${subject}&body=${body}`;
    setTimeout(() => { setSending(false); setSent(true); }, 800);
  };

  const S = {
    overlay: { position:"fixed",inset:0,background:"rgba(5,10,15,0.80)",zIndex:200,display:"flex",alignItems:"center",justifyContent:"center",padding:16,backdropFilter:"blur(8px)" },
    box: { background:"#070d14",border:"1px solid #1a3a5e",width:"100%",maxWidth:480,animation:"fadeSlide 0.2s ease" },
  };

  return (
    <div style={S.overlay} onClick={e => e.target===e.currentTarget && onClose()}>
      <style>{`@keyframes fadeSlide{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}`}</style>
      <div style={S.box}>

        {/* Header */}
        <div style={{ padding:"24px 28px 0", display:"flex", justifyContent:"space-between", alignItems:"flex-start", borderBottom:"1px solid #0e2435", paddingBottom:20 }}>
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:4 }}>
              <img src={cryptoHouseLogo} alt="The Crypto House" style={{ width:32, height:32, objectFit:"contain" }} />
              <div>
                <div style={{ fontSize:11,fontWeight:700,color:"#7ab8d4",letterSpacing:2,textTransform:"uppercase" }}>The Crypto House</div>
                <div style={{ fontSize:10,color:"#2a5a72",letterSpacing:1,textTransform:"uppercase" }}>Soporte</div>
              </div>
            </div>
            <div style={{ fontSize:20,fontWeight:700,color:"#c8e6f0",marginTop:12 }}>Contáctanos</div>
            <div style={{ fontSize:13,color:"#4a7a96",marginTop:2 }}>Respuesta en menos de 24 horas</div>
          </div>
          <button onClick={onClose} style={{ background:"none",border:"none",color:"#2a5a72",fontSize:20,cursor:"pointer",lineHeight:1,padding:0 }}>✕</button>
        </div>

        {/* Direct contact cards */}
        <div style={{ padding:"20px 28px 0", display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
          <a href="https://wa.me/573215646716" target="_blank" rel="noreferrer"
            style={{ background:"#0a1520",border:"1px solid #1a3a5e",padding:"14px 16px",textDecoration:"none",display:"flex",flexDirection:"column",gap:6,transition:"border-color 0.15s" }}
            onMouseEnter={e=>e.currentTarget.style.borderColor="#00ff88"}
            onMouseLeave={e=>e.currentTarget.style.borderColor="#1a3a5e"}>
            <div style={{ fontSize:22 }}>💬</div>
            <div style={{ fontSize:13,fontWeight:700,color:"#00ff88" }}>WhatsApp</div>
            <div style={{ fontSize:11,color:"#2a5a72" }}>+57 321 564 6716</div>
            <div style={{ fontSize:10,color:"#1a4a2e",marginTop:2 }}>Respuesta inmediata</div>
          </a>
          <a href="mailto:profeoscarbol@gmail.com"
            style={{ background:"#0a1520",border:"1px solid #1a3a5e",padding:"14px 16px",textDecoration:"none",display:"flex",flexDirection:"column",gap:6,transition:"border-color 0.15s" }}
            onMouseEnter={e=>e.currentTarget.style.borderColor="#00e5ff"}
            onMouseLeave={e=>e.currentTarget.style.borderColor="#1a3a5e"}>
            <div style={{ fontSize:22 }}>✉</div>
            <div style={{ fontSize:13,fontWeight:700,color:"#00e5ff" }}>Email</div>
            <div style={{ fontSize:11,color:"#2a5a72" }}>profeoscarbol@gmail.com</div>
            <div style={{ fontSize:10,color:"#1a3a5e",marginTop:2 }}>Respuesta en 24h</div>
          </a>
        </div>

        {/* Form */}
        <div style={{ padding:"20px 28px 28px" }}>
          <div style={{ fontSize:11,color:"#2a5a72",letterSpacing:1,textTransform:"uppercase",marginBottom:14 }}>O envíanos un mensaje</div>

          {sent ? (
            <div style={{ background:"#001a0e",border:"1px solid #003a22",padding:16,textAlign:"center",color:"#00ff88",fontSize:14 }}>
              ✓ Mensaje preparado — se abrió tu cliente de correo
            </div>
          ) : (
            <form onSubmit={handleEmail} style={{ display:"flex",flexDirection:"column",gap:12 }}>
              <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:10 }}>
                <div>
                  <div style={{ fontSize:10,color:"#4a7a96",letterSpacing:1,textTransform:"uppercase",marginBottom:5 }}>Nombre *</div>
                  <input style={{ width:"100%",padding:"9px 12px",background:"#0a1520",border:"1px solid #1a3a5e",color:"#c8e6f0",fontFamily:"Outfit,sans-serif",fontSize:13,outline:"none" }}
                    placeholder="Tu nombre" value={form.name}
                    onChange={e=>setForm(p=>({...p,name:e.target.value}))} />
                </div>
                <div>
                  <div style={{ fontSize:10,color:"#4a7a96",letterSpacing:1,textTransform:"uppercase",marginBottom:5 }}>Email</div>
                  <input style={{ width:"100%",padding:"9px 12px",background:"#0a1520",border:"1px solid #1a3a5e",color:"#c8e6f0",fontFamily:"Outfit,sans-serif",fontSize:13,outline:"none" }}
                    type="email" placeholder="tu@email.com" value={form.email}
                    onChange={e=>setForm(p=>({...p,email:e.target.value}))} />
                </div>
              </div>
              <div>
                <div style={{ fontSize:10,color:"#4a7a96",letterSpacing:1,textTransform:"uppercase",marginBottom:5 }}>Mensaje *</div>
                <textarea style={{ width:"100%",padding:"9px 12px",background:"#0a1520",border:"1px solid #1a3a5e",color:"#c8e6f0",fontFamily:"Outfit,sans-serif",fontSize:13,outline:"none",resize:"vertical",minHeight:80 }}
                  placeholder="¿En qué podemos ayudarte?" value={form.msg}
                  onChange={e=>setForm(p=>({...p,msg:e.target.value}))} />
              </div>
              <div style={{ display:"flex",gap:10 }}>
                <button type="button" onClick={handleWA}
                  disabled={!form.name||!form.msg}
                  style={{ flex:1,padding:"11px 0",background:"transparent",border:"1px solid #00ff88",color:"#00ff88",fontFamily:"Outfit,sans-serif",fontSize:13,fontWeight:700,cursor:"pointer",opacity:(!form.name||!form.msg)?0.4:1 }}>
                  💬 Enviar por WhatsApp
                </button>
                <button type="submit"
                  disabled={!form.name||!form.msg||sending}
                  style={{ flex:1,padding:"11px 0",background:"transparent",border:"1px solid #00e5ff",color:"#00e5ff",fontFamily:"Outfit,sans-serif",fontSize:13,fontWeight:700,cursor:"pointer",opacity:(!form.name||!form.msg)?0.4:1 }}>
                  {sending ? "Abriendo..." : "✉ Enviar por Email"}
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}

const PAID_TABS = ["Wallets","Cobertura","Trading Automatizado","Programa CryptoEducation","Programa","Crypto Bootcamp"];

// ── NotificationBell ──────────────────────────────────────────────────
function NotificationBell({ userId }) {
  const { notifs, noLeidas, marcarLeida, marcarTodasLeidas } = useNotificaciones(userId)
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  // Cerrar al hacer clic fuera
  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const iconos = { pregunta_respondida:'💬', plan_actualizado:'⚡', curso_completado:'🎓' }
  const fmtDate = (d) => {
    const diff = Date.now() - new Date(d).getTime()
    const min  = Math.floor(diff / 60000)
    const hrs  = Math.floor(diff / 3600000)
    const dias = Math.floor(diff / 86400000)
    if (min < 1)   return 'Ahora'
    if (min < 60)  return `Hace ${min}m`
    if (hrs < 24)  return `Hace ${hrs}h`
    return `Hace ${dias}d`
  }

  return (
    <div ref={ref} style={{ position:'relative' }}>
      {/* Botón campanita */}
      <button
        onClick={() => { setOpen(o => !o); if (!open && noLeidas > 0) {} }}
        style={{ position:'relative', background:'none', border:'1px solid #1a3a5e', color: noLeidas > 0 ? '#00e5ff' : '#4a7a96', width:36, height:36, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', transition:'all 0.15s', flexShrink:0 }}
        onMouseEnter={e => { e.currentTarget.style.borderColor='#00e5ff'; e.currentTarget.style.color='#00e5ff' }}
        onMouseLeave={e => { e.currentTarget.style.borderColor='#1a3a5e'; e.currentTarget.style.color= noLeidas>0?'#00e5ff':'#4a7a96' }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
        </svg>
        {noLeidas > 0 && (
          <span style={{ position:'absolute', top:-4, right:-4, background:'#ff4f6e', color:'#fff', fontSize:9, fontWeight:800, width:16, height:16, borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', border:'2px solid #050a0f' }}>
            {noLeidas > 9 ? '9+' : noLeidas}
          </span>
        )}
      </button>

      {/* Panel dropdown */}
      {open && (
        <div style={{ position:'absolute', top:'calc(100% + 8px)', right:0, width:320, background:'#070d14', border:'1px solid #1a3a5e', zIndex:300, boxShadow:'0 8px 32px rgba(0,0,0,0.6)', maxHeight:420, display:'flex', flexDirection:'column' }}>
          {/* Header */}
          <div style={{ padding:'14px 16px', borderBottom:'1px solid #0e2435', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
            <span style={{ fontSize:13, fontWeight:700, color:'#c8e6f0' }}>Notificaciones</span>
            {noLeidas > 0 && (
              <button onClick={marcarTodasLeidas}
                style={{ background:'none', border:'none', color:'#00e5ff', fontSize:11, cursor:'pointer', fontFamily:'Outfit,sans-serif' }}>
                Marcar todas como leídas
              </button>
            )}
          </div>

          {/* Lista */}
          <div style={{ overflowY:'auto', flex:1 }}>
            {notifs.length === 0 ? (
              <div style={{ padding:'32px 16px', textAlign:'center', color:'#2a5a72', fontSize:13 }}>
                Sin notificaciones
              </div>
            ) : (
              notifs.map(n => (
                <div key={n.id}
                  onClick={() => { if (!n.leida) marcarLeida(n.id) }}
                  style={{ padding:'14px 16px', borderBottom:'1px solid #0e2435', cursor: n.leida?'default':'pointer', background: n.leida?'transparent':'rgba(0,229,255,0.03)', display:'flex', gap:12, alignItems:'flex-start', transition:'background 0.15s' }}
                  onMouseEnter={e => { if(!n.leida) e.currentTarget.style.background='rgba(0,229,255,0.06)' }}
                  onMouseLeave={e => { if(!n.leida) e.currentTarget.style.background='rgba(0,229,255,0.03)' }}
                >
                  <span style={{ fontSize:18, flexShrink:0, marginTop:1 }}>{iconos[n.tipo] || '🔔'}</span>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontSize:13, fontWeight: n.leida?400:700, color: n.leida?'#4a7a96':'#c8e6f0', marginBottom:3 }}>{n.titulo}</div>
                    <div style={{ fontSize:12, color:'#4a7a96', lineHeight:1.5 }}>{n.mensaje}</div>
                    <div style={{ fontSize:10, color:'#2a5a72', marginTop:5, display:'flex', alignItems:'center', gap:6 }}>
                      {fmtDate(n.created_at)}
                      {!n.leida && <span style={{ width:6, height:6, borderRadius:'50%', background:'#00e5ff', display:'inline-block' }} />}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}

// ── UsersAdminTab ─────────────────────────────────────────────────────
function UsersAdminTab() {
  const { user: me, isAdmin } = useAuth()
  const { users, loading, error, updateUser, deleteUser, reload } = useUsersAdmin(isAdmin)

  const [search,  setSearch]  = useState("")
  const [confirm, setConfirm] = useState(null) // { user, action, label }
  const [saving,  setSaving]  = useState(null)
  const [toast,   setToast]   = useState(null)

  const showToast = (msg, ok = true) => {
    setToast({ msg, ok })
    setTimeout(() => setToast(null), 3000)
  }

  const handleConfirm = async () => {
    if (!confirm) return
    setSaving(confirm.user.id)
    const { error } = confirm.deleteUser
      ? await deleteUser(confirm.user.id)
      : await updateUser(confirm.user.id, confirm.changes)
    setSaving(null)
    setConfirm(null)
    if (error) showToast("Error: " + error, false)
    else showToast(confirm.successMsg)
  }

  const filtered = users.filter(u =>
    !search ||
    u.full_name?.toLowerCase().includes(search.toLowerCase()) ||
    u.email?.toLowerCase().includes(search.toLowerCase())
  )

  const initials = (u) => (u.full_name || u.email || "?").split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)

  const fmtDate = (d) => d ? new Date(d).toLocaleDateString("es-CO", { day:"numeric", month:"short", year:"numeric" }) : "—"

  const badge = (txt, color, bg) => (
    <span style={{ padding:"3px 10px", fontSize:10, fontWeight:700, letterSpacing:1, textTransform:"uppercase", border:`1px solid ${color}44`, color, background:bg || `${color}11` }}>{txt}</span>
  )

  if (!isAdmin) return (
    <div style={{ display:"flex", alignItems:"center", justifyContent:"center", height:"60%", color:"#2a5a72", fontSize:14 }}>
      🔒 Acceso restringido
    </div>
  )

  return (
    <div style={{ padding:"32px", maxWidth:1100, margin:"0 auto", display:"flex", flexDirection:"column", gap:24, position:"relative" }}>

      {/* Toast */}
      {toast && (
        <div style={{ position:"fixed", top:24, right:24, zIndex:999, padding:"12px 20px", background: toast.ok ? "#001a0e" : "#1a0810", border:`1px solid ${toast.ok?"#003a22":"#5a1a28"}`, color: toast.ok?"#00ff88":"#ff6b88", fontSize:13, fontWeight:600, boxShadow:"0 4px 20px rgba(0,0,0,0.5)" }}>
          {toast.ok ? "✓" : "⚠"} {toast.msg}
        </div>
      )}

      {/* Modal de confirmación */}
      {confirm && (
        <div style={{ position:"fixed", inset:0, background:"rgba(5,10,15,0.85)", zIndex:200, display:"flex", alignItems:"center", justifyContent:"center", backdropFilter:"blur(6px)" }}>
          <div style={{ background:"#070d14", border:"1px solid #1a3a5e", width:"100%", maxWidth:400, padding:"32px", display:"flex", flexDirection:"column", gap:20 }}>
            <div style={{ fontSize:11, fontWeight:700, color:"#00e5ff", letterSpacing:3, textTransform:"uppercase" }}>Confirmar cambio</div>
            <div>
              <div style={{ fontSize:16, fontWeight:700, color:"#fff", marginBottom:8 }}>{confirm.label}</div>
              <div style={{ display:"flex", alignItems:"center", gap:12, padding:"16px", background:"#0a1520", border:"1px solid #0e2435" }}>
                <div style={{ width:40, height:40, background:"#0a2a3e", border:"1px solid #1a4a6e", display:"flex", alignItems:"center", justifyContent:"center", fontSize:14, color:"#00e5ff", fontWeight:700, flexShrink:0 }}>
                  {initials(confirm.user)}
                </div>
                <div>
                  <div style={{ fontSize:14, fontWeight:600, color:"#c8e6f0" }}>{confirm.user.full_name || "Sin nombre"}</div>
                  <div style={{ fontSize:12, color:"#4a7a96" }}>{confirm.user.email}</div>
                </div>
              </div>
              <div style={{ marginTop:12, display:"flex", alignItems:"center", gap:10, fontSize:13, color:"#7ab8d4" }}>
                <span>{confirm.fromLabel}</span>
                <span style={{ color:"#00e5ff" }}>→</span>
                <span style={{ fontWeight:700, color:"#fff" }}>{confirm.toLabel}</span>
              </div>
            </div>
            <div style={{ display:"flex", gap:10 }}>
              <button onClick={() => setConfirm(null)}
                style={{ flex:1, padding:"11px 0", background:"transparent", border:"1px solid #1a3a5e", color:"#4a7a96", fontFamily:"Outfit,sans-serif", fontSize:13, fontWeight:600, cursor:"pointer" }}>
                Cancelar
              </button>
              <button onClick={handleConfirm} disabled={saving === confirm.user.id}
                style={{ flex:1, padding:"11px 0", background:"transparent", border:`1px solid ${confirm.danger?"#ff4f6e":"#00e5ff"}`, color:confirm.danger?"#ff4f6e":"#00e5ff", fontFamily:"Outfit,sans-serif", fontSize:13, fontWeight:700, cursor:"pointer" }}>
                {saving === confirm.user.id ? "Guardando..." : "Confirmar"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", flexWrap:"wrap", gap:12 }}>
        <div>
          <div style={{ fontSize:11, fontWeight:700, color:"#00e5ff", letterSpacing:3, textTransform:"uppercase", marginBottom:8 }}>Panel Admin</div>
          <h2 style={{ fontSize:26, fontWeight:800, color:"#fff", marginBottom:4 }}>Gestión de usuarios</h2>
          <p style={{ fontSize:13, color:"#4a7a96" }}>{users.length} usuario{users.length !== 1 ? "s" : ""} registrado{users.length !== 1 ? "s" : ""}</p>
        </div>
        <div style={{ display:"flex", gap:10 }}>
          <input
            placeholder="Buscar por nombre o email..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ padding:"9px 14px", background:"#0a1520", border:"1px solid #1a3a5e", color:"#c8e6f0", fontFamily:"Outfit,sans-serif", fontSize:13, outline:"none", width:240 }}
          />
          <button onClick={reload}
            style={{ padding:"9px 14px", background:"transparent", border:"1px solid #1a3a5e", color:"#4a7a96", fontFamily:"Outfit,sans-serif", fontSize:13, cursor:"pointer" }}>
            ↻ Actualizar
          </button>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display:"flex", gap:14, flexWrap:"wrap" }}>
        {[
          { label:"Total usuarios",        val:users.length,                            color:"#00e5ff" },
          { label:"Trader en Formación",   val:users.filter(u=>u.is_paid).length,       color:"#00ff88" },
          { label:"Potencial Trader",      val:users.filter(u=>!u.is_paid).length,      color:"#ffb347" },
          { label:"Login con Google",      val:users.filter(u=>u.is_sso_gmail).length,  color:"#627eea" },
        ].map((s, i) => (
          <div key={i} style={{ background:"#070d14", border:"1px solid #1a3a5e", padding:"16px 20px", flex:1, minWidth:140 }}>
            <div style={{ fontSize:24, fontWeight:800, color:s.color, lineHeight:1 }}>{s.val}</div>
            <div style={{ fontSize:11, color:"#4a7a96", marginTop:4, textTransform:"uppercase", letterSpacing:1 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Tabla */}
      {loading && <div style={{ color:"#2a5a72", fontSize:13 }}>Cargando usuarios...</div>}
      {error   && <div style={{ color:"#ff6b88", fontSize:13 }}>⚠ {error}</div>}
      {!loading && !error && (
        <div style={{ background:"#070d14", border:"1px solid #1a3a5e" }}>
          {/* Cabecera */}
          <div style={{ display:"grid", gridTemplateColumns:"2fr 2fr 1fr 1fr 1fr 160px", gap:0, padding:"10px 20px", borderBottom:"1px solid #0e2435", fontSize:10, fontWeight:700, color:"#2a5a72", letterSpacing:2, textTransform:"uppercase" }}>
            <span>Usuario</span><span>Email</span><span>Plan</span><span>Admin</span><span>Registro</span><span style={{ textAlign:"right" }}>Acciones</span>
          </div>
          {filtered.length === 0 && (
            <div style={{ padding:"32px", textAlign:"center", color:"#2a5a72", fontSize:13 }}>Sin resultados</div>
          )}
          {filtered.map((u, i) => {
            const isMe = u.id === me?.id
            return (
              <div key={u.id} style={{ display:"grid", gridTemplateColumns:"2fr 2fr 1fr 1fr 1fr 160px", gap:0, padding:"14px 20px", borderBottom: i < filtered.length-1 ? "1px solid #0e2435" : "none", alignItems:"center", background: isMe ? "rgba(0,229,255,0.02)" : "transparent" }}>

                {/* Nombre */}
                <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                  <div style={{ width:32, height:32, background:"#0a2a3e", border:"1px solid #1a4a6e", display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, color:"#00e5ff", fontWeight:700, flexShrink:0 }}>
                    {initials(u)}
                  </div>
                  <div>
                    <div style={{ fontSize:13, fontWeight:600, color:"#c8e6f0" }}>
                      {u.full_name || "Sin nombre"}
                      {isMe && <span style={{ marginLeft:6, fontSize:9, color:"#00e5ff", fontWeight:700, letterSpacing:1 }}>TÚ</span>}
                    </div>
                    {u.is_sso_gmail && <div style={{ fontSize:10, color:"#627eea" }}>G Google</div>}
                  </div>
                </div>

                {/* Email */}
                <div style={{ fontSize:12, color:"#4a7a96", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap", paddingRight:8 }}>{u.email || "—"}</div>

                {/* Plan */}
                <div>
                  {u.is_paused
                    ? badge("Pausado","#ffb347","#1a0800")
                    : u.is_paid
                      ? badge("Formación","#00ff88")
                      : badge("Potencial","#4a7a96")
                  }
                </div>

                {/* Admin */}
                <div>{u.is_admin ? badge("Admin","#00e5ff") : <span style={{ fontSize:11, color:"#1a3a5e" }}>—</span>}</div>

                {/* Fecha */}
                <div style={{ fontSize:11, color:"#2a5a72" }}>{fmtDate(u.created_at)}</div>

                {/* Acciones */}
                <div style={{ display:"flex", gap:6, justifyContent:"flex-end", flexWrap:"wrap" }}>
                  {/* Toggle plan */}
                  {!isMe && (
                    <button
                      disabled={saving === u.id}
                      onClick={() => setConfirm({
                        user: u,
                        changes: { is_paid: !u.is_paid },
                        label: u.is_paid ? "Bajar a Potencial Trader" : "Subir a Trader en Formación",
                        fromLabel: u.is_paid ? "Trader en Formación" : "Potencial Trader",
                        toLabel:   u.is_paid ? "Potencial Trader" : "Trader en Formación",
                        successMsg: `${u.full_name || u.email} actualizado correctamente`,
                        danger: u.is_paid,
                      })}
                      style={{
                        padding:"5px 10px", fontSize:11, fontWeight:700, cursor:"pointer",
                        fontFamily:"Outfit,sans-serif", letterSpacing:"0.5px",
                        background:"transparent",
                        border:`1px solid ${u.is_paid?"#ff4f6e44":"#00ff8844"}`,
                        color: u.is_paid ? "#ff4f6e" : "#00ff88",
                        transition:"all 0.15s", whiteSpace:"nowrap",
                      }}
                      onMouseEnter={e => e.currentTarget.style.borderColor = u.is_paid?"#ff4f6e":"#00ff88"}
                      onMouseLeave={e => e.currentTarget.style.borderColor = u.is_paid?"#ff4f6e44":"#00ff8844"}
                    >
                      {saving===u.id ? "..." : u.is_paid ? "↓ Bajar plan" : "↑ Activar plan"}
                    </button>
                  )}
                  {/* Toggle admin */}
                  {!isMe && (
                    <button
                      disabled={saving === u.id}
                      onClick={() => setConfirm({
                        user: u,
                        changes: { is_admin: !u.is_admin },
                        label: u.is_admin ? "Quitar rol de admin" : "Dar rol de admin",
                        fromLabel: u.is_admin ? "Admin" : "Usuario",
                        toLabel:   u.is_admin ? "Usuario" : "Admin",
                        successMsg: `Rol de ${u.full_name || u.email} actualizado`,
                        danger: false,
                      })}
                      style={{ padding:"5px 10px", fontSize:11, fontWeight:700, cursor:"pointer", fontFamily:"Outfit,sans-serif", background:"transparent", border:"1px solid #1a3a5e", color:"#4a7a96", transition:"all 0.15s" }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor="#00e5ff"; e.currentTarget.style.color="#00e5ff" }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor="#1a3a5e"; e.currentTarget.style.color="#4a7a96" }}
                    >
                      {u.is_admin ? "− Admin" : "+ Admin"}
                    </button>
                  )}

                  {/* Pausar membresía */}
                  {!isMe && (
                    <button
                      disabled={saving === u.id}
                      onClick={() => setConfirm({
                        user: u,
                        changes: { is_paused: !u.is_paused },
                        label: u.is_paused ? "Reactivar membresía" : "Pausar membresía",
                        fromLabel: u.is_paused ? "Pausada" : "Activa",
                        toLabel:   u.is_paused ? "Activa" : "Pausada",
                        successMsg: `Membresía de ${u.full_name || u.email} ${u.is_paused ? "reactivada" : "pausada"}`,
                        danger: !u.is_paused,
                      })}
                      style={{ padding:"5px 10px", fontSize:11, fontWeight:700, cursor:"pointer", fontFamily:"Outfit,sans-serif", background:"transparent", border:`1px solid ${u.is_paused?"#00ff8844":"#ffb34744"}`, color:u.is_paused?"#00ff88":"#ffb347", transition:"all 0.15s" }}
                      onMouseEnter={e => e.currentTarget.style.borderColor = u.is_paused?"#00ff88":"#ffb347"}
                      onMouseLeave={e => e.currentTarget.style.borderColor = u.is_paused?"#00ff8844":"#ffb34744"}
                    >
                      {u.is_paused ? "▶ Reactivar" : "⏸ Pausar"}
                    </button>
                  )}

                  {/* Eliminar usuario */}
                  {!isMe && (
                    <button
                      disabled={saving === u.id}
                      onClick={() => setConfirm({
                        user: u,
                        changes: null,
                        deleteUser: true,
                        label: "Eliminar usuario permanentemente",
                        fromLabel: u.email,
                        toLabel:   "Eliminado",
                        successMsg: `${u.full_name || u.email} eliminado`,
                        danger: true,
                      })}
                      style={{ padding:"5px 10px", fontSize:11, fontWeight:700, cursor:"pointer", fontFamily:"Outfit,sans-serif", background:"transparent", border:"1px solid #ff4f6e44", color:"#ff4f6e", transition:"all 0.15s" }}
                      onMouseEnter={e => e.currentTarget.style.borderColor="#ff4f6e"}
                      onMouseLeave={e => e.currentTarget.style.borderColor="#ff4f6e44"}
                    >
                      🗑 Eliminar
                    </button>
                  )}

                  {isMe && <span style={{ fontSize:11, color:"#1a3a5e", paddingRight:4 }}>Tu cuenta</span>}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

// ── PreguntasTab ──────────────────────────────────────────────────────
function PreguntasTab() {
  const { user, profile, isAdmin } = useAuth()
  const userName = profile?.full_name || user?.user_metadata?.full_name || user?.email?.split("@")[0] || "Usuario"
  const { misPreguntas, faqPublica, pendientes, loading,
          enviarPregunta, responderPregunta, eliminarPregunta, reload } = usePreguntasSync(user?.id, isAdmin)

  const [texto,       setTexto]       = useState("")
  const [sending,     setSending]     = useState(false)
  const [sendOk,      setSendOk]      = useState(false)
  const [sendErr,     setSendErr]     = useState("")
  const [openFaq,     setOpenFaq]     = useState(null)
  const [adminTab,    setAdminTab]    = useState("pendientes")
  const [respuestas,  setRespuestas]  = useState({})
  const [publicas,    setPublicas]    = useState({})
  const [answering,   setAnswering]   = useState(null)

  const handleEnviar = async (e) => {
    e.preventDefault()
    if (!texto.trim()) return
    setSending(true); setSendErr("")
    const { error } = await enviarPregunta(texto.trim(), userName)
    setSending(false)
    if (error) { setSendErr("No se pudo enviar. Intenta de nuevo."); return }
    setTexto(""); setSendOk(true)
    setTimeout(() => setSendOk(false), 4000)
  }

  const handleResponder = async (id) => {
    const r = respuestas[id]?.trim()
    if (!r) return
    setAnswering(id)
    const pub = publicas[id] !== false // default true
    await responderPregunta(id, r, pub)
    setAnswering(null)
    setRespuestas(prev => { const n = {...prev}; delete n[id]; return n })
  }

  const fmtDate = (d) => d ? new Date(d).toLocaleDateString("es-CO", { day:"numeric", month:"short", year:"numeric" }) : ""

  const pill = (txt, color) => (
    <span style={{ padding:"2px 8px", fontSize:10, fontWeight:700, letterSpacing:1, border:`1px solid ${color}33`, color, background:`${color}11`, textTransform:"uppercase" }}>{txt}</span>
  )

  return (
    <div style={{ padding:"32px", maxWidth:1100, margin:"0 auto", display:"flex", flexDirection:"column", gap:28 }}>

      {/* ── Header ── */}
      <div>
        <div style={{ fontSize:11, fontWeight:700, color:"#00e5ff", letterSpacing:3, textTransform:"uppercase", marginBottom:8 }}>Preguntas</div>
        <h2 style={{ fontSize:26, fontWeight:800, color:"#fff", marginBottom:6 }}>Preguntas & Respuestas</h2>
        <p style={{ fontSize:14, color:"#4a7a96" }}>
          {isAdmin ? `Panel de administración — ${pendientes.length} pregunta${pendientes.length !== 1 ? "s" : ""} pendiente${pendientes.length !== 1 ? "s" : ""}` : "Envía tu pregunta y Oscar te responderá directamente."}
        </p>
      </div>

      {/* ══ VISTA ADMIN ══════════════════════════════════════════════ */}
      {isAdmin && (
        <div style={{ display:"flex", flexDirection:"column", gap:20 }}>

          {/* Tabs admin */}
          <div style={{ display:"flex", borderBottom:"1px solid #0e2435" }}>
            {[["pendientes", `Sin responder (${pendientes.length})`], ["respondidas", `Respondidas (${misPreguntas.length})`], ["faq", `FAQ pública (${faqPublica.length})`]].map(([k, l]) => (
              <button key={k} onClick={() => setAdminTab(k)} style={{
                padding:"10px 20px", background:"none", border:"none", cursor:"pointer",
                fontFamily:"Outfit,sans-serif", fontSize:13, fontWeight:600,
                borderBottom:`2px solid ${adminTab===k?"#00e5ff":"transparent"}`,
                color: adminTab===k ? "#00e5ff" : "#4a7a96", transition:"all 0.15s",
              }}>{l}</button>
            ))}
            <button onClick={reload} style={{ marginLeft:"auto", background:"none", border:"none", color:"#2a5a72", cursor:"pointer", fontSize:12, padding:"10px 16px" }}>↻ Actualizar</button>
          </div>

          {/* Pendientes */}
          {adminTab === "pendientes" && (
            <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
              {loading && <div style={{ color:"#2a5a72", fontSize:13 }}>Cargando...</div>}
              {!loading && pendientes.length === 0 && (
                <div style={{ textAlign:"center", padding:"40px 0", color:"#2a5a72", fontSize:14 }}>
                  ✓ No hay preguntas pendientes
                </div>
              )}
              {pendientes.map(p => (
                <div key={p.id} style={{ background:"#070d14", border:"1px solid #1a3a5e", padding:"24px" }}>
                  <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:12, marginBottom:16 }}>
                    <div>
                      <div style={{ fontSize:12, fontWeight:700, color:"#00e5ff", marginBottom:4 }}>{p.user_name || "Usuario"}</div>
                      <div style={{ fontSize:15, color:"#c8e6f0", lineHeight:1.6 }}>{p.pregunta}</div>
                      <div style={{ fontSize:11, color:"#2a5a72", marginTop:6 }}>{fmtDate(p.created_at)}</div>
                    </div>
                    <button onClick={() => eliminarPregunta(p.id)} style={{ background:"none", border:"none", color:"#2a5a72", cursor:"pointer", fontSize:16, flexShrink:0, padding:0 }} title="Eliminar">✕</button>
                  </div>
                  <textarea
                    placeholder="Escribe la respuesta..."
                    value={respuestas[p.id] || ""}
                    onChange={e => setRespuestas(prev => ({...prev, [p.id]: e.target.value}))}
                    style={{ width:"100%", minHeight:90, background:"#0a1520", border:"1px solid #1a3a5e", color:"#c8e6f0", fontFamily:"Outfit,sans-serif", fontSize:14, padding:"12px 14px", outline:"none", resize:"vertical", boxSizing:"border-box" }}
                  />
                  <div style={{ display:"flex", alignItems:"center", gap:16, marginTop:12 }}>
                    <label style={{ display:"flex", alignItems:"center", gap:8, fontSize:13, color:"#4a7a96", cursor:"pointer" }}>
                      <input type="checkbox"
                        checked={publicas[p.id] !== false}
                        onChange={e => setPublicas(prev => ({...prev, [p.id]: e.target.checked}))}
                        style={{ accentColor:"#00e5ff" }}
                      />
                      Publicar en FAQ
                    </label>
                    <button
                      onClick={() => handleResponder(p.id)}
                      disabled={!respuestas[p.id]?.trim() || answering === p.id}
                      style={{ marginLeft:"auto", padding:"9px 24px", background:"transparent", border:"1px solid #00e5ff", color:"#00e5ff", fontFamily:"Outfit,sans-serif", fontSize:13, fontWeight:700, cursor:"pointer", opacity:!respuestas[p.id]?.trim()?0.4:1, transition:"all 0.15s" }}
                    >
                      {answering === p.id ? "Enviando..." : "Responder →"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Respondidas (admin) */}
          {adminTab === "respondidas" && (
            <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
              {misPreguntas.map(p => (
                <div key={p.id} style={{ background:"#070d14", border:"1px solid #0e2435", padding:"20px 24px" }}>
                  <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}>
                    <div style={{ fontSize:12, fontWeight:700, color:"#7ab8d4" }}>{p.user_name || "Usuario"}</div>
                    <div style={{ display:"flex", gap:8, alignItems:"center" }}>
                      {p.publica ? pill("FAQ", "#00e5ff") : pill("Privada", "#4a7a96")}
                      <span style={{ fontSize:11, color:"#2a5a72" }}>{fmtDate(p.answered_at)}</span>
                      <button onClick={() => eliminarPregunta(p.id)} style={{ background:"none", border:"none", color:"#2a5a72", cursor:"pointer", fontSize:14, padding:0 }}>✕</button>
                    </div>
                  </div>
                  <div style={{ fontSize:14, color:"#c8e6f0", marginBottom:10 }}>{p.pregunta}</div>
                  <div style={{ fontSize:13, color:"#4a7a96", paddingLeft:14, borderLeft:"2px solid #00e5ff", lineHeight:1.7 }}>{p.respuesta}</div>
                </div>
              ))}
              {misPreguntas.length === 0 && <div style={{ color:"#2a5a72", fontSize:13, textAlign:"center", padding:"40px 0" }}>Sin preguntas respondidas aún</div>}
            </div>
          )}

          {/* FAQ pública (admin) */}
          {adminTab === "faq" && (
            <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              {faqPublica.map(p => (
                <div key={p.id} style={{ background:"#070d14", border:"1px solid #0e2435", padding:"20px 24px" }}>
                  <div style={{ fontSize:14, fontWeight:600, color:"#c8e6f0", marginBottom:8 }}>{p.pregunta}</div>
                  <div style={{ fontSize:13, color:"#4a7a96", paddingLeft:14, borderLeft:"2px solid #00e5ff", lineHeight:1.7 }}>{p.respuesta}</div>
                  <div style={{ fontSize:11, color:"#2a5a72", marginTop:8 }}>Respondida el {fmtDate(p.answered_at)}</div>
                </div>
              ))}
              {faqPublica.length === 0 && <div style={{ color:"#2a5a72", fontSize:13, textAlign:"center", padding:"40px 0" }}>Sin preguntas públicas aún</div>}
            </div>
          )}
        </div>
      )}

      {/* ══ VISTA USUARIO ════════════════════════════════════════════ */}
      {!isAdmin && (
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:24, alignItems:"start" }}>

          {/* Columna izquierda — Enviar + Mis preguntas */}
          <div style={{ display:"flex", flexDirection:"column", gap:20 }}>

            {/* Formulario */}
            <div style={{ background:"#070d14", border:"1px solid #1a3a5e", padding:"24px" }}>
              <div style={{ fontSize:13, fontWeight:700, color:"#c8e6f0", marginBottom:16 }}>Hacer una pregunta</div>
              {sendOk ? (
                <div style={{ background:"#001a0e", border:"1px solid #003a22", padding:"16px", fontSize:14, color:"#00ff88", textAlign:"center", lineHeight:1.7 }}>
                  ✓ Pregunta enviada — Oscar te responderá pronto
                </div>
              ) : (
                <form onSubmit={handleEnviar} style={{ display:"flex", flexDirection:"column", gap:12 }}>
                  <textarea
                    placeholder="¿Sobre qué tienes dudas? Sé específico para obtener la mejor respuesta..."
                    value={texto}
                    onChange={e => { setTexto(e.target.value); setSendErr("") }}
                    rows={5}
                    style={{ background:"#0a1520", border:"1px solid #1a3a5e", color:"#c8e6f0", fontFamily:"Outfit,sans-serif", fontSize:14, padding:"12px 14px", outline:"none", resize:"vertical", transition:"border-color 0.15s" }}
                    onFocus={e => e.target.style.borderColor="#00e5ff"}
                    onBlur={e => e.target.style.borderColor="#1a3a5e"}
                  />
                  <div style={{ fontSize:11, color:"#2a5a72", display:"flex", justifyContent:"space-between" }}>
                    <span>Se enviará como <strong style={{ color:"#4a7a96" }}>{userName}</strong></span>
                    <span style={{ color: texto.length > 800 ? "#ff4f6e" : "#2a5a72" }}>{texto.length}/1000</span>
                  </div>
                  {sendErr && <div style={{ fontSize:12, color:"#ff6b88" }}>⚠ {sendErr}</div>}
                  <button type="submit" disabled={!texto.trim() || sending || texto.length > 1000}
                    style={{ padding:"11px", background:"transparent", border:"1px solid #00e5ff", color:"#00e5ff", fontFamily:"Outfit,sans-serif", fontSize:14, fontWeight:700, cursor:"pointer", opacity:!texto.trim()?0.4:1, transition:"all 0.15s" }}>
                    {sending ? "Enviando..." : "Enviar pregunta →"}
                  </button>
                </form>
              )}
            </div>

            {/* Mis preguntas */}
            <div style={{ background:"#070d14", border:"1px solid #1a3a5e", padding:"24px" }}>
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:16 }}>
                <div style={{ fontSize:13, fontWeight:700, color:"#c8e6f0" }}>Mis preguntas</div>
                <button onClick={reload} style={{ background:"none", border:"none", color:"#2a5a72", cursor:"pointer", fontSize:12 }}>↻</button>
              </div>
              {loading && <div style={{ fontSize:13, color:"#2a5a72" }}>Cargando...</div>}
              {!loading && misPreguntas.length === 0 && (
                <div style={{ fontSize:13, color:"#2a5a72", textAlign:"center", padding:"20px 0" }}>
                  Aún no has enviado preguntas
                </div>
              )}
              <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
                {misPreguntas.map(p => (
                  <div key={p.id} style={{ padding:"16px", background:"#0a1520", border:`1px solid ${p.respondida?"#1a3a5e":"#0e2435"}` }}>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:8, marginBottom:8 }}>
                      <div style={{ fontSize:13, color:"#7ab8d4", lineHeight:1.5, flex:1 }}>{p.pregunta}</div>
                      {p.respondida ? pill("Respondida","#00ff88") : pill("Pendiente","#ffb347")}
                    </div>
                    {p.respondida && p.respuesta && (
                      <div style={{ marginTop:10, paddingLeft:12, borderLeft:"2px solid #00e5ff" }}>
                        <div style={{ fontSize:10, fontWeight:700, color:"#00e5ff", letterSpacing:1, textTransform:"uppercase", marginBottom:4 }}>Respuesta de Oscar</div>
                        <div style={{ fontSize:13, color:"#c8e6f0", lineHeight:1.7 }}>{p.respuesta}</div>
                        <div style={{ fontSize:11, color:"#2a5a72", marginTop:6 }}>{fmtDate(p.answered_at)}</div>
                      </div>
                    )}
                    {!p.respondida && (
                      <div style={{ fontSize:11, color:"#2a5a72", marginTop:6 }}>Enviada el {fmtDate(p.created_at)}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Columna derecha — FAQ */}
          <div style={{ background:"#070d14", border:"1px solid #1a3a5e", padding:"24px" }}>
            <div style={{ fontSize:13, fontWeight:700, color:"#c8e6f0", marginBottom:4 }}>Preguntas frecuentes</div>
            <div style={{ fontSize:12, color:"#2a5a72", marginBottom:20 }}>Preguntas respondidas por Oscar</div>
            {loading && <div style={{ fontSize:13, color:"#2a5a72" }}>Cargando...</div>}
            {!loading && faqPublica.length === 0 && (
              <div style={{ fontSize:13, color:"#2a5a72", textAlign:"center", padding:"40px 0" }}>
                Aún no hay preguntas públicas.<br />
                <span style={{ fontSize:11 }}>¡Sé el primero en preguntar!</span>
              </div>
            )}
            <div style={{ display:"flex", flexDirection:"column", gap:0 }}>
              {faqPublica.map((p, i) => (
                <div key={p.id} style={{ borderBottom:"1px solid #0e2435" }}>
                  <button
                    onClick={() => setOpenFaq(openFaq === p.id ? null : p.id)}
                    style={{ width:"100%", padding:"16px 0", background:"none", border:"none", display:"flex", justifyContent:"space-between", alignItems:"center", gap:12, cursor:"pointer", fontFamily:"Outfit,sans-serif", textAlign:"left" }}
                  >
                    <span style={{ fontSize:14, fontWeight:600, color: openFaq===p.id?"#00e5ff":"#c8e6f0", lineHeight:1.4, flex:1 }}>{p.pregunta}</span>
                    <span style={{ color:"#00e5ff", fontSize:18, flexShrink:0, transition:"transform 0.2s", transform: openFaq===p.id?"rotate(45deg)":"none" }}>+</span>
                  </button>
                  {openFaq === p.id && (
                    <div style={{ paddingBottom:16, paddingLeft:0 }}>
                      <div style={{ fontSize:13, color:"#7ab8d4", lineHeight:1.8, paddingLeft:14, borderLeft:"2px solid #00e5ff" }}>
                        {p.respuesta}
                      </div>
                      <div style={{ fontSize:11, color:"#2a5a72", marginTop:8 }}>
                        {p.user_name && <span>Preguntado por {p.user_name} · </span>}{fmtDate(p.answered_at)}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function LockedTab({ tabName }) {
  const { user, profile } = useAuth()
  const userName  = profile?.full_name || user?.user_metadata?.full_name || user?.email?.split("@")[0]
  const userEmail = user?.email
  const waUrl     = buildWaUpgradeUrl(userName, userEmail)
  return (
    <div style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center", padding:"60px 24px" }}>
      <div style={{ maxWidth:480, width:"100%", textAlign:"center" }}>
        <div style={{ fontSize:48, marginBottom:16 }}>🔒</div>
        <div style={{ fontSize:11, fontWeight:700, color:"#00e5ff", letterSpacing:3, textTransform:"uppercase", marginBottom:12 }}>
          Contenido exclusivo
        </div>
        <h2 style={{ fontSize:28, fontWeight:800, color:"#fff", marginBottom:12, lineHeight:1.2 }}>
          Acceso disponible para<br /><span style={{ color:"#00e5ff" }}>Traders en Formación</span>
        </h2>
        <p style={{ fontSize:14, color:"#4a7a96", lineHeight:1.7, marginBottom:32 }}>
          <strong style={{ color:"#7ab8d4" }}>{tabName}</strong> es parte del programa de formación profesional.
          Únete y obtén acceso completo a todas las herramientas, el programa educativo y el acompañamiento personalizado.
        </p>
        <div style={{ display:"flex", flexDirection:"column", gap:10, alignItems:"center" }}>
          <a
            href={waUrl}
            target="_blank" rel="noreferrer"
            style={{ display:"inline-block", padding:"13px 36px", background:"#00e5ff", color:"#050a0f", fontFamily:"Outfit,sans-serif", fontSize:14, fontWeight:700, letterSpacing:"0.5px", textDecoration:"none", transition:"opacity 0.15s" }}
            onMouseEnter={e=>e.currentTarget.style.opacity="0.88"}
            onMouseLeave={e=>e.currentTarget.style.opacity="1"}
          >
            Hablar con Oscar →
          </a>
          <a
            href="/"
            style={{ fontSize:13, color:"#2a5a72", textDecoration:"none", transition:"color 0.15s" }}
            onMouseEnter={e=>e.currentTarget.style.color="#7ab8d4"}
            onMouseLeave={e=>e.currentTarget.style.color="#2a5a72"}
          >
            Ver planes y precios
          </a>
        </div>
        <div style={{ marginTop:40, padding:"20px 24px", background:"#070d14", border:"1px solid #0e2435", textAlign:"left" }}>
          <div style={{ fontSize:11, fontWeight:700, color:"#4a7a96", letterSpacing:2, textTransform:"uppercase", marginBottom:14 }}>
            Incluido en tu plan
          </div>
          {[
            "Programa completo de formación en criptomonedas",
            "Liquidity Engine — gestión de pools Uniswap V3",
            "Trading automatizado en Hyperliquid",
            "Cobertura automático SHORT",
            "Acompañamiento personalizado 1 a 1",
          ].map((item, i) => (
            <div key={i} style={{ display:"flex", alignItems:"center", gap:10, fontSize:13, color:"#7ab8d4", marginBottom:10 }}>
              <div style={{ width:6, height:6, background:"#00e5ff", flexShrink:0 }} />
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

class AppErrorBoundary extends Component {
  constructor(props) { super(props); this.state = { error: null }; }
  static getDerivedStateFromError(error) { return { error }; }
  render() {
    if (this.state.error) {
      return (
        <div style={{ display:"flex", alignItems:"center", justifyContent:"center", height:"100vh", background:"#050a0f", fontFamily:"Outfit,sans-serif", padding:24 }}>
          <div style={{ maxWidth:600, width:"100%", textAlign:"center" }}>
            <div style={{ fontSize:40, marginBottom:16 }}>⚠</div>
            <div style={{ fontSize:18, fontWeight:700, color:"#ff4f6e", marginBottom:12 }}>Algo salió mal</div>
            <div style={{ fontSize:13, color:"#4a7a96", marginBottom:24, lineHeight:1.6 }}>
              Hubo un error al cargar la aplicación. Copia el mensaje de abajo y envíalo a soporte.
            </div>
            <div style={{ background:"#0a1520", border:"1px solid #1a3a5e", padding:"16px", borderRadius:8, textAlign:"left", fontSize:11, color:"#ff6b88", fontFamily:"monospace", marginBottom:24, wordBreak:"break-all" }}>
              {this.state.error?.message || String(this.state.error)}
            </div>
            <button
              onClick={() => window.location.reload()}
              style={{ padding:"10px 28px", background:"#00e5ff", color:"#050a0f", border:"none", borderRadius:8, fontFamily:"Outfit,sans-serif", fontSize:14, fontWeight:700, cursor:"pointer" }}
            >
              Recargar página
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  const { user, profile, signOut, isPaid, planLabel, isAdmin } = useAuth();

  // activeSection: sección del sidebar (NAV_ITEMS o "liquidity")
  const [activeSection, setActiveSection] = useState("Dashboard");
  // activeLiquidityTab: sub-tab dentro de Liquidity Engine
  const [activeLiquidityTab, setActiveLiquidityTab] = useState("Cobertura");

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [hlTestOpen, setHlTestOpen]   = useState(false);
  const closeSidebar = () => setSidebarOpen(false);

  // Escucha navegación desde accesos rápidos del Dashboard
  useEffect(() => {
    const handler = (e) => {
      const { section, tab } = e.detail;
      if (section) setActiveSection(section);
      if (tab)     setActiveLiquidityTab(tab);
    };
    window.addEventListener("dash-navigate", handler);
    return () => window.removeEventListener("dash-navigate", handler);
  }, []);

  const isLiquiditySection = activeSection === "liquidity";

  // Dynamic user info from Google/Supabase
  const userName  = profile?.full_name || user?.user_metadata?.full_name || user?.email?.split("@")[0] || "Usuario";
  const userEmail = user?.email || "";
  const avatarUrl = profile?.avatar_url || user?.user_metadata?.avatar_url || null;
  const initials  = userName.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
  const waUpgradeUrl = buildWaUpgradeUrl(userName !== "Usuario" ? userName : null, userEmail || null);

  const SECTION_TITLES = { liquidity:"Liquidity Engine", Dashboard:"Dashboard", Programa:"Programa", "Crypto Bootcamp":"Crypto Bootcamp", TradingView:"TradingView", TradingViewOperable:"TradingView Operable", Preguntas:"Preguntas", "Users Admin":"Users Admin" };

  const renderContent = () => {
    if (isLiquiditySection) {
      if (!isPaid && PAID_TABS.includes(activeLiquidityTab)) return <LockedTab tabName={activeLiquidityTab} />;
      switch (activeLiquidityTab) {
        case "Wallets":              return <WalletsTab />;
        case "Cobertura":            return <CoberturaTab />;
        case "Monitor de Cobertura":  return <HedgeTrackerTab />;
        case "Trading Automatizado":
        case "Insider (Trading)":
        default:                     return <ComingSoonTab name={activeLiquidityTab} />;
      }
    }
    // Secciones del sidebar
    if (!isPaid && PAID_TABS.includes(activeSection)) return <LockedTab tabName={activeSection} />;
    switch (activeSection) {
      case "Dashboard":       return <DashboardTab />;
      case "Programa":        return <ProgramaTab />;
      case "Crypto Bootcamp": return <CryptoBootcampTab />;
      case "TradingView":          return <TradingViewTab />;
      case "TradingViewOperable":  return <TradingViewOperableTab />;
      case "Preguntas":       return <PreguntasTab />;
      case "Users Admin":     return <UsersAdminTab />;
      default:                return <ComingSoonTab name={activeSection} />;
    }
  };

  return (
    <>
      <div className="app">
        <div className={`overlay ${sidebarOpen ? "open" : ""}`} onClick={closeSidebar} />
        {contactOpen && <ContactModal onClose={() => setContactOpen(false)} />}
        {hlTestOpen  && <HLTestModal  onClose={() => setHlTestOpen(false)}  />}

        <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
          <div className="logo">
            <div className="logo-box" style={{ background:"#00e5ff", padding:2 }}>
              <img src={cryptoHouseLogo} alt="The Crypto House" style={{ width:32, height:32, objectFit:"contain", display:"block" }} />
            </div>
            <div className="logo-text">The Crypto<br />House</div>
          </div>
          <div className="nav-section">
            {NAV_ITEMS.map(l => {
              const locked = !isPaid && PAID_TABS.includes(l);
              const isActive = activeSection === l;
              return (
                <div key={l}
                  className={`nav-item ${isActive ? 'active' : ''}`}
                  onClick={() => { setActiveSection(l); closeSidebar(); }}
                  style={locked ? { opacity:0.5 } : {}}
                >
                  {l}
                  {locked && <span style={{ marginLeft:"auto", fontSize:11, color:"#2a5a72" }}>🔒</span>}
                </div>
              );
            })}
          </div>
          <div className="nav-section">
            <div className="nav-label">Herramientas</div>
            <div
              className={`nav-item ${isLiquiditySection ? 'active' : ''}`}
              onClick={() => { setActiveSection("liquidity"); closeSidebar(); }}
            >
              Liquidity Engine <span className="badge">BETA</span>
            </div>
            <div
              className={`nav-item ${activeSection === "TradingView" ? 'active' : ''}`}
              onClick={() => { setActiveSection("TradingView"); closeSidebar(); }}
            >
              📈 TradingView
            </div>
            <div
              className={`nav-item ${activeSection === "TradingViewOperable" ? 'active' : ''}`}
              onClick={() => { setActiveSection("TradingViewOperable"); closeSidebar(); }}
            >
              🖥️ TV Operable
            </div>
          </div>
          <div className="nav-section">
            <div className="nav-label">Contacto</div>
            <div className="nav-item" style={{cursor:"pointer"}} onClick={() => { setContactOpen(true); closeSidebar(); }}>
              💬 WhatsApp / Email
            </div>
          </div>
          {/* Sección Admin — solo visible para admins */}
          {isAdmin && (
            <div className="nav-section">
              <div className="nav-label" style={{ color:"#00e5ff44" }}>Admin</div>
              {NAV_ITEMS_ADMIN.map(l => (
                <div key={l}
                  className={`nav-item ${activeSection === l ? "active" : ""}`}
                  onClick={() => { setActiveSection(l); closeSidebar(); }}
                  style={{ color: activeSection===l ? "#00e5ff" : "#4a7a96" }}
                >
                  ⚙ {l}
                </div>
              ))}
            </div>
          )}

          <div className="sidebar-spacer" />

          {/* User info + logout */}
          <div className="user-info" style={{ flexDirection:"column", alignItems:"stretch", gap:0, padding:"12px 14px" }}>
            <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:10 }}>
              {avatarUrl ? (
                <img src={avatarUrl} alt={userName}
                  style={{ width:36, height:36, borderRadius:"50%", objectFit:"cover", flexShrink:0 }} />
              ) : (
                <div className="user-avatar">{initials}</div>
              )}
              <div style={{ minWidth:0, flex:1 }}>
                <div className="user-name" title={userName}>{userName}</div>
                <div className={`user-plan ${isPaid ? "paid" : "free"}`}>{planLabel}</div>
              </div>
            </div>
            <button onClick={signOut} style={{
              width:"100%", padding:"7px 0",
              background:"transparent", border:"1px solid #1a3a5e",
              color:"#4a7a96", fontSize:12, cursor:"pointer",
              fontFamily:"Outfit, sans-serif", letterSpacing:"0.5px",
              display:"flex", alignItems:"center", justifyContent:"center", gap:6,
              transition:"all 0.15s",
            }}
            onMouseEnter={e => { e.target.style.borderColor="#ff4f6e"; e.target.style.color="#ff4f6e"; }}
            onMouseLeave={e => { e.target.style.borderColor="#1a3a5e"; e.target.style.color="#4a7a96"; }}
            >
              ⎋ Cerrar sesión
            </button>
            {!isPaid && (
              <a
                href={waUpgradeUrl}
                target="_blank" rel="noreferrer"
                className="plan-upgrade-btn"
                style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:6, textDecoration:"none", marginTop:8 }}
              >
                ⚡ Actualizar plan
              </a>
            )}
          </div>
        </div>

        <div className="main">
          <div className="topbar">
            <div className="topbar-row">
              <button className="hamburger" onClick={() => setSidebarOpen(true)}>☰</button>
              <span className="page-title">{SECTION_TITLES[activeSection] || "Liquidity Engine"}</span>
              {isLiquiditySection && <span className="beta-tag">BETA</span>}
              <div style={{ marginLeft:'auto', display:'flex', alignItems:'center', gap:8 }}>
                <NotificationBell userId={user?.id} />
                <button onClick={() => setHlTestOpen(true)} style={{
                  padding:"5px 12px",
                  background:"transparent", border:"1px solid #ffb347",
                  color:"#ffb347", fontFamily:"Outfit,sans-serif",
                  fontSize:11, fontWeight:700, cursor:"pointer",
                  letterSpacing:"0.5px",
                }}>
                ⚡ TEST HL API
                </button>
              </div>
            </div>
            <div className="page-sub">
              <span className="dot-active" />
              {isLiquiditySection
                ? <span>Monitoreo Pools de Liquidez, protección de rango y trading automatizado</span>
                : <span>{SECTION_TITLES[activeSection]}</span>
              }
            </div>
            {isLiquiditySection && (
              <div className="tabs">
                {TABS.map(tab => (
                  <button
                    key={tab.id}
                    className={`tab ${activeLiquidityTab === tab.id ? "active" : ""} ${!tab.available ? "tab-disabled" : ""}`}
                    onClick={() => tab.available && setActiveLiquidityTab(tab.id)}
                    style={{ opacity: tab.available ? 1 : 0.4, cursor: tab.available ? "pointer" : "not-allowed" }}
                    title={!tab.available ? "Próximamente" : undefined}
                  >
                    {tab.label}
                    {!tab.available && <span style={{ fontSize:9, marginLeft:4, color:"#2a5a72", letterSpacing:0.5 }}>pronto</span>}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="content" style={activeSection === "Programa" ? { padding:0 } : {}}>{renderContent()}</div>
        </div>
      </div>

      <InactivityOverlay enabled={isLiquiditySection} />
    </>
  );
}
