import { useState } from "react";
import { useAuth } from "../../lib/AuthContext";
import { usePreguntasSync } from "../../lib/useSupabaseSync";

export default function PreguntasTab() {
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
    const pub = publicas[id] !== false
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

      <div>
        <div style={{ fontSize:11, fontWeight:700, color:"#00e5ff", letterSpacing:3, textTransform:"uppercase", marginBottom:8 }}>Preguntas</div>
        <h2 style={{ fontSize:26, fontWeight:800, color:"#fff", marginBottom:6 }}>Preguntas & Respuestas</h2>
        <p style={{ fontSize:14, color:"#4a7a96" }}>
          {isAdmin ? `Panel de administración — ${pendientes.length} pregunta${pendientes.length !== 1 ? "s" : ""} pendiente${pendientes.length !== 1 ? "s" : ""}` : "Envía tu pregunta y Oscar te responderá directamente."}
        </p>
      </div>

      {isAdmin && (
        <div style={{ display:"flex", flexDirection:"column", gap:20 }}>

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

      {!isAdmin && (
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:24, alignItems:"start" }}>

          <div style={{ display:"flex", flexDirection:"column", gap:20 }}>

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
              {faqPublica.map((p) => (
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
