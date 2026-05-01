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
        onClick={() => { setOpen(o => !o); if (!open && noLeidas > 0) {} }}
        style={{ position:'relative', background:'none', border:'1px solid #1a3a5e', color: noLeidas > 0 ? '#00e5ff' : '#4a7a96', width:36, height:36, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', transition:'all 0.15s', flexShrink:0 }}
        onMouseEnter={e => { e.currentTarget.style.borderColor='#00e5ff'; e.currentTarget.style.color='#00e5ff' }}
        onMouseLeave={e => { e.currentTarget.style.borderColor='#1a3a5e'; e.currentTarget.style.color= noLeidas>0?'#00e5ff':'#4a7a96' }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
        </svg>
        {noLeidas > 0 && (
          <span style={{ position:'absolute', top:-4, right:-4, background:'#ff4f6e', color:'#fff', fontSize:9, fontWeight:800, width:16, height:16, borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', border:'2px solid #050a0f' }}>
            {noLeidas > 9 ? '9+' : noLeidas}
          </span>
        )}
      </button>

      {open && (
        <div style={{ position:'absolute', top:'calc(100% + 8px)', right:0, width:320, background:'#070d14', border:'1px solid #1a3a5e', zIndex:300, boxShadow:'0 8px 32px rgba(0,0,0,0.6)', maxHeight:420, display:'flex', flexDirection:'column' }}>
          <div style={{ padding:'14px 16px', borderBottom:'1px solid #0e2435', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
            <span style={{ fontSize:13, fontWeight:700, color:'#c8e6f0' }}>Notificaciones</span>
            {noLeidas > 0 && (
              <button onClick={marcarTodasLeidas}
                style={{ background:'none', border:'none', color:'#00e5ff', fontSize:11, cursor:'pointer', fontFamily:'Outfit,sans-serif' }}>
                Marcar todas como leídas
              </button>
            )}
          </div>

          <div style={{ overflowY:'auto', flex:1 }}>
            {notifs.length === 0 ? (
              <div style={{ padding:'32px 16px', textAlign:'center', color:'#2a5a72', fontSize:13 }}>
                Sin notificaciones
              </div>
            ) : (
              notifs.map(n => (
                <div key={n.id}
                  onClick={() => { if (!n.leida) marcarLeida(n.id) }}
                  style={{ padding:'14px 16px', borderBottom:'1px solid #0e2435', cursor: n.leida?'default':'pointer', background: n.leida?'transparent':'rgba(0,229,255,0.03)', display:'flex', gap:12, alignItems:'flex-start', transition:'background 0.15s' }}
                  onMouseEnter={e => { if(!n.leida) e.currentTarget.style.background='rgba(0,229,255,0.06)' }}
                  onMouseLeave={e => { if(!n.leida) e.currentTarget.style.background='rgba(0,229,255,0.03)' }}
                >
                  <span style={{ fontSize:18, flexShrink:0, marginTop:1 }}>{iconos[n.tipo] || '🔔'}</span>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontSize:13, fontWeight: n.leida?400:700, color: n.leida?'#4a7a96':'#c8e6f0', marginBottom:3 }}>{n.titulo}</div>
                    <div style={{ fontSize:12, color:'#4a7a96', lineHeight:1.5 }}>{n.mensaje}</div>
                    <div style={{ fontSize:10, color:'#2a5a72', marginTop:5, display:'flex', alignItems:'center', gap:6 }}>
                      {fmtDate(n.created_at)}
                      {!n.leida && <span style={{ width:6, height:6, borderRadius:'50%', background:'#00e5ff', display:'inline-block' }} />}
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
