import { Component } from 'react'
import { useAuth }   from '../lib/AuthContext'
import Login         from '../pages/Login'

// ── Error boundary ─────────────────────────────────────────────────
class ErrorBoundary extends Component {
  constructor(props) { super(props); this.state = { error: null }; }
  static getDerivedStateFromError(e) { return { error: e }; }
  render() {
    if (this.state.error) {
      return (
        <div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:'100vh', background:'#050a0f', fontFamily:'Outfit,sans-serif', padding:24 }}>
          <div style={{ maxWidth:580, width:'100%', textAlign:'center' }}>
            <div style={{ fontSize:40, marginBottom:16 }}>⚠</div>
            <div style={{ fontSize:18, fontWeight:700, color:'#ff4f6e', marginBottom:12 }}>Error al cargar</div>
            <div style={{ fontSize:13, color:'#4a7a96', marginBottom:20, lineHeight:1.7 }}>
              Ocurrió un problema inesperado. Comparte este mensaje con soporte:
            </div>
            <div style={{ background:'#0a1520', border:'1px solid #1a3a5e', padding:16, borderRadius:8, textAlign:'left', fontSize:11, color:'#ff6b88', fontFamily:'monospace', marginBottom:24, wordBreak:'break-all', lineHeight:1.6 }}>
              {this.state.error?.message || String(this.state.error)}
              {this.state.error?.stack ? '\n\n' + this.state.error.stack.slice(0, 400) : ''}
            </div>
            <button onClick={() => window.location.reload()}
              style={{ padding:'10px 28px', background:'#00e5ff', color:'#050a0f', border:'none', borderRadius:8, fontFamily:'Outfit,sans-serif', fontSize:14, fontWeight:700, cursor:'pointer' }}>
              Recargar
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

// ── Membresía pausada ──────────────────────────────────────────────
function PausedScreen({ signOut }) {
  return (
    <div style={{ minHeight:'100vh', background:'#050a0f', display:'flex', alignItems:'center', justifyContent:'center', padding:24, fontFamily:"'Outfit', sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800&display=swap');`}</style>
      <div style={{ maxWidth:480, width:'100%', textAlign:'center' }}>
        <div style={{ fontSize:56, marginBottom:24 }}>⏸</div>
        <div style={{ fontSize:11, fontWeight:700, color:'#ffb347', letterSpacing:3, textTransform:'uppercase', marginBottom:12 }}>
          Membresía pausada
        </div>
        <h1 style={{ fontSize:28, fontWeight:800, color:'#fff', marginBottom:16, lineHeight:1.2 }}>
          Tu membresía ha sido<br /><span style={{ color:'#ffb347' }}>pausada temporalmente</span>
        </h1>
        <p style={{ fontSize:15, color:'#4a7a96', lineHeight:1.8, marginBottom:36 }}>
          Para reactivar tu acceso comunícate con Oscar,
          quien te hará la respectiva validación y te habilitará nuevamente.
        </p>
        <div style={{ display:'flex', flexDirection:'column', gap:12, marginBottom:36 }}>
          <a href="https://wa.me/573215646716" target="_blank" rel="noreferrer"
            style={{ display:'flex', alignItems:'center', gap:14, padding:'16px 20px', background:'#070d14', border:'1px solid #1a3a5e', textDecoration:'none', transition:'border-color 0.15s' }}
            onMouseEnter={e=>e.currentTarget.style.borderColor='#00e5ff'}
            onMouseLeave={e=>e.currentTarget.style.borderColor='#1a3a5e'}
          >
            <span style={{ fontSize:22 }}>💬</span>
            <div style={{ textAlign:'left' }}>
              <div style={{ fontSize:13, fontWeight:700, color:'#fff' }}>WhatsApp</div>
              <div style={{ fontSize:12, color:'#4a7a96' }}>+57 321 564 6716 · Respuesta inmediata</div>
            </div>
            <span style={{ marginLeft:'auto', color:'#00e5ff' }}>→</span>
          </a>
          <a href="mailto:profeoscarbol@gmail.com"
            style={{ display:'flex', alignItems:'center', gap:14, padding:'16px 20px', background:'#070d14', border:'1px solid #1a3a5e', textDecoration:'none', transition:'border-color 0.15s' }}
            onMouseEnter={e=>e.currentTarget.style.borderColor='#00e5ff'}
            onMouseLeave={e=>e.currentTarget.style.borderColor='#1a3a5e'}
          >
            <span style={{ fontSize:22 }}>✉</span>
            <div style={{ textAlign:'left' }}>
              <div style={{ fontSize:13, fontWeight:700, color:'#fff' }}>Email</div>
              <div style={{ fontSize:12, color:'#4a7a96' }}>profeoscarbol@gmail.com</div>
            </div>
            <span style={{ marginLeft:'auto', color:'#00e5ff' }}>→</span>
          </a>
        </div>
        <button onClick={signOut}
          style={{ background:'none', border:'none', color:'#2a5a72', fontSize:13, cursor:'pointer', fontFamily:'Outfit,sans-serif', textDecoration:'underline' }}>
          Cerrar sesión
        </button>
      </div>
    </div>
  )
}

// ── Spinner de carga inicial ───────────────────────────────────────
function LoadingScreen() {
  return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:'100vh', background:'#050a0f', color:'#00e5ff', fontFamily:'Outfit, sans-serif' }}>
      <div style={{ textAlign:'center' }}>
        <div style={{ fontSize:48, marginBottom:16 }}>◈</div>
        <div style={{ fontSize:14, color:'#4a7a96', letterSpacing:2 }}>LIQUIDITY ENGINE</div>
      </div>
    </div>
  )
}

// ── Guardia de autenticación ───────────────────────────────────────
// Envuelve rutas protegidas: bloquea si no hay sesión, pausa o errores.
export default function RequireAuth({ children }) {
  const { session, loading, isPaused, signOut } = useAuth()

  if (loading)   return <LoadingScreen />
  if (!session)  return <Login />
  if (isPaused)  return <PausedScreen signOut={signOut} />

  return <ErrorBoundary>{children}</ErrorBoundary>
}
