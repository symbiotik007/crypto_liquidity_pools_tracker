// src/pages/Login.jsx
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import cryptoHouseLogo from '../assets/cryptohouselogo.png'

// ── helpers ──────────────────────────────────────────────────────────
const EMAIL_DOMAINS = [
  'gmail.com','hotmail.com','outlook.com','yahoo.com',
  'icloud.com','live.com','protonmail.com','me.com','yahoo.es',
]

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())
}

function checkPassword(pw) {
  const checks = {
    length:  pw.length >= 8,
    upper:   /[A-Z]/.test(pw),
    number:  /[0-9]/.test(pw),
    symbol:  /[!@#$%^&*()_+\-=\[\]{};\':"\\|,.<>\/?]/.test(pw),
  }
  const score = Object.values(checks).filter(Boolean).length
  return { checks, score }
}

// ── icons ─────────────────────────────────────────────────────────────
const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" style={{flexShrink:0}}>
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
)

const EyeIcon = ({ open }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    {open
      ? <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>
      : <><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></>
    }
  </svg>
)

// ── EmailInput con autocompletado de dominios ─────────────────────────
function EmailInput({ value, onChange, disabled, hasError }) {
  const [suggestions, setSuggestions] = useState([])

  const handleChange = (e) => {
    const val = e.target.value.replace(/\s/g, '') // no espacios
    onChange(val)
    const atIdx = val.indexOf('@')
    if (atIdx > -1) {
      const after = val.slice(atIdx + 1).toLowerCase()
      const base  = val.slice(0, atIdx + 1)
      const list  = after.length === 0
        ? EMAIL_DOMAINS.map(d => base + d)
        : EMAIL_DOMAINS.filter(d => d.startsWith(after) && d !== after).map(d => base + d)
      setSuggestions(list.slice(0, 6))
    } else {
      setSuggestions([])
    }
  }

  const select = (s) => { onChange(s); setSuggestions([]) }

  return (
    <div style={{ position:'relative' }}>
      <input
        className={`m-inp${hasError ? ' err' : ''}`}
        type="text"
        inputMode="email"
        placeholder="tu@email.com"
        value={value}
        onChange={handleChange}
        onBlur={() => setTimeout(() => setSuggestions([]), 160)}
        disabled={disabled}
        autoComplete="email"
        spellCheck={false}
      />
      {suggestions.length > 0 && (
        <div className="email-sug">
          {suggestions.map((s, i) => {
            const atIdx = s.indexOf('@')
            return (
              <div key={i} className="email-sug-item" onMouseDown={() => select(s)}>
                <span style={{color:'#7ab8d4'}}>{s.slice(0, atIdx + 1)}</span>
                <span style={{color:'#00e5ff', fontWeight:700}}>{s.slice(atIdx + 1)}</span>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

// ── CSS ───────────────────────────────────────────────────────────────
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:'Outfit',sans-serif;background:#050a0f;color:#c8d8e8;min-height:100vh}
  .lp-root{min-height:100vh;display:flex;flex-direction:column;background-image:url('/bg-hero.png');background-size:cover;background-position:center;position:relative;overflow:hidden}
  .lp-root::before{content:'';position:absolute;inset:0;background:rgba(5,10,15,0.80);z-index:0}
  .lp-nav-wrap{position:fixed;top:20px;left:0;right:0;z-index:200;display:flex;justify-content:center;pointer-events:none}
  .lp-nav{pointer-events:all;display:flex;align-items:center;gap:2px;padding:5px 5px 5px 18px;background:rgba(7,13,20,0.82);border:1px solid rgba(0,229,255,0.12);border-radius:999px;backdrop-filter:blur(20px);box-shadow:0 0 0 1px rgba(255,255,255,0.04) inset,0 8px 40px rgba(0,0,0,0.5),0 0 24px rgba(0,229,255,0.05)}
  .lp-brand{display:flex;align-items:center;gap:10px;text-decoration:none;padding-right:16px;border-right:1px solid rgba(0,229,255,0.1);margin-right:6px}
  .lp-icon{width:30px;height:30px;background:#00e5ff;display:flex;align-items:center;justify-content:center;border-radius:6px;flex-shrink:0}
  .lp-name{font-size:12px;font-weight:700;color:rgba(200,230,240,0.85);letter-spacing:1.5px;text-transform:uppercase}
  .lp-sep{width:1px;height:20px;background:rgba(0,229,255,0.1);margin:0 6px;flex-shrink:0}
  .btn-ghost{padding:7px 16px;background:transparent;border:none;color:rgba(200,230,240,0.55);font-family:'Outfit',sans-serif;font-size:12.5px;font-weight:600;cursor:pointer;border-radius:999px;transition:background 0.15s,color 0.15s;white-space:nowrap}
  .btn-ghost:hover{background:rgba(0,229,255,0.07);color:#c8e6f0}
  .btn-cyan{position:relative;overflow:hidden;padding:8px 20px;border-radius:999px;font-family:'Outfit',sans-serif;font-size:12.5px;font-weight:700;letter-spacing:0.5px;text-transform:uppercase;cursor:pointer;color:#050a0f;background:linear-gradient(90deg,#00e5ff,#7b61ff,#ff4f6e,#ffb347,#00ff88,#00e5ff);background-size:280% 100%;border:none;transition:background-position 0.55s ease,box-shadow 0.3s ease;box-shadow:0 0 12px rgba(0,229,255,0.3);white-space:nowrap}
  .btn-cyan:hover{background-position:100% 0;box-shadow:0 0 20px rgba(123,97,255,0.55),0 0 36px rgba(0,229,255,0.3);color:#050a0f}
  .btn-cyan::after{content:'';position:absolute;inset:0;border-radius:999px;background:linear-gradient(120deg,transparent 30%,rgba(255,255,255,0.22) 50%,transparent 70%);transform:translateX(-100%);transition:transform 0.4s ease}
  .btn-cyan:hover::after{transform:translateX(100%)}
  .btn-cyan:disabled{opacity:0.45;cursor:not-allowed}
  .lp-hero{position:relative;z-index:1;flex:1;display:flex;align-items:center;justify-content:center;padding:80px 24px;text-align:center}
  .lp-hero-inner{max-width:680px;display:flex;flex-direction:column;align-items:center}
  .lp-badge{display:inline-flex;align-items:center;gap:8px;padding:6px 16px;border:1px solid rgba(0,229,255,0.25);background:rgba(0,229,255,0.05);border-radius:999px;font-size:11px;font-weight:700;color:#00e5ff;letter-spacing:1.5px;text-transform:uppercase;margin-bottom:28px}
  .lp-badge-dot{width:6px;height:6px;background:#00e5ff;border-radius:50%;animation:lpPulse 2s infinite}
  @keyframes lpPulse{0%,100%{opacity:1;box-shadow:0 0 6px #00e5ff}50%{opacity:0.4;box-shadow:none}}
  .lp-title{font-size:clamp(38px,6vw,64px);font-weight:900;line-height:1.08;margin-bottom:20px;color:#fff;text-shadow:0 2px 24px rgba(0,0,0,0.8);letter-spacing:-1px}
  .lp-title span{color:#00e5ff;text-shadow:0 0 32px rgba(0,229,255,0.4)}
  .lp-desc{font-size:17px;color:#7ab8d4;line-height:1.75;max-width:520px;margin-bottom:36px;text-shadow:0 1px 8px rgba(0,0,0,0.6)}
  .lp-feats{display:flex;flex-direction:column;gap:10px;margin-bottom:32px;text-align:left;align-self:flex-start;width:100%}
  .lp-feat{display:flex;align-items:center;gap:12px;font-size:14px;color:#7ab8d4}
  .lp-dot{width:7px;height:7px;background:#00e5ff;border-radius:50%;flex-shrink:0;box-shadow:0 0 8px rgba(0,229,255,0.5)}
  .lp-exchanges{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:40px;justify-content:center}
  .lp-ex{padding:4px 12px;background:rgba(0,229,255,0.06);border:1px solid rgba(0,229,255,0.18);border-radius:999px;font-size:11px;font-weight:700;color:#7ab8d4;letter-spacing:1px;text-transform:uppercase}
  .lp-ex-label{font-size:10px;color:#2a5a72;letter-spacing:1.5px;text-transform:uppercase;margin-bottom:10px;text-align:center;width:100%}
  .lp-cta{display:flex;flex-direction:column;align-items:center;gap:16px;margin-bottom:0}
  .lp-cta-primary{position:relative;overflow:hidden;padding:16px 48px;border-radius:999px;font-family:'Outfit',sans-serif;font-size:16px;font-weight:800;letter-spacing:0.5px;cursor:pointer;color:#050a0f;background:linear-gradient(90deg,#00e5ff,#7b61ff,#ff4f6e,#ffb347,#00ff88,#00e5ff);background-size:280% 100%;border:none;transition:background-position 0.55s ease,box-shadow 0.3s ease;box-shadow:0 0 24px rgba(0,229,255,0.4),0 4px 20px rgba(0,0,0,0.4)}
  .lp-cta-primary:hover{background-position:100% 0;box-shadow:0 0 36px rgba(123,97,255,0.6),0 0 48px rgba(0,229,255,0.35)}
  .lp-cta-primary::after{content:'';position:absolute;inset:0;border-radius:999px;background:linear-gradient(120deg,transparent 30%,rgba(255,255,255,0.25) 50%,transparent 70%);transform:translateX(-100%);transition:transform 0.4s ease}
  .lp-cta-primary:hover::after{transform:translateX(100%)}
  .lp-cta-secondary{background:none;border:none;cursor:pointer;font-family:'Outfit',sans-serif;font-size:14px;color:#4a7a96;transition:color 0.15s;padding:0}
  .lp-cta-secondary span{color:#7ab8d4;font-weight:600;text-decoration:underline;text-underline-offset:3px;transition:color 0.15s}
  .lp-cta-secondary:hover span{color:#00e5ff}
  .lp-plans{display:flex;gap:10px}
  .lp-plan{padding:6px 16px;border:1px solid #0e2435;font-size:11px;font-weight:600;letter-spacing:1px;text-transform:uppercase;color:#2a5a72}
  .lp-plan.on{border-color:#00e5ff;color:#00e5ff;background:rgba(0,229,255,0.05)}
  .m-overlay{position:fixed;inset:0;background:rgba(5,10,15,0.75);z-index:100;display:flex;align-items:center;justify-content:center;padding:20px;backdrop-filter:blur(8px);animation:mFade 0.2s ease}
  @keyframes mFade{from{opacity:0}to{opacity:1}}
  .m-box{background:#070d14;border:1px solid #1a3a5e;width:100%;max-width:440px;max-height:90vh;overflow-y:auto;animation:mUp 0.2s ease;border-radius:16px}
  @keyframes mUp{from{transform:translateY(16px);opacity:0}to{transform:translateY(0);opacity:1}}
  .m-head{padding:28px 32px 0;display:flex;align-items:flex-start;justify-content:space-between}
  .m-title{font-size:22px;font-weight:700;color:#c8e6f0;margin-bottom:4px}
  .m-sub2{font-size:13px;color:#4a7a96}
  .m-close{background:none;border:none;color:#2a5a72;font-size:20px;cursor:pointer;padding:0;line-height:1;transition:color 0.15s}
  .m-close:hover{color:#ff4f6e}
  .m-body{padding:24px 32px 32px;display:flex;flex-direction:column;gap:16px}
  .m-google{width:100%;padding:12px;background:transparent;border:1px solid #1a3a5e;color:#c8e6f0;font-family:'Outfit',sans-serif;font-size:14px;font-weight:500;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:10px;transition:all 0.15s;border-radius:10px}
  .m-google:hover{border-color:#00e5ff;color:#00e5ff}
  .m-google:disabled{opacity:0.5;cursor:not-allowed}
  .m-div{display:flex;align-items:center;gap:14px;font-size:11px;color:#2a5a72;letter-spacing:1px;text-transform:uppercase}
  .m-div::before,.m-div::after{content:'';flex:1;height:1px;background:#0e2435}
  .m-tabs{display:flex;border-bottom:1px solid #0e2435}
  .m-tab{flex:1;padding:8px 0;background:none;cursor:pointer;font-family:'Outfit',sans-serif;font-size:13px;font-weight:600;border:none;transition:all 0.15s}
  .m-lbl{display:block;font-size:11px;font-weight:600;color:#4a7a96;letter-spacing:1px;text-transform:uppercase;margin-bottom:7px}
  .m-inp{width:100%;padding:11px 14px;background:#0a1520;border:1px solid #1a3a5e;color:#c8e6f0;font-family:'Outfit',sans-serif;font-size:14px;outline:none;transition:border-color 0.15s}
  .m-inp:focus{border-color:#00e5ff}
  .m-inp::placeholder{color:#2a4a5e}
  .m-inp.err{border-color:#ff4f6e}
  .m-pw{position:relative}
  .m-pw .m-inp{padding-right:42px}
  .m-eye{position:absolute;right:12px;top:50%;transform:translateY(-50%);background:none;border:none;color:#2a5a72;cursor:pointer;padding:0;display:flex;align-items:center;transition:color 0.15s}
  .m-eye:hover{color:#7ab8d4}
  .str-bar{height:3px;display:flex;gap:3px;margin-bottom:6px}
  .str-seg{flex:1;border-radius:2px;background:#0e2435;transition:background 0.3s}
  .str-seg.s1,.str-seg.s2{background:#ff4f6e}
  .str-seg.s3{background:#ffb347}
  .str-seg.s4{background:#00ff88}
  .str-seg.s5{background:#00e5ff}
  .str-chks{display:flex;flex-wrap:wrap;gap:6px}
  .str-chk{font-size:11px;display:flex;align-items:center;gap:4px}
  .str-chk.ok{color:#00ff88}
  .str-chk.no{color:#2a5a72}
  .m-submit{width:100%;padding:13px;background:transparent;border:1px solid #00e5ff;color:#00e5ff;font-family:'Outfit',sans-serif;font-size:15px;font-weight:700;cursor:pointer;letter-spacing:0.5px;transition:all 0.15s;margin-top:4px;border-radius:10px}
  .m-submit:hover{background:rgba(0,229,255,0.05)}
  .m-submit:disabled{opacity:0.4;cursor:not-allowed}
  .m-err{background:#1a0810;border:1px solid #5a1a28;padding:10px 14px;font-size:13px;color:#ff6b88}
  .m-warn{background:#1a1000;border:1px solid #5a3a00;padding:10px 14px;font-size:13px;color:#ffb347}
  .m-ok{background:#001a0e;border:1px solid #003a22;padding:16px;font-size:14px;color:#00ff88;text-align:center;line-height:1.7}
  .m-switch{text-align:center;font-size:13px;color:#4a7a96;padding-top:8px;border-top:1px solid #0e2435}
  .m-swbtn{background:none;border:none;color:#00e5ff;cursor:pointer;font-family:'Outfit',sans-serif;font-size:13px;font-weight:600;text-decoration:underline;padding:0}
  .m-forgot-row{text-align:right}
  .m-fgbtn{background:none;border:none;color:#4a7a96;cursor:pointer;font-family:'Outfit',sans-serif;font-size:12px}
  .m-fgbtn:hover{color:#7ab8d4}
  .m-back{background:none;border:none;color:#4a7a96;cursor:pointer;font-family:'Outfit',sans-serif;font-size:12px;text-align:left;padding:0}
  .m-back:hover{color:#7ab8d4}

  /* ── email autocomplete ── */
  .email-sug{position:absolute;top:100%;left:0;right:0;background:#0a1520;border:1px solid #1a3a5e;border-top:none;z-index:20;max-height:220px;overflow-y:auto}
  .email-sug-item{padding:9px 14px;font-size:13px;color:#c8e6f0;cursor:pointer;border-bottom:1px solid #0e2435;transition:background 0.1s;display:flex;gap:0}
  .email-sug-item:last-child{border-bottom:none}
  .email-sug-item:hover{background:rgba(0,229,255,0.06)}

  /* ── cooldown badge ── */
  .m-cooldown{display:flex;align-items:center;justify-content:center;gap:8px;padding:10px 14px;background:#0a0510;border:1px solid #3a0a28;font-size:13px;color:#ff6b88}

  @media(max-width:640px){.lp-nav{padding:20px 24px}.lp-hero{padding:48px 24px}.lp-title{font-size:36px}.m-body,.m-head{padding-left:20px;padding-right:20px}}
`

// ── StrengthMeter ─────────────────────────────────────────────────────
function StrengthMeter({ password }) {
  const { checks, score } = checkPassword(password)
  if (!password) return null
  const labels = [
    { k:'length', t:'8+ caracteres' },
    { k:'upper',  t:'Mayúscula (A-Z)' },
    { k:'number', t:'Número (0-9)' },
    { k:'symbol', t:'Símbolo (!@#$)' },
  ]
  return (
    <div style={{marginTop:8}}>
      <div className="str-bar">
        {[1,2,3,4,5].map(i => (
          <div key={i} className={`str-seg${i<=score?' s'+score:''}`} />
        ))}
      </div>
      <div className="str-chks">
        {labels.map(l => (
          <span key={l.k} className={`str-chk ${checks[l.k]?'ok':'no'}`}>
            {checks[l.k]?'✓':'○'} {l.t}
          </span>
        ))}
      </div>
    </div>
  )
}

// ── LoginModal ────────────────────────────────────────────────────────
const COOLDOWN_SECS = 30
const MAX_ATTEMPTS  = 3

function LoginModal({ onClose, onSwitch }) {
  const [tab, setTab]         = useState('password')
  const [email, setEmail]     = useState('')
  const [emailErr, setEmailErr] = useState(false)
  const [pw, setPw]           = useState('')
  const [showPw, setShowPw]   = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState('')
  const [magicOk, setMagicOk] = useState(false)
  const [resetMode, setResetMode] = useState(false)
  const [resetOk, setResetOk]    = useState(false)
  const [attempts, setAttempts]  = useState(0)
  const [cooldown, setCooldown]  = useState(0)

  useEffect(() => {
    if (cooldown <= 0) return
    const t = setInterval(() => setCooldown(c => { if (c <= 1) { clearInterval(t); return 0 } return c - 1 }), 1000)
    return () => clearInterval(t)
  }, [cooldown])

  const handleEmailChange = (val) => {
    setEmail(val)
    setError('')
    setEmailErr(val.includes('@') && !isValidEmail(val))
  }

  const withGoogle = async () => {
    setLoading(true); setError('')
    const { error } = await supabase.auth.signInWithOAuth({ provider:'google', options:{ redirectTo:`${location.origin}/auth/callback` } })
    if (error) { setError(error.message); setLoading(false) }
  }

  const withPassword = async (e) => {
    e.preventDefault()
    if (cooldown > 0) return
    if (!email || !pw) return setError('Completa todos los campos')
    if (!isValidEmail(email)) { setEmailErr(true); return setError('Ingresa un email válido') }
    setLoading(true); setError('')
    const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password: pw })
    if (error) {
      const next = attempts + 1
      setAttempts(next)
      if (next >= MAX_ATTEMPTS) {
        setCooldown(COOLDOWN_SECS)
        setAttempts(0)
        setError(`Demasiados intentos fallidos. Espera ${COOLDOWN_SECS} segundos.`)
      } else {
        setError(
          error.message.includes('Invalid')
            ? `Email o contraseña incorrectos (${next}/${MAX_ATTEMPTS} intentos)`
            : error.message
        )
      }
    } else {
      setAttempts(0)
    }
    setLoading(false)
  }

  const withMagic = async (e) => {
    e.preventDefault()
    if (!email) return setError('Ingresa tu email')
    if (!isValidEmail(email)) { setEmailErr(true); return setError('Ingresa un email válido') }
    setLoading(true); setError('')
    const { error } = await supabase.auth.signInWithOtp({ email: email.trim(), options:{ emailRedirectTo:`${location.origin}/auth/callback` } })
    if (error) { setError(error.message); setLoading(false); return }
    setMagicOk(true); setLoading(false)
  }

  const withReset = async (e) => {
    e.preventDefault()
    if (!email) return setError('Ingresa tu email')
    if (!isValidEmail(email)) { setEmailErr(true); return setError('Ingresa un email válido') }
    setLoading(true); setError('')
    const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), { redirectTo:`${location.origin}/auth/callback` })
    if (error) { setError(error.message); setLoading(false); return }
    setResetOk(true); setLoading(false)
  }

  return (
    <div className="m-overlay">
      <div className="m-box">
        <div className="m-head">
          <div><div className="m-title">Iniciar sesión</div><div className="m-sub2">Bienvenido de vuelta</div></div>
          <button className="m-close" onClick={onClose}>✕</button>
        </div>
        <div className="m-body">
          <button className="m-google" onClick={withGoogle} disabled={loading||cooldown>0}><GoogleIcon /> Continuar con Google</button>
          <div className="m-div">o</div>
          <div className="m-tabs">
            {[['password','Contraseña'],['magic','Magic Link']].map(([k,l])=>(
              <button key={k} className="m-tab"
                onClick={()=>{setTab(k);setError('');setEmailErr(false);setMagicOk(false);setResetMode(false);setResetOk(false)}}
                style={{borderBottom:`2px solid ${tab===k?'#00e5ff':'transparent'}`,color:tab===k?'#00e5ff':'#4a7a96'}}>
                {l}
              </button>
            ))}
          </div>

          {cooldown > 0 && (
            <div className="m-cooldown">
              🔒 Espera <strong>{cooldown}s</strong> para volver a intentarlo
            </div>
          )}

          {tab==='password' && !resetMode && !resetOk && (
            <form onSubmit={withPassword} style={{display:'flex',flexDirection:'column',gap:14}}>
              <div>
                <label className="m-lbl">Email</label>
                <EmailInput value={email} onChange={handleEmailChange} disabled={loading||cooldown>0} hasError={emailErr} />
                {emailErr && <div style={{fontSize:11,marginTop:4,color:'#ff6b88'}}>✗ Email no válido</div>}
              </div>
              <div><label className="m-lbl">Contraseña</label>
                <div className="m-pw">
                  <input className="m-inp" type={showPw?'text':'password'} placeholder="••••••••" value={pw}
                    onChange={e=>{setPw(e.target.value);setError('')}} disabled={loading||cooldown>0} />
                  <button type="button" className="m-eye" onClick={()=>setShowPw(v=>!v)}><EyeIcon open={showPw}/></button>
                </div>
              </div>
              <div className="m-forgot-row">
                <button type="button" className="m-fgbtn" onClick={()=>{setResetMode(true);setError('');setEmailErr(false)}}>¿Olvidaste tu contraseña?</button>
              </div>
              {error&&!cooldown&&<div className="m-err">⚠ {error}</div>}
              <button className="m-submit" type="submit" disabled={loading||cooldown>0}>
                {loading?'Entrando...':cooldown>0?`Espera ${cooldown}s...`:'Iniciar sesión'}
              </button>
            </form>
          )}

          {tab==='password' && resetMode && !resetOk && (
            <form onSubmit={withReset} style={{display:'flex',flexDirection:'column',gap:14}}>
              <div style={{padding:'12px',background:'#0a1520',border:'1px solid #1a3a5e',fontSize:13,color:'#4a7a96',lineHeight:1.6}}>
                Te enviaremos un enlace para restablecer tu contraseña.
              </div>
              <div>
                <label className="m-lbl">Email</label>
                <EmailInput value={email} onChange={handleEmailChange} disabled={loading} hasError={emailErr} />
                {emailErr && <div style={{fontSize:11,marginTop:4,color:'#ff6b88'}}>✗ Email no válido</div>}
              </div>
              {error&&<div className="m-err">⚠ {error}</div>}
              <button className="m-submit" type="submit" disabled={loading}>{loading?'Enviando...':'✉ Enviar enlace'}</button>
              <button type="button" className="m-back" onClick={()=>{setResetMode(false);setError('');setEmailErr(false)}}>← Volver</button>
            </form>
          )}
          {resetOk&&<div className="m-ok">✉ Enlace enviado a<br/><strong style={{color:'#00ff88'}}>{email}</strong></div>}

          {tab==='magic' && !magicOk && (
            <form onSubmit={withMagic} style={{display:'flex',flexDirection:'column',gap:14}}>
              <div>
                <label className="m-lbl">Email</label>
                <EmailInput value={email} onChange={handleEmailChange} disabled={loading} hasError={emailErr} />
                {emailErr && <div style={{fontSize:11,marginTop:4,color:'#ff6b88'}}>✗ Email no válido</div>}
              </div>
              {error&&<div className="m-err">⚠ {error}</div>}
              <button className="m-submit" type="submit" disabled={loading}>{loading?'Enviando...':'✉ Enviar Magic Link'}</button>
            </form>
          )}
          {magicOk&&<div className="m-ok">✉ Link enviado a<br/><strong style={{color:'#00ff88'}}>{email}</strong></div>}

          <div className="m-switch">¿No tienes cuenta? <button className="m-swbtn" onClick={onSwitch}>Regístrate gratis</button></div>
        </div>
      </div>
    </div>
  )
}

// ── SignupModal ───────────────────────────────────────────────────────
function SignupModal({ onClose, onSwitch }) {
  const [name, setName]     = useState('')
  const [nameErr, setNameErr] = useState('')
  const [email, setEmail]   = useState('')
  const [emailErr, setEmailErr] = useState(false)
  const [pw, setPw]         = useState('')
  const [cf, setCf]         = useState('')
  const [showPw, setShowPw] = useState(false)
  const [showCf, setShowCf] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError]   = useState('')
  const [done, setDone]     = useState(false)
  const { score } = checkPassword(pw)
  const match = pw === cf && cf.length > 0

  const handleNameChange = (val) => {
    setName(val)
    setError('')
    if (val.length > 0 && val.trim().length < 2)
      setNameErr('Ingresa al menos 2 caracteres')
    else if (val.length > 0 && /[^a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s'-]/.test(val))
      setNameErr('Solo letras y espacios')
    else
      setNameErr('')
  }

  const handleEmailChange = (val) => {
    setEmail(val)
    setError('')
    setEmailErr(val.includes('@') && !isValidEmail(val))
  }

  const withGoogle = async () => {
    setLoading(true); setError('')
    const { error } = await supabase.auth.signInWithOAuth({ provider:'google', options:{ redirectTo:`${location.origin}/auth/callback` } })
    if (error) { setError(error.message); setLoading(false) }
  }

  const handleSignup = async (e) => {
    e.preventDefault()
    const trimmedName = name.trim()
    if (!trimmedName || trimmedName.length < 2) return setError('Ingresa tu nombre completo')
    if (nameErr) return setError(nameErr)
    if (!email) return setError('Ingresa tu email')
    if (!isValidEmail(email)) { setEmailErr(true); return setError('Ingresa un email válido') }
    if (score < 4) return setError('La contraseña no cumple los requisitos mínimos')
    if (!match) return setError('Las contraseñas no coinciden')
    setLoading(true); setError('')
    const { error } = await supabase.auth.signUp({
      email: email.trim(),
      password: pw,
      options: { data: { full_name: trimmedName }, emailRedirectTo: `${location.origin}/auth/callback` }
    })
    if (error) {
      setError(error.message.includes('already registered') ? 'Este email ya está registrado' : error.message)
      setLoading(false)
      return
    }
    setDone(true); setLoading(false)
  }

  const canSubmit = !loading && score >= 4 && match && !nameErr && !emailErr && name.trim().length >= 2 && isValidEmail(email)

  if (done) return (
    <div className="m-overlay">
      <div className="m-box">
        <div className="m-head"><div><div className="m-title">¡Cuenta creada!</div></div>
          <button className="m-close" onClick={onClose}>✕</button></div>
        <div className="m-body">
          <div className="m-ok" style={{padding:24}}>
            <div style={{fontSize:36,marginBottom:12}}>✉</div>
            <div style={{fontWeight:700,marginBottom:8}}>Confirma tu email</div>
            <div style={{fontSize:13,color:'#4a9a6a',lineHeight:1.7}}>
              Enviamos un enlace de confirmación a<br/>
              <strong style={{color:'#00ff88'}}>{email}</strong><br/>
              <span style={{color:'#2a5a72'}}>Revisa tu bandeja y haz click en el enlace.</span>
            </div>
          </div>
          <div className="m-switch">¿Ya confirmaste? <button className="m-swbtn" onClick={onSwitch}>Inicia sesión</button></div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="m-overlay">
      <div className="m-box">
        <div className="m-head">
          <div><div className="m-title">Crear cuenta</div><div className="m-sub2">Empieza gratis — sin tarjeta de crédito</div></div>
          <button className="m-close" onClick={onClose}>✕</button>
        </div>
        <div className="m-body">
          <button className="m-google" onClick={withGoogle} disabled={loading}><GoogleIcon /> Registrarse con Google</button>
          <div className="m-div">o con email</div>
          <form onSubmit={handleSignup} style={{display:'flex',flexDirection:'column',gap:14}}>

            {/* Nombre */}
            <div>
              <label className="m-lbl">Nombre completo</label>
              <input
                className={`m-inp${nameErr?' err':''}`}
                type="text"
                placeholder="Tu nombre"
                value={name}
                onChange={e=>handleNameChange(e.target.value)}
                disabled={loading}
                autoComplete="name"
                maxLength={60}
              />
              {nameErr && <div style={{fontSize:11,marginTop:4,color:'#ff6b88'}}>✗ {nameErr}</div>}
            </div>

            {/* Email */}
            <div>
              <label className="m-lbl">Email</label>
              <EmailInput value={email} onChange={handleEmailChange} disabled={loading} hasError={emailErr} />
              {emailErr && <div style={{fontSize:11,marginTop:4,color:'#ff6b88'}}>✗ Email no válido</div>}
            </div>

            {/* Contraseña */}
            <div>
              <label className="m-lbl">Contraseña</label>
              <div className="m-pw">
                <input
                  className={`m-inp${pw&&score<4?' err':''}`}
                  type={showPw?'text':'password'}
                  placeholder="Mín. 8 chars, mayúscula, número, símbolo"
                  value={pw}
                  onChange={e=>{setPw(e.target.value);setError('')}}
                  disabled={loading}
                  autoComplete="new-password"
                />
                <button type="button" className="m-eye" onClick={()=>setShowPw(v=>!v)}><EyeIcon open={showPw}/></button>
              </div>
              <StrengthMeter password={pw} />
            </div>

            {/* Confirmar contraseña */}
            <div>
              <label className="m-lbl">Confirmar contraseña</label>
              <div className="m-pw">
                <input
                  className={`m-inp${cf&&!match?' err':''}`}
                  type={showCf?'text':'password'}
                  placeholder="Repite tu contraseña"
                  value={cf}
                  onChange={e=>{setCf(e.target.value);setError('')}}
                  disabled={loading}
                  autoComplete="new-password"
                />
                <button type="button" className="m-eye" onClick={()=>setShowCf(v=>!v)}><EyeIcon open={showCf}/></button>
              </div>
              {cf && <div style={{fontSize:11,marginTop:4,color:match?'#00ff88':'#ff4f6e'}}>{match?'✓ Coinciden':'✗ No coinciden'}</div>}
            </div>

            {error && <div className="m-err">⚠ {error}</div>}

            <button className="m-submit" type="submit" disabled={!canSubmit}>
              {loading ? 'Creando cuenta...' : 'Crear cuenta gratis'}
            </button>
            <div style={{fontSize:11,color:'#2a5a72',textAlign:'center',lineHeight:1.6}}>
              Al registrarte aceptas nuestros <a href="#" style={{color:'#4a7a96'}}>Términos</a> y <a href="#" style={{color:'#4a7a96'}}>Privacidad</a>
            </div>
          </form>
          <div className="m-switch">¿Ya tienes cuenta? <button className="m-swbtn" onClick={onSwitch}>Inicia sesión</button></div>
        </div>
      </div>
    </div>
  )
}

// ── page ──────────────────────────────────────────────────────────────
const FEATS = [
  'Múltiples pools de Uniswap en un solo dashboard',
  'Seguimiento en tiempo real del precio y estado del rango',
  'Seteo de posición en SHORT apalancada vía API en los 5 mejores exchanges del mundo',
  'Detecta al instante cuando tu pool sale de rango y te notifica via WhatsApp o E-mail',
]

const EXCHANGES = ['Binance','Bybit','OKX','Bitget','KuCoin']

export default function Login() {
  const [modal, setModal] = useState(null)
  return (
    <>
      <style>{CSS}</style>
      <div className="lp-root">
        <div className="lp-nav-wrap">
          <nav className="lp-nav">
            <div className="lp-brand">
              <div className="lp-icon">
                <img src={cryptoHouseLogo} alt="The Crypto House" style={{ width:'22px', height:'22px', objectFit:'contain', display:'block' }} />
              </div>
              <div className="lp-name">The Crypto House</div>
            </div>
            <div className="lp-sep" />
            <button className="btn-ghost" onClick={()=>setModal('login')}>Iniciar sesión</button>
            <button className="btn-cyan" onClick={()=>setModal('signup')}>Registrarse →</button>
          </nav>
        </div>
        <div className="lp-hero">
          <div className="lp-hero-inner">
            <div className="lp-badge">
              <div className="lp-badge-dot" />
              Liquidity Engine · Beta
            </div>
            <h1 className="lp-title">Tu liquidez DeFi,<br/>bajo control<br/><span>en todo momento.</span></h1>
            <p className="lp-desc">Gestiona tus pools de Uniswap, monitorea precios en tiempo real y activa coberturas SHORT automáticas para proteger tu capital.</p>
            <div className="lp-feats">{FEATS.map((f,i)=><div key={i} className="lp-feat"><div className="lp-dot"/>{f}</div>)}</div>
            <div className="lp-ex-label">Compatible con</div>
            <div className="lp-exchanges">{EXCHANGES.map((ex,i)=><span key={i} className="lp-ex">{ex}</span>)}</div>
            <div className="lp-cta">
              <button className="lp-cta-primary" onClick={()=>setModal('signup')}>
                Acceder al Liquidity Engine →
              </button>
              <button className="lp-cta-secondary" onClick={()=>setModal('login')}>
                ¿Ya tienes cuenta? <span>Iniciar sesión</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      {modal==='login'  && <LoginModal  onClose={()=>setModal(null)} onSwitch={()=>setModal('signup')} />}
      {modal==='signup' && <SignupModal onClose={()=>setModal(null)} onSwitch={()=>setModal('login')}  />}
    </>
  )
}
