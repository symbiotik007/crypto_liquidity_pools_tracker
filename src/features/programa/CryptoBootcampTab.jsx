import { useState, useEffect } from "react";
import { CRYPTO_BOOTCAMP } from "./data/cryptoBootcampData";

export default function CryptoBootcampTab() {
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

  // Sidebar: abierto por defecto en PC, cerrado en móvil
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
  useEffect(() => { setSidebarOpen(!isMobile); }, [isMobile]);

  const totalClases = CRYPTO_BOOTCAMP.reduce((acc, mod) => acc + mod.clases.length, 0);
  const progreso    = Math.round((completadas.length / totalClases) * 100);
  const modulo      = CRYPTO_BOOTCAMP[moduloActivo];
  const clase       = modulo?.clases[claseActiva];
  const isDirectImage = (src) => /\.(png|jpe?g|webp|gif|svg)(\?|$)/i.test(src || "");

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
    if (claseActiva < modulo.clases.length - 1) { setClaseActiva(c => c + 1); return; }
    if (moduloActivo < CRYPTO_BOOTCAMP.length - 1) {
      const nextModulo = CRYPTO_BOOTCAMP[moduloActivo + 1];
      setModuloActivo(m => m + 1);
      setClaseActiva(0);
      setAbiertos(prev => new Set([...prev, nextModulo.id]));
    }
  };

  const currentLessonLabel = modulo && clase
    ? `${modulo.titulo} · Clase ${claseActiva + 1}`
    : "Selecciona una lección";

  const S = {
    outer:{ display:"flex", flexDirection:"column", height:"100%", minHeight:0 },

    // Barra superior — siempre visible en PC y móvil
    topbar:{
      display:"flex", alignItems:"center", gap:10, flexShrink:0,
      padding: isMobile ? "9px 14px" : "10px 16px",
      borderBottom:"1px solid var(--border-muted)",
      background:"var(--bg-surface)",
    },
    toggleBtn:{
      display:"flex", alignItems:"center", gap:6,
      padding:"6px 12px",
      background:"rgba(var(--color-accent-rgb),0.07)",
      border:"1px solid var(--border-blue)",
      color:"var(--color-accent)", fontSize:12, fontWeight:700,
      cursor:"pointer", fontFamily:"Outfit,sans-serif", letterSpacing:0.5, flexShrink:0,
      transition:"background 0.15s",
      borderRadius: 6,
    },
    lessonMeta:{ fontSize: isMobile ? 11 : 12, color:"var(--text-dim)", marginLeft: isMobile ? 0 : 4 },
    lessonMetaTitle:{ fontSize: isMobile ? 12 : 13, fontWeight:700, color:"var(--text-primary)" },

    // Layout principal
    wrap:{
      display:"flex",
      flexDirection: isMobile ? "column" : "row",
      flex:1, minHeight:0, overflow:"hidden",
    },

    // Sidebar con animación
    sidebar: isMobile
      ? {
          width:"100%", borderBottom:"1px solid var(--border-muted)",
          overflowY:"auto", maxHeight: sidebarOpen ? 480 : 0,
          opacity: sidebarOpen ? 1 : 0,
          transition:"max-height 0.25s ease, opacity 0.2s ease",
          overflow:"hidden", background:"var(--bg-surface)", flexShrink:0,
        }
      : {
          width: sidebarOpen ? 340 : 0,
          minWidth: 0,
          maxWidth: sidebarOpen ? 380 : 0,
          borderRight: sidebarOpen ? "1px solid var(--border-muted)" : "none",
          overflowY: sidebarOpen ? "auto" : "hidden",
          overflowX:"hidden",
          paddingBottom: sidebarOpen ? 16 : 0,
          flexShrink:0,
          background:"var(--bg-surface)",
          transition:"width 0.25s ease, max-width 0.25s ease",
        },

    sidebarInner:{ minWidth:280 },

    intro:{ padding:"20px 18px 16px", borderBottom:"1px solid var(--border-muted)", background:"var(--bg-elevated)" },
    eyebrow:{ fontSize:11, letterSpacing:2.4, textTransform:"uppercase", color:"var(--color-accent)", fontWeight:800, marginBottom:8 },
    title:{ fontSize:22, lineHeight:1.2, color:"var(--text-primary)", fontWeight:800, marginBottom:8 },
    sub:{ fontSize:12, color:"var(--text-dim)", lineHeight:1.7 },
    progressWrap:{ padding:"12px 18px", borderBottom:"1px solid var(--border-muted)" },
    progressLabel:{ display:"flex", justifyContent:"space-between", fontSize:11, color:"var(--text-label)", marginBottom:6, letterSpacing:1 },
    progressBar:{ height:3, background:"var(--border-muted)", position:"relative", borderRadius:2 },
    progressFill:{ height:"100%", background:"var(--color-accent)", transition:"width 0.4s ease", borderRadius:2 },
    list:{ display:"flex", flexDirection:"column", gap:0 },
    module:{ borderBottom:"1px solid var(--border-muted)" },
    header:(open) => ({
      width:"100%", display:"flex", alignItems:"center", gap:12, padding:"14px 16px",
      background:open ? "rgba(var(--color-accent-rgb),0.05)" : "transparent",
      border:"none", borderBottom:open ? "1px solid var(--border-muted)" : "1px solid transparent",
      color:"var(--text-secondary)", cursor:"pointer", textAlign:"left", fontFamily:"Outfit,sans-serif",
    }),
    number:{ width:30, height:30, minWidth:30, display:"flex", alignItems:"center", justifyContent:"center", background:"var(--bg-input)", border:"1px solid var(--border-blue)", color:"var(--color-accent)", fontSize:12, fontWeight:800 },
    moduleTitle:{ fontSize:14, color:"var(--text-primary)", fontWeight:800, lineHeight:1.35 },
    meta:{ fontSize:11, color:"var(--text-dim)", marginTop:3 },
    chevron:(open) => ({ marginLeft:"auto", color:open ? "var(--color-accent)" : "var(--text-faint)", fontSize:18, transform:open ? "rotate(90deg)" : "rotate(0deg)", transition:"transform 0.15s" }),
    drop:(open) => ({ overflow:"hidden", maxHeight:open ? 680 : 0, opacity:open ? 1 : 0, transition:"max-height 0.2s ease, opacity 0.15s ease" }),
    lesson:(active) => ({
      width:"100%", display:"flex", alignItems:"center", gap:10,
      padding: isMobile ? "11px 14px" : "10px 16px 10px 58px",
      border:"none", borderBottom:"1px solid var(--border-dim)",
      background:active ? "var(--bg-elevated)" : "transparent", cursor:"pointer", textAlign:"left",
      borderLeft:active ? "2px solid var(--color-accent)" : "2px solid transparent", fontFamily:"Outfit,sans-serif",
      boxSizing:"border-box",
    }),
    checkCircle:(done) => ({
      width:18, height:18, minWidth:18, borderRadius:"50%",
      border:done ? "none" : "1px solid var(--border-blue)",
      background:done ? "var(--color-success)" : "transparent",
      display:"flex", alignItems:"center", justifyContent:"center",
      fontSize:10, color:"#ffffff", fontWeight:900, flexShrink:0,
    }),
    lessonTitle:(active) => ({ fontSize: isMobile ? 14 : 13, color:active ? "var(--text-primary)" : "var(--text-muted)", flex:1, lineHeight:1.4 }),

    // Contenido
    content:{ flex:1, minWidth:0, overflowY:"auto", padding: isMobile ? "16px 14px 32px" : "28px 32px 40px", background:"var(--bg-base)" },
    badge:{ display:"inline-block", padding:"2px 10px", fontSize:11, border:"1px solid var(--color-accent)", color:"var(--color-accent)", letterSpacing:1.5, textTransform:"uppercase", marginBottom:14 },
    lessonHeader:{ fontSize: isMobile ? 20 : 26, fontWeight:800, color:"var(--text-primary)", lineHeight:1.25, marginBottom:10 },
    metaRow:{ display:"flex", alignItems:"center", gap:10, flexWrap:"wrap", marginBottom:20, color:"var(--text-dim)", fontSize:12 },
    sectionTitle:{ fontSize:11, letterSpacing:2, color:"var(--text-label)", textTransform:"uppercase", marginBottom:12, marginTop:22, paddingBottom:8, borderBottom:"1px solid var(--border-muted)" },
    desc:{ fontSize: isMobile ? 14 : 15, color:"var(--text-muted)", lineHeight:1.8, maxWidth:760, marginBottom:20 },
    pending:{ background:"var(--bg-elevated)", border:"1px solid var(--border-muted)", padding:"18px 20px", color:"var(--text-dim)", fontSize:13, lineHeight:1.7 },
    contentBlock:{ background:"var(--bg-elevated)", border:"1px solid var(--border-muted)", padding: isMobile ? "14px" : "16px 18px", marginBottom:12 },
    contentTitle:{ fontSize:13, color:"var(--color-accent)", fontWeight:800, marginBottom:8 },
    contentText:{ fontSize:14, color:"var(--text-muted)", lineHeight:1.75 },
    contentList:{ margin:0, paddingLeft:18, color:"var(--text-muted)", fontSize:14, lineHeight:1.75 },
    mediaGrid:{ display:"grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(220px, 1fr))", gap:12 },
    image:{ width:"100%", border:"1px solid var(--border-muted)", background:"var(--bg-input)", display:"block" },
    sourceCard:{ border:"1px solid var(--border-muted)", background:"var(--bg-elevated)", padding:"12px 14px", color:"var(--text-dim)", fontSize:12, lineHeight:1.5 },
    sourceLink:{ color:"var(--color-accent)", textDecoration:"none", fontSize:12, wordBreak:"break-word" },
    actions:{ display:"flex", flexDirection: isMobile ? "column" : "row", gap:10, alignItems: isMobile ? "stretch" : "center", paddingTop:18 },
    btnComplete:(done) => ({
      padding:"11px 20px", fontSize:13, cursor:"pointer", fontFamily:"Outfit,sans-serif",
      fontWeight:700, background:done ? "transparent" : "var(--color-success)",
      border:"1px solid var(--color-success)", color:done ? "var(--color-success)" : "#ffffff",
      letterSpacing:"0.5px", transition:"all 0.15s", textAlign:"center",
    }),
    btnNext:{
      padding:"11px 20px", fontSize:13, cursor:"pointer", fontFamily:"Outfit,sans-serif",
      fontWeight:700, background:"var(--color-accent)", border:"1px solid var(--color-accent)",
      color:"var(--btn-primary-text)", letterSpacing:"0.5px", textAlign:"center",
    },
  };

  return (
    <div style={S.outer}>
      {/* ── Barra superior — visible siempre ── */}
      <div style={S.topbar}>
        <button
          style={S.toggleBtn}
          onClick={() => setSidebarOpen(v => !v)}
          title={sidebarOpen ? "Ocultar módulos" : "Mostrar módulos"}
        >
          {sidebarOpen
            ? <><span>◀</span><span>{isMobile ? "" : "Módulos"}</span></>
            : <><span>☰</span><span>{isMobile ? "" : "Módulos"}</span></>
          }
        </button>

        {/* Info de lección actual */}
        <div style={{ flex:1, minWidth:0, overflow:"hidden" }}>
          <div style={S.lessonMetaTitle} className="text-ellipsis">{clase?.titulo ?? "Selecciona una lección"}</div>
          {!isMobile && <div style={S.lessonMeta}>{currentLessonLabel}</div>}
        </div>

        {/* Progreso compacto */}
        <div style={{ display:"flex", alignItems:"center", gap:8, flexShrink:0 }}>
          <div style={{ fontSize:11, color:"var(--text-label)", fontFamily:"Outfit,sans-serif", whiteSpace:"nowrap" }}>
            {completadas.length}/{totalClases}
          </div>
          <div style={{ width: isMobile ? 60 : 100, height:4, background:"var(--border-muted)", borderRadius:2, overflow:"hidden" }}>
            <div style={{ height:"100%", width:`${progreso}%`, background:"var(--color-accent)", borderRadius:2, transition:"width 0.4s" }} />
          </div>
          <div style={{ fontSize:11, fontWeight:700, color:"var(--color-accent)", fontFamily:"Outfit,sans-serif" }}>{progreso}%</div>
        </div>
      </div>

      {/* ── Cuerpo: sidebar + contenido ── */}
      <div style={S.wrap}>

        {/* Sidebar de módulos */}
        <div style={S.sidebar}>
          <div style={S.sidebarInner}>
            <div style={S.intro}>
              <div style={S.eyebrow}>School of Crypto</div>
              <div style={S.title}>Crypto Bootcamp</div>
              <div style={S.sub}>Formación práctica en criptomonedas, organizada por módulos y clases.</div>
            </div>

            <div style={S.progressWrap}>
              <div style={S.progressLabel}>
                <span>PROGRESO</span>
                <span style={{ color:"var(--color-accent)" }}>{progreso}%</span>
              </div>
              <div style={S.progressBar}>
                <div style={{ ...S.progressFill, width:`${progreso}%` }} />
              </div>
              <div style={{ fontSize:11, color:"var(--text-label)", marginTop:6, fontFamily:"Outfit,sans-serif" }}>
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
                        const done   = completadas.includes(item.id);
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
        </div>

        {/* Contenido de la clase */}
        <div style={S.content}>
          {modulo && clase ? (
            <>
              <div style={S.badge}>{modulo.titulo}</div>
              <div style={S.lessonHeader}>{clase.titulo}</div>
              <div style={S.metaRow}>
                <span>Clase {claseActiva + 1} de {modulo.clases.length}</span>
                <span>{clase.estado}</span>
                {completadas.includes(clase.id) && <span style={{ color:"var(--color-success)" }}>✓ Completada</span>}
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
                        style={{ width:"100%", maxWidth:520, display:"block", margin:"12px 0 14px", border:"1px solid var(--border-muted)", borderRadius:6 }}
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
                          <figcaption style={{ color:"var(--text-label)", fontSize:11, marginTop:6 }}>{img.alt}</figcaption>
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
          ) : (
            <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", height:"60%", gap:16, color:"var(--text-dim)", textAlign:"center" }}>
              <div style={{ fontSize:36 }}>📚</div>
              <div style={{ fontSize:15, fontWeight:700, color:"var(--text-secondary)", fontFamily:"Outfit,sans-serif" }}>Selecciona una clase para comenzar</div>
              <div style={{ fontSize:13, fontFamily:"Outfit,sans-serif" }}>Usa el panel de módulos para navegar el contenido</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
