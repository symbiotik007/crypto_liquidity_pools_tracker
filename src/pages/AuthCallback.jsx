// src/pages/AuthCallback.jsx
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import './AuthCallback.css'

const EyeIcon = ({ open }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    {open
      ? <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>
      : <><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></>
    }
  </svg>
)

function checkPassword(pw) {
  const checks = {
    length: pw.length >= 8,
    upper:  /[A-Z]/.test(pw),
    number: /[0-9]/.test(pw),
    symbol: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pw),
  }
  return { checks, score: Object.values(checks).filter(Boolean).length }
}

function PasswordResetModal() {
  const [pw,      setPw]      = useState('')
  const [cf,      setCf]      = useState('')
  const [showPw,  setShowPw]  = useState(false)
  const [showCf,  setShowCf]  = useState(false)
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState('')
  const [done,    setDone]    = useState(false)

  const { checks, score } = checkPassword(pw)
  const match = pw === cf && cf.length > 0
  const canSubmit = score >= 4 && match && !loading

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!canSubmit) return
    setLoading(true); setError('')
    const { error } = await supabase.auth.updateUser({ password: pw })
    setLoading(false)
    if (error) { setError(error.message); return }
    setDone(true)
    setTimeout(() => { window.location.href = '/app' }, 2500)
  }

  const labels = [
    { k:'length', t:'8+ caracteres' },
    { k:'upper',  t:'Mayúscula' },
    { k:'number', t:'Número' },
    { k:'symbol', t:'Símbolo' },
  ]

  return (
    <div className="rc-overlay">
      <div className="rc-box">
        <div className="rc-head">
          <div style={{ fontSize:11, fontWeight:700, color:'#00e5ff', letterSpacing:3, textTransform:'uppercase', marginBottom:8 }}>
            The Crypto House
          </div>
          <div style={{ fontSize:22, fontWeight:700, color:'#c8e6f0', marginBottom:4 }}>Nueva contraseña</div>
          <div style={{ fontSize:13, color:'#4a7a96' }}>Elige una contraseña segura para tu cuenta</div>
        </div>

        <div className="rc-body">
          {done ? (
            <div className="rc-ok">
              <div style={{ fontSize:32, marginBottom:12 }}>✓</div>
              <div style={{ fontWeight:700, marginBottom:6 }}>Contraseña actualizada</div>
              <div style={{ fontSize:13, color:'#4a9a6a' }}>Redirigiendo al app...</div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:14 }}>

              {/* Nueva contraseña */}
              <div>
                <label className="rc-lbl">Nueva contraseña</label>
                <div className="rc-pw">
                  <input
                    className={`rc-inp${pw && score < 4 ? ' err' : ''}`}
                    type={showPw ? 'text' : 'password'}
                    placeholder="Mín. 8 chars, mayúscula, número, símbolo"
                    value={pw}
                    onChange={e => { setPw(e.target.value); setError('') }}
                    disabled={loading}
                    autoFocus
                  />
                  <button type="button" className="rc-eye" onClick={() => setShowPw(v => !v)}>
                    <EyeIcon open={showPw} />
                  </button>
                </div>
                {pw && (
                  <>
                    <div className="str-bar">
                      {[1,2,3,4].map(i => (
                        <div key={i} className={`str-seg${i <= score ? ' s' + score : ''}`} />
                      ))}
                    </div>
                    <div className="str-chks">
                      {labels.map(l => (
                        <span key={l.k} className={`str-chk ${checks[l.k] ? 'ok' : 'no'}`}>
                          {checks[l.k] ? '✓' : '○'} {l.t}
                        </span>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Confirmar contraseña */}
              <div>
                <label className="rc-lbl">Confirmar contraseña</label>
                <div className="rc-pw">
                  <input
                    className={`rc-inp${cf && !match ? ' err' : ''}`}
                    type={showCf ? 'text' : 'password'}
                    placeholder="Repite tu contraseña"
                    value={cf}
                    onChange={e => { setCf(e.target.value); setError('') }}
                    disabled={loading}
                  />
                  <button type="button" className="rc-eye" onClick={() => setShowCf(v => !v)}>
                    <EyeIcon open={showCf} />
                  </button>
                </div>
                {cf && (
                  <div style={{ fontSize:11, marginTop:4, color: match ? '#00ff88' : '#ff4f6e' }}>
                    {match ? '✓ Coinciden' : '✗ No coinciden'}
                  </div>
                )}
              </div>

              {error && <div className="rc-err">⚠ {error}</div>}

              <button className="rc-btn" type="submit" disabled={!canSubmit}>
                {loading ? 'Guardando...' : 'Guardar nueva contraseña →'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

export default function AuthCallback() {
  const [isRecovery, setIsRecovery] = useState(false)

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'PASSWORD_RECOVERY') {
        // Mostrar modal de cambio de contraseña
        setIsRecovery(true)
      } else if (session) {
        // OAuth / Magic Link — ir al app
        window.location.href = '/app'
      }
    })
  }, [])

  if (isRecovery) {
    return <PasswordResetModal />
  }

  return (
    <div style={{
      display:'flex', alignItems:'center', justifyContent:'center',
      height:'100vh', background:'#050a0f', color:'#00e5ff',
      fontFamily:'Outfit, sans-serif', fontSize:16,
    }}>
      <div style={{ textAlign:'center' }}>
        <div style={{ fontSize:32, marginBottom:16 }}>◈</div>
        <div>Verificando acceso...</div>
      </div>
    </div>
  )
}
