import { useState, useEffect, useRef } from "react";
import { useAuth } from "../../../lib/AuthContext";
import { calcPoolStats } from "../utils/calcPoolStats";
import { OOR_COOLDOWN_MS, sendOorAlert } from "../services/oorService";
import TradingModal from "./TradingModal";
import ProtectionModal from "./ProtectionModal";
import OutOfRangeAlertBanner from "../../../OutOfRangeAlertBanner";

export default function PoolCard({ pos, onRemove, mode = "Cobertura" }) {
  const { user } = useAuth();
  const [expanded, setExpanded]             = useState(false);
  const [showProtection, setShowProtection] = useState(false);
  const [showTrading, setShowTrading]       = useState(false);
  const [viewMode, setViewMode]             = useState("normal");
  const [showBanner, setShowBanner]         = useState(false);
  const prevStatusRef                       = useRef(null);
  const s = calcPoolStats(pos);

  useEffect(() => {
    const currentLabel = pos.status?.label;
    const prevLabel    = prevStatusRef.current;
    prevStatusRef.current = currentLabel;

    if (prevLabel === "En Rango" && currentLabel && currentLabel !== "En Rango") {
      setShowBanner(true);

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

  const inRange   = pos.status?.label === "En Rango";
  const statusObj = inRange
    ? { label: "En Rango",        color: "#00ff88", bg: "#001a0e", border: "#003a22" }
    : s.currentPrice < s.priceLower
      ? { label: "Fuera (Abajo)", color: "#ff4f6e", bg: "#1a0810", border: "#5a1a28" }
      : { label: "Fuera (Arriba)",color: "#ffb347", bg: "#1a0e00", border: "#5a3a00" };

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
        <div className="pc-toggle" onClick={e => e.stopPropagation()}>
          <button className={`pc-toggle-btn ${viewMode === "normal" ? "active" : ""}`} onClick={() => { setViewMode("normal"); setExpanded(true); }}>Normal</button>
          <button className={`pc-toggle-btn ${viewMode === "pro" ? "active" : ""}`} onClick={() => { setViewMode("pro"); setExpanded(true); }}>Pro</button>
        </div>
      </div>

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
            {showBanner && pos.status?.label !== "En Rango" && (
              <OutOfRangeAlertBanner
                direction={pos.status?.label === "Fuera (Abajo)" ? "below" : "above"}
                pair={`${sym0d}/${sym1d}`}
                onDismiss={() => setShowBanner(false)}
              />
            )}

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

            <div className="pc-actions">
              <a href={poolUrl} target="_blank" rel="noreferrer" className="pc-btn-link">🔗 Uniswap</a>
              <button className="pc-btn-close" onClick={() => setExpanded(false)}>Cerrar</button>
              <button className="pc-btn-remove" onClick={() => onRemove(pos.tokenId)}>🗑 Eliminar</button>
            </div>
          </div>
        );
      })()}

      {expanded && viewMode === "pro" && (
        <div className="pc-panel">

          {showBanner && pos.status?.label !== "En Rango" && (
            <OutOfRangeAlertBanner
              direction={pos.status?.label === "Fuera (Abajo)" ? "below" : "above"}
              pair={`${sym0}/${sym1}`}
              onDismiss={() => setShowBanner(false)}
            />
          )}

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
              const isInRange = s.currentPrice >= s.priceLower && s.currentPrice <= s.priceUpper;
              const isOor = !isInRange;

              return (
                <div style={{ position: "relative", marginBottom: 8 }}>

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

                  <div style={{ position: "relative", height: 18 }}>
                    <div style={{
                      position: "absolute", inset: 0,
                      borderRadius: 9,
                      background: "#020810",
                      border: "1px solid rgba(0,229,255,0.12)",
                      boxShadow: "inset 0 2px 6px rgba(0,0,0,0.9)",
                      overflow: "hidden",
                    }}>
                      <div style={{ position:"absolute", top:0, bottom:0, left:0, width:`${loP}%`, background:"linear-gradient(90deg,rgba(120,10,25,0.8),rgba(255,79,110,0.5))" }} />
                      <div style={{
                        position:"absolute", top:0, bottom:0, left:`${loP}%`, width:`${hiP-loP}%`,
                        background:"linear-gradient(180deg,rgba(0,255,100,0.1) 0%,rgba(0,210,85,0.95) 18%,rgba(0,255,130,1) 45%,rgba(200,255,210,1) 50%,rgba(0,255,130,1) 55%,rgba(0,180,65,0.95) 82%,rgba(0,60,25,0.3) 100%)",
                        boxShadow:"inset 0 1px 0 rgba(255,255,255,0.25)",
                        overflow:"hidden",
                      }}>
                        <div style={{
                          position:"absolute", top:"-50%", left:"-60%", width:"35%", height:"200%",
                          background:"linear-gradient(105deg,transparent 30%,rgba(255,255,255,0.22) 50%,transparent 70%)",
                          animation:"rb-shine 3.5s ease-in-out infinite",
                        }} />
                      </div>
                      <div style={{ position:"absolute", top:0, bottom:0, right:0, width:`${100-hiP}%`, background:"linear-gradient(90deg,rgba(255,150,30,0.3),rgba(140,60,0,0.65))" }} />
                    </div>

                    {[loP, hiP].map((p, i) => (
                      <div key={i} style={{
                        position:"absolute", top:-3, bottom:-3, left:`${p}%`,
                        width:2, transform:"translateX(-50%)",
                        background:"rgba(255,255,255,0.2)", zIndex:2,
                      }} />
                    ))}

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

                  <div style={{ position:"relative", height:36, marginTop:6 }}>
                    <div style={{ position:"absolute", left:0, top:0, lineHeight:1.3 }}>
                      <div style={{ fontSize:9, letterSpacing:"1.5px", textTransform:"uppercase", fontWeight:700, color:"#ff4f6e" }}>▼ MIN</div>
                      <div style={{ fontSize:13, fontWeight:700, color:"#ff6b88" }}>{fmtP(s.priceLower)}</div>
                    </div>
                    <div style={{ position:"absolute", right:0, top:0, textAlign:"right", lineHeight:1.3 }}>
                      <div style={{ fontSize:9, letterSpacing:"1.5px", textTransform:"uppercase", fontWeight:700, color:"#00ff88" }}>▲ MAX</div>
                      <div style={{ fontSize:13, fontWeight:700, color:"#00ff88" }}>{fmtP(s.priceUpper)}</div>
                    </div>
                  </div>

                </div>
              );
            })()}

            <div className="pc-amounts">
              <span>{fmtAmt(s.amount0)} {sym0}</span>
              <span>{fmtAmt(s.amount1)} {sym1}</span>
            </div>
          </div>

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

          <div className="pc-section-title">Resultado Total</div>
          <div className="pc-grid4">
            <div className="pc-metric"><div className="pc-metric-label">PNL Total (USD)</div><div className={`pc-metric-val ${s.pnlUsd >= 0 ? "green" : "red"}`}>{fmtUsd(s.pnlUsd)} ({fmtPct(s.pnlPct)})</div></div>
            <div className="pc-metric"><div className="pc-metric-label">Invertido (neto)</div><div className="pc-metric-val">${fmtP(s.netInvested)}</div></div>
            <div className="pc-metric"><div className="pc-metric-label">Tiempo de Vida</div><div className="pc-metric-val">{s.ageDays}d {s.ageHours}h</div></div>
            <div className="pc-metric"><div className="pc-metric-label">APR Total</div><div className={`pc-metric-val ${s.aprUsd >= 0 ? "green" : "red"}`}>{s.aprUsd.toFixed(1)}%</div></div>
          </div>

          <div className="pc-section-title">Performance vs Benchmark</div>
          <div className="pc-grid4">
            <div className="pc-metric"><div className="pc-metric-label">PNL vs HODL</div><div className={`pc-metric-val ${s.pnlVsHodl >= 0 ? "green" : "red"}`}>{fmtUsd(s.pnlVsHodl)}</div><div className="pc-metric-sub">APR: {s.aprVsHodl.toFixed(1)}%</div></div>
            <div className="pc-metric"><div className="pc-metric-label">PNL vs {sym0}</div><div className={`pc-metric-val ${s.pnlToken0 >= 0 ? "green" : "red"}`}>{fmtAmt(s.pnlToken0)} {sym0}</div></div>
            <div className="pc-metric"><div className="pc-metric-label">PNL vs {sym1}</div><div className={`pc-metric-val ${s.pnlToken1 >= 0 ? "green" : "red"}`}>{fmtUsd(s.pnlToken1)}</div></div>
            <div className="pc-metric"><div className="pc-metric-label">Imperm. Loss</div><div className={`pc-metric-val ${s.ilUsd >= 0 ? "green" : "red"}`}>{fmtUsd(s.ilUsd)}</div></div>
          </div>

          <div className="pc-section-title">Capital</div>
          <div className="pc-grid4">
            <div className="pc-metric"><div className="pc-metric-label">PNL Capital</div><div className={`pc-metric-val ${s.pnlUsd >= 0 ? "green" : "red"}`}>{fmtUsd(s.pnlUsd)} ({fmtPct(s.pnlPct)})</div></div>
            <div className="pc-metric"><div className="pc-metric-label">Depositado</div><div className="pc-metric-val">${fmtP(s.depositsValue)}</div><div className="pc-metric-sub">{fmtAmt(s.totalDep1, 2)} {sym1}</div></div>
            <div className="pc-metric"><div className="pc-metric-label">APR Capital</div><div className={`pc-metric-val ${s.aprUsd >= 0 ? "green" : "red"}`}>{s.aprUsd.toFixed(1)}%</div></div>
            <div className="pc-metric"><div className="pc-metric-label">Retirado</div><div className="pc-metric-val">${fmtP(s.withdrawalsVal)}</div><div className="pc-metric-sub">{fmtAmt(s.totalWit1, 2)} {sym1}</div></div>
          </div>

          <div className="pc-section-title">Fees Ganadas</div>
          <div className="pc-grid4">
            <div className="pc-metric"><div className="pc-metric-label">Total Fees (USD)</div><div className="pc-metric-val green">${fmtP(s.feesValue)}</div><div className="pc-metric-sub">uncollected: ${fmtP(s.uncollected0 + s.uncollected1)}</div></div>
            <div className="pc-metric"><div className="pc-metric-label">Fees {sym0}</div><div className="pc-metric-val green">{fmtAmt(s.collected0)} {sym0}</div><div className="pc-metric-sub">unc: {fmtAmt(s.uncollected0)}</div></div>
            <div className="pc-metric"><div className="pc-metric-label">Fees {sym1}</div><div className="pc-metric-val green">{fmtAmt(s.collected1, 2)} {sym1}</div><div className="pc-metric-sub">unc: {fmtAmt(s.uncollected1, 2)}</div></div>
            <div className="pc-metric"><div className="pc-metric-label">APR Fees</div><div className="pc-metric-val green">{s.feesApr.toFixed(1)}%</div></div>
          </div>

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

          <div className="pc-section-title">Info</div>
          <div className="pc-info-row">
            <span>Edad: {s.ageDays}d {s.ageHours}h</span>
            <span>NFT: #{pos.tokenId}</span>
            <span>Chain: {pos.chainName}</span>
            <span>DEX: uniswap_v3</span>
            <span>Fee: {((pos.fee || 500) / 10000).toFixed(2)}%</span>
            <span>Pool: <span className="pc-addr">{pos.poolAddress ? pos.poolAddress.slice(0,8)+"..."+pos.poolAddress.slice(-4) : "—"}</span></span>
          </div>

          <div className="pc-actions">
            <a href={poolUrl} target="_blank" rel="noreferrer" className="pc-btn-link">🔗 Uniswap</a>
            <a href={revertUrl} target="_blank" rel="noreferrer" className="pc-btn-link">📊 Revert</a>
            <button className="pc-btn-close" onClick={() => setExpanded(false)}>Cerrar</button>
            <button className="pc-btn-remove" onClick={() => onRemove(pos.tokenId)}>🗑 Eliminar pool</button>
          </div>
        </div>
      )}
      </div>
    </>
  );
}
