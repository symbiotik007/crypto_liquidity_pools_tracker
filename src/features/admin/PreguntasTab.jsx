import { useState } from "react";
import { useAuth } from "../../lib/AuthContext";
import { usePreguntasSync } from "../../lib/useSupabaseSync";

/* ── Avatar inicial ─────────────────────────────────────────── */
function Avatar({ name, size = 32 }) {
  const initials = (name || "U").split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
  return (
    <div style={{
      width: size, height: size, minWidth: size, borderRadius: "50%",
      background: "linear-gradient(135deg, rgba(var(--color-accent-rgb),0.18) 0%, rgba(var(--color-accent-rgb),0.10) 100%)",
      border: "1.5px solid rgba(var(--color-accent-rgb),0.30)",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: size * 0.38, fontWeight: 800, color: "var(--color-accent)",
      fontFamily: "Outfit, sans-serif", letterSpacing: 0.5, flexShrink: 0,
    }}>
      {initials}
    </div>
  );
}

/* ── Status pill ────────────────────────────────────────────── */
function Pill({ label, color, bg }) {
  return (
    <span style={{
      padding: "3px 10px", fontSize: 10, fontWeight: 800, letterSpacing: 1.2,
      border: `1px solid ${color}44`, color, background: bg || `${color}12`,
      textTransform: "uppercase", borderRadius: 999, whiteSpace: "nowrap",
      fontFamily: "Outfit, sans-serif",
    }}>{label}</span>
  );
}

/* ── Empty state ────────────────────────────────────────────── */
function EmptyState({ icon, title, sub }) {
  return (
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "center",
      justifyContent: "center", padding: "56px 24px", gap: 12, textAlign: "center",
    }}>
      <div style={{
        width: 56, height: 56, borderRadius: "50%",
        background: "rgba(var(--color-accent-rgb),0.07)",
        border: "1px solid rgba(var(--color-accent-rgb),0.18)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 24, marginBottom: 4,
      }}>{icon}</div>
      <div style={{ fontSize: 15, fontWeight: 700, color: "var(--text-secondary)" }}>{title}</div>
      {sub && <div style={{ fontSize: 13, color: "var(--text-dim)", maxWidth: 280, lineHeight: 1.6 }}>{sub}</div>}
    </div>
  );
}

export default function PreguntasTab() {
  const { user, profile, isAdmin } = useAuth();
  const userName = profile?.full_name || user?.user_metadata?.full_name || user?.email?.split("@")[0] || "Usuario";
  const { misPreguntas, faqPublica, pendientes, loading,
          enviarPregunta, responderPregunta, eliminarPregunta, reload } = usePreguntasSync(user?.id, isAdmin);

  const [texto,       setTexto]       = useState("");
  const [sending,     setSending]     = useState(false);
  const [sendOk,      setSendOk]      = useState(false);
  const [sendErr,     setSendErr]     = useState("");
  const [openFaq,     setOpenFaq]     = useState(null);
  const [adminTab,    setAdminTab]    = useState("pendientes");
  const [respuestas,  setRespuestas]  = useState({});
  const [publicas,    setPublicas]    = useState({});
  const [answering,   setAnswering]   = useState(null);

  const handleEnviar = async (e) => {
    e.preventDefault();
    if (!texto.trim()) return;
    setSending(true); setSendErr("");
    const { error } = await enviarPregunta(texto.trim(), userName);
    setSending(false);
    if (error) { setSendErr("No se pudo enviar. Intenta de nuevo."); return; }
    setTexto(""); setSendOk(true);
    setTimeout(() => setSendOk(false), 5000);
  };

  const handleResponder = async (id) => {
    const r = respuestas[id]?.trim();
    if (!r) return;
    setAnswering(id);
    const pub = publicas[id] !== false;
    await responderPregunta(id, r, pub);
    setAnswering(null);
    setRespuestas(prev => { const n = {...prev}; delete n[id]; return n; });
  };

  const fmtDate = (d) => d ? new Date(d).toLocaleDateString("es-CO", { day: "numeric", month: "short", year: "numeric" }) : "";

  const ADMIN_TABS = [
    { key: "pendientes", label: "Sin responder", count: pendientes.length },
    { key: "respondidas", label: "Respondidas",  count: misPreguntas.length },
    { key: "faq",        label: "FAQ pública",   count: faqPublica.length },
  ];

  return (
    <div style={{
      padding: "36px 32px 48px",
      maxWidth: 1080,
      margin: "0 auto",
      display: "flex",
      flexDirection: "column",
      gap: 32,
      fontFamily: "Outfit, sans-serif",
    }}>

      {/* ── Header ─────────────────────────────────────────── */}
      <div style={{
        background: "var(--bg-surface)",
        border: "1px solid var(--border-muted)",
        borderRadius: 14,
        padding: "32px 32px 28px",
        position: "relative",
        overflow: "hidden",
        boxShadow: "var(--shadow-card)",
      }}>
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 3,
          background: "linear-gradient(90deg, var(--color-accent), var(--color-purple))",
          borderRadius: "14px 14px 0 0",
        }} />
        <div style={{
          fontSize: 11, fontWeight: 800, color: "var(--color-accent)",
          letterSpacing: 3, textTransform: "uppercase", marginBottom: 10,
        }}>
          School of Crypto
        </div>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
          <div>
            <h2 style={{ fontSize: 28, fontWeight: 800, color: "var(--text-primary)", marginBottom: 8, letterSpacing: -0.5, lineHeight: 1.2 }}>
              Preguntas & Respuestas
            </h2>
            <p style={{ fontSize: 14, color: "var(--text-dim)", lineHeight: 1.6, maxWidth: 540 }}>
              {isAdmin
                ? `Panel de administración — ${pendientes.length} pregunta${pendientes.length !== 1 ? "s" : ""} pendiente${pendientes.length !== 1 ? "s" : ""}`
                : "Envía tu pregunta y Oscar te responderá directamente. Revisa las FAQ para respuestas comunes."}
            </p>
          </div>
          {isAdmin && pendientes.length > 0 && (
            <div style={{
              padding: "10px 18px",
              background: "rgba(var(--color-accent-rgb),0.08)",
              border: "1px solid rgba(var(--color-accent-rgb),0.25)",
              borderRadius: 10,
              textAlign: "center", flexShrink: 0,
            }}>
              <div style={{ fontSize: 28, fontWeight: 900, color: "var(--color-accent)", lineHeight: 1 }}>{pendientes.length}</div>
              <div style={{ fontSize: 11, color: "var(--text-dim)", marginTop: 4, letterSpacing: 0.5 }}>pendiente{pendientes.length !== 1 ? "s" : ""}</div>
            </div>
          )}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════
          VISTA ADMIN
      ═══════════════════════════════════════════════════ */}
      {isAdmin && (
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>

          {/* ── Tabs barra ──────────────────────────────── */}
          <div style={{
            display: "flex", alignItems: "center",
            background: "var(--bg-surface)",
            border: "1px solid var(--border-muted)",
            borderRadius: "12px 12px 0 0",
            borderBottom: "none",
            padding: "0 6px",
            boxShadow: "var(--shadow-card)",
          }}>
            {ADMIN_TABS.map(({ key, label, count }) => {
              const active = adminTab === key;
              return (
                <button key={key} onClick={() => setAdminTab(key)} style={{
                  padding: "14px 20px",
                  background: "none", border: "none", cursor: "pointer",
                  fontFamily: "Outfit, sans-serif", fontSize: 13, fontWeight: active ? 700 : 500,
                  color: active ? "var(--color-accent)" : "var(--text-dim)",
                  borderBottom: `2px solid ${active ? "var(--color-accent)" : "transparent"}`,
                  transition: "all 0.18s",
                  display: "flex", alignItems: "center", gap: 8,
                  whiteSpace: "nowrap",
                }}>
                  {label}
                  <span style={{
                    fontSize: 11, fontWeight: 800,
                    padding: "2px 7px", borderRadius: 999,
                    background: active ? "rgba(var(--color-accent-rgb),0.12)" : "var(--bg-elevated)",
                    color: active ? "var(--color-accent)" : "var(--text-faint)",
                    border: active ? "1px solid rgba(var(--color-accent-rgb),0.25)" : "1px solid var(--border-dim)",
                    transition: "all 0.18s",
                  }}>{count}</span>
                </button>
              );
            })}
            <button onClick={reload} style={{
              marginLeft: "auto", background: "none", border: "1px solid var(--border-muted)",
              color: "var(--text-dim)", cursor: "pointer", fontSize: 12,
              padding: "7px 14px", borderRadius: 8, fontFamily: "Outfit,sans-serif",
              fontWeight: 600, letterSpacing: 0.3, transition: "all 0.18s",
              display: "flex", alignItems: "center", gap: 6,
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--color-accent)"; e.currentTarget.style.color = "var(--color-accent)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border-muted)"; e.currentTarget.style.color = "var(--text-dim)"; }}
            >
              <span style={{ display: "inline-block", transition: "transform 0.4s" }}>↻</span>
              Actualizar
            </button>
          </div>

          {/* ── Panel cuerpo ────────────────────────────── */}
          <div style={{
            background: "var(--bg-elevated)",
            border: "1px solid var(--border-muted)",
            borderRadius: "0 0 12px 12px",
            padding: "24px",
            minHeight: 200,
          }}>
            {loading && (
              <div style={{ display: "flex", alignItems: "center", gap: 10, justifyContent: "center", padding: "40px 0", color: "var(--text-dim)", fontSize: 13 }}>
                <span style={{ display: "inline-block", animation: "spin 1s linear infinite" }}>⟳</span>
                Cargando preguntas...
              </div>
            )}

            {/* Sin responder */}
            {!loading && adminTab === "pendientes" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {pendientes.length === 0 && (
                  <EmptyState icon="✓" title="Todo al día" sub="No hay preguntas pendientes de respuesta." />
                )}
                {pendientes.map(p => (
                  <div key={p.id} style={{
                    background: "var(--bg-surface)",
                    border: "1px solid var(--border-blue)",
                    borderRadius: 12,
                    padding: "24px",
                    boxShadow: "var(--shadow-card)",
                    position: "relative",
                    overflow: "hidden",
                  }}>
                    <div style={{
                      position: "absolute", top: 0, left: 0, bottom: 0, width: 3,
                      background: "var(--color-accent)", borderRadius: "12px 0 0 12px",
                    }} />
                    <div style={{ display: "flex", gap: 14, marginBottom: 18 }}>
                      <Avatar name={p.user_name} size={38} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, marginBottom: 6 }}>
                          <div style={{ fontSize: 13, fontWeight: 700, color: "var(--text-secondary)" }}>
                            {p.user_name || "Usuario"}
                          </div>
                          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <span style={{ fontSize: 11, color: "var(--text-faint)" }}>{fmtDate(p.created_at)}</span>
                            <button
                              onClick={() => eliminarPregunta(p.id)}
                              style={{
                                background: "none", border: "none", color: "var(--text-faint)",
                                cursor: "pointer", fontSize: 15, padding: "2px 4px", lineHeight: 1,
                                borderRadius: 4, transition: "color 0.15s",
                              }}
                              onMouseEnter={e => e.currentTarget.style.color = "var(--color-danger)"}
                              onMouseLeave={e => e.currentTarget.style.color = "var(--text-faint)"}
                              title="Eliminar"
                            >✕</button>
                          </div>
                        </div>
                        <div style={{ fontSize: 15, color: "var(--text-primary)", lineHeight: 1.65, fontWeight: 500 }}>
                          {p.pregunta}
                        </div>
                      </div>
                    </div>

                    <div style={{
                      background: "var(--bg-elevated)",
                      border: "1px solid var(--border-muted)",
                      borderRadius: 10, padding: "4px",
                      marginBottom: 14,
                    }}>
                      <textarea
                        placeholder="Escribe la respuesta para este usuario..."
                        value={respuestas[p.id] || ""}
                        onChange={e => setRespuestas(prev => ({...prev, [p.id]: e.target.value}))}
                        style={{
                          width: "100%", minHeight: 100,
                          background: "transparent",
                          border: "none", outline: "none",
                          color: "var(--text-muted)",
                          fontFamily: "Outfit, sans-serif", fontSize: 14,
                          padding: "10px 12px", resize: "vertical",
                          boxSizing: "border-box", lineHeight: 1.7,
                        }}
                      />
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <label style={{
                        display: "flex", alignItems: "center", gap: 8,
                        fontSize: 13, color: "var(--text-dim)", cursor: "pointer",
                        padding: "7px 12px",
                        background: "var(--bg-elevated)",
                        border: "1px solid var(--border-muted)",
                        borderRadius: 8,
                      }}>
                        <input
                          type="checkbox"
                          checked={publicas[p.id] !== false}
                          onChange={e => setPublicas(prev => ({...prev, [p.id]: e.target.checked}))}
                          style={{ accentColor: "var(--color-accent)", width: 14, height: 14 }}
                        />
                        <span>Publicar en FAQ</span>
                      </label>
                      <button
                        onClick={() => handleResponder(p.id)}
                        disabled={!respuestas[p.id]?.trim() || answering === p.id}
                        style={{
                          marginLeft: "auto",
                          padding: "9px 24px",
                          background: respuestas[p.id]?.trim() ? "var(--color-accent)" : "transparent",
                          border: "1px solid var(--color-accent)",
                          color: respuestas[p.id]?.trim() ? "var(--btn-primary-text)" : "var(--color-accent)",
                          fontFamily: "Outfit, sans-serif", fontSize: 13, fontWeight: 700,
                          cursor: !respuestas[p.id]?.trim() ? "not-allowed" : "pointer",
                          opacity: !respuestas[p.id]?.trim() ? 0.4 : 1,
                          borderRadius: 8, transition: "all 0.18s",
                          letterSpacing: 0.3,
                        }}
                      >
                        {answering === p.id ? "Enviando..." : "Responder →"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Respondidas */}
            {!loading && adminTab === "respondidas" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {misPreguntas.length === 0 && (
                  <EmptyState icon="💬" title="Sin preguntas respondidas" sub="Las preguntas que respondas aparecerán aquí." />
                )}
                {misPreguntas.map(p => (
                  <div key={p.id} style={{
                    background: "var(--bg-surface)",
                    border: "1px solid var(--border-muted)",
                    borderRadius: 10, padding: "20px 22px",
                    boxShadow: "var(--shadow-card)",
                  }}>
                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, marginBottom: 12 }}>
                      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                        <Avatar name={p.user_name} size={30} />
                        <span style={{ fontSize: 13, fontWeight: 700, color: "var(--text-secondary)" }}>{p.user_name || "Usuario"}</span>
                      </div>
                      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                        {p.publica
                          ? <Pill label="FAQ" color="var(--color-accent)" />
                          : <Pill label="Privada" color="var(--text-faint)" />
                        }
                        <span style={{ fontSize: 11, color: "var(--text-faint)" }}>{fmtDate(p.answered_at)}</span>
                        <button
                          onClick={() => eliminarPregunta(p.id)}
                          style={{ background: "none", border: "none", color: "var(--text-faint)", cursor: "pointer", fontSize: 14, padding: "2px 4px", borderRadius: 4, transition: "color 0.15s" }}
                          onMouseEnter={e => e.currentTarget.style.color = "var(--color-danger)"}
                          onMouseLeave={e => e.currentTarget.style.color = "var(--text-faint)"}
                        >✕</button>
                      </div>
                    </div>
                    <div style={{ fontSize: 14, color: "var(--text-muted)", marginBottom: 12, lineHeight: 1.6 }}>{p.pregunta}</div>
                    <div style={{
                      fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.75,
                      paddingLeft: 14, borderLeft: "2px solid var(--color-accent)",
                      background: "rgba(var(--color-accent-rgb),0.04)",
                      padding: "10px 14px", borderRadius: "0 8px 8px 0",
                    }}>{p.respuesta}</div>
                  </div>
                ))}
              </div>
            )}

            {/* FAQ */}
            {!loading && adminTab === "faq" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {faqPublica.length === 0 && (
                  <EmptyState icon="📖" title="FAQ vacía" sub="Las preguntas marcadas como públicas aparecerán aquí." />
                )}
                {faqPublica.map(p => (
                  <div key={p.id} style={{
                    background: "var(--bg-surface)", border: "1px solid var(--border-muted)",
                    borderRadius: 10, padding: "20px 22px", boxShadow: "var(--shadow-card)",
                  }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)", marginBottom: 10, lineHeight: 1.5 }}>{p.pregunta}</div>
                    <div style={{
                      fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.75,
                      paddingLeft: 14, borderLeft: "2px solid var(--color-accent)",
                      background: "rgba(var(--color-accent-rgb),0.04)",
                      padding: "10px 14px", borderRadius: "0 8px 8px 0",
                    }}>{p.respuesta}</div>
                    <div style={{ fontSize: 11, color: "var(--text-faint)", marginTop: 10 }}>Respondida el {fmtDate(p.answered_at)}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════
          VISTA USUARIO
      ═══════════════════════════════════════════════════ */}
      {!isAdmin && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, alignItems: "start" }}>

          {/* Columna izquierda */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

            {/* Form enviar */}
            <div style={{
              background: "var(--bg-surface)",
              border: "1px solid var(--border-muted)",
              borderRadius: 14, padding: "26px",
              boxShadow: "var(--shadow-card)",
              position: "relative", overflow: "hidden",
            }}>
              <div style={{
                position: "absolute", top: 0, left: 0, right: 0, height: 3,
                background: "linear-gradient(90deg, var(--color-accent), var(--color-purple))",
                borderRadius: "14px 14px 0 0",
              }} />
              <div style={{ fontSize: 14, fontWeight: 700, color: "var(--text-primary)", marginBottom: 18 }}>
                Hacer una pregunta
              </div>

              {sendOk ? (
                <div style={{
                  background: "var(--bg-success-subtle)", border: "1px solid var(--border-success-subtle)",
                  borderRadius: 10, padding: "18px 20px",
                  display: "flex", alignItems: "center", gap: 12,
                }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: "50%",
                    background: "rgba(12,158,80,0.12)", border: "1.5px solid var(--color-success)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 16, flexShrink: 0,
                  }}>✓</div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: "var(--color-success)", marginBottom: 2 }}>Pregunta enviada</div>
                    <div style={{ fontSize: 13, color: "var(--text-dim)", lineHeight: 1.5 }}>Oscar te responderá pronto en esta misma sección.</div>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleEnviar} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  <div style={{
                    background: "var(--bg-elevated)",
                    border: "1px solid var(--border-muted)",
                    borderRadius: 10, padding: "4px",
                    transition: "border-color 0.15s",
                  }}
                  onFocusCapture={e => e.currentTarget.style.borderColor = "var(--color-accent)"}
                  onBlurCapture={e => e.currentTarget.style.borderColor = "var(--border-muted)"}
                  >
                    <textarea
                      placeholder="¿Sobre qué tienes dudas? Sé específico para obtener la mejor respuesta..."
                      value={texto}
                      onChange={e => { setTexto(e.target.value); setSendErr(""); }}
                      rows={5}
                      style={{
                        width: "100%", background: "transparent", border: "none", outline: "none",
                        color: "var(--text-muted)", fontFamily: "Outfit, sans-serif",
                        fontSize: 14, padding: "12px 14px", resize: "vertical",
                        boxSizing: "border-box", lineHeight: 1.7,
                      }}
                    />
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 11, color: "var(--text-faint)" }}>
                    <span>Enviando como <strong style={{ color: "var(--text-dim)", fontWeight: 600 }}>{userName}</strong></span>
                    <span style={{ color: texto.length > 800 ? "var(--color-danger)" : "var(--text-faint)" }}>{texto.length}/1000</span>
                  </div>

                  {sendErr && (
                    <div style={{
                      fontSize: 12, color: "var(--color-danger)",
                      background: "var(--bg-danger-subtle)",
                      border: "1px solid var(--border-danger-subtle)",
                      borderRadius: 8, padding: "10px 14px",
                    }}>⚠ {sendErr}</div>
                  )}

                  <button
                    type="submit"
                    disabled={!texto.trim() || sending || texto.length > 1000}
                    style={{
                      padding: "12px",
                      background: texto.trim() && !sending
                        ? "linear-gradient(135deg, var(--color-accent) 0%, rgba(var(--color-accent-rgb),0.80) 100%)"
                        : "transparent",
                      border: "1px solid var(--color-accent)",
                      color: texto.trim() ? "var(--btn-primary-text)" : "var(--color-accent)",
                      fontFamily: "Outfit, sans-serif", fontSize: 14, fontWeight: 700,
                      cursor: !texto.trim() || sending ? "not-allowed" : "pointer",
                      opacity: !texto.trim() ? 0.45 : 1,
                      borderRadius: 8, transition: "all 0.18s", letterSpacing: 0.3,
                    }}
                  >
                    {sending ? "Enviando..." : "Enviar pregunta →"}
                  </button>
                </form>
              )}
            </div>

            {/* Mis preguntas */}
            <div style={{
              background: "var(--bg-surface)",
              border: "1px solid var(--border-muted)",
              borderRadius: 14, padding: "26px",
              boxShadow: "var(--shadow-card)",
            }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: "var(--text-primary)" }}>Mis preguntas</div>
                <button
                  onClick={reload}
                  style={{
                    background: "none", border: "1px solid var(--border-muted)",
                    color: "var(--text-dim)", cursor: "pointer", fontSize: 12,
                    padding: "5px 10px", borderRadius: 6, fontFamily: "Outfit,sans-serif",
                    transition: "all 0.15s",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--color-accent)"; e.currentTarget.style.color = "var(--color-accent)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border-muted)"; e.currentTarget.style.color = "var(--text-dim)"; }}
                >↻</button>
              </div>

              {loading && <div style={{ fontSize: 13, color: "var(--text-dim)", textAlign: "center", padding: "20px 0" }}>Cargando...</div>}

              {!loading && misPreguntas.length === 0 && (
                <EmptyState icon="💭" title="Sin preguntas aún" sub="Tus preguntas y respuestas aparecerán aquí." />
              )}

              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {misPreguntas.map(p => (
                  <div key={p.id} style={{
                    background: "var(--bg-elevated)",
                    border: p.respondida
                      ? "1px solid rgba(var(--color-accent-rgb),0.25)"
                      : "1px solid var(--border-dim)",
                    borderRadius: 10, padding: "16px 18px",
                    transition: "border-color 0.2s",
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8, marginBottom: 10 }}>
                      <div style={{ fontSize: 14, color: "var(--text-muted)", lineHeight: 1.55, flex: 1 }}>{p.pregunta}</div>
                      {p.respondida
                        ? <Pill label="Respondida" color="var(--color-success)" />
                        : <Pill label="Pendiente"  color="var(--color-warning)" />
                      }
                    </div>
                    {p.respondida && p.respuesta && (
                      <div style={{ marginTop: 12 }}>
                        <div style={{
                          fontSize: 11, fontWeight: 800, color: "var(--color-accent)",
                          letterSpacing: 1.2, textTransform: "uppercase", marginBottom: 8,
                          display: "flex", alignItems: "center", gap: 6,
                        }}>
                          <Avatar name="Oscar" size={18} />
                          Respuesta de Oscar
                        </div>
                        <div style={{
                          fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.75,
                          padding: "10px 14px", borderRadius: "0 8px 8px 0",
                          borderLeft: "2px solid var(--color-accent)",
                          background: "rgba(var(--color-accent-rgb),0.04)",
                        }}>{p.respuesta}</div>
                        <div style={{ fontSize: 11, color: "var(--text-faint)", marginTop: 8 }}>{fmtDate(p.answered_at)}</div>
                      </div>
                    )}
                    {!p.respondida && (
                      <div style={{ fontSize: 11, color: "var(--text-faint)", marginTop: 4 }}>Enviada el {fmtDate(p.created_at)}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Columna derecha — FAQ */}
          <div style={{
            background: "var(--bg-surface)",
            border: "1px solid var(--border-muted)",
            borderRadius: 14, padding: "26px",
            boxShadow: "var(--shadow-card)",
            position: "sticky", top: 20,
          }}>
            <div style={{ marginBottom: 22 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: "var(--text-primary)", marginBottom: 4 }}>
                Preguntas frecuentes
              </div>
              <div style={{ fontSize: 12, color: "var(--text-dim)" }}>
                Respondidas directamente por Oscar
              </div>
            </div>

            {loading && <div style={{ fontSize: 13, color: "var(--text-dim)", textAlign: "center", padding: "20px 0" }}>Cargando...</div>}

            {!loading && faqPublica.length === 0 && (
              <EmptyState icon="📌" title="FAQ vacía aún" sub="¡Sé el primero en preguntar y tu respuesta podría aparecer aquí!" />
            )}

            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {faqPublica.map((p, idx) => {
                const open = openFaq === p.id;
                return (
                  <div key={p.id} style={{
                    borderBottom: idx < faqPublica.length - 1 ? "1px solid var(--border-dim)" : "none",
                  }}>
                    <button
                      onClick={() => setOpenFaq(open ? null : p.id)}
                      style={{
                        width: "100%", padding: "16px 0",
                        background: "none", border: "none",
                        display: "flex", justifyContent: "space-between", alignItems: "center",
                        gap: 14, cursor: "pointer", fontFamily: "Outfit, sans-serif", textAlign: "left",
                      }}
                    >
                      <span style={{
                        fontSize: 14, fontWeight: 600, lineHeight: 1.45, flex: 1,
                        color: open ? "var(--color-accent)" : "var(--text-primary)",
                        transition: "color 0.15s",
                      }}>{p.pregunta}</span>
                      <span style={{
                        width: 24, height: 24, minWidth: 24, borderRadius: "50%",
                        background: open ? "rgba(var(--color-accent-rgb),0.12)" : "var(--bg-elevated)",
                        border: `1px solid ${open ? "rgba(var(--color-accent-rgb),0.30)" : "var(--border-muted)"}`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        color: open ? "var(--color-accent)" : "var(--text-dim)",
                        fontSize: 16, lineHeight: 1,
                        transform: open ? "rotate(45deg)" : "none",
                        transition: "all 0.2s cubic-bezier(0.4,0,0.2,1)",
                        flexShrink: 0,
                      }}>+</span>
                    </button>
                    {open && (
                      <div style={{ paddingBottom: 18 }}>
                        <div style={{
                          fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.8,
                          padding: "12px 16px", borderRadius: "0 8px 8px 0",
                          borderLeft: "2px solid var(--color-accent)",
                          background: "rgba(var(--color-accent-rgb),0.04)",
                          marginBottom: 8,
                        }}>
                          {p.respuesta}
                        </div>
                        <div style={{ fontSize: 11, color: "var(--text-faint)", paddingLeft: 2 }}>
                          {p.user_name && <span>Preguntado por {p.user_name} · </span>}{fmtDate(p.answered_at)}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
