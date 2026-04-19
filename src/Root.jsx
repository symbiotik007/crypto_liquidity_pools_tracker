// src/Root.jsx
// Router simple sin react-router-dom — maneja 3 rutas:
// /              → App (si hay sesión) o Login
// /auth/callback → AuthCallback
// cualquier otra → App o Login

import { useAuth } from './lib/AuthContext'
import Login        from './pages/Login'
import AuthCallback from './pages/AuthCallback'
import App          from './App'

export default function Root() {
  const { session, loading } = useAuth()
  const path = window.location.pathname

  // Loading spinner
  if (loading) {
    return (
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        height: '100vh', background: '#050a0f', color: '#00e5ff',
        fontFamily: 'Outfit, sans-serif',
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>◈</div>
          <div style={{ fontSize: 14, color: '#4a7a96', letterSpacing: 2 }}>
            LIQUIDITY ENGINE
          </div>
        </div>
      </div>
    )
  }

  // Auth callback (redirect después de OAuth/Magic Link)
  if (path === '/auth/callback') {
    return <AuthCallback />
  }

  // Si no hay sesión → Login
  if (!session) {
    return <Login />
  }

  // Si hay sesión → App principal
  return <App />
}
