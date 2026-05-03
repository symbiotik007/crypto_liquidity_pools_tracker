import { useState, useRef, useEffect } from "react";
import { useNotificaciones } from "../lib/useSupabaseSync";

export default function NotificationBell({ userId }) {
  const { notifs, noLeidas, marcarLeida, marcarTodasLeidas } = useNotificaciones(userId)
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const iconos = { pregunta_respondida:'💬', plan_actualizado:'⚡', curso_completado:'🎓' }
  const fmtDate = (d) => {
    const diff = Date.now() - new Date(d).getTime()
    const min  = Math.floor(diff / 60000)
    const hrs  = Math.floor(diff / 3600000)
    const dias = Math.floor(diff / 86400000)
    if (min < 1)   return 'Ahora'
    if (min < 60)  return `Hace ${min}m`
    if (hrs < 24)  return `Hace ${hrs}h`
    return `Hace ${dias}d`
  }

  return (
    <div ref={ref} style={{ position:'relative' }}>
      <button
        onClick={() => { setOpen(o => !o) }}
        style={{
          position:'relative', background:'none',
          border:'1px solid var(--border-dim)',
          color: noLeidas > 0 ? 'var(--color-accent)' : 'var(--text-dim)',
          width:36, height:36, cursor:'pointer',
          display:'flex', alignItems:'center', justifyContent:'center',
          transition:'all 0.15s', flexShrink:0, borderRadius: 8,
        }}
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = 'var(--color-accent)'
          e.currentTarget.style.color = 'var(--color-accent)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = 'var(--border-dim)'
          e.currentTarget.style.color = noLeidas > 0 ? 'var(--color-accent)' : 'var(--text-dim)'
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
        </svg>
        {noLeidas > 0 && (
          <span style={{
            position:'absolute', top:-4, right:-4,
            background:'var(--color-danger)', color:'#fff',
            fontSize:9, fontWeight:800, width:16, height:16,
            borderRadius:'50%', display:'flex', alignItems:'center',
            justifyContent:'center', border:'2px solid var(--bg-base)',
          }}>
            {noLeidas > 9 ? '9+' : noLeidas}
          </span>
        )}
      </button>

      {open && (
        <div style={{
          position:'absolute', top:'calc(100% + 8px)', right:0, width:320,
          background:'var(--bg-surface)',
          border:'1px solid var(--border-dim)',
          zIndex:300,
          boxShadow:'var(--shadow-overlay)',
          maxHeight:420, display:'flex', flexDirection:'column',
          borderRadius: 10, overflow: 'hidden',
        }}>
          <div style={{
            padding:'14px 16px',
            borderBottom:'1px solid var(--border-dim)',
            display:'flex', alignItems:'center', justifyContent:'space-between',
          }}>
            <span style={{ fontSize:13, fontWeight:700, color:'var(--text-primary)', fontFamily:'Outfit,sans-serif' }}>
              Notificaciones
            </span>
            {noLeidas > 0 && (
              <button onClick={marcarTodasLeidas} style={{
                background:'none', border:'none',
                color:'var(--color-accent)', fontSize:11,
                cursor:'pointer', fontFamily:'Outfit,sans-serif',
              }}>
                Marcar todas leídas
              </button>
            )}
          </div>

          <div style={{ overflowY:'auto', flex:1 }}>
            {notifs.length === 0 ? (
              <div style={{ padding:'32px 16px', textAlign:'center', color:'var(--text-label)', fontSize:13, fontFamily:'Outfit,sans-serif' }}>
                Sin notificaciones
              </div>
            ) : (
              notifs.map(n => (
                <div key={n.id}
                  onClick={() => { if (!n.leida) marcarLeida(n.id) }}
                  style={{
                    padding:'14px 16px',
                    borderBottom:'1px solid var(--border-dim)',
                    cursor: n.leida ? 'default' : 'pointer',
                    background: n.leida ? 'transparent' : 'rgba(var(--color-accent-rgb), 0.04)',
                    display:'flex', gap:12, alignItems:'flex-start',
                    transition:'background 0.15s',
                  }}
                  onMouseEnter={e => { if(!n.leida) e.currentTarget.style.background='rgba(var(--color-accent-rgb), 0.08)' }}
                  onMouseLeave={e => { if(!n.leida) e.currentTarget.style.background='rgba(var(--color-accent-rgb), 0.04)' }}
                >
                  <span style={{ fontSize:18, flexShrink:0, marginTop:1 }}>{iconos[n.tipo] || '🔔'}</span>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{
                      fontSize:13, fontFamily:'Outfit,sans-serif',
                      fontWeight: n.leida ? 400 : 700,
                      color: n.leida ? 'var(--text-dim)' : 'var(--text-primary)',
                      marginBottom:3,
                    }}>{n.titulo}</div>
                    <div style={{ fontSize:12, color:'var(--text-dim)', lineHeight:1.5, fontFamily:'Outfit,sans-serif' }}>{n.mensaje}</div>
                    <div style={{ fontSize:10, color:'var(--text-label)', marginTop:5, display:'flex', alignItems:'center', gap:6, fontFamily:'Outfit,sans-serif' }}>
                      {fmtDate(n.created_at)}
                      {!n.leida && <span style={{ width:6, height:6, borderRadius:'50%', background:'var(--color-accent)', display:'inline-block' }} />}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}
