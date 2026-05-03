import { useState } from "react";
import { useAuth } from "../../lib/AuthContext";
import { useUsersAdmin } from "../../lib/useSupabaseSync";

export default function UsersAdminTab() {
  const { user: me, isAdmin } = useAuth()
  const { users, loading, error, updateUser, deleteUser, reload } = useUsersAdmin(isAdmin)

  const [search,  setSearch]  = useState("")
  const [confirm, setConfirm] = useState(null)
  const [saving,  setSaving]  = useState(null)
  const [toast,   setToast]   = useState(null)

  const showToast = (msg, ok = true) => {
    setToast({ msg, ok })
    setTimeout(() => setToast(null), 3000)
  }

  const handleConfirm = async () => {
    if (!confirm) return
    setSaving(confirm.user.id)
    const { error } = confirm.deleteUser
      ? await deleteUser(confirm.user.id)
      : await updateUser(confirm.user.id, confirm.changes)
    setSaving(null)
    setConfirm(null)
    if (error) showToast("Error: " + error, false)
    else showToast(confirm.successMsg)
  }

  const filtered = users.filter(u =>
    !search ||
    u.full_name?.toLowerCase().includes(search.toLowerCase()) ||
    u.email?.toLowerCase().includes(search.toLowerCase())
  )

  const initials = (u) => (u.full_name || u.email || "?").split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)
  const fmtDate  = (d) => d ? new Date(d).toLocaleDateString("es-CO", { day:"numeric", month:"short", year:"numeric" }) : "—"

  const badge = (txt, color, bg) => (
    <span style={{ padding:"3px 10px", fontSize:10, fontWeight:700, letterSpacing:1, textTransform:"uppercase", borderRadius:999, border:`1px solid ${color}44`, color, background:bg || `${color}11` }}>{txt}</span>
  )

  if (!isAdmin) return (
    <div style={{ display:"flex", alignItems:"center", justifyContent:"center", height:"60%", color:"var(--text-label)", fontSize:14, fontFamily:"Outfit,sans-serif" }}>
      🔒 Acceso restringido
    </div>
  )

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:24, position:"relative" }}>

      {/* Toast */}
      {toast && (
        <div style={{
          position:"fixed", top:24, right:24, zIndex:999,
          padding:"12px 20px",
          background: toast.ok ? "var(--bg-success-subtle)" : "var(--bg-danger-subtle)",
          border:`1px solid ${toast.ok ? "var(--border-success-subtle)" : "var(--border-danger-subtle)"}`,
          color: toast.ok ? "var(--color-success)" : "var(--color-danger)",
          fontSize:13, fontWeight:600,
          boxShadow:"var(--shadow-overlay)", borderRadius:8,
          fontFamily:"Outfit,sans-serif",
        }}>
          {toast.ok ? "✓" : "⚠"} {toast.msg}
        </div>
      )}

      {/* Confirm Dialog */}
      {confirm && (
        <div style={{ position:"fixed", inset:0, background:"var(--overlay-backdrop)", zIndex:200, display:"flex", alignItems:"center", justifyContent:"center", backdropFilter:"blur(6px)" }}>
          <div style={{ background:"var(--bg-surface)", border:"1px solid var(--border-dim)", borderRadius:12, width:"100%", maxWidth:400, padding:"28px", display:"flex", flexDirection:"column", gap:20, boxShadow:"var(--shadow-overlay)" }}>
            <div style={{ fontSize:11, fontWeight:700, color:"var(--color-accent)", letterSpacing:3, textTransform:"uppercase", fontFamily:"Outfit,sans-serif" }}>Confirmar cambio</div>
            <div>
              <div style={{ fontSize:16, fontWeight:700, color:"var(--text-primary)", marginBottom:8, fontFamily:"Outfit,sans-serif" }}>{confirm.label}</div>
              <div style={{ display:"flex", alignItems:"center", gap:12, padding:"16px", background:"var(--bg-elevated)", border:"1px solid var(--border-dim)", borderRadius:8 }}>
                <div style={{ width:40, height:40, background:"rgba(var(--color-accent-rgb),0.1)", border:"1px solid rgba(var(--color-accent-rgb),0.3)", borderRadius:8, display:"flex", alignItems:"center", justifyContent:"center", fontSize:14, color:"var(--color-accent)", fontWeight:700, flexShrink:0 }}>
                  {initials(confirm.user)}
                </div>
                <div>
                  <div style={{ fontSize:14, fontWeight:600, color:"var(--text-secondary)", fontFamily:"Outfit,sans-serif" }}>{confirm.user.full_name || "Sin nombre"}</div>
                  <div style={{ fontSize:12, color:"var(--text-dim)", fontFamily:"Outfit,sans-serif" }}>{confirm.user.email}</div>
                </div>
              </div>
              <div style={{ marginTop:12, display:"flex", alignItems:"center", gap:10, fontSize:13, color:"var(--text-dim)", fontFamily:"Outfit,sans-serif" }}>
                <span>{confirm.fromLabel}</span>
                <span style={{ color:"var(--color-accent)" }}>→</span>
                <span style={{ fontWeight:700, color:"var(--text-primary)" }}>{confirm.toLabel}</span>
              </div>
            </div>
            <div style={{ display:"flex", gap:10 }}>
              <button onClick={() => setConfirm(null)}
                style={{ flex:1, padding:"11px 0", background:"transparent", border:"1px solid var(--border-dim)", color:"var(--text-dim)", fontFamily:"Outfit,sans-serif", fontSize:13, fontWeight:600, cursor:"pointer", borderRadius:8 }}>
                Cancelar
              </button>
              <button onClick={handleConfirm} disabled={saving === confirm.user.id}
                style={{ flex:1, padding:"11px 0", background:"transparent", border:`1px solid ${confirm.danger?"var(--color-danger)":"var(--color-accent)"}`, color:confirm.danger?"var(--color-danger)":"var(--color-accent)", fontFamily:"Outfit,sans-serif", fontSize:13, fontWeight:700, cursor:"pointer", borderRadius:8 }}>
                {saving === confirm.user.id ? "Guardando..." : "Confirmar"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", flexWrap:"wrap", gap:12 }}>
        <div>
          <div style={{ fontSize:11, fontWeight:700, color:"var(--color-accent)", letterSpacing:3, textTransform:"uppercase", marginBottom:8, fontFamily:"Outfit,sans-serif" }}>Panel Admin</div>
          <h2 style={{ fontSize:24, fontWeight:800, color:"var(--text-primary)", marginBottom:4, fontFamily:"Outfit,sans-serif" }}>Gestión de usuarios</h2>
          <p style={{ fontSize:13, color:"var(--text-dim)", fontFamily:"Outfit,sans-serif" }}>{users.length} usuario{users.length !== 1 ? "s" : ""} registrado{users.length !== 1 ? "s" : ""}</p>
        </div>
        <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
          <input
            placeholder="Buscar por nombre o email..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ padding:"9px 14px", background:"var(--bg-input)", border:"1px solid var(--border-dim)", color:"var(--text-secondary)", fontFamily:"Outfit,sans-serif", fontSize:13, outline:"none", width:"clamp(160px,40vw,240px)", borderRadius:8 }}
          />
          <button onClick={reload}
            style={{ padding:"9px 14px", background:"transparent", border:"1px solid var(--border-dim)", color:"var(--text-dim)", fontFamily:"Outfit,sans-serif", fontSize:13, cursor:"pointer", borderRadius:8, transition:"all 0.15s" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor="var(--color-accent)"; e.currentTarget.style.color="var(--color-accent)" }}
            onMouseLeave={e => { e.currentTarget.style.borderColor="var(--border-dim)"; e.currentTarget.style.color="var(--text-dim)" }}
          >
            ↻ Actualizar
          </button>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
        {[
          { label:"Total usuarios",      val:users.length,                           color:"var(--color-accent)" },
          { label:"Trader en Formación", val:users.filter(u=>u.is_paid).length,      color:"var(--color-success)" },
          { label:"Potencial Trader",    val:users.filter(u=>!u.is_paid).length,     color:"var(--color-warning)" },
          { label:"Login con Google",    val:users.filter(u=>u.is_sso_gmail).length, color:"var(--color-purple-light)" },
        ].map((s, i) => (
          <div key={i} style={{ background:"var(--bg-elevated)", border:"1px solid var(--border-dim)", borderRadius:10, padding:"16px 20px", flex:1, minWidth:130 }}>
            <div style={{ fontSize:24, fontWeight:800, color:s.color, lineHeight:1 }}>{s.val}</div>
            <div style={{ fontSize:11, color:"var(--text-dim)", marginTop:4, textTransform:"uppercase", letterSpacing:1, fontFamily:"Outfit,sans-serif" }}>{s.label}</div>
          </div>
        ))}
      </div>

      {loading && <div style={{ color:"var(--text-label)", fontSize:13, fontFamily:"Outfit,sans-serif" }}>Cargando usuarios...</div>}
      {error   && <div style={{ color:"var(--color-danger)", fontSize:13, fontFamily:"Outfit,sans-serif" }}>⚠ {error}</div>}

      {/* Table */}
      {!loading && !error && (
        <div style={{ overflowX:"auto", WebkitOverflowScrolling:"touch", borderRadius:10, border:"1px solid var(--border-dim)" }}>
          <table style={{ width:"100%", borderCollapse:"collapse", minWidth:680 }}>
            <thead>
              <tr style={{ background:"var(--bg-elevated)", borderBottom:"1px solid var(--border-dim)" }}>
                {["Usuario","Email","Plan","Admin","Registro","Acciones"].map((h, i) => (
                  <th key={h} style={{ padding:"10px 16px", textAlign: i === 5 ? "right" : "left", fontSize:10, fontWeight:700, color:"var(--text-label)", letterSpacing:2, textTransform:"uppercase", fontFamily:"Outfit,sans-serif", whiteSpace:"nowrap" }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} style={{ padding:"32px", textAlign:"center", color:"var(--text-label)", fontSize:13, fontFamily:"Outfit,sans-serif" }}>Sin resultados</td>
                </tr>
              )}
              {filtered.map((u, i) => {
                const isMe = u.id === me?.id
                return (
                  <tr key={u.id}
                    style={{ borderBottom: i < filtered.length-1 ? "1px solid var(--border-dim)" : "none", background: isMe ? "rgba(var(--color-accent-rgb),0.03)" : "transparent", transition:"background 0.15s" }}
                  >
                    <td style={{ padding:"14px 16px" }}>
                      <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                        <div style={{ width:32, height:32, background:"rgba(var(--color-accent-rgb),0.1)", border:"1px solid rgba(var(--color-accent-rgb),0.3)", borderRadius:8, display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, color:"var(--color-accent)", fontWeight:700, flexShrink:0 }}>
                          {initials(u)}
                        </div>
                        <div>
                          <div style={{ fontSize:13, fontWeight:600, color:"var(--text-secondary)", fontFamily:"Outfit,sans-serif", whiteSpace:"nowrap" }}>
                            {u.full_name || "Sin nombre"}
                            {isMe && <span style={{ marginLeft:6, fontSize:9, color:"var(--color-accent)", fontWeight:700, letterSpacing:1 }}>TÚ</span>}
                          </div>
                          {u.is_sso_gmail && <div style={{ fontSize:10, color:"var(--color-purple-light)", fontFamily:"Outfit,sans-serif" }}>G Google</div>}
                        </div>
                      </div>
                    </td>

                    <td style={{ padding:"14px 16px", fontSize:12, color:"var(--text-dim)", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap", paddingRight:8, fontFamily:"Outfit,sans-serif", maxWidth:180 }}>{u.email || "—"}</td>

                    <td style={{ padding:"14px 16px" }}>
                      {u.is_paused
                        ? badge("Pausado","#ffb347")
                        : u.is_paid
                          ? badge("Formación","#00ff88")
                          : badge("Potencial","#64748b")
                      }
                    </td>

                    <td style={{ padding:"14px 16px" }}>
                      {u.is_admin
                        ? badge("Admin","var(--color-accent)")
                        : <span style={{ fontSize:11, color:"var(--text-faint)", fontFamily:"Outfit,sans-serif" }}>—</span>
                      }
                    </td>

                    <td style={{ padding:"14px 16px", fontSize:11, color:"var(--text-label)", fontFamily:"Outfit,sans-serif", whiteSpace:"nowrap" }}>{fmtDate(u.created_at)}</td>

                    <td style={{ padding:"14px 16px" }}>
                      <div style={{ display:"flex", gap:5, justifyContent:"flex-end", flexWrap:"wrap" }}>
                        {!isMe && (
                          <button
                            disabled={saving === u.id}
                            onClick={() => setConfirm({
                              user: u, changes: { is_paid: !u.is_paid },
                              label: u.is_paid ? "Bajar a Potencial Trader" : "Subir a Trader en Formación",
                              fromLabel: u.is_paid ? "Trader en Formación" : "Potencial Trader",
                              toLabel:   u.is_paid ? "Potencial Trader" : "Trader en Formación",
                              successMsg: `${u.full_name || u.email} actualizado correctamente`,
                              danger: u.is_paid,
                            })}
                            style={{ padding:"4px 10px", fontSize:10, fontWeight:700, cursor:"pointer", fontFamily:"Outfit,sans-serif", letterSpacing:"0.5px", background:"transparent", border:`1px solid ${u.is_paid?"#ff4f6e55":"#00ff8855"}`, color: u.is_paid ? "#ff4f6e" : "#00ff88", transition:"all 0.15s", whiteSpace:"nowrap", borderRadius:6 }}
                          >
                            {saving===u.id ? "..." : u.is_paid ? "↓ Bajar" : "↑ Activar"}
                          </button>
                        )}
                        {!isMe && (
                          <button
                            disabled={saving === u.id}
                            onClick={() => setConfirm({
                              user: u, changes: { is_admin: !u.is_admin },
                              label: u.is_admin ? "Quitar rol de admin" : "Dar rol de admin",
                              fromLabel: u.is_admin ? "Admin" : "Usuario",
                              toLabel:   u.is_admin ? "Usuario" : "Admin",
                              successMsg: `Rol de ${u.full_name || u.email} actualizado`,
                              danger: false,
                            })}
                            style={{ padding:"4px 10px", fontSize:10, fontWeight:700, cursor:"pointer", fontFamily:"Outfit,sans-serif", background:"transparent", border:"1px solid var(--border-dim)", color:"var(--text-dim)", transition:"all 0.15s", borderRadius:6 }}
                            onMouseEnter={e => { e.currentTarget.style.borderColor="var(--color-accent)"; e.currentTarget.style.color="var(--color-accent)" }}
                            onMouseLeave={e => { e.currentTarget.style.borderColor="var(--border-dim)"; e.currentTarget.style.color="var(--text-dim)" }}
                          >
                            {u.is_admin ? "− Admin" : "+ Admin"}
                          </button>
                        )}
                        {!isMe && (
                          <button
                            disabled={saving === u.id}
                            onClick={() => setConfirm({
                              user: u, changes: { is_paused: !u.is_paused },
                              label: u.is_paused ? "Reactivar membresía" : "Pausar membresía",
                              fromLabel: u.is_paused ? "Pausada" : "Activa",
                              toLabel:   u.is_paused ? "Activa" : "Pausada",
                              successMsg: `Membresía de ${u.full_name || u.email} ${u.is_paused ? "reactivada" : "pausada"}`,
                              danger: !u.is_paused,
                            })}
                            style={{ padding:"4px 10px", fontSize:10, fontWeight:700, cursor:"pointer", fontFamily:"Outfit,sans-serif", background:"transparent", border:`1px solid ${u.is_paused?"#00ff8855":"#ffb34755"}`, color:u.is_paused?"#00ff88":"#ffb347", transition:"all 0.15s", borderRadius:6 }}
                          >
                            {u.is_paused ? "▶ Reactivar" : "⏸ Pausar"}
                          </button>
                        )}
                        {!isMe && (
                          <button
                            disabled={saving === u.id}
                            onClick={() => setConfirm({
                              user: u, changes: null, deleteUser: true,
                              label: "Eliminar usuario permanentemente",
                              fromLabel: u.email, toLabel: "Eliminado",
                              successMsg: `${u.full_name || u.email} eliminado`,
                              danger: true,
                            })}
                            style={{ padding:"4px 10px", fontSize:10, fontWeight:700, cursor:"pointer", fontFamily:"Outfit,sans-serif", background:"transparent", border:"1px solid var(--border-danger-subtle)", color:"var(--color-danger)", transition:"all 0.15s", borderRadius:6 }}
                          >
                            🗑
                          </button>
                        )}
                        {isMe && <span style={{ fontSize:11, color:"var(--text-faint)", paddingRight:4, fontFamily:"Outfit,sans-serif" }}>Tu cuenta</span>}
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
