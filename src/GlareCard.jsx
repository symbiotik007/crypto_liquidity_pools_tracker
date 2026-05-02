import { useRef, useState, useCallback } from "react";

/* ─────────────────────────────────────────────────────────────────
   GlareCard  —  Premium pool card con efecto 3-D tilt + glare
   Props: mismos datos que PoolCard recibe (pos, s, sym0, sym1,
          inRange, statusObj, fmtP, fmtUsd, fmtPct, fmtAmt)
───────────────────────────────────────────────────────────────── */
export default function GlareCard({
  pos, s, sym0, sym1, inRange, statusObj,
  fmtP, fmtUsd, fmtPct, fmtAmt,
}) {
  const cardRef  = useRef(null);
  const frameRef = useRef(null);
  const [tilt,   setTilt]   = useState({ rx: 0, ry: 0, gx: 50, gy: 50 });
  const [active, setActive] = useState(false);

  const onMove = useCallback((e) => {
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(() => {
      if (!cardRef.current) return;
      const { left, top, width, height } = cardRef.current.getBoundingClientRect();
      const x  = e.clientX - left;
      const y  = e.clientY - top;
      const rx = ((y / height) - 0.5) * -22;   // max ±11°
      const ry = ((x / width)  - 0.5) *  22;
      const gx = (x / width)  * 100;
      const gy = (y / height) * 100;
      setTilt({ rx, ry, gx, gy });
    });
  }, []);

  const onLeave = useCallback(() => {
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    setActive(false);
    // spring back suave
    setTilt({ rx: 0, ry: 0, gx: 50, gy: 50 });
  }, []);

  // ── datos derivados ──────────────────────────────────────────
  const pnlPositive  = s.pnlUsd >= 0;
  const aprPositive  = s.aprUsd >= 0;
  const feeRate      = ((pos.fee || 500) / 10000).toFixed(2);

  // barra de rango
  const pad   = 0.18;
  const span  = Math.max(s.priceUpper - s.priceLower, 1);
  const lo    = s.priceLower - span * pad;
  const hi    = s.priceUpper + span * pad;
  const toP   = (v) => Math.max(2, Math.min(98, ((v - lo) / (hi - lo)) * 100));
  const loP   = toP(s.priceLower);
  const hiP   = toP(s.priceUpper);
  const curP  = toP(s.currentPrice);

  // colores status
  const SC = {
    "En Rango":       { glow: "#00ff8855", top: "#00ff88", bar: "#00ff88" },
    "Fuera (Abajo)":  { glow: "#ff4f6e55", top: "#ff4f6e", bar: "#ff4f6e" },
    "Fuera (Arriba)": { glow: "#ffb34755", top: "#ffb347", bar: "#ffb347" },
  };
  const sc = SC[statusObj.label] ?? SC["En Rango"];

  return (
    <div style={{ perspective: "1200px", marginTop: 14 }}>
      {/* ── wrapper 3-D ── */}
      <div
        ref={cardRef}
        onMouseEnter={() => setActive(true)}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{
          position: "relative",
          borderRadius: 20,
          overflow: "hidden",
          cursor: "default",
          transformStyle: "preserve-3d",
          transform: `perspective(1200px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) scale(${active ? 1.025 : 1})`,
          transition: active
            ? "transform 0.08s linear"
            : "transform 0.55s cubic-bezier(0.23,1,0.32,1)",
          boxShadow: active
            ? `0 30px 70px rgba(0,0,0,0.55), 0 0 40px ${sc.glow}, inset 0 1px 0 rgba(255,255,255,0.06)`
            : `0 12px 32px rgba(0,0,0,0.4), 0 0 18px ${sc.glow}`,
          background:
            "linear-gradient(145deg, #0b0f1e 0%, #0e1525 55%, #090d1a 100%)",
          border: `1px solid ${active ? sc.top + "66" : "#1a2a44"}`,
        }}
      >
        {/* ── glare layer ── */}
        <div
          style={{
            pointerEvents: "none",
            position: "absolute",
            inset: 0,
            borderRadius: 20,
            zIndex: 10,
            opacity: active ? 0.18 : 0,
            transition: "opacity 0.3s",
            background: `radial-gradient(circle at ${tilt.gx}% ${tilt.gy}%, white 0%, transparent 65%)`,
            mixBlendMode: "overlay",
          }}
        />

        {/* ── borde top glow ── */}
        <div style={{
          pointerEvents: "none",
          position: "absolute",
          top: 0, left: 0, right: 0,
          height: 1,
          background: `linear-gradient(90deg, transparent, ${sc.top}88, transparent)`,
          zIndex: 5,
        }} />

        {/* ════════════════════════════════
            CONTENIDO
        ════════════════════════════════ */}
        <div style={{ padding: "24px 24px 20px", position: "relative", zIndex: 2 }}>

          {/* ── Header ── */}
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 18 }}>
            <div>
              {/* par + chain */}
              <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 5 }}>
                <span style={{
                  fontSize: 22, fontWeight: 800,
                  fontFamily: "Outfit, sans-serif",
                  letterSpacing: "-0.3px",
                  color: "#f0f6ff",
                }}>
                  {sym0}<span style={{ color: "#2a4a6e" }}>/</span>{sym1}
                </span>
                <span style={{
                  fontSize: 10, fontWeight: 700,
                  background: "#0d1f35",
                  border: "1px solid #1a3a5e",
                  color: "#4a8ab0",
                  padding: "2px 8px",
                  borderRadius: 4,
                  letterSpacing: "1.2px",
                  textTransform: "uppercase",
                  fontFamily: "Outfit, sans-serif",
                }}>
                  {feeRate}%
                </span>
              </div>
              <div style={{
                fontSize: 11, color: "#2e5070",
                fontFamily: "Outfit, sans-serif",
                letterSpacing: "0.5px",
              }}>
                {pos.chainName} · Uniswap · #{pos.tokenId}
              </div>
            </div>

            {/* status badge */}
            <div style={{
              display: "flex", alignItems: "center", gap: 6,
              background: statusObj.bg,
              border: `1px solid ${statusObj.border}`,
              borderRadius: 20,
              padding: "5px 12px",
            }}>
              <span style={{
                width: 6, height: 6, borderRadius: "50%",
                background: statusObj.color,
                boxShadow: `0 0 6px ${statusObj.color}`,
                display: "inline-block",
                animation: inRange ? "gc-blink 1.8s ease-in-out infinite" : "none",
              }} />
              <span style={{
                fontSize: 11, fontWeight: 700,
                fontFamily: "Outfit, sans-serif",
                color: statusObj.color,
                letterSpacing: "0.5px",
              }}>
                {statusObj.label}
              </span>
            </div>
          </div>

          {/* ── Valor LP hero ── */}
          <div style={{
            textAlign: "center",
            padding: "16px 0 20px",
            borderTop: "1px solid #0d1f35",
            borderBottom: "1px solid #0d1f35",
            marginBottom: 18,
          }}>
            <div style={{
              fontSize: 11, fontWeight: 600,
              letterSpacing: "2.5px", textTransform: "uppercase",
              color: "#2e5070", fontFamily: "Outfit, sans-serif",
              marginBottom: 4,
            }}>
              Valor del Pool
            </div>
            <div style={{
              fontSize: 36, fontWeight: 800,
              fontFamily: "Outfit, sans-serif",
              letterSpacing: "-1px",
              background: "linear-gradient(135deg, #e0efff 0%, #a0c8ff 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
              ${fmtP(s.valueUsd)}
            </div>
            <div style={{
              fontSize: 12, color: "#2e5070",
              fontFamily: "Outfit, sans-serif",
              marginTop: 4,
            }}>
              {fmtAmt(s.amount0, 4)} {sym0} &nbsp;·&nbsp; {fmtAmt(s.amount1, 4)} {sym1}
            </div>
          </div>

          {/* ── Métricas 3 col ── */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 18 }}>
            {[
              { label: "PNL Total",  val: fmtUsd(s.pnlUsd),         color: pnlPositive ? "#00ff88" : "#ff4f6e" },
              { label: "APR",        val: `${s.aprUsd.toFixed(1)}%`, color: aprPositive ? "#00ff88" : "#ff4f6e" },
              { label: "Fee APR",    val: `${s.feesApr.toFixed(1)}%`, color: "#00e5ff" },
            ].map(({ label, val, color }) => (
              <div key={label} style={{
                background: "#060b16",
                border: "1px solid #0d1f35",
                borderRadius: 12,
                padding: "12px 10px",
                textAlign: "center",
              }}>
                <div style={{
                  fontSize: 9, fontWeight: 700,
                  letterSpacing: "1.5px", textTransform: "uppercase",
                  color: "#2e5070", fontFamily: "Outfit, sans-serif",
                  marginBottom: 5,
                }}>
                  {label}
                </div>
                <div style={{
                  fontSize: 15, fontWeight: 700,
                  color, fontFamily: "Outfit, sans-serif",
                }}>
                  {val}
                </div>
              </div>
            ))}
          </div>

          {/* ── Fees + Edad + Entry ── */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 20 }}>
            {[
              { label: "Fees Ganados", val: `$${fmtP(s.feesValue)}`,                color: "#00ff88" },
              { label: "Edad",         val: `${s.ageDays}d ${s.ageHours}h`,         color: "#a0c8ff" },
              { label: "Entry Price",  val: fmtP(s.entryPrice),                     color: "#c4b5fd" },
            ].map(({ label, val, color }) => (
              <div key={label} style={{
                background: "#060b16",
                border: "1px solid #0d1f35",
                borderRadius: 12,
                padding: "12px 10px",
                textAlign: "center",
              }}>
                <div style={{
                  fontSize: 9, fontWeight: 700,
                  letterSpacing: "1.5px", textTransform: "uppercase",
                  color: "#2e5070", fontFamily: "Outfit, sans-serif",
                  marginBottom: 5,
                }}>
                  {label}
                </div>
                <div style={{
                  fontSize: 15, fontWeight: 700,
                  color, fontFamily: "Outfit, sans-serif",
                }}>
                  {val}
                </div>
              </div>
            ))}
          </div>

          {/* ── Barra de rango ── */}
          <div style={{
            background: "#060b16",
            border: "1px solid #0d1f35",
            borderRadius: 14,
            padding: "14px 16px",
          }}>
            <div style={{
              fontSize: 9, fontWeight: 700,
              letterSpacing: "2px", textTransform: "uppercase",
              color: "#2e5070", fontFamily: "Outfit, sans-serif",
              marginBottom: 10,
            }}>
              Precio Actual vs Rango
            </div>

            {/* track */}
            <div style={{ position: "relative", height: 6, borderRadius: 3, background: "#0d1f35", marginBottom: 8 }}>
              {/* rango activo */}
              <div style={{
                position: "absolute", top: 0, height: "100%",
                left: `${loP}%`, width: `${hiP - loP}%`,
                background: `linear-gradient(90deg, ${sc.bar}55, ${sc.bar}99, ${sc.bar}55)`,
                borderRadius: 3,
              }} />
              {/* dot precio actual */}
              <div style={{
                position: "absolute", top: "50%",
                left: `${curP}%`,
                transform: "translate(-50%, -50%)",
                width: 14, height: 14,
                borderRadius: "50%",
                background: inRange
                  ? "radial-gradient(circle at 35% 30%, #fff, #00e5ff 50%, #006a99)"
                  : "radial-gradient(circle at 35% 30%, #fff, #ff4f6e 50%, #7a0020)",
                border: "2px solid rgba(255,255,255,0.3)",
                boxShadow: inRange ? "0 0 8px #00e5ff88" : "0 0 8px #ff4f6e88",
                zIndex: 2,
              }} />
            </div>

            {/* labels min / current / max */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ textAlign: "left" }}>
                <div style={{ fontSize: 8, color: "#ff4f6e", fontWeight: 700, letterSpacing: "1px", fontFamily: "Outfit, sans-serif" }}>▼ MIN</div>
                <div style={{ fontSize: 12, color: "#ff6b88", fontWeight: 700, fontFamily: "Outfit, sans-serif" }}>{fmtP(s.priceLower)}</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 8, color: sc.top, fontWeight: 700, letterSpacing: "1px", fontFamily: "Outfit, sans-serif" }}>ACTUAL</div>
                <div style={{ fontSize: 14, color: sc.top, fontWeight: 800, fontFamily: "Outfit, sans-serif" }}>{fmtP(s.currentPrice)}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 8, color: "#00ff88", fontWeight: 700, letterSpacing: "1px", fontFamily: "Outfit, sans-serif" }}>▲ MAX</div>
                <div style={{ fontSize: 12, color: "#00ff88", fontWeight: 700, fontFamily: "Outfit, sans-serif" }}>{fmtP(s.priceUpper)}</div>
              </div>
            </div>
          </div>

          {/* ── label inferior ── */}
          <div style={{
            marginTop: 14,
            textAlign: "center",
            fontSize: 10,
            color: "#1a3050",
            fontFamily: "Outfit, sans-serif",
            letterSpacing: "1.5px",
            textTransform: "uppercase",
          }}>
            ✦ &nbsp;Glare Card — Vista Premium&nbsp; ✦
          </div>
        </div>
      </div>

      <style>{`
        @keyframes gc-blink {
          0%,100% { opacity:1; box-shadow: 0 0 6px ${sc.top}; }
          50%      { opacity:0.35; box-shadow: none; }
        }
      `}</style>
    </div>
  );
}
