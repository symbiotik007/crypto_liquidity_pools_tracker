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

  const fmtDate = (d) => d ? new Date(d).toLocaleDateString("es-CO", { day:"numeric", month:"short", year:"numeric" }) : "—"

  const badge = (txt, color, bg) => (
    <span style={{ padding:"3px 10px", fontSize:10, fontWeight:700, letterSpacing:1, textTransform:"uppercase", border:`1px solid ${color}44`, color, background:bg || `${color}11` }}>{txt}</span>
  )

  if (!isAdmin) return (
    <div style={{ display:"flex", alignItems:"center", justifyContent:"center", height:"60%", color:"#2a5a72", fontSize:14 }}>
      🔒 Acceso restringido
    </div>
  )

  return (
    <div style={{ padding:"clamp(16px, 4vw, 32px)", maxWidth:1100, margin:"0 auto", display:"flex", flexDirection:"column", gap:24, position:"relative" }}>

      {toast && (
        <div style={{ position:"fixed", top:24, right:24, zIndex:999, padding:"12px 20px", background: toast.ok ? "#001a0e" : "#1a0810", border:`1px solid ${toast.ok?"#003a22":"#5a1a28"}`, color: toast.ok?"#00ff88":"#ff6b88", fontSize:13, fontWeight:600, boxShadow:"0 4px 20px rgba(0,0,0,0.5)" }}>
          {toast.ok ? "✓" : "⚠"} {toast.msg}
        </div>
      )}

      {confirm && (
        <div style={{ position:"fixed", inset:0, background:"rgba(5,10,15,0.85)", zIndex:200, display:"flex", alignItems:"center", justifyContent:"center", backdropFilter:"blur(6px)" }}>
          <div style={{ background:"#070d14", border:"1px solid #1a3a5e", width:"100%", maxWidth:400, padding:"32px", display:"flex", flexDirection:"column", gap:20 }}>
            <div style={{ fontSize:11, fontWeight:700, color:"#00e5ff", letterSpacing:3, textTransform:"uppercase" }}>Confirmar cambio</div>
            <div>
              <div style={{ fontSize:16, fontWeight:700, color:"#fff", marginBottom:8 }}>{confirm.label}</div>
              <div style={{ display:"flex", alignItems:"center", gap:12, padding:"16px", background:"#0a1520", border:"1px solid #0e2435" }}>
                <div style={{ width:40, height:40, background:"#0a2a3e", border:"1px solid #1a4a6e", display:"flex", alignItems:"center", justifyContent:"center", fontSize:14, color:"#00e5ff", fontWeight:700, flexShrink:0 }}>
                  {initials(confirm.user)}
                </div>
                <div>
                  <div style={{ fontSize:14, fontWeight:600, color:"#c8e6f0" }}>{confirm.user.full_name || "Sin nombre"}</div>
                  <div style={{ fontSize:12, color:"#4a7a96" }}>{confirm.user.email}</div>
                </div>
              </div>
              <div style={{ marginTop:12, display:"flex", alignItems:"center", gap:10, fontSize:13, color:"#7ab8d4" }}>
                <span>{confirm.fromLabel}</span>
                <span style={{ color:"#00e5ff" }}>→</span>
                <span style={{ fontWeight:700, color:"#fff" }}>{confirm.toLabel}</span>
              </div>
            </div>
            <div style={{ display:"flex", gap:10 }}>
              <button onClick={() => setConfirm(null)}
                style={{ flex:1, padding:"11px 0", background:"transparent", border:"1px solid #1a3a5e", color:"#4a7a96", fontFamily:"Outfit,sans-serif", fontSize:13, fontWeight:600, cursor:"pointer" }}>
                Cancelar
              </button>
              <button onClick={handleConfirm} disabled={saving === confirm.user.id}
                style={{ flex:1, padding:"11px 0", background:"transparent", border:`1px solid ${confirm.danger?"#ff4f6e":"#00e5ff"}`, color:confirm.danger?"#ff4f6e":"#00e5ff", fontFamily:"Outfit,sans-serif", fontSize:13, fontWeight:700, cursor:"pointer" }}>
                {saving === confirm.user.id ? "Guardando..." : "Confirmar"}
              </button>
            </div>
          </div>
        </div>
      )}

      <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", flexWrap:"wrap", gap:12 }}>
        <div>
          <div style={{ fontSize:11, fontWeight:700, color:"#00e5ff", letterSpacing:3, textTransform:"uppercase", marginBottom:8 }}>Panel Admin</div>
          <h2 style={{ fontSize:26, fontWeight:800, color:"#fff", marginBottom:4 }}>Gestión de usuarios</h2>
          <p style={{ fontSize:13, color:"#4a7a96" }}>{users.length} usuario{users.length !== 1 ? "s" : ""} registrado{users.length !== 1 ? "s" : ""}</p>
        </div>
        <div style={{ display:"flex", gap:10 }}>
          <input
            placeholder="Buscar por nombre o email..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ padding:"9px 14px", background:"#0a1520", border:"1px solid #1a3a5e", color:"#c8e6f0", fontFamily:"Outfit,sans-serif", fontSize:13, outline:"none", width:"clamp(160px,40vw,240px)" }}
          />
          <button onClick={reload}
            style={{ padding:"9px 14px", background:"transparent", border:"1px solid #1a3a5e", color:"#4a7a96", fontFamily:"Outfit,sans-serif", fontSize:13, cursor:"pointer" }}>
            ↻ Actualizar
          </button>
        </div>
      </div>

      <div style={{ display:"flex", gap:14, flexWrap:"wrap" }}>
        {[
          { label:"Total usuarios",        val:users.length,                            color:"#00e5ff" },
          { label:"Trader en Formación",   val:users.filter(u=>u.is_paid).length,       color:"#00ff88" },
          { label:"Potencial Trader",      val:users.filter(u=>!u.is_paid).length,      color:"#ffb347" },
          { label:"Login con Google",      val:users.filter(u=>u.is_sso_gmail).length,  color:"#627eea" },
        ].map((s, i) => (
          <div key={i} style={{ background:"#070d14", border:"1px solid #1a3a5e", padding:"16px 20px", flex:1, minWidth:140 }}>
            <div style={{ fontSize:24, fontWeight:800, color:s.color, lineHeight:1 }}>{s.val}</div>
            <div style={{ fontSize:11, color:"#4a7a96", marginTop:4, textTransform:"uppercase", letterSpacing:1 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {loading && <div style={{ color:"#2a5a72", fontSize:13 }}>Cargando usuarios...</div>}
      {error   && <div style={{ color:"#ff6b88", fontSize:13 }}>⚠ {error}</div>}
      {!loading && !error && (
        <div style={{ overflowX:"auto", WebkitOverflowScrolling:"touch" }}>
        <div style={{ background:"#070d14", border:"1px solid #1a3a5e", minWidth:680 }}>
          <div style={{ display:"grid", gridTemplateColumns:"2fr 2fr 1fr 1fr 1fr 160px", gap:0, padding:"10px 20px", borderBottom:"1px solid #0e2435", fontSize:10, fontWeight:700, color:"#2a5a72", letterSpacing:2, textTransform:"uppercase" }}>
            <span>Usuario</span><span>Email</span><span>Plan</span><span>Admin</span><span>Registro</span><span style={{ textAlign:"right" }}>Acciones</span>
          </div>
          {filtered.length === 0 && (
            <div style={{ padding:"32px", textAlign:"center", color:"#2a5a72", fontSize:13 }}>Sin resultados</div>
          )}
          {filtered.map((u, i) => {
            const isMe = u.id === me?.id
            return (
              <div key={u.id} style={{ display:"grid", gridTemplateColumns:"2fr 2fr 1fr 1fr 1fr 160px", gap:0, padding:"14px 20px", borderBottom: i < filtered.length-1 ? "1px solid #0e2435" : "none", alignItems:"center", background: isMe ? "rgba(0,229,255,0.02)" : "transparent" }}>

                <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                  <div style={{ width:32, height:32, background:"#0a2a3e", border:"1px solid #1a4a6e", display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, color:"#00e5ff", fontWeight:700, flexShrink:0 }}>
                    {initials(u)}
                  </div>
                  <div>
                    <div style={{ fontSize:13, fontWeight:600, color:"#c8e6f0" }}>
                      {u.full_name || "Sin nombre"}
                      {isMe && <span style={{ marginLeft:6, fontSize:9, color:"#00e5ff", fontWeight:700, letterSpacing:1 }}>TÚ</span>}
                    </div>
                    {u.is_sso_gmail && <div style={{ fontSize:10, color:"#627eea" }}>G Google</div>}
                  </div>
                </div>

                <div style={{ fontSize:12, color:"#4a7a96", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap", paddingRight:8 }}>{u.email || "—"}</div>

                <div>
                  {u.is_paused
                    ? badge("Pausado","#ffb347","#1a0800")
                    : u.is_paid
                      ? badge("Formación","#00ff88")
                      : badge("Potencial","#4a7a96")
                  }
                </div>

                <div>{u.is_admin ? badge("Admin","#00e5ff") : <span style={{ fontSize:11, color:"#1a3a5e" }}>—</span>}</div>

                <div style={{ fontSize:11, color:"#2a5a72" }}>{fmtDate(u.created_at)}</div>

                <div style={{ display:"flex", gap:6, justifyContent:"flex-end", flexWrap:"wrap" }}>
                  {!isMe && (
                    <button
                      disabled={saving === u.id}
                      onClick={() => setConfirm({
                        user: u,
                        changes: { is_paid: !u.is_paid },
                        label: u.is_paid ? "Bajar a Potencial Trader" : "Subir a Trader en Formación",
                        fromLabel: u.is_paid ? "Trader en Formación" : "Potencial Trader",
                        toLabel:   u.is_paid ? "Potencial Trader" : "Trader en Formación",
                        successMsg: `${u.full_name || u.email} actualizado correctamente`,
                        danger: u.is_paid,
                      })}
                      style={{
                        padding:"5px 10px", fontSize:11, fontWeight:700, cursor:"pointer",
                        fontFamily:"Outfit,sans-serif", letterSpacing:"0.5px",
                        background:"transparent",
                        border:`1px solid ${u.is_paid?"#ff4f6e44":"#00ff8844"}`,
                        color: u.is_paid ? "#ff4f6e" : "#00ff88",
                        transition:"all 0.15s", whiteSpace:"nowrap",
                      }}
                      onMouseEnter={e => e.currentTarget.style.borderColor = u.is_paid?"#ff4f6e":"#00ff88"}
                      onMouseLeave={e => e.currentTarget.style.borderColor = u.is_paid?"#ff4f6e44":"#00ff8844"}
                    >
                      {saving===u.id ? "..." : u.is_paid ? "↓ Bajar plan" : "↑ Activar plan"}
                    </button>
                  )}
                  {!isMe && (
                    <button
                      disabled={saving === u.id}
                      onClick={() => setConfirm({
                        user: u,
                        changes: { is_admin: !u.is_admin },
                        label: u.is_admin ? "Quitar rol de admin" : "Dar rol de admin",
                        fromLabel: u.is_admin ? "Admin" : "Usuario",
                        toLabel:   u.is_admin ? "Usuario" : "Admin",
                        successMsg: `Rol de ${u.full_name || u.email} actualizado`,
                        danger: false,
                      })}
                      style={{ padding:"5px 10px", fontSize:11, fontWeight:700, cursor:"pointer", fontFamily:"Outfit,sans-serif", background:"transparent", border:"1px solid #1a3a5e", color:"#4a7a96", transition:"all 0.15s" }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor="#00e5ff"; e.currentTarget.style.color="#00e5ff" }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor="#1a3a5e"; e.currentTarget.style.color="#4a7a96" }}
                    >
                      {u.is_admin ? "− Admin" : "+ Admin"}
                    </button>
                  )}

                  {!isMe && (
                    <button
                      disabled={saving === u.id}
                      onClick={() => setConfirm({
                        user: u,
                        changes: { is_paused: !u.is_paused },
                        label: u.is_paused ? "Reactivar membresía" : "Pausar membresía",
                        fromLabel: u.is_paused ? "Pausada" : "Activa",
                        toLabel:   u.is_paused ? "Activa" : "Pausada",
                        successMsg: `Membresía de ${u.full_name || u.email} ${u.is_paused ? "reactivada" : "pausada"}`,
                        danger: !u.is_paused,
                      })}
                      style={{ padding:"5px 10px", fontSize:11, fontWeight:700, cursor:"pointer", fontFamily:"Outfit,sans-serif", background:"transparent", border:`1px solid ${u.is_paused?"#00ff8844":"#ffb34744"}`, color:u.is_paused?"#00ff88":"#ffb347", transition:"all 0.15s" }}
                      onMouseEnter={e => e.currentTarget.style.borderColor = u.is_paused?"#00ff88":"#ffb347"}
                      onMouseLeave={e => e.currentTarget.style.borderColor = u.is_paused?"#00ff8844":"#ffb34744"}
                    >
                      {u.is_paused ? "▶ Reactivar" : "⏸ Pausar"}
                    </button>
                  )}

                  {!isMe && (
                    <button
                      disabled={saving === u.id}
                      onClick={() => setConfirm({
                        user: u,
                        changes: null,
                        deleteUser: true,
                        label: "Eliminar usuario permanentemente",
                        fromLabel: u.email,
                        toLabel:   "Eliminado",
                        successMsg: `${u.full_name || u.email} eliminado`,
                        danger: true,
                      })}
                      style={{ padding:"5px 10px", fontSize:11, fontWeight:700, cursor:"pointer", fontFamily:"Outfit,sans-serif", background:"transparent", border:"1px solid #ff4f6e44", color:"#ff4f6e", transition:"all 0.15s" }}
                      onMouseEnter={e => e.currentTarget.style.borderColor="#ff4f6e"}
                      onMouseLeave={e => e.currentTarget.style.borderColor="#ff4f6e44"}
                    >
                      🗑 Eliminar
                    </button>
                  )}

                  {isMe && <span style={{ fontSize:11, color:"#1a3a5e", paddingRight:4 }}>Tu cuenta</span>}
                </div>
              </div>
            )
          })}
        </div>
        </div>
      )}
    </div>
  )
}
