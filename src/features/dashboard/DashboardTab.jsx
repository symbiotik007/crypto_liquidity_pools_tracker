import { useAuth } from "../../lib/AuthContext";
import { usePoolsSync, useWalletsSync, useNotasSync } from "../../lib/useSupabaseSync";
import { CURSO } from "../programa/data/cursoData";
import { buildWaUpgradeUrl } from "./utils";

export default function DashboardTab() {
  const { user, profile, isPaid, planLabel } = useAuth()
  const { pools }   = usePoolsSync(user?.id)
  const { wallets } = useWalletsSync(user?.id)
  const { notas }   = useNotasSync(user?.id)

  const completadas = (() => { try { return JSON.parse(localStorage.getItem("crypto_edu_completadas") || "[]") } catch { return [] } })()
  const totalLecciones = CURSO.reduce((a, m) => a + m.lecciones.length, 0)
  const progreso       = Math.round((completadas.length / totalLecciones) * 100)
  const notasCount     = Object.values(notas).filter(n => n?.trim()).length

  const lsEnriched = (() => { try { return JSON.parse(localStorage.getItem("liquidity_engine_pools") || "[]") } catch { return [] } })()
  const lsByToken  = Object.fromEntries(lsEnriched.map(p => [String(p.tokenId), p]))
  const poolsMerged   = pools.map(p => ({ ...p, ...(lsByToken[String(p.tokenId)] || {}) }))
  const poolsInRange  = poolsMerged.filter(p => ["En Rango","En rango"].includes(p.status?.label)).length
  const poolsOutRange = poolsMerged.filter(p => p.status?.label && !["En Rango","En rango","Cargando..."].includes(p.status?.label)).length
  const totalValueUsd = poolsMerged.reduce((a, p) => a + (p.valueUsd || 0), 0)

  const activity = (() => { try { return JSON.parse(localStorage.getItem("liquidity_engine_activity") || "[]") } catch { return [] } })()

  const memberSince = user?.created_at
    ? new Date(user.created_at).toLocaleDateString("es-CO", { month:"long", year:"numeric" })
    : null

  const dashUserName  = profile?.full_name || user?.user_metadata?.full_name || user?.email?.split("@")[0]
  const dashUserEmail = user?.email
  const waUrl         = buildWaUpgradeUrl(dashUserName, dashUserEmail)

  const fmtUsd = (v) => !v ? "$0" : v >= 1000 ? "$" + (v/1000).toFixed(1) + "K" : "$" + v.toFixed(0)

  const card = (val, label, sub, color="#00e5ff", locked=false) => (
    <div style={{ background:"#070d14", border:`1px solid ${locked?"#0e2435":"#1a3a5e"}`, padding:"20px 24px", flex:1, minWidth:0, position:"relative", overflow:"hidden" }}>
      {locked && (
        <div style={{ position:"absolute", inset:0, background:"rgba(5,10,15,0.7)", display:"flex", alignItems:"center", justifyContent:"center", backdropFilter:"blur(2px)", zIndex:1 }}>
          <span style={{ fontSize:18, opacity:0.6 }}>🔒</span>
        </div>
      )}
      <div style={{ fontSize:28, fontWeight:800, color, lineHeight:1, marginBottom:6 }}>{val}</div>
      <div style={{ fontSize:13, fontWeight:600, color:"#c8e6f0" }}>{label}</div>
      {sub && <div style={{ fontSize:11, color:"#2a5a72", marginTop:4 }}>{sub}</div>}
    </div>
  )

  return (
    <div style={{ padding:"32px", maxWidth:1100, margin:"0 auto", display:"flex", flexDirection:"column", gap:28 }}>

      {/* ── Welcome ── */}
      <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", flexWrap:"wrap", gap:12 }}>
        <div>
          <div style={{ fontSize:11, fontWeight:700, color:"#00e5ff", letterSpacing:3, textTransform:"uppercase", marginBottom:8 }}>Dashboard</div>
          <h2 style={{ fontSize:28, fontWeight:800, color:"#fff", lineHeight:1.2, marginBottom:6 }}>
            Bienvenido, <span style={{ color:"#00e5ff" }}>{(profile?.full_name || user?.user_metadata?.full_name || user?.email?.split("@")[0] || "Usuario").split(" ")[0]}</span>
          </h2>
          {memberSince && <div style={{ fontSize:13, color:"#4a7a96" }}>Miembro desde {memberSince}</div>}
        </div>
        <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", gap:8 }}>
          <div style={{
            padding:"6px 16px", fontSize:12, fontWeight:700, letterSpacing:1,
            border:`1px solid ${isPaid ? "rgba(0,229,255,0.4)" : "#1a3a5e"}`,
            color: isPaid ? "#00e5ff" : "#2a5a72",
            background: isPaid ? "rgba(0,229,255,0.06)" : "transparent",
            textTransform:"uppercase",
          }}>
            {isPaid ? "⚡ " : ""}{planLabel}
          </div>
          {!isPaid && (
            <a href={waUrl}
              target="_blank" rel="noreferrer"
              style={{ fontSize:11, color:"#4a7a96", textDecoration:"underline" }}>
              Actualizar plan →
            </a>
          )}
        </div>
      </div>

      {/* ── Stats bar ── */}
      <div style={{ display:"flex", gap:16, flexWrap:"wrap" }}>
        {card(`${progreso}%`, "Programa completado", `${completadas.length} / ${totalLecciones} lecciones`)}
        {card(notasCount.toString(), "Notas guardadas", "en lecciones del curso")}
        {card(isPaid ? pools.length.toString() : "—", "Pools activos", isPaid ? `${poolsInRange} en rango · ${poolsOutRange} fuera` : "Plan pago requerido", poolsOutRange > 0 ? "#ffb347" : "#00e5ff", !isPaid)}
        {card(isPaid ? fmtUsd(totalValueUsd) : "—", "Valor en pools", isPaid ? `${wallets.length} wallet${wallets.length !== 1 ? "s" : ""} conectada${wallets.length !== 1 ? "s" : ""}` : "Plan pago requerido", "#00ff88", !isPaid)}
      </div>

      {/* ── Two columns ── */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20 }}>

        {/* Progreso del programa */}
        <div style={{ background:"#070d14", border:"1px solid #1a3a5e", padding:"24px" }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:20 }}>
            <div style={{ fontSize:13, fontWeight:700, color:"#c8e6f0" }}>Progreso del programa</div>
            <div style={{ fontSize:22, fontWeight:900, color:"#00e5ff" }}>{progreso}%</div>
          </div>
          <div style={{ height:4, background:"#0e2435", marginBottom:20, position:"relative" }}>
            <div style={{ position:"absolute", left:0, top:0, height:"100%", width:`${progreso}%`, background:"#00e5ff", transition:"width 0.6s ease" }} />
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
            {CURSO.map(m => {
              const ids   = m.lecciones.map(l => l.id)
              const done  = ids.filter(id => completadas.includes(id)).length
              const pct   = Math.round((done / ids.length) * 100)
              return (
                <div key={m.id}>
                  <div style={{ display:"flex", justifyContent:"space-between", marginBottom:5 }}>
                    <span style={{ fontSize:12, color: done === ids.length ? "#00ff88" : "#7ab8d4" }}>
                      {done === ids.length ? "✓ " : ""}{m.titulo.replace(/Módulo \d+ — /, "")}
                    </span>
                    <span style={{ fontSize:11, color:"#4a7a96" }}>{done}/{ids.length}</span>
                  </div>
                  <div style={{ height:3, background:"#0e2435" }}>
                    <div style={{ height:"100%", width:`${pct}%`, background: done === ids.length ? "#00ff88" : "#00e5ff", transition:"width 0.4s" }} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Accesos rápidos + actividad */}
        <div style={{ display:"flex", flexDirection:"column", gap:16 }}>

          {/* Quick actions */}
          <div style={{ background:"#070d14", border:"1px solid #1a3a5e", padding:"24px" }}>
            <div style={{ fontSize:13, fontWeight:700, color:"#c8e6f0", marginBottom:16 }}>Accesos rápidos</div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
              {[
                { icon:"🛡", label:"Cobertura",      section:"liquidity", tab:"Cobertura",            paid:true },
                { icon:"🤖", label:"Trading Auto",   section:"liquidity", tab:"Trading Automatizado", paid:true },
                { icon:"📚", label:"Programa",        section:"Programa",  tab:null,                  paid:true },
                { icon:"📈", label:"TradingView",     section:"TradingView", tab:null,                paid:false },
              ].map((a, i) => {
                const locked = a.paid && !isPaid
                return (
                  <div key={i}
                    onClick={() => {
                      if (locked) return
                      window.dispatchEvent(new CustomEvent("dash-navigate", { detail: { section: a.section, tab: a.tab } }))
                    }}
                    style={{
                      padding:"12px 14px", background:"#0a1520",
                      border:`1px solid ${locked ? "#0e2435" : "#1a3a5e"}`,
                      display:"flex", alignItems:"center", gap:10,
                      cursor: locked ? "not-allowed" : "pointer",
                      opacity: locked ? 0.5 : 1,
                      transition:"border-color 0.15s",
                    }}
                    onMouseEnter={e => { if(!locked) e.currentTarget.style.borderColor="#00e5ff" }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = locked ? "#0e2435" : "#1a3a5e" }}
                  >
                    <span style={{ fontSize:18 }}>{a.icon}</span>
                    <span style={{ fontSize:13, color: locked ? "#2a5a72" : "#7ab8d4", fontWeight:600 }}>{a.label}</span>
                    {locked && <span style={{ marginLeft:"auto", fontSize:10, color:"#2a5a72" }}>🔒</span>}
                  </div>
                )
              })}
              <a href="https://wa.me/573215646716" target="_blank" rel="noreferrer"
                style={{
                  padding:"12px 14px", background:"#0a1520", border:"1px solid #1a3a5e",
                  display:"flex", alignItems:"center", gap:10, cursor:"pointer",
                  textDecoration:"none", transition:"border-color 0.15s", gridColumn:"1 / -1",
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor="#00e5ff"}
                onMouseLeave={e => e.currentTarget.style.borderColor="#1a3a5e"}
              >
                <span style={{ fontSize:18 }}>💬</span>
                <span style={{ fontSize:13, color:"#7ab8d4", fontWeight:600 }}>Contactar a Oscar</span>
              </a>
            </div>
          </div>

          {/* Actividad reciente */}
          <div style={{ background:"#070d14", border:"1px solid #1a3a5e", padding:"24px", flex:1 }}>
            <div style={{ fontSize:13, fontWeight:700, color:"#c8e6f0", marginBottom:16 }}>Actividad reciente</div>
            {activity.length === 0 ? (
              <div style={{ fontSize:13, color:"#2a5a72", textAlign:"center", padding:"20px 0" }}>
                Sin actividad registrada aún.<br />
                <span style={{ fontSize:11 }}>Empieza añadiendo un pool o abriendo el programa.</span>
              </div>
            ) : (
              <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                {activity.slice(0, 5).map((a, i) => (
                  <div key={i} style={{ display:"flex", gap:12, alignItems:"flex-start", fontSize:12 }}>
                    <div style={{ width:6, height:6, background:"#00e5ff", flexShrink:0, marginTop:4 }} />
                    <div style={{ flex:1, color:"#7ab8d4" }}>{a.msg || a}</div>
                    {a.ts && <div style={{ color:"#2a5a72", whiteSpace:"nowrap" }}>{new Date(a.ts).toLocaleDateString("es-CO")}</div>}
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>

      {/* ── CTA gratuito ── */}
      {!isPaid && (
        <div style={{ background:"linear-gradient(135deg,#071a14 0%,#050a0f 50%,#071020 100%)", border:"1px solid #1a3a5e", padding:"32px", textAlign:"center" }}>
          <div style={{ fontSize:11, fontWeight:700, color:"#00e5ff", letterSpacing:3, textTransform:"uppercase", marginBottom:12 }}>Desbloquea todo el potencial</div>
          <h3 style={{ fontSize:22, fontWeight:800, color:"#fff", marginBottom:10 }}>
            Conviértete en <span style={{ color:"#00e5ff" }}>Trader en Formación</span>
          </h3>
          <p style={{ fontSize:14, color:"#4a7a96", marginBottom:24, maxWidth:480, margin:"0 auto 24px" }}>
            Accede al Liquidity Engine, el programa completo y acompañamiento 1 a 1 con Oscar.
          </p>
          <a href={waUrl}
            target="_blank" rel="noreferrer"
            style={{ display:"inline-block", padding:"13px 36px", background:"#00e5ff", color:"#050a0f", fontFamily:"Outfit,sans-serif", fontSize:14, fontWeight:700, textDecoration:"none" }}>
            Hablar con Oscar →
          </a>
        </div>
      )}

    </div>
  )
}
