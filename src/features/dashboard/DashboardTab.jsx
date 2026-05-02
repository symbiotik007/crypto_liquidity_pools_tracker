import { useAuth } from "../../lib/AuthContext";
import { usePoolsSync, useWalletsSync, useNotasSync } from "../../lib/useSupabaseSync";
import { CURSO } from "../programa/data/cursoData";
import { buildWaUpgradeUrl } from "./utils";

const nav = (section, tab) =>
  window.dispatchEvent(new CustomEvent("dash-navigate", { detail: { section, tab } }))

export default function DashboardTab() {
  const { user, profile, isPaid, planLabel } = useAuth()
  const { pools }   = usePoolsSync(user?.id)
  const { wallets } = useWalletsSync(user?.id)
  const { notas }   = useNotasSync(user?.id)

  const completadas    = (() => { try { return JSON.parse(localStorage.getItem("crypto_edu_completadas") || "[]") } catch { return [] } })()
  const totalLecciones = CURSO.reduce((a, m) => a + m.lecciones.length, 0)
  const progreso       = Math.round((completadas.length / totalLecciones) * 100)
  const notasCount     = Object.values(notas).filter(n => n?.trim()).length

  const lsEnriched  = (() => { try { return JSON.parse(localStorage.getItem("liquidity_engine_pools") || "[]") } catch { return [] } })()
  const lsByToken   = Object.fromEntries(lsEnriched.map(p => [String(p.tokenId), p]))
  const poolsMerged = pools.map(p => ({ ...p, ...(lsByToken[String(p.tokenId)] || {}) }))
  const poolsInRange  = poolsMerged.filter(p => ["En Rango","En rango"].includes(p.status?.label)).length
  const poolsOutRange = poolsMerged.filter(p => p.status?.label && !["En Rango","En rango","Cargando..."].includes(p.status?.label)).length
  const totalValueUsd = poolsMerged.reduce((a, p) => a + (p.valueUsd || 0), 0)
  const activity      = (() => { try { return JSON.parse(localStorage.getItem("liquidity_engine_activity") || "[]") } catch { return [] } })()

  const memberSince  = user?.created_at
    ? new Date(user.created_at).toLocaleDateString("es-CO", { month:"long", year:"numeric" })
    : null
  const firstName    = (profile?.full_name || user?.user_metadata?.full_name || user?.email?.split("@")[0] || "Usuario").split(" ")[0]
  const dashUserName = profile?.full_name || user?.user_metadata?.full_name || user?.email?.split("@")[0]
  const waUrl        = buildWaUpgradeUrl(dashUserName, user?.email)
  const fmtUsd       = v => !v ? "$0" : v >= 1000 ? "$" + (v/1000).toFixed(1) + "K" : "$" + v.toFixed(0)

  const QUICK = [
    { icon:"🛡",  label:"Cobertura",     desc:"SHORT de protección",      section:"liquidity",     tab:"Cobertura",            paid:true  },
    { icon:"📊",  label:"Monitor",       desc:"Seguimiento de coberturas", section:"liquidity",     tab:"Monitor de Cobertura", paid:true  },
    { icon:"💼",  label:"Wallets",       desc:"Wallets DeFi conectadas",   section:"liquidity",     tab:"Wallets",              paid:true  },
    { icon:"📚",  label:"Programa",      desc:"Continúa tu formación",     section:"Programa",      tab:null,                   paid:true  },
    { icon:"₿",   label:"Bootcamp",      desc:"Materiales del curso",      section:"Crypto Bootcamp", tab:null,                 paid:false },
    { icon:"📈",  label:"TradingView",   desc:"Análisis técnico en vivo",  section:"TradingView",   tab:null,                   paid:false },
  ]

  return (
    <div className="dash-root">

      {/* ── Welcome ── */}
      <div className="dash-welcome">
        <div>
          <div className="dash-eyebrow">Dashboard</div>
          <h2 className="dash-greeting">
            Bienvenido, <span style={{ color:"#00e5ff" }}>{firstName}</span>
          </h2>
          {memberSince && <div className="dash-since">Miembro desde {memberSince}</div>}
        </div>
        <div className="dash-plan-wrap">
          <div className={`dash-plan-badge ${isPaid ? "paid" : ""}`}>
            {isPaid ? "⚡ " : ""}{planLabel}
          </div>
          {!isPaid && (
            <a href={waUrl} target="_blank" rel="noreferrer" className="dash-upgrade-link">
              Actualizar plan →
            </a>
          )}
        </div>
      </div>

      {/* ── Stats ── */}
      <div className="stats-grid">

        <div className="stat-card">
          <div className="stat-label">Programa completado</div>
          <div className="stat-value">{progreso}%</div>
          <div className="stat-bar">
            <div className="stat-bar-fill" style={{ width:`${progreso}%` }} />
          </div>
          <div className="stat-sub">{completadas.length} / {totalLecciones} lecciones</div>
        </div>

        <div className="stat-card">
          <div className="stat-label">Notas guardadas</div>
          <div className="stat-value">{notasCount}</div>
          <div className="stat-sub">en lecciones del curso</div>
        </div>

        <div className={`stat-card ${!isPaid ? "stat-locked" : ""}`}>
          {!isPaid && <div className="stat-lock-overlay"><span>🔒</span></div>}
          <div className="stat-label">Pools activos</div>
          <div className={`stat-value ${poolsOutRange > 0 ? "danger" : ""}`}>
            {isPaid ? pools.length : "—"}
          </div>
          {isPaid
            ? <div className="stat-sub">{poolsInRange} en rango · {poolsOutRange} fuera</div>
            : <div className="stat-sub">Plan pago requerido</div>
          }
        </div>

        <div className={`stat-card ${!isPaid ? "stat-locked" : ""}`}>
          {!isPaid && <div className="stat-lock-overlay"><span>🔒</span></div>}
          <div className="stat-label">Valor en pools</div>
          <div className="stat-value success">{isPaid ? fmtUsd(totalValueUsd) : "—"}</div>
          {isPaid
            ? <div className="stat-sub">{wallets.length} wallet{wallets.length !== 1 ? "s" : ""} conectada{wallets.length !== 1 ? "s" : ""}</div>
            : <div className="stat-sub">Plan pago requerido</div>
          }
        </div>

      </div>

      {/* ── Main grid ── */}
      <div className="dash-grid">

        {/* Progreso del programa */}
        <div className="dash-card">
          <div className="dash-card-header">
            <span className="dash-card-title">Progreso del programa</span>
            <span className="dash-card-value">{progreso}%</span>
          </div>
          <div className="stat-bar" style={{ marginBottom:20 }}>
            <div className="stat-bar-fill" style={{ width:`${progreso}%` }} />
          </div>
          <div className="dash-modules">
            {CURSO.map(m => {
              const ids  = m.lecciones.map(l => l.id)
              const done = ids.filter(id => completadas.includes(id)).length
              const pct  = Math.round((done / ids.length) * 100)
              const full = done === ids.length
              return (
                <div key={m.id} className="dash-module">
                  <div className="dash-module-header">
                    <span className={`dash-module-name ${full ? "done" : ""}`}>
                      {full ? "✓ " : ""}{m.titulo.replace(/Módulo \d+ — /, "")}
                    </span>
                    <span className="dash-module-count">{done}/{ids.length}</span>
                  </div>
                  <div className="stat-bar">
                    <div className="stat-bar-fill" style={{ width:`${pct}%`, background: full ? "#00ff88" : "#00e5ff" }} />
                  </div>
                </div>
              )
            })}
          </div>
          <button
            className="dash-prog-btn"
            onClick={() => nav("Programa", null)}
          >
            Ir al programa →
          </button>
        </div>

        {/* Right column */}
        <div className="dash-right-col">

          {/* Accesos rápidos */}
          <div className="dash-card">
            <div className="dash-card-header">
              <span className="dash-card-title">Accesos rápidos</span>
            </div>
            <div className="dash-actions-grid">
              {QUICK.map((a, i) => {
                const locked = a.paid && !isPaid
                return (
                  <button
                    key={i}
                    className={`dash-action ${locked ? "locked" : ""}`}
                    onClick={() => { if (!locked) nav(a.section, a.tab) }}
                    disabled={locked}
                  >
                    <span className="dash-action-icon">{a.icon}</span>
                    <span className="dash-action-label">{a.label}</span>
                    <span className="dash-action-desc">{a.desc}</span>
                    {locked && <span className="dash-action-lock">🔒</span>}
                  </button>
                )
              })}
            </div>

            {/* Contactar a Oscar — full width */}
            <a
              href="https://wa.me/573215646716"
              target="_blank" rel="noreferrer"
              className="dash-wa-btn"
            >
              <span style={{ fontSize:20 }}>💬</span>
              <div>
                <div className="dash-wa-label">Contactar a Oscar</div>
                <div className="dash-wa-sub">WhatsApp · Respuesta rápida</div>
              </div>
              <span className="dash-wa-arrow">→</span>
            </a>
          </div>

          {/* Actividad reciente */}
          <div className="dash-card dash-activity">
            <div className="dash-card-header">
              <span className="dash-card-title">Actividad reciente</span>
            </div>
            {activity.length === 0 ? (
              <div className="dash-empty">
                <div className="dash-empty-icon">◌</div>
                <div className="dash-empty-msg">Sin actividad registrada aún.</div>
                <div className="dash-empty-sub">Empieza añadiendo un pool o abriendo el programa.</div>
              </div>
            ) : (
              <div className="dash-activity-list">
                {activity.slice(0, 5).map((a, i) => (
                  <div key={i} className="dash-activity-item">
                    <div className="dash-activity-dot" />
                    <div className="dash-activity-text">{a.msg || a}</div>
                    {a.ts && <div className="dash-activity-time">{new Date(a.ts).toLocaleDateString("es-CO")}</div>}
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>

      {/* ── CTA free users ── */}
      {!isPaid && (
        <div className="dash-cta">
          <div className="dash-cta-eyebrow">Desbloquea todo el potencial</div>
          <h3 className="dash-cta-title">
            Conviértete en <span style={{ color:"#00e5ff" }}>Trader en Formación</span>
          </h3>
          <p className="dash-cta-desc">
            Accede al Liquidity Engine, el programa completo y acompañamiento 1 a 1 con Oscar.
          </p>
          <a href={waUrl} target="_blank" rel="noreferrer" className="dash-cta-btn">
            Hablar con Oscar →
          </a>
        </div>
      )}

    </div>
  )
}
