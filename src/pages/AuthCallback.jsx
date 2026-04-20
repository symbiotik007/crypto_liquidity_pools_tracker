// src/pages/AuthCallback.jsx
// Maneja el redirect después de Google OAuth y Magic Link
import { useEffect } from 'react'
import { supabase } from '../lib/supabase'

export default function AuthCallback() {
  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        window.location.href = '/app'
      }
    })
  }, [])

  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      height: '100vh', background: '#050a0f', color: '#00e5ff',
      fontFamily: 'Outfit, sans-serif', fontSize: 16,
    }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 32, marginBottom: 16 }}>◈</div>
        <div>Verificando acceso...</div>
      </div>
    </div>
  )
}