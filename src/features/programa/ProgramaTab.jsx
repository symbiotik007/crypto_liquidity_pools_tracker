import { useState, useEffect, useRef } from "react";
import { useAuth } from "../../lib/AuthContext";
import { useNotasSync, useProgressSync, insertarNotificacion } from "../../lib/useSupabaseSync";
import { CURSO } from "./data/cursoData";

/* ── Helpers ──────────────────────────────────────────────────────── */
function fmtTs(ts) {
  return ts
    ? new Date(ts).toLocaleString("es-CO", { day:"numeric", month:"short", hour:"2-digit", minute:"2-digit" })
    : null;
}

/* ── Check circle ─────────────────────────────────────────────────── */
function Check({ done, size = 18 }) {
  return (
    <div style={{
      width: size, height: size, minWidth: size, borderRadius: "50%",
      background: done ? "var(--color-success)" : "transparent",
      border: done ? "none" : "1.5px solid var(--border-blue)",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: size * 0.55, color: "#fff", fontWeight: 900, flexShrink: 0,
      transition: "all 0.2s",
    }}>
      {done ? "✓" : ""}
    </div>
  );
}

/* ── Main ─────────────────────────────────────────────────────────── */
export default function ProgramaTab() {
  const { user } = useAuth();
  const [moduloActivo,    setModuloActivo]    = useState(0);
  const [leccionActiva,   setLeccionActiva]   = useState(0);
  const [modulosAbiertos, setModulosAbiertos] = useState(() => new Set([CURSO[0]?.id]));
  const [notasAbiertas,   setNotasAbiertas]   = useState(false);
  const [notasVista,      setNotasVista]      = useState("actual");
  const [copied,          setCopied]          = useState(false);
  const [winW,            setWinW]            = useState(() => window.innerWidth);
  const contentRef = useRef(null);

  useEffect(() => {
    const onResize = () => setWinW(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  const isMobile = winW < 768;

  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
  useEffect(() => { setSidebarOpen(!isMobile); }, [isMobile]);

  const { completadas, toggleCompletada: _toggle } = useProgressSync(user?.id, "programa");
  const { notas, notasMeta, saveNota, saving, lastSaved, syncError } = useNotasSync(user?.id);

  const totalLecciones = CURSO.reduce((a, m) => a + m.lecciones.length, 0);
  const progreso       = Math.round((completadas.length / totalLecciones) * 100);
  const modulo         = CURSO[moduloActivo];
  const leccion        = modulo?.lecciones[leccionActiva];

  useEffect(() => {
    if (contentRef.current) contentRef.current.scrollTop = 0;
  }, [moduloActivo, leccionActiva]);

  const toggleCompletada = (id) => {
    const completing = !completadas.includes(id);
    _toggle(id);
    if (completing && completadas.length + 1 === totalLecciones && user?.id) {
      insertarNotificacion(user.id, "curso_completado",
        "🎓 ¡Felicitaciones! Completaste el programa",
        "¡Lo lograste! Completaste el 100% del programa Trader en Formación.");
    }
  };

  const irSiguiente = () => {
    if (!leccion) return;
    if (!completadas.includes(leccion.id)) toggleCompletada(leccion.id);
    if (leccionActiva < modulo.lecciones.length - 1) {
      setLeccionActiva(l => l + 1);
    } else if (moduloActivo < CURSO.length - 1) {
      const next = CURSO[moduloActivo + 1];
      if (next) setModulosAbiertos(prev => new Set([...prev, next.id]));
      setModuloActivo(m => m + 1);
      setLeccionActiva(0);
    }
  };

  const toggleModulo = (id) => {
    setModulosAbiertos(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const seleccionarLeccion = (mi, li) => {
    setModuloActivo(mi);
    setLeccionActiva(li);
    setModulosAbiertos(prev => new Set([...prev, CURSO[mi].id]));
    if (isMobile) setSidebarOpen(false);
  };

  const notaActual   = notas[leccion?.id] || "";
  const todasConNota = CURSO.flatMap(m => m.lecciones.map(l => ({ ...l, modulo: m.titulo }))).filter(l => notas[l.id]?.trim());

  /* ── Sidebar ────────────────────────────────────────────────────── */
  const renderSidebar = () => (
    <div style={{
      width: isMobile ? "100%" : 300,
      minWidth: isMobile ? "unset" : 260,
      maxWidth: isMobile ? "unset" : 320,
      borderRight: isMobile ? "none" : "1px solid var(--border-muted)",
      borderBottom: isMobile ? "1px solid var(--border-muted)" : "none",
      overflowY: "auto",
      flexShrink: 0,
      background: "var(--bg-surface)",
      display: "flex",
      flexDirection: "column",
      ...(isMobile ? {
        maxHeight: sidebarOpen ? 480 : 0,
        opacity: sidebarOpen ? 1 : 0,
        overflow: "hidden",
        transition: "max-height 0.28s ease, opacity 0.2s ease",
      } : {}),
    }}>

      {/* Progress */}
      <div style={{ padding: "14px 18px", borderBottom: "1px solid var(--border-muted)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "var(--text-label)", marginBottom: 7, letterSpacing: 1, textTransform: "uppercase" }}>
          <span>Progreso del curso</span>
          <span style={{ color: "var(--color-accent)", fontWeight: 800 }}>{progreso}%</span>
        </div>
        <div style={{ height: 4, background: "var(--border-muted)", borderRadius: 999, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${progreso}%`, background: "var(--color-accent)", borderRadius: 999, transition: "width 0.5s ease" }} />
        </div>
        <div style={{ fontSize: 11, color: "var(--text-faint)", marginTop: 6, fontFamily: "Outfit,sans-serif" }}>
          {completadas.length} / {totalLecciones} lecciones completadas
        </div>
      </div>

      {/* Module list */}
      <div style={{ flex: 1, overflowY: "auto", paddingBottom: 16 }}>
        {CURSO.map((mod, mi) => {
          const abierto  = modulosAbiertos.has(mod.id);
          const activo   = moduloActivo === mi;
          const done     = mod.lecciones.filter(l => completadas.includes(l.id)).length;
          return (
            <div key={mod.id} style={{ borderBottom: "1px solid var(--border-dim)" }}>
              <button
                onClick={() => toggleModulo(mod.id)}
                style={{
                  width: "100%", display: "flex", alignItems: "center", gap: 10,
                  padding: "13px 16px", border: "none", cursor: "pointer",
                  background: activo ? "rgba(var(--color-accent-rgb),0.05)" : "transparent",
                  borderLeft: `2px solid ${activo ? mod.color : "transparent"}`,
                  textAlign: "left", fontFamily: "Outfit,sans-serif",
                  transition: "background 0.15s",
                }}
              >
                <div style={{
                  width: 26, height: 26, minWidth: 26, borderRadius: 6,
                  background: abierto ? mod.color + "22" : "var(--bg-elevated)",
                  border: `1px solid ${abierto ? mod.color + "55" : "var(--border-dim)"}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 10, fontWeight: 900,
                  color: abierto ? mod.color : "var(--text-faint)",
                  transition: "all 0.15s",
                }}>
                  {String(mi + 1).padStart(2, "0")}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: activo ? "var(--text-primary)" : "var(--text-secondary)", lineHeight: 1.35 }}>
                    {mod.titulo}
                  </div>
                  <div style={{ fontSize: 10, color: "var(--text-faint)", marginTop: 2 }}>
                    {done}/{mod.lecciones.length} lecciones
                  </div>
                </div>
                <span style={{
                  color: abierto ? "var(--color-accent)" : "var(--text-faint)",
                  fontSize: 16, transition: "transform 0.15s",
                  display: "inline-block",
                  transform: abierto ? "rotate(90deg)" : "rotate(0deg)",
                }}>›</span>
              </button>

              <div style={{
                overflow: "hidden", maxHeight: abierto ? 600 : 0, opacity: abierto ? 1 : 0,
                transition: "max-height 0.22s ease, opacity 0.15s ease",
              }}>
                {mod.lecciones.map((lec, li) => {
                  const activa = moduloActivo === mi && leccionActiva === li;
                  const done   = completadas.includes(lec.id);
                  return (
                    <button
                      key={lec.id}
                      onClick={() => seleccionarLeccion(mi, li)}
                      style={{
                        width: "100%", display: "flex", alignItems: "center", gap: 9,
                        padding: "9px 16px 9px 52px", border: "none", cursor: "pointer",
                        background: activa ? "var(--bg-elevated)" : "transparent",
                        borderLeft: `2px solid ${activa ? "var(--color-accent)" : "transparent"}`,
                        textAlign: "left", fontFamily: "Outfit,sans-serif",
                        borderBottom: "1px solid var(--border-dim)",
                        transition: "background 0.12s",
                        boxSizing: "border-box",
                      }}
                    >
                      <Check done={done} size={16} />
                      <span style={{
                        fontSize: 12, lineHeight: 1.45, flex: 1,
                        color: activa ? "var(--text-primary)" : done ? "var(--text-dim)" : "var(--text-muted)",
                        fontWeight: activa ? 600 : 400,
                      }}>
                        {lec.titulo}
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
  );

  /* ── Content area ────────────────────────────────────────────────── */
  const renderContent = () => (
    <div ref={contentRef} style={{ flex: 1, minWidth: 0, overflowY: "auto", padding: isMobile ? "18px 16px 40px" : "32px 36px 48px", background: "var(--bg-base)" }}>
      {leccion ? (
        <>
          {/* Badge + title */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            padding: "3px 12px", borderRadius: 999,
            background: modulo.color + "16",
            border: `1px solid ${modulo.color}44`,
            color: modulo.color, fontSize: 11, fontWeight: 800,
            letterSpacing: 1.2, textTransform: "uppercase", marginBottom: 16,
          }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: modulo.color }} />
            {modulo.titulo}
          </div>

          <h1 style={{
            fontSize: isMobile ? 20 : 26, fontWeight: 800,
            color: "var(--text-primary)", lineHeight: 1.25,
            marginBottom: 14, letterSpacing: -0.4,
          }}>
            {leccion.titulo}
          </h1>

          {/* Meta row */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap", marginBottom: 24 }}>
            <div style={{
              display: "flex", alignItems: "center", gap: 5, fontSize: 12,
              color: "var(--text-dim)", background: "var(--bg-elevated)",
              border: "1px solid var(--border-muted)", borderRadius: 999, padding: "4px 10px",
            }}>
              <span style={{ color: "var(--color-accent)" }}>▷</span>
              {leccion.duracion}
            </div>
            <div style={{
              fontSize: 12, color: "var(--text-dim)", background: "var(--bg-elevated)",
              border: "1px solid var(--border-muted)", borderRadius: 999, padding: "4px 10px",
            }}>
              Lección {leccionActiva + 1} de {modulo.lecciones.length}
            </div>
            {completadas.includes(leccion.id) && (
              <div style={{
                fontSize: 12, color: "var(--color-success)", background: "var(--bg-success-subtle)",
                border: "1px solid var(--border-success-subtle)", borderRadius: 999, padding: "4px 10px",
                fontWeight: 700, display: "flex", alignItems: "center", gap: 4,
              }}>
                ✓ Completada
              </div>
            )}
          </div>

          {/* Video placeholder */}
          <div style={{
            aspectRatio: "16/9", borderRadius: 12, overflow: "hidden",
            background: "var(--bg-elevated)", border: "1px solid var(--border-muted)",
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
            gap: 12, marginBottom: 28, position: "relative", cursor: "pointer",
            boxShadow: "var(--shadow-card)",
          }}>
            <div style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(135deg, rgba(var(--color-accent-rgb),0.04) 0%, transparent 60%)",
            }} />
            <div style={{
              width: 60, height: 60, borderRadius: "50%",
              background: "rgba(var(--color-accent-rgb),0.10)",
              border: "2px solid rgba(var(--color-accent-rgb),0.35)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 22, color: "var(--color-accent)", position: "relative", zIndex: 1,
              transition: "transform 0.2s, background 0.2s",
            }}>▷</div>
            <div style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "var(--text-secondary)", marginBottom: 4 }}>
                Video de la lección
              </div>
              <div style={{ fontSize: 11, color: "var(--text-faint)" }}>
                YouTube / Vimeo embed
              </div>
            </div>
          </div>

          {/* Descripción */}
          <div style={{ fontSize: 10, letterSpacing: 2, color: "var(--text-label)", textTransform: "uppercase", marginBottom: 10, marginTop: 6, paddingBottom: 8, borderBottom: "1px solid var(--border-muted)", fontWeight: 700 }}>
            Descripción
          </div>
          <p style={{ fontSize: isMobile ? 14 : 15, color: "var(--text-muted)", lineHeight: 1.85, marginBottom: 28, maxWidth: 720 }}>
            {leccion.descripcion}
          </p>

          {/* Puntos clave */}
          <div style={{ fontSize: 10, letterSpacing: 2, color: "var(--text-label)", textTransform: "uppercase", marginBottom: 14, paddingBottom: 8, borderBottom: "1px solid var(--border-muted)", fontWeight: 700 }}>
            Puntos Clave
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 28 }}>
            {leccion.puntosClave.map((p, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "flex-start", gap: 12,
                padding: "12px 16px", borderRadius: 8,
                background: "var(--bg-surface)", border: "1px solid var(--border-muted)",
                boxShadow: "var(--shadow-card)",
              }}>
                <div style={{
                  width: 22, height: 22, minWidth: 22, borderRadius: "50%",
                  background: "rgba(var(--color-accent-rgb),0.10)",
                  border: "1px solid rgba(var(--color-accent-rgb),0.25)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 11, color: "var(--color-accent)", fontWeight: 900,
                  flexShrink: 0, marginTop: 1,
                }}>▸</div>
                <span style={{ fontSize: isMobile ? 13 : 14, color: "var(--text-muted)", lineHeight: 1.65 }}>{p}</span>
              </div>
            ))}
          </div>

          {/* Ejercicio */}
          <div style={{ fontSize: 10, letterSpacing: 2, color: "var(--text-label)", textTransform: "uppercase", marginBottom: 14, paddingBottom: 8, borderBottom: "1px solid var(--border-muted)", fontWeight: 700 }}>
            Ejercicio Práctico
          </div>
          <div style={{
            padding: "18px 20px", borderRadius: 10,
            background: "var(--bg-warning-subtle)",
            border: "1px solid var(--border-warning-subtle)",
            marginBottom: 32,
          }}>
            <div style={{ fontSize: 10, letterSpacing: 2, color: "var(--color-warning)", textTransform: "uppercase", fontWeight: 800, marginBottom: 8 }}>
              Tu tarea
            </div>
            <div style={{ fontSize: isMobile ? 13 : 14, color: "var(--text-muted)", lineHeight: 1.75 }}>
              {leccion.ejercicio}
            </div>
          </div>

          {/* Actions */}
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
            <button
              onClick={() => toggleCompletada(leccion.id)}
              style={{
                padding: "11px 22px", fontSize: 13, cursor: "pointer",
                fontFamily: "Outfit,sans-serif", fontWeight: 700, borderRadius: 8,
                background: completadas.includes(leccion.id) ? "transparent" : "var(--color-success)",
                border: "1px solid var(--color-success)",
                color: completadas.includes(leccion.id) ? "var(--color-success)" : "#fff",
                letterSpacing: 0.3, transition: "all 0.18s",
              }}
            >
              {completadas.includes(leccion.id) ? "✓ Completada" : "Marcar como completada"}
            </button>

            {(leccionActiva < modulo.lecciones.length - 1 || moduloActivo < CURSO.length - 1) && (
              <button
                onClick={irSiguiente}
                style={{
                  padding: "11px 22px", fontSize: 13, cursor: "pointer",
                  fontFamily: "Outfit,sans-serif", fontWeight: 700, borderRadius: 8,
                  background: "var(--color-accent)", border: "1px solid var(--color-accent)",
                  color: "var(--btn-primary-text)", letterSpacing: 0.3,
                  transition: "all 0.18s",
                }}
              >
                Siguiente lección →
              </button>
            )}

            <button
              onClick={() => setNotasAbiertas(n => !n)}
              style={{
                padding: "11px 16px", fontSize: 13, cursor: "pointer",
                fontFamily: "Outfit,sans-serif", fontWeight: 600, borderRadius: 8,
                background: "transparent",
                border: `1px solid ${notasAbiertas ? "var(--color-accent)" : "var(--border-muted)"}`,
                color: notasAbiertas ? "var(--color-accent)" : "var(--text-dim)",
                display: "flex", alignItems: "center", gap: 6, transition: "all 0.15s",
              }}
            >
              ✎ Mis notas
              {todasConNota.length > 0 && (
                <span style={{
                  padding: "1px 7px", borderRadius: 999,
                  background: "rgba(var(--color-accent-rgb),0.12)",
                  border: "1px solid rgba(var(--color-accent-rgb),0.25)",
                  fontSize: 10, color: "var(--color-accent)", fontWeight: 700,
                }}>
                  {todasConNota.length}
                </span>
              )}
            </button>
          </div>
        </>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "60%", gap: 14, color: "var(--text-dim)", textAlign: "center" }}>
          <div style={{ fontSize: 36 }}>📚</div>
          <div style={{ fontSize: 15, fontWeight: 700, color: "var(--text-secondary)" }}>Selecciona una lección</div>
          <div style={{ fontSize: 13 }}>Usa el panel de módulos para navegar el contenido</div>
        </div>
      )}
    </div>
  );

  /* ── Notes panel ─────────────────────────────────────────────────── */
  const renderNotasPanel = () => (
    <div style={{
      position: "fixed", bottom: 0, right: 0,
      width: isMobile ? "100%" : 420,
      height: isMobile ? "60vh" : 480,
      background: "var(--bg-surface)",
      border: "1px solid var(--border-muted)",
      borderBottom: "none", borderRight: "none",
      zIndex: 50, display: "flex", flexDirection: "column",
      boxShadow: "-4px -4px 40px rgba(0,0,0,0.18)",
      borderRadius: "12px 0 0 0",
    }}>
      {/* Header */}
      <div style={{
        padding: "13px 16px", borderBottom: "1px solid var(--border-muted)",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        background: "var(--bg-elevated)", borderRadius: "12px 0 0 0",
      }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 12, fontWeight: 800, color: "var(--color-accent)", letterSpacing: 1, textTransform: "uppercase" }}>✎ Mis notas</div>
          {notasVista === "actual" && leccion && (
            <div style={{ fontSize: 11, color: "var(--text-dim)", marginTop: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {leccion.titulo.slice(0, 44)}{leccion.titulo.length > 44 ? "…" : ""}
            </div>
          )}
        </div>
        <button
          onClick={() => setNotasAbiertas(false)}
          style={{ background: "none", border: "none", color: "var(--text-dim)", fontSize: 18, cursor: "pointer", padding: "0 0 0 12px", lineHeight: 1, transition: "color 0.15s" }}
          onMouseEnter={e => e.currentTarget.style.color = "var(--color-accent)"}
          onMouseLeave={e => e.currentTarget.style.color = "var(--text-dim)"}
        >✕</button>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", borderBottom: "1px solid var(--border-muted)", flexShrink: 0 }}>
        {[["actual", "Esta lección"], ["todas", `Todas (${todasConNota.length})`]].map(([k, l]) => (
          <button key={k} onClick={() => setNotasVista(k)} style={{
            flex: 1, padding: "9px 0", background: "none", border: "none", cursor: "pointer",
            fontFamily: "Outfit,sans-serif", fontSize: 12, fontWeight: 600,
            borderBottom: `2px solid ${notasVista === k ? "var(--color-accent)" : "transparent"}`,
            color: notasVista === k ? "var(--color-accent)" : "var(--text-dim)",
            transition: "all 0.15s",
          }}>{l}</button>
        ))}
      </div>

      {notasVista === "actual" && (
        <>
          <textarea
            style={{
              flex: 1, background: "transparent", border: "none", outline: "none",
              color: "var(--text-muted)", fontSize: 13, padding: "14px 16px",
              resize: "none", fontFamily: "Outfit,sans-serif", lineHeight: 1.8,
            }}
            placeholder="Escribe tus apuntes de esta lección... Se guardan automáticamente."
            value={notaActual}
            onChange={e => leccion && saveNota(leccion.id, e.target.value)}
            maxLength={2000}
          />
          <div style={{
            padding: "8px 14px", borderTop: "1px solid var(--border-muted)",
            display: "flex", alignItems: "center", gap: 8,
            background: "var(--bg-elevated)", fontSize: 11,
          }}>
            <span style={{ color: "var(--text-faint)" }}>{notaActual.length}/2000</span>
            <div style={{ flex: 1 }} />
            {notasMeta?.[leccion?.id] && !saving && (
              <span style={{ color: "var(--text-faint)", fontSize: 10 }}>🕐 {fmtTs(notasMeta[leccion.id])}</span>
            )}
            <span style={{ fontWeight: 700, fontSize: 11, color: syncError ? "var(--color-danger)" : saving ? "var(--color-warning)" : lastSaved ? "var(--color-success)" : "var(--text-faint)" }}>
              {syncError ? "⚠ Error" : saving ? "↑ Guardando" : lastSaved ? "✓ Sincronizado" : "● Local"}
            </span>
            <button
              onClick={() => { navigator.clipboard.writeText(notaActual); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
              disabled={!notaActual}
              style={{
                background: "none", border: "1px solid var(--border-muted)", borderRadius: 6,
                color: copied ? "var(--color-success)" : "var(--text-dim)",
                cursor: notaActual ? "pointer" : "not-allowed", padding: "3px 9px",
                fontSize: 11, fontFamily: "Outfit,sans-serif", transition: "all 0.15s",
              }}
            >{copied ? "✓ Copiado" : "📋 Copiar"}</button>
            <button
              onClick={() => { if (leccion && window.confirm("¿Borrar la nota de esta lección?")) saveNota(leccion.id, ""); }}
              disabled={!notaActual}
              style={{
                background: "none", border: "1px solid var(--border-muted)", borderRadius: 6,
                color: "var(--text-dim)", cursor: notaActual ? "pointer" : "not-allowed",
                padding: "3px 9px", fontSize: 11, fontFamily: "Outfit,sans-serif",
              }}
            >🗑</button>
          </div>
          {!user && (
            <div style={{ padding: "6px 14px", fontSize: 10, color: "var(--text-faint)", borderTop: "1px solid var(--border-muted)", background: "var(--bg-elevated)", textAlign: "center" }}>
              ⚠ Inicia sesión para sincronizar en todos tus dispositivos
            </div>
          )}
        </>
      )}

      {notasVista === "todas" && (
        <div style={{ flex: 1, overflowY: "auto", padding: "8px 0" }}>
          {todasConNota.length === 0 ? (
            <div style={{ padding: "40px 16px", textAlign: "center", color: "var(--text-dim)", fontSize: 13 }}>Aún no tienes notas guardadas</div>
          ) : todasConNota.map(l => {
            const isActive = l.id === leccion?.id;
            return (
              <div
                key={l.id}
                onClick={() => {
                  const mIdx = CURSO.findIndex(m => m.lecciones.some(ll => ll.id === l.id));
                  const lIdx = CURSO[mIdx]?.lecciones.findIndex(ll => ll.id === l.id);
                  if (mIdx >= 0 && lIdx >= 0) { seleccionarLeccion(mIdx, lIdx); setNotasVista("actual"); }
                }}
                style={{
                  padding: "12px 16px", cursor: "pointer",
                  borderBottom: "1px solid var(--border-dim)",
                  background: isActive ? "rgba(var(--color-accent-rgb),0.05)" : "transparent",
                  borderLeft: `2px solid ${isActive ? "var(--color-accent)" : "transparent"}`,
                  transition: "background 0.12s",
                }}
                onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = "var(--bg-elevated)"; }}
                onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = "transparent"; }}
              >
                <div style={{ fontSize: 12, fontWeight: 700, color: "var(--color-accent)", marginBottom: 3, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{l.titulo}</div>
                <div style={{ fontSize: 12, color: "var(--text-dim)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", lineHeight: 1.5 }}>
                  {notas[l.id]?.slice(0, 70)}{notas[l.id]?.length > 70 ? "…" : ""}
                </div>
                {notasMeta?.[l.id] && (
                  <div style={{ fontSize: 10, color: "var(--text-faint)", marginTop: 4 }}>🕐 {fmtTs(notasMeta[l.id])}</div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );

  /* ── Topbar (mobile only) ─────────────────────────────────────────── */
  const renderTopbar = () => isMobile && (
    <div style={{
      display: "flex", alignItems: "center", gap: 10, padding: "10px 14px",
      borderBottom: "1px solid var(--border-muted)", background: "var(--bg-surface)",
      flexShrink: 0,
    }}>
      <button
        style={{
          padding: "6px 10px", background: "transparent",
          border: "1px solid var(--border-muted)", borderRadius: 8,
          color: "var(--text-dim)", fontSize: 12, cursor: "pointer",
          fontFamily: "Outfit,sans-serif",
        }}
        onClick={() => window.dispatchEvent(new CustomEvent("dash-navigate", { detail: { section: "Dashboard" } }))}
      >⌂</button>
      <button
        style={{
          display: "flex", alignItems: "center", gap: 6,
          padding: "6px 12px", background: "rgba(var(--color-accent-rgb),0.07)",
          border: "1px solid var(--border-blue)", borderRadius: 6,
          color: "var(--color-accent)", fontSize: 12, fontWeight: 700, cursor: "pointer",
          fontFamily: "Outfit,sans-serif",
        }}
        onClick={() => setSidebarOpen(v => !v)}
      >
        {sidebarOpen ? "◀" : "☰"} Módulos
      </button>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: "var(--text-primary)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {leccion?.titulo ?? "Selecciona una lección"}
        </div>
      </div>
      <div style={{ fontSize: 11, fontWeight: 700, color: "var(--color-accent)", whiteSpace: "nowrap" }}>{progreso}%</div>
    </div>
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", minHeight: 0, fontFamily: "Outfit,sans-serif" }}>
      {renderTopbar()}
      <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", flex: 1, minHeight: 0, overflow: "hidden" }}>
        {renderSidebar()}
        {renderContent()}
      </div>
      {notasAbiertas && renderNotasPanel()}
    </div>
  );
}
