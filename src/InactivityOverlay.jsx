import { useState, useEffect, useRef, useCallback } from "react";

const INACTIVITY_MS = 10 * 60 * 1000;

const ANIM_CSS = `
@keyframes ioa-fadeIn   { from{opacity:0} to{opacity:1} }
@keyframes ioa-slideUp  { from{transform:translateY(32px);opacity:0} to{transform:translateY(0);opacity:1} }

/* pulsing rings — conservados */
@keyframes ioa-ring1 { 0%,100%{opacity:0.28;transform:scale(1)}   50%{opacity:0.70;transform:scale(1.07)} }
@keyframes ioa-ring2 { 0%,100%{opacity:0.13;transform:scale(1)}   50%{opacity:0.40;transform:scale(1.15)} }
@keyframes ioa-ring3 { 0%,100%{opacity:0.06;transform:scale(1)}   50%{opacity:0.22;transform:scale(1.25)} }

/* órbitas */
@keyframes ioa-orbit-cw  { from{transform:rotate(0deg)}   to{transform:rotate(360deg)}  }
@keyframes ioa-orbit-ccw { from{transform:rotate(0deg)}   to{transform:rotate(-360deg)} }

/* ETH flotando */
@keyframes ioa-float {
  0%,100% { transform:translateY(0px) }
  50%     { transform:translateY(-9px) }
}

/* ETH glow */
@keyframes ioa-eth-pulse {
  0%,100% { filter: drop-shadow(0 0 6px #8b5cf699)  drop-shadow(0 0 18px #627eea44) }
  50%     { filter: drop-shadow(0 0 18px #a78bfacc) drop-shadow(0 0 40px #8b5cf677) }
}

/* thruster engines */
@keyframes ioa-thruster {
  0%,100% { opacity:0.5; transform:scaleY(1) }
  50%     { opacity:1;   transform:scaleY(1.35) }
}

/* blink genérico */
@keyframes ioa-blink { 0%,100%{opacity:1} 50%{opacity:0.2} }

/* dots de carga */
@keyframes ioa-dot { 0%,80%,100%{transform:scale(0);opacity:0} 40%{transform:scale(1);opacity:1} }

/* scanline */
@keyframes ioa-scanline { 0%{top:-4px} 100%{top:100%} }

/* glow del botón */
@keyframes ioa-btn-glow {
  0%,100% { box-shadow: 0 0 10px #8b5cf644, 0 0 0px #8b5cf600 }
  50%     { box-shadow: 0 0 28px #8b5cf6aa, 0 0 60px #8b5cf633 }
}

/* estrellitas */
@keyframes ioa-twinkle {
  0%,100% { opacity:0.08 }
  50%     { opacity:0.75 }
}

/* grid move */
@keyframes ioa-grid { from{background-position:0 0} to{background-position:40px 40px} }
`;

/* ─── Ethereum logo (6 caras del diamante) ─────────────────────── */
function EthLogo() {
  return (
    <svg
      width="44" height="70"
      viewBox="0 0 40 64"
      style={{ animation: "ioa-eth-pulse 2.8s ease-in-out infinite" }}
    >
      {/* cara superior-izquierda */}
      <polygon points="20,0  2,24  20,16"  fill="#a78bfa" />
      {/* cara superior-derecha */}
      <polygon points="20,0  38,24 20,16"  fill="#7c3aed" />
      {/* cara media-izquierda */}
      <polygon points="20,18 2,24  20,32"  fill="#8b5cf6" opacity="0.85" />
      {/* cara media-derecha */}
      <polygon points="20,18 38,24 20,32"  fill="#6d28d9" opacity="0.85" />
      {/* cara inferior-izquierda */}
      <polygon points="20,36 2,28  20,64"  fill="#9061f9" opacity="0.7" />
      {/* cara inferior-derecha */}
      <polygon points="20,36 38,28 20,64"  fill="#7c3aed" opacity="0.7" />
    </svg>
  );
}

/* ─── Estrellas de fondo ────────────────────────────────────────── */
const STARS = [
  { x:8,  y:12, r:1.2, delay:0    },
  { x:82, y:6,  r:0.9, delay:0.6  },
  { x:55, y:20, r:1.5, delay:1.1  },
  { x:20, y:78, r:1.0, delay:0.3  },
  { x:90, y:72, r:1.3, delay:1.4  },
  { x:70, y:45, r:0.8, delay:0.9  },
  { x:35, y:92, r:1.1, delay:0.2  },
  { x:5,  y:55, r:0.7, delay:1.7  },
  { x:95, y:30, r:1.4, delay:0.5  },
  { x:48, y:88, r:0.9, delay:1.2  },
  { x:15, y:40, r:1.0, delay:0.8  },
  { x:78, y:88, r:0.6, delay:1.5  },
];

function Stars() {
  return (
    <svg
      style={{ position:"absolute", inset:0, width:"100%", height:"100%", pointerEvents:"none" }}
      preserveAspectRatio="none"
    >
      {STARS.map((s, i) => (
        <circle
          key={i}
          cx={`${s.x}%`} cy={`${s.y}%`} r={s.r}
          fill="#a78bfa"
          style={{ animation: `ioa-twinkle ${2 + s.delay}s ease-in-out ${s.delay}s infinite` }}
        />
      ))}
    </svg>
  );
}

/* ─── Nave / escena ETH ─────────────────────────────────────────── */
function EthShip() {
  const ORBIT1 = 88;   // px diámetro órbita exterior
  const ORBIT2 = 62;   // px diámetro órbita interior
  const CENTER = 110;  // px total del contenedor

  return (
    <div style={{ position:"relative", width:CENTER, height:CENTER+28, margin:"0 auto 4px" }}>

      {/* ── Anillos pulsantes (conservados) ── */}
      {[
        { size: 90,  delay: 0,    anim: "ioa-ring1", color: "#8b5cf6" },
        { size: 116, delay: 0.4,  anim: "ioa-ring2", color: "#627eea" },
        { size: 145, delay: 0.85, anim: "ioa-ring3", color: "#a78bfa" },
      ].map(({ size, delay, anim, color }, i) => (
        <div key={i} style={{
          position: "absolute",
          width: size, height: size,
          top:  (CENTER - size) / 2,
          left: (CENTER - size) / 2,
          borderRadius: "50%",
          border: `1px solid ${color}`,
          animation: `${anim} 2.8s ease-in-out ${delay}s infinite`,
        }} />
      ))}

      {/* ── Órbita exterior CW con satélite ── */}
      <div style={{
        position: "absolute",
        width: ORBIT1, height: ORBIT1,
        top:  (CENTER - ORBIT1) / 2,
        left: (CENTER - ORBIT1) / 2,
        borderRadius: "50%",
        border: "1px dashed #8b5cf644",
        animation: `ioa-orbit-cw 7s linear infinite`,
      }}>
        <div style={{
          position: "absolute",
          top: -5, left: "50%", transform: "translateX(-50%)",
          width: 10, height: 10,
          borderRadius: "50%",
          background: "#00e5ff",
          boxShadow: "0 0 8px #00e5ff, 0 0 20px #00e5ff88",
        }} />
      </div>

      {/* ── Órbita interior CCW con satélite ── */}
      <div style={{
        position: "absolute",
        width: ORBIT2, height: ORBIT2,
        top:  (CENTER - ORBIT2) / 2,
        left: (CENTER - ORBIT2) / 2,
        borderRadius: "50%",
        border: "1px dashed #627eea55",
        animation: `ioa-orbit-ccw 4.5s linear infinite`,
      }}>
        <div style={{
          position: "absolute",
          bottom: -4, left: "50%", transform: "translateX(-50%)",
          width: 7, height: 7,
          borderRadius: "50%",
          background: "#a78bfa",
          boxShadow: "0 0 6px #a78bfa, 0 0 14px #8b5cf688",
        }} />
      </div>

      {/* ── ETH Logo flotando ── */}
      <div style={{
        position: "absolute",
        width: CENTER, top: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: CENTER,
        animation: "ioa-float 4s ease-in-out infinite",
      }}>
        {/* halo central */}
        <div style={{
          position: "absolute",
          width: 52, height: 52,
          borderRadius: "50%",
          background: "radial-gradient(circle, #8b5cf622 0%, transparent 70%)",
        }} />
        <EthLogo />
      </div>

      {/* ── Thrusters (propulsores) debajo del logo ── */}
      <div style={{
        position: "absolute",
        bottom: 0, left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        gap: 10,
        alignItems: "flex-start",
      }}>
        {/* propulsor izquierdo */}
        <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:2 }}>
          <div style={{ width:8, height:14, borderRadius:"2px 2px 0 0",
            background:"linear-gradient(to bottom, #8b5cf6, #6d28d9)", opacity:0.7 }} />
          <div style={{
            width:6, height:12,
            borderRadius:"0 0 3px 3px",
            background:"linear-gradient(to bottom, #f97316, #ef4444, transparent)",
            animation:"ioa-thruster 0.9s ease-in-out 0.1s infinite",
            transformOrigin:"top center",
          }} />
        </div>
        {/* propulsor central */}
        <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:2 }}>
          <div style={{ width:10, height:16, borderRadius:"2px 2px 0 0",
            background:"linear-gradient(to bottom, #a78bfa, #8b5cf6)", opacity:0.8 }} />
          <div style={{
            width:8, height:18,
            borderRadius:"0 0 4px 4px",
            background:"linear-gradient(to bottom, #fb923c, #f97316, #fbbf24, transparent)",
            animation:"ioa-thruster 0.75s ease-in-out infinite",
            transformOrigin:"top center",
          }} />
        </div>
        {/* propulsor derecho */}
        <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:2 }}>
          <div style={{ width:8, height:14, borderRadius:"2px 2px 0 0",
            background:"linear-gradient(to bottom, #8b5cf6, #6d28d9)", opacity:0.7 }} />
          <div style={{
            width:6, height:12,
            borderRadius:"0 0 3px 3px",
            background:"linear-gradient(to bottom, #f97316, #ef4444, transparent)",
            animation:"ioa-thruster 1.1s ease-in-out 0.2s infinite",
            transformOrigin:"top center",
          }} />
        </div>
      </div>
    </div>
  );
}

function LoadingDots() {
  return (
    <div style={{ display:"flex", gap:7, justifyContent:"center", margin:"0 0 28px" }}>
      {[0, 0.22, 0.44].map((delay, i) => (
        <div key={i} style={{
          width: 7, height: 7,
          borderRadius: "50%",
          background: i === 1 ? "#a78bfa" : "#8b5cf6",
          animation: `ioa-dot 1.5s ease-in-out ${delay}s infinite`,
        }} />
      ))}
    </div>
  );
}

/* ─── Componente principal ──────────────────────────────────────── */
export default function InactivityOverlay({ enabled }) {
  const [show, setShow] = useState(false);
  const timerRef = useRef(null);

  const reset = useCallback(() => {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setShow(true), INACTIVITY_MS);
  }, []);

  useEffect(() => {
    if (!enabled) {
      clearTimeout(timerRef.current);
      setShow(false);
      return;
    }
    const events = ["mousemove", "keydown", "mousedown", "touchstart", "scroll"];
    events.forEach(e => window.addEventListener(e, reset, { passive: true }));
    reset();
    return () => {
      events.forEach(e => window.removeEventListener(e, reset));
      clearTimeout(timerRef.current);
    };
  }, [enabled, reset]);

  const handleReconnect = () => { setShow(false); reset(); };

  if (!show) return null;

  return (
    <>
      <style>{ANIM_CSS}</style>

      {/* ── Backdrop ── */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 9999,
        background: "rgba(4, 2, 16, 0.90)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        animation: "ioa-fadeIn 0.4s ease",
      }}>

        {/* ── Card ── */}
        <div style={{
          position: "relative",
          background: "linear-gradient(145deg, #08061a 0%, #0e0825 60%, #0a0e22 100%)",
          border: "1px solid #3730a355",
          borderRadius: 24,
          padding: "48px 52px 42px",
          textAlign: "center",
          maxWidth: 460,
          width: "90%",
          overflow: "hidden",
          animation: "ioa-slideUp 0.5s ease",
          boxShadow: "0 40px 100px rgba(0,0,0,0.65), inset 0 1px 0 rgba(139,92,246,0.12)",
        }}>

          {/* fondo estrellado */}
          <Stars />

          {/* grid sutil */}
          <div style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            backgroundImage:
              "linear-gradient(rgba(139,92,246,0.04) 1px, transparent 1px)," +
              "linear-gradient(90deg, rgba(139,92,246,0.04) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
            animation: "ioa-grid 6s linear infinite",
          }} />

          {/* scanline */}
          <div style={{
            position: "absolute", left: 0, right: 0, height: 3, pointerEvents: "none",
            background: "linear-gradient(90deg, transparent, #8b5cf633 40%, #8b5cf655 50%, #8b5cf633 60%, transparent)",
            animation: "ioa-scanline 4s linear infinite",
          }} />

          {/* esquinas HUD */}
          {[
            { top:0,    left:0,    borderTop:"2px solid #8b5cf677",  borderLeft:"2px solid #8b5cf677"  },
            { top:0,    right:0,   borderTop:"2px solid #8b5cf677",  borderRight:"2px solid #8b5cf677" },
            { bottom:0, left:0,    borderBottom:"2px solid #627eea66", borderLeft:"2px solid #627eea66" },
            { bottom:0, right:0,   borderBottom:"2px solid #627eea66", borderRight:"2px solid #627eea66"},
          ].map((s, i) => (
            <div key={i} style={{ position:"absolute", width:18, height:18, ...s }} />
          ))}

          {/* ── Nave ETH ── */}
          <EthShip />

          {/* ── Badge ── */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 7,
            background: "linear-gradient(90deg, #8b5cf611, #627eea11)",
            border: "1px solid #8b5cf644",
            borderRadius: 20, padding: "5px 16px", marginBottom: 16,
          }}>
            <span style={{
              width:6, height:6, borderRadius:"50%", background:"#a78bfa", display:"inline-block",
              animation:"ioa-blink 1.2s ease-in-out infinite",
              boxShadow:"0 0 6px #a78bfa",
            }} />
            <span style={{
              fontFamily:"Outfit, sans-serif", fontSize:10, fontWeight:700,
              letterSpacing:"2px", color:"#a78bfa", textTransform:"uppercase",
            }}>
              Houston · Tenemos un problema
            </span>
          </div>

          {/* ── Título ── */}
          <h2 style={{
            margin: "0 0 10px",
            fontFamily: "Outfit, sans-serif",
            fontSize: 22,
            fontWeight: 700,
            letterSpacing: "0.3px",
            background: "linear-gradient(135deg, #e0d5ff 0%, #c4b5fd 50%, #a5b4fc 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>
            ¿Sigues aquí?
          </h2>

          {/* ── Descripción ── */}
          <p style={{
            color: "#6b5fa0",
            fontSize: 13.5,
            fontFamily: "Outfit, sans-serif",
            lineHeight: 1.75,
            margin: "0 0 8px",
          }}>
            Los datos en tiempo real se pausaron<br />
            por inactividad. Reconecta para<br />
            continuar monitoreando tus pools.
          </p>

          <LoadingDots />

          {/* ── Botón ── */}
          <button
            onClick={handleReconnect}
            style={{
              background: "linear-gradient(135deg, #8b5cf611, #627eea11)",
              border: "1px solid #8b5cf6",
              color: "#c4b5fd",
              fontFamily: "Outfit, sans-serif",
              fontWeight: 700,
              fontSize: 13,
              letterSpacing: "2px",
              padding: "13px 52px",
              cursor: "pointer",
              borderRadius: 8,
              textTransform: "uppercase",
              animation: "ioa-btn-glow 2.4s ease-in-out infinite",
              transition: "background 0.2s, color 0.2s, border-color 0.2s",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = "linear-gradient(135deg, #8b5cf6, #627eea)";
              e.currentTarget.style.color = "#ffffff";
              e.currentTarget.style.borderColor = "#a78bfa";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = "linear-gradient(135deg, #8b5cf611, #627eea11)";
              e.currentTarget.style.color = "#c4b5fd";
              e.currentTarget.style.borderColor = "#8b5cf6";
            }}
          >
            ⬡ &nbsp;Reconectar
          </button>
        </div>
      </div>
    </>
  );
}
