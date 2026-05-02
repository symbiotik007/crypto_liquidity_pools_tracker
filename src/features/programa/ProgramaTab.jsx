import { useState } from "react";
import { useAuth } from "../../lib/AuthContext";
import { useNotasSync, insertarNotificacion } from "../../lib/useSupabaseSync";
import { CURSO } from "./data/cursoData";

export default function ProgramaTab() {
  const { user } = useAuth();
  const [moduloActivo, setModuloActivo] = useState(0);
  const [leccionActiva, setLeccionActiva] = useState(0);
  const [modulosAbiertos, setModulosAbiertos] = useState(() => new Set([CURSO[0]?.id]));
  const [completadas, setCompletadas] = useState(() => {
    try { return JSON.parse(localStorage.getItem("crypto_edu_completadas") || "[]"); }
    catch { return []; }
  });
  const [notasAbiertas, setNotasAbiertas] = useState(false);
  const [notasVista,    setNotasVista]    = useState("actual");
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
      {/* Sidebar del curso */}
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
              "Especialista en Uniswap y Liquidity Mining",
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

      {/* Contenido de la lección */}
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

            <div style={S.sectionTitle}>Descripción</div>
            <p style={S.desc}>{leccion.descripcion}</p>

            <div style={S.sectionTitle}>Puntos Clave</div>
            {leccion.puntosClave.map((p, i) => (
              <div key={i} style={S.puntoItem}>
                <span style={S.puntoBullet}>▸</span>
                <span style={S.puntoText}>{p}</span>
              </div>
            ))}

            <div style={S.sectionTitle}>Ejercicio Práctico</div>
            <div style={S.ejercicioBox}>
              <div style={S.ejercicioLabel}>Tu tarea</div>
              <div style={S.ejercicioText}>{leccion.ejercicio}</div>
            </div>

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

      {/* Panel de notas flotante */}
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

            {notasVista === "actual" && (
              <>
                <textarea
                  style={S.notasTextarea}
                  placeholder="Escribe tus apuntes de esta lección... Se guardan automáticamente."
                  value={notaActual}
                  onChange={e => leccion && saveNota(leccion.id, e.target.value)}
                  maxLength={2000}
                />
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
                    const fmtTs = (ts) => ts ? new Date(ts).toLocaleString("es-CO", { day:"numeric", month:"short", hour:"2-digit", minute:"2-digit" }) : null
                    return (
                      <div key={l.id}
                        onClick={() => {
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
