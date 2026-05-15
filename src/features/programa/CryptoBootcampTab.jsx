import { useState, useEffect, useRef } from "react";
import { CRYPTO_BOOTCAMP } from "./data/cryptoBootcampData";
import { useAuth } from "../../lib/AuthContext";
import { useProgressSync } from "../../lib/useSupabaseSync";
import SHA256Widget from "./components/SHA256Widget";

function BatmanSpeech({ quotes }) {
  const [hovered, setHovered] = useState(false);
  const list = Array.isArray(quotes) ? quotes : [quotes];
  return (
    <div style={{ display:"flex", alignItems:"flex-end", gap:14, margin:"16px 0 20px" }}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          flexShrink:0, cursor:"default",
          transition:"transform 0.22s ease, filter 0.22s ease",
          transform: hovered ? "scale(1.1) translateY(-5px)" : "scale(1) translateY(0)",
          filter: hovered ? "drop-shadow(0 6px 14px rgba(184,134,11,0.55))" : "drop-shadow(0 2px 4px rgba(0,0,0,0.6))",
        }}
        title="Batman"
      >
        <svg width="78" height="98" viewBox="0 0 78 98" style={{ display:"block" }}>
          <path d="M2,98 Q9,70 19,53 L39,66 Z" fill="#07071a"/>
          <path d="M76,98 Q69,70 59,53 L39,66 Z" fill="#07071a"/>
          <path d="M15,98 Q21,75 27,61 L39,71 L51,61 Q57,75 63,98 Z" fill="#11112b"/>
          <rect x="23" y="54" width="32" height="22" rx="2" fill="#11112b"/>
          <rect x="20" y="69" width="38" height="7" rx="3" fill="#b8860b"/>
          <ellipse cx="39" cy="63" rx="10.5" ry="5.5" fill="#b8860b"/>
          <path d="M32,63 C33,57 36.5,60 39,59 C41.5,60 45,57 46,63 C43,66.5 39,65 39,65 C39,65 35,66.5 32,63Z" fill="#11112b"/>
          <rect x="33" y="50" width="13" height="6" rx="1" fill="#11112b"/>
          <ellipse cx="39" cy="29" rx="16" ry="18" fill="#07071a"/>
          <polygon points="25,20 20,2 32,17" fill="#07071a"/>
          <polygon points="53,20 58,2 46,17" fill="#07071a"/>
          <ellipse cx="31.5" cy="28" rx="5.5" ry="3.2" fill={hovered ? "#ffffff" : "#ccd0f0"} opacity={hovered ? 1 : 0.88}/>
          <ellipse cx="46.5" cy="28" rx="5.5" ry="3.2" fill={hovered ? "#ffffff" : "#ccd0f0"} opacity={hovered ? 1 : 0.88}/>
          <path d="M29,39 Q39,46 49,39" stroke="#07071a" strokeWidth="4" fill="none" strokeLinecap="round"/>
          <ellipse cx="39" cy="43" rx="5" ry="3" fill="#11112b"/>
        </svg>
      </div>
      <div style={{ display:"flex", flexDirection:"column", gap:8, flex:1, maxWidth:480 }}>
        {list.map((q, idx) => (
          <div key={idx} style={{
            position:"relative",
            background:"rgba(184,134,11,0.06)",
            border:"1.5px solid rgba(184,134,11,0.4)",
            borderRadius:10,
            padding:"11px 15px",
            color:"var(--text-muted)",
            fontSize:13,
            lineHeight:1.6,
            fontFamily:"Outfit,sans-serif",
            boxShadow:"0 2px 10px rgba(184,134,11,0.08)",
          }}>
            <span style={{ position:"absolute", left:-10, top:13, width:0, height:0,
              borderTop:"7px solid transparent", borderBottom:"7px solid transparent",
              borderRight:"10px solid rgba(184,134,11,0.4)" }}/>
            <span style={{ position:"absolute", left:-7, top:14, width:0, height:0,
              borderTop:"6px solid transparent", borderBottom:"6px solid transparent",
              borderRight:"9px solid #09091f" }}/>
            <div style={{ color:"#b8860b", fontWeight:800, fontSize:10, letterSpacing:1.8, marginBottom:5 }}>
              BATMAN
            </div>
            {q}
          </div>
        ))}
      </div>
    </div>
  );
}

function CheckCircle({ done, size = 18 }) {
  return (
    <div style={{
      width: size, height: size, minWidth: size, borderRadius: "50%",
      background: done ? "var(--color-success)" : "transparent",
      border: done ? "none" : "1.5px solid var(--border-blue)",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: size * 0.55, color: "#fff", fontWeight: 900, flexShrink: 0,
      transition: "all 0.2s cubic-bezier(0.4,0,0.2,1)",
      boxShadow: done ? "0 0 8px rgba(var(--color-success-rgb,34,197,94),0.35)" : "none",
    }}>
      {done ? "✓" : ""}
    </div>
  );
}

export default function CryptoBootcampTab() {
  const { user } = useAuth();
  const { completadas, toggleCompletada } = useProgressSync(user?.id, "bootcamp");
  const [abiertos,      setAbiertos]      = useState(() => new Set([CRYPTO_BOOTCAMP[0]?.id]));
  const [moduloActivo,  setModuloActivo]  = useState(0);
  const [claseActiva,   setClaseActiva]   = useState(0);
  const [winW,          setWinW]          = useState(() => window.innerWidth);
  const contentRef = useRef(null);

  useEffect(() => {
    const onResize = () => setWinW(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  const isMobile = winW < 768;

  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
  useEffect(() => { setSidebarOpen(!isMobile); }, [isMobile]);

  const [version, setVersion] = useState("v1");
  useEffect(() => { setVersion("v1"); }, [moduloActivo, claseActiva]);

  const totalClases = CRYPTO_BOOTCAMP.reduce((acc, mod) => acc + mod.clases.length, 0);
  const progreso    = Math.round((completadas.length / totalClases) * 100);
  const modulo      = CRYPTO_BOOTCAMP[moduloActivo];
  const clase       = modulo?.clases[claseActiva];

  useEffect(() => {
    if (contentRef.current) contentRef.current.scrollTop = 0;
  }, [moduloActivo, claseActiva]);

  const toggle = (id) => {
    setAbiertos(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const seleccionarClase = (mi, ci) => {
    setModuloActivo(mi);
    setClaseActiva(ci);
    setAbiertos(prev => new Set([...prev, CRYPTO_BOOTCAMP[mi].id]));
    if (isMobile) setSidebarOpen(false);
  };

  const irSiguiente = () => {
    if (!clase || !modulo) return;
    if (!completadas.includes(clase.id)) toggleCompletada(clase.id);
    if (claseActiva < modulo.clases.length - 1) { setClaseActiva(c => c + 1); return; }
    if (moduloActivo < CRYPTO_BOOTCAMP.length - 1) {
      const nextModulo = CRYPTO_BOOTCAMP[moduloActivo + 1];
      setModuloActivo(m => m + 1);
      setClaseActiva(0);
      setAbiertos(prev => new Set([...prev, nextModulo.id]));
    }
  };

  const currentLessonLabel = modulo && clase ? `${modulo.titulo} · Clase ${claseActiva + 1}` : "Selecciona una lección";

  return (
    <div style={{ display:"flex", flexDirection:"column", height:"100%", minHeight:0 }}>

      {/* ── Topbar ── */}
      <div style={{
        display:"flex", alignItems:"center", gap:10, flexShrink:0,
        padding: isMobile ? "9px 14px" : "10px 18px",
        borderBottom:"1px solid var(--border-muted)",
        background:"var(--bg-surface)",
        boxShadow:"0 1px 0 var(--border-dim)",
      }}>
        {isMobile && (
          <button
            onClick={() => window.dispatchEvent(new CustomEvent("dash-navigate", { detail:{ section:"Dashboard" } }))}
            title="Inicio"
            style={{
              display:"flex", alignItems:"center", justifyContent:"center",
              width:32, height:32, padding:0, flexShrink:0,
              background:"transparent", border:"1px solid var(--border-muted)",
              color:"var(--text-dim)", fontSize:16, cursor:"pointer",
              fontFamily:"Outfit,sans-serif", borderRadius:8,
              transition:"all 0.15s cubic-bezier(0.4,0,0.2,1)",
            }}
          >⌂</button>
        )}

        <button
          onClick={() => setSidebarOpen(v => !v)}
          title={sidebarOpen ? "Ocultar módulos" : "Mostrar módulos"}
          style={{
            display:"flex", alignItems:"center", gap:6, flexShrink:0,
            padding:"6px 12px", height:32,
            background:"rgba(var(--color-accent-rgb),0.08)",
            border:"1px solid rgba(var(--color-accent-rgb),0.25)",
            color:"var(--color-accent)", fontSize:12, fontWeight:700,
            cursor:"pointer", fontFamily:"Outfit,sans-serif",
            borderRadius:8, transition:"all 0.15s cubic-bezier(0.4,0,0.2,1)",
          }}
        >
          {sidebarOpen ? <><span>◀</span>{!isMobile && <span>Módulos</span>}</> : <><span>☰</span>{!isMobile && <span>Módulos</span>}</>}
        </button>

        <div style={{ flex:1, minWidth:0, overflow:"hidden" }}>
          <div style={{
            fontSize: isMobile ? 13 : 14, fontWeight:700,
            color:"var(--text-primary)", whiteSpace:"nowrap",
            overflow:"hidden", textOverflow:"ellipsis",
          }}>
            {clase?.titulo ?? "Selecciona una lección"}
          </div>
          {!isMobile && (
            <div style={{ fontSize:11, color:"var(--text-dim)", marginTop:1 }}>
              {currentLessonLabel}
            </div>
          )}
        </div>

        {/* Progress pill */}
        <div style={{ display:"flex", alignItems:"center", gap:8, flexShrink:0 }}>
          <div style={{
            width: isMobile ? 64 : 110, height:5,
            background:"var(--border-muted)", borderRadius:999, overflow:"hidden",
          }}>
            <div style={{
              height:"100%", width:`${progreso}%`,
              background:"linear-gradient(90deg, var(--color-accent), rgba(var(--color-accent-rgb),0.7))",
              borderRadius:999, transition:"width 0.45s ease",
            }} />
          </div>
          <div style={{
            fontSize:11, fontWeight:800, color:"var(--color-accent)",
            fontFamily:"Outfit,sans-serif", minWidth:32,
          }}>
            {progreso}%
          </div>
        </div>
      </div>

      {/* ── Body ── */}
      <div style={{ display:"flex", flexDirection: isMobile ? "column" : "row", flex:1, minHeight:0, overflow:"hidden" }}>

        {/* ── Sidebar ── */}
        <div style={isMobile ? {
          width:"100%", borderBottom:"1px solid var(--border-muted)",
          maxHeight: sidebarOpen ? 500 : 0,
          opacity: sidebarOpen ? 1 : 0,
          overflow:"hidden",
          transition:"max-height 0.28s ease, opacity 0.2s ease",
          background:"var(--bg-surface)", flexShrink:0,
        } : {
          width: sidebarOpen ? 320 : 0,
          minWidth:0,
          maxWidth: sidebarOpen ? 360 : 0,
          borderRight: sidebarOpen ? "1px solid var(--border-muted)" : "none",
          overflowY: sidebarOpen ? "auto" : "hidden",
          overflowX:"hidden",
          flexShrink:0,
          background:"var(--bg-surface)",
          transition:"width 0.25s ease, max-width 0.25s ease",
        }}>
          <div style={{ minWidth:280 }}>

            {/* Header block */}
            <div style={{
              padding:"22px 18px 18px",
              borderBottom:"1px solid var(--border-muted)",
              background:"var(--bg-elevated)",
              position:"relative", overflow:"hidden",
            }}>
              <div style={{
                position:"absolute", top:0, left:0, right:0, height:3,
                background:"linear-gradient(90deg, var(--color-accent), var(--color-purple, #8b5cf6))",
              }} />
              <div style={{
                fontSize:10, letterSpacing:2.5, textTransform:"uppercase",
                color:"var(--color-accent)", fontWeight:800, marginBottom:8,
              }}>
                School of Crypto
              </div>
              <div style={{
                fontSize:20, fontWeight:800, color:"var(--text-primary)",
                lineHeight:1.2, marginBottom:6,
              }}>
                Crypto Bootcamp
              </div>
              <div style={{ fontSize:12, color:"var(--text-dim)", lineHeight:1.7 }}>
                Formación práctica en criptomonedas, organizada por módulos y clases.
              </div>
            </div>

            {/* Progress */}
            <div style={{ padding:"14px 18px", borderBottom:"1px solid var(--border-muted)" }}>
              <div style={{ display:"flex", justifyContent:"space-between", fontSize:11, color:"var(--text-label)", marginBottom:7, letterSpacing:1, textTransform:"uppercase" }}>
                <span>Progreso del bootcamp</span>
                <span style={{ color:"var(--color-accent)", fontWeight:800 }}>{progreso}%</span>
              </div>
              <div style={{ height:5, background:"var(--border-muted)", borderRadius:999, overflow:"hidden" }}>
                <div style={{
                  height:"100%", width:`${progreso}%`,
                  background:"linear-gradient(90deg, var(--color-accent), rgba(var(--color-accent-rgb),0.7))",
                  borderRadius:999, transition:"width 0.5s ease",
                }} />
              </div>
              <div style={{ fontSize:11, color:"var(--text-faint)", marginTop:6, fontFamily:"Outfit,sans-serif" }}>
                {completadas.length} / {totalClases} clases completadas
              </div>
            </div>

            {/* Module list */}
            <div style={{ paddingBottom:16 }}>
              {CRYPTO_BOOTCAMP.map((mod, i) => {
                const open   = abiertos.has(mod.id);
                const activo = moduloActivo === i;
                const done   = mod.clases.filter(c => completadas.includes(c.id)).length;
                return (
                  <div key={mod.id} style={{ borderBottom:"1px solid var(--border-dim)" }}>
                    <button
                      onClick={() => toggle(mod.id)}
                      style={{
                        width:"100%", display:"flex", alignItems:"center", gap:10,
                        padding:"13px 16px", border:"none", cursor:"pointer",
                        background: activo ? "rgba(var(--color-accent-rgb),0.05)" : "transparent",
                        borderLeft:`2px solid ${activo ? "var(--color-accent)" : "transparent"}`,
                        textAlign:"left", fontFamily:"Outfit,sans-serif",
                        transition:"background 0.15s",
                      }}
                    >
                      <div style={{
                        width:28, height:28, minWidth:28, borderRadius:7,
                        background: open ? "rgba(var(--color-accent-rgb),0.12)" : "var(--bg-elevated)",
                        border:`1px solid ${open ? "rgba(var(--color-accent-rgb),0.35)" : "var(--border-dim)"}`,
                        display:"flex", alignItems:"center", justifyContent:"center",
                        fontSize:10, fontWeight:900,
                        color: open ? "var(--color-accent)" : "var(--text-faint)",
                        transition:"all 0.15s",
                      }}>
                        {String(i + 1).padStart(2, "0")}
                      </div>
                      <div style={{ flex:1, minWidth:0 }}>
                        <div style={{ fontSize:12, fontWeight:700, color: activo ? "var(--text-primary)" : "var(--text-secondary)", lineHeight:1.35 }}>
                          {mod.titulo}
                        </div>
                        <div style={{ fontSize:10, color:"var(--text-faint)", marginTop:2 }}>
                          {done}/{mod.clases.length} clases
                        </div>
                      </div>
                      <span style={{
                        color: open ? "var(--color-accent)" : "var(--text-faint)",
                        fontSize:18, transition:"transform 0.15s",
                        display:"inline-block",
                        transform: open ? "rotate(90deg)" : "rotate(0deg)",
                      }}>›</span>
                    </button>

                    <div style={{
                      overflow:"hidden",
                      maxHeight: open ? 800 : 0,
                      opacity: open ? 1 : 0,
                      transition:"max-height 0.22s ease, opacity 0.15s ease",
                    }}>
                      {mod.clases.map((item, ci) => {
                        const active = moduloActivo === i && claseActiva === ci;
                        const done   = completadas.includes(item.id);
                        return (
                          <button
                            key={item.id}
                            onClick={() => seleccionarClase(i, ci)}
                            style={{
                              width:"100%", display:"flex", alignItems:"center", gap:9,
                              padding: isMobile ? "10px 14px" : "9px 16px 9px 54px",
                              border:"none", cursor:"pointer",
                              background: active ? "rgba(var(--color-accent-rgb),0.06)" : "transparent",
                              borderLeft:`2px solid ${active ? "var(--color-accent)" : "transparent"}`,
                              borderBottom:"1px solid var(--border-dim)",
                              textAlign:"left", fontFamily:"Outfit,sans-serif",
                              transition:"background 0.12s",
                            }}
                          >
                            <CheckCircle done={done} />
                            <span style={{
                              fontSize: isMobile ? 13 : 12,
                              color: active ? "var(--text-primary)" : done ? "var(--text-dim)" : "var(--text-muted)",
                              flex:1, lineHeight:1.45,
                              fontWeight: active ? 700 : 400,
                            }}>
                              {item.titulo}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Content ── */}
        <div ref={contentRef} style={{
          flex:1, minWidth:0, overflowY:"auto",
          padding: isMobile ? "20px 16px 40px" : "32px 36px 48px",
          background:"var(--bg-base)",
        }}>
          {modulo && clase ? (
            <>
              {/* Module badge */}
              <div style={{
                display:"inline-flex", alignItems:"center", gap:6,
                padding:"3px 12px 3px 8px", marginBottom:16,
                background:"rgba(var(--color-accent-rgb),0.08)",
                border:"1px solid rgba(var(--color-accent-rgb),0.22)",
                borderRadius:999,
              }}>
                <span style={{ width:6, height:6, borderRadius:"50%", background:"var(--color-accent)", display:"inline-block", flexShrink:0 }} />
                <span style={{ fontSize:11, fontWeight:700, color:"var(--color-accent)", letterSpacing:1, textTransform:"uppercase" }}>
                  {modulo.titulo}
                </span>
              </div>

              {/* Lesson title + version toggle */}
              <div style={{ display:"flex", alignItems:"flex-start", gap:14, marginBottom:12, flexWrap:"wrap" }}>
                <h1 style={{
                  fontSize: isMobile ? 22 : 28, fontWeight:800,
                  color:"var(--text-primary)", lineHeight:1.2,
                  fontFamily:"Outfit,sans-serif", margin:0, flex:1, minWidth:0,
                }}>
                  {clase.titulo}
                </h1>
                {clase.contenidoV2 && (
                  <div style={{
                    display:"inline-flex", alignItems:"center",
                    background:"var(--bg-elevated)",
                    border:"1px solid var(--border-muted)",
                    borderRadius:8, padding:3, gap:2, flexShrink:0, alignSelf:"center",
                  }}>
                    {["v1","v2"].map(v => (
                      <button
                        key={v}
                        onClick={() => setVersion(v)}
                        style={{
                          padding:"3px 12px", border:"none", cursor:"pointer",
                          fontFamily:"Outfit,sans-serif", fontWeight:700,
                          fontSize:11, letterSpacing:0.8, borderRadius:6,
                          transition:"all 0.15s ease",
                          background: version === v
                            ? (v === "v2" ? "var(--color-accent)" : "var(--bg-base)")
                            : "transparent",
                          color: version === v
                            ? (v === "v2" ? "var(--btn-primary-text, #050a0f)" : "var(--text-primary)")
                            : "var(--text-faint)",
                          boxShadow: version === v ? "0 1px 4px rgba(0,0,0,0.15)" : "none",
                        }}
                      >
                        {v === "v1" ? "V1" : "V2 ✦"}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Meta chips */}
              <div style={{ display:"flex", alignItems:"center", gap:8, flexWrap:"wrap", marginBottom:24 }}>
                {[
                  `Clase ${claseActiva + 1} de ${modulo.clases.length}`,
                  clase.estado,
                  completadas.includes(clase.id) ? "✓ Completada" : null,
                ].filter(Boolean).map((chip, i) => (
                  <span key={i} style={{
                    padding:"3px 10px", borderRadius:999,
                    fontSize:11, fontWeight:600,
                    background: chip?.startsWith("✓") ? "rgba(34,197,94,0.1)" : "var(--bg-elevated)",
                    border:`1px solid ${chip?.startsWith("✓") ? "rgba(34,197,94,0.3)" : "var(--border-dim)"}`,
                    color: chip?.startsWith("✓") ? "var(--color-success)" : "var(--text-dim)",
                  }}>
                    {chip}
                  </span>
                ))}
              </div>

              {/* Summary */}
              <div style={{
                fontSize:11, letterSpacing:2, color:"var(--text-label)",
                textTransform:"uppercase", marginBottom:12, paddingBottom:8,
                borderBottom:"1px solid var(--border-muted)", fontFamily:"Outfit,sans-serif",
              }}>
                Resumen
              </div>
              <p style={{
                fontSize: isMobile ? 14 : 15, color:"var(--text-muted)",
                lineHeight:1.82, maxWidth:780, marginBottom:28, margin:"0 0 28px",
              }}>
                {clase.resumen}
              </p>

              {/* Content blocks */}
              <div style={{
                fontSize:11, letterSpacing:2, color:"var(--text-label)",
                textTransform:"uppercase", marginBottom:16, paddingBottom:8,
                borderBottom:"1px solid var(--border-muted)", fontFamily:"Outfit,sans-serif",
              }}>
                Contenido de la clase
              </div>

              {(version === "v2" && clase.contenidoV2 ? clase.contenidoV2 : clase.contenido) ? (
                <div style={{ display:"flex", flexDirection:"column", gap:12, marginBottom:28 }}>
                  {(version === "v2" && clase.contenidoV2 ? clase.contenidoV2 : clase.contenido).map((bloque, i) => (
                    <div key={i} style={{
                      background:"var(--bg-elevated)",
                      border:"1px solid var(--border-muted)",
                      borderRadius:10,
                      padding: isMobile ? "16px" : "18px 20px",
                      boxShadow:"0 1px 4px rgba(0,0,0,0.08)",
                      transition:"box-shadow 0.15s",
                    }}>
                      <div style={{
                        fontSize:13, color:"var(--color-accent)", fontWeight:800,
                        marginBottom:10, letterSpacing:0.3,
                      }}>
                        {bloque.titulo}
                      </div>
                      {bloque.batmanQuote && <BatmanSpeech quotes={bloque.batmanQuote} />}
                      {bloque.imagen && (
                        <img
                          src={bloque.imagen.src}
                          alt={bloque.imagen.alt}
                          style={{
                            maxWidth:"min(380px, 100%)", width:"100%",
                            display:"block", margin:"12px 0 16px",
                            border:"1px solid var(--border-muted)",
                            borderRadius:8,
                          }}
                        />
                      )}
                      {bloque.texto && (
                        <div style={{ fontSize:14, color:"var(--text-muted)", lineHeight:1.8 }}>
                          {bloque.texto.split("\n\n").map((p, idx, arr) => (
                            <p key={idx} style={{ margin: idx < arr.length - 1 ? "0 0 12px" : "0" }}>{p}</p>
                          ))}
                        </div>
                      )}
                      {bloque.puntos && (
                        <ul style={{ margin:0, paddingLeft:20, color:"var(--text-muted)", fontSize:14, lineHeight:1.8 }}>
                          {bloque.puntos.map((p, idx) => (
                            <li key={idx} style={{ marginBottom:6 }}>{p}</li>
                          ))}
                        </ul>
                      )}
                      {bloque.cierre && (
                        <div style={{ fontSize:14, color:"var(--text-muted)", lineHeight:1.8, marginTop:12 }}>
                          {bloque.cierre.split("\n\n").map((p, idx, arr) => (
                            <p key={idx} style={{ margin: idx < arr.length - 1 ? "0 0 12px" : "0" }}>{p}</p>
                          ))}
                        </div>
                      )}
                      {bloque.componente === "SHA256Widget" && <SHA256Widget />}
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{
                  background:"var(--bg-elevated)",
                  border:"1px solid var(--border-muted)",
                  borderRadius:10,
                  padding:"20px 22px",
                  color:"var(--text-dim)",
                  fontSize:13, lineHeight:1.7,
                  marginBottom:28,
                }}>
                  Aún no se ha cargado el contenido completo de esta clase.
                </div>
              )}

              {/* Actions */}
              <div style={{
                display:"flex",
                flexDirection: isMobile ? "column" : "row",
                gap:10,
                alignItems: isMobile ? "stretch" : "center",
                paddingTop:8,
              }}>
                <button
                  onClick={() => toggleCompletada(clase.id)}
                  style={{
                    padding:"11px 22px", fontSize:13, cursor:"pointer",
                    fontFamily:"Outfit,sans-serif", fontWeight:700, letterSpacing:"0.3px",
                    borderRadius:8, transition:"all 0.18s cubic-bezier(0.4,0,0.2,1)",
                    textAlign:"center",
                    ...(completadas.includes(clase.id) ? {
                      background:"transparent",
                      border:"1px solid var(--color-success)",
                      color:"var(--color-success)",
                    } : {
                      background:"var(--color-success)",
                      border:"1px solid var(--color-success)",
                      color:"#ffffff",
                      boxShadow:"0 2px 10px rgba(34,197,94,0.25)",
                    }),
                  }}
                >
                  {completadas.includes(clase.id) ? "✓ Completada" : "Marcar como completada"}
                </button>

                {(claseActiva < modulo.clases.length - 1 || moduloActivo < CRYPTO_BOOTCAMP.length - 1) && (
                  <button
                    onClick={irSiguiente}
                    style={{
                      padding:"11px 22px", fontSize:13, cursor:"pointer",
                      fontFamily:"Outfit,sans-serif", fontWeight:700, letterSpacing:"0.3px",
                      background:"linear-gradient(135deg, var(--color-accent) 0%, rgba(var(--color-accent-rgb),0.8) 100%)",
                      border:"1px solid var(--color-accent)",
                      color:"var(--btn-primary-text, #050a0f)",
                      borderRadius:8, textAlign:"center",
                      boxShadow:"0 2px 12px rgba(var(--color-accent-rgb),0.3)",
                      transition:"all 0.18s cubic-bezier(0.4,0,0.2,1)",
                    }}
                    onMouseEnter={e => { e.currentTarget.style.transform="translateY(-1px)"; e.currentTarget.style.boxShadow="0 4px 18px rgba(var(--color-accent-rgb),0.4)"; }}
                    onMouseLeave={e => { e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="0 2px 12px rgba(var(--color-accent-rgb),0.3)"; }}
                  >
                    Siguiente lección →
                  </button>
                )}
              </div>
            </>
          ) : (
            <div style={{
              display:"flex", flexDirection:"column",
              alignItems:"center", justifyContent:"center",
              height:"60%", gap:16,
              color:"var(--text-dim)", textAlign:"center",
            }}>
              <div style={{
                width:64, height:64, borderRadius:"50%",
                background:"rgba(var(--color-accent-rgb),0.08)",
                border:"1px solid rgba(var(--color-accent-rgb),0.18)",
                display:"flex", alignItems:"center", justifyContent:"center",
                fontSize:28,
              }}>📚</div>
              <div style={{ fontSize:16, fontWeight:700, color:"var(--text-secondary)", fontFamily:"Outfit,sans-serif" }}>
                Selecciona una clase para comenzar
              </div>
              <div style={{ fontSize:13, color:"var(--text-dim)", fontFamily:"Outfit,sans-serif" }}>
                Usa el panel de módulos para navegar el contenido
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
