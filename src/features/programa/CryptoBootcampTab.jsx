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
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);

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
    mobileBar:{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"10px 14px", borderBottom:"1px solid var(--border-muted)", background:"var(--bg-surface)", flexShrink:0 },
    mobileBarTitle:{ fontSize:13, fontWeight:800, color:"var(--text-primary)", letterSpacing:0.5 },
    mobileBarMeta:{ fontSize:11, color:"var(--text-dim)" },
    toggleBtn:{ display:"flex", alignItems:"center", gap:6, padding:"7px 12px", background:"rgba(var(--color-accent-rgb),0.07)", border:"1px solid var(--border-blue)", color:"var(--color-accent)", fontSize:12, fontWeight:700, cursor:"pointer", fontFamily:"Outfit,sans-serif", letterSpacing:0.5, flexShrink:0 },
    sidebar: isMobile
      ? { width:"100%", borderBottom:"1px solid var(--border-muted)", overflowY:"auto", maxHeight: sidebarOpen ? 480 : 0, opacity: sidebarOpen ? 1 : 0, transition:"max-height 0.25s ease, opacity 0.2s ease", overflow:"hidden", background:"var(--bg-surface)" }
      : { width:340, minWidth:280, maxWidth:380, borderRight:"1px solid var(--border-muted)", overflowY:"auto", paddingBottom:16, flexShrink:0, background:"var(--bg-surface)" },
    content:{ flex:1, minWidth:0, overflowY:"auto", padding: isMobile ? "16px 14px 32px" : "28px 32px 40px", background:"var(--bg-base)" },
    intro:{ padding:"20px 18px 16px", borderBottom:"1px solid var(--border-muted)", background:"var(--bg-elevated)" },
    eyebrow:{ fontSize:11, letterSpacing:2.4, textTransform:"uppercase", color:"var(--color-accent)", fontWeight:800, marginBottom:8 },
    title:{ fontSize:24, lineHeight:1.2, color:"var(--text-primary)", fontWeight:800, marginBottom:8 },
    sub:{ fontSize:13, color:"var(--text-dim)", lineHeight:1.7 },
    progressWrap:{ padding:"12px 18px", borderBottom:"1px solid var(--border-muted)" },
    progressLabel:{ display:"flex", justifyContent:"space-between", fontSize:11, color:"var(--text-label)", marginBottom:6, letterSpacing:1 },
    progressBar:{ height:3, background:"var(--border-muted)", position:"relative" },
    progressFill:{ height:"100%", background:"var(--color-accent)", transition:"width 0.4s ease" },
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
      padding: isMobile ? "11px 14px 11px 14px" : "10px 16px 10px 58px",
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
    badge:{ display:"inline-block", padding:"2px 10px", fontSize:11, border:"1px solid var(--color-accent)", color:"var(--color-accent)", letterSpacing:1.5, textTransform:"uppercase", marginBottom:14 },
    lessonHeader:{ fontSize: isMobile ? 20 : 26, fontWeight:800, color:"var(--text-primary)", lineHeight:1.25, marginBottom:10 },
    metaRow:{ display:"flex", alignItems:"center", gap:10, flexWrap:"wrap", marginBottom:20, color:"var(--text-dim)", fontSize:12 },
    sectionTitle:{ fontSize:11, letterSpacing:2, color:"var(--text-label)", textTransform:"uppercase", marginBottom:12, marginTop:22, paddingBottom:8, borderBottom:"1px solid var(--border-muted)" },
    desc:{ fontSize: isMobile ? 14 : 15, color:"var(--text-muted)", lineHeight:1.8, maxWidth:760, marginBottom:20 },
    pending:{ background:"var(--bg-elevated)", border:"1px solid var(--border-muted)", padding:"18px 20px", color:"var(--text-dim)", fontSize:13, lineHeight:1.7 },
    contentBlock:{ background:"var(--bg-elevated)", border:"1px solid var(--border-muted)", padding: isMobile ? "14px 14px" : "16px 18px", marginBottom:12 },
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

  const currentLessonLabel = modulo && clase
    ? `${modulo.titulo} · Clase ${claseActiva + 1}`
    : "Selecciona una lección";

  return (
    <div style={S.wrap}>
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
          <div style={{ fontSize:11, color:"var(--text-label)", marginTop:6 }}>
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
        )}
      </div>
    </div>
  );
}
