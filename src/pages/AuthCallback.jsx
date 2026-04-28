// src/pages/AuthCallback.jsx
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Outfit', sans-serif; background: #050a0f; }
  .rc-overlay {
    position: fixed; inset: 0; background: rgba(5,10,15,0.9);
    display: flex; align-items: center; justify-content: center;
    padding: 20px; backdrop-filter: blur(10px);
    animation: fadeIn 0.2s ease;
  }
  @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
  .rc-box {
    background: #070d14; border: 1px solid #1a3a5e;
    width: 100%; max-width: 420px;
    animation: slideUp 0.25s ease;
  }
  @keyframes slideUp { from { transform: translateY(20px); opacity: 0 } to { transform: translateY(0); opacity: 1 } }
  .rc-head {
    padding: 28px 32px 0;
    border-bottom: 1px solid #0e2435;
    padding-bottom: 20px;
  }
  .rc-body { padding: 24px 32px 32px; display: flex; flex-direction: column; gap: 16px; }
  .rc-lbl { display: block; font-size: 11px; font-weight: 600; color: #4a7a96; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 7px; }
  .rc-inp {
    width: 100%; padding: 11px 42px 11px 14px;
    background: #0a1520; border: 1px solid #1a3a5e;
    color: #c8e6f0; font-family: 'Outfit', sans-serif;
    font-size: 14px; outline: none; transition: border-color 0.15s;
  }
  .rc-inp:focus { border-color: #00e5ff; }
  .rc-inp.err { border-color: #ff4f6e; }
  .rc-pw { position: relative; }
  .rc-eye {
    position: absolute; right: 12px; top: 50%; transform: translateY(-50%);
    background: none; border: none; color: #2a5a72; cursor: pointer; padding: 0;
    display: flex; align-items: center; transition: color 0.15s;
  }
  .rc-eye:hover { color: #7ab8d4; }
  .str-bar { height: 3px; display: flex; gap: 3px; margin-top: 8px; }
  .str-seg { flex: 1; border-radius: 2px; background: #0e2435; transition: background 0.3s; }
  .str-seg.s1,.str-seg.s2 { background: #ff4f6e; }
  .str-seg.s3 { background: #ffb347; }
  .str-seg.s4 { background: #00ff88; }
  .str-chks { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 6px; }
  .str-chk { font-size: 11px; display: flex; align-items: center; gap: 4px; }
  .str-chk.ok { color: #00ff88; } .str-chk.no { color: #2a5a72; }
  .rc-btn {
    width: 100%; padding: 13px; background: transparent;
    border: 1px solid #00e5ff; color: #00e5ff;
    font-family: 'Outfit', sans-serif; font-size: 15px; font-weight: 700;
    cursor: pointer; letter-spacing: 0.5px; transition: all 0.15s; margin-top: 4px;
    border-radius: 10px;
  }
  .rc-btn:hover { background: rgba(0,229,255,0.05); }
  .rc-btn:disabled { opacity: 0.4; cursor: not-allowed; }
  .rc-err { background: #1a0810; border: 1px solid #5a1a28; padding: 10px 14px; font-size: 13px; color: #ff6b88; }
  .rc-ok  { background: #001a0e; border: 1px solid #003a22; padding: 20px; font-size: 14px; color: #00ff88; text-align: center; line-height: 1.7; }
`

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
    return (
      <>
        <style>{CSS}</style>
        <PasswordResetModal />
      </>
    )
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
