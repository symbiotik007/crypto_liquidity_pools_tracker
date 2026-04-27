// Banner visual de alerta "pool fuera de rango"
// Se muestra dentro del PoolCard cuando el pool sale del rango

const WA_OSCAR = 'https://wa.me/573215646716'

const ANIM = `
@keyframes oor-slidein {
  from { opacity:0; transform:translateY(-10px); }
  to   { opacity:1; transform:translateY(0); }
}
@keyframes oor-pulse-border {
  0%,100% { box-shadow: 0 0 0 0 rgba(255,79,110,0); }
  50%     { box-shadow: 0 0 0 3px rgba(255,79,110,0.25); }
}
@keyframes oor-pulse-border-up {
  0%,100% { box-shadow: 0 0 0 0 rgba(255,179,71,0); }
  50%     { box-shadow: 0 0 0 3px rgba(255,179,71,0.25); }
}
`

export default function OutOfRangeAlertBanner({ direction, pair, onDismiss }) {
  const isBelow = direction === 'below'

  // Uniswap V3: precio BAJA del rango → 100% token0 (ej. ETH)
  //             precio SUBE del rango → 100% token1 (ej. USDC)
  const C = isBelow
    ? { accent: '#ff4f6e', bg: '#1a0810', border: '#5a1a28', icon: '⬇', label: 'Por debajo del mínimo', token: pair?.split('/')[0] ?? '?' }
    : { accent: '#ffb347', bg: '#1a0e00', border: '#5a3a00', icon: '⬆', label: 'Por encima del máximo', token: pair?.split('/')[1] ?? '?' }

  return (
    <>
      <style>{ANIM}</style>
      <div style={{
        background: C.bg,
        border: `1px solid ${C.border}`,
        borderLeft: `4px solid ${C.accent}`,
        borderRadius: 8,
        padding: '14px 16px',
        marginBottom: 12,
        animation: `oor-slidein 0.35s ease, ${isBelow ? 'oor-pulse-border' : 'oor-pulse-border-up'} 2.5s ease-in-out infinite`,
        position: 'relative',
      }}>

        {/* ── Header ── */}
        <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', gap:10, marginBottom:8 }}>
          <div style={{ display:'flex', alignItems:'center', gap:8 }}>
            <span style={{ fontSize:18 }}>⚠️</span>
            <div>
              <div style={{
                fontSize: 13, fontWeight: 700, color: C.accent,
                fontFamily: 'Outfit, sans-serif', letterSpacing: '0.2px',
              }}>
                {C.icon} Pool {pair} fuera de rango · {C.label}
              </div>
              <div style={{
                fontSize: 12, color: '#7a5060',
                fontFamily: 'Outfit, sans-serif', marginTop: 2,
              }}>
                Tu posición está compuesta 100% en {C.token} y no está generando fees.
              </div>
            </div>
          </div>
          {onDismiss && (
            <button onClick={onDismiss} style={{
              background:'none', border:'none', color:'#5a3040',
              fontSize:16, cursor:'pointer', padding:'0 2px', lineHeight:1, flexShrink:0,
            }}>✕</button>
          )}
        </div>

        {/* ── Mensaje y acciones ── */}
        <div style={{
          fontSize: 12, color: '#9a7080',
          fontFamily: 'Outfit, sans-serif', marginBottom: 12, lineHeight: 1.6,
        }}>
          ¿No sabes qué hacer en esta situación?{' '}
          <strong style={{ color: '#b08090' }}>Contacta a Oscar</strong> para recibir orientación
          o revisa el <strong style={{ color: '#b08090' }}>FAQ</strong> con estrategias recomendadas.
        </div>

        <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
          <a
            href={WA_OSCAR}
            target="_blank"
            rel="noreferrer"
            style={{
              display:'inline-flex', alignItems:'center', gap:6,
              padding:'7px 14px',
              background:'transparent', border:`1px solid ${C.accent}`,
              color: C.accent, fontFamily:'Outfit, sans-serif',
              fontSize:11, fontWeight:700, letterSpacing:'0.8px',
              textDecoration:'none', cursor:'pointer',
              textTransform:'uppercase',
              transition:'all 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = C.accent; e.currentTarget.style.color = '#020812' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = C.accent }}
          >
            💬 Contactar a Oscar
          </a>

          <button
            onClick={() => {
              // Scroll al FAQ de la home (si existe) o abre en nueva pestaña
              const faqEl = document.getElementById('faq')
              if (faqEl) faqEl.scrollIntoView({ behavior:'smooth' })
              else window.open('/#faq', '_blank')
            }}
            style={{
              display:'inline-flex', alignItems:'center', gap:6,
              padding:'7px 14px',
              background:'transparent', border:'1px solid #1a3a5e',
              color:'#4a7a96', fontFamily:'Outfit, sans-serif',
              fontSize:11, fontWeight:700, letterSpacing:'0.8px',
              cursor:'pointer', textTransform:'uppercase',
              transition:'all 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor='#4a7a96'; e.currentTarget.style.color='#7ab8d4' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor='#1a3a5e'; e.currentTarget.style.color='#4a7a96' }}
          >
            📚 Ver FAQ
          </button>
        </div>
      </div>
    </>
  )
}
