// src/pages/Login.jsx
import { useState, useEffect, useRef } from 'react'
import { supabase } from '../lib/supabase'
import cryptoHouseLogo from '../assets/cryptohouselogo.png'
import Turnstile from '../components/Turnstile'
import './Login.css'

const _PROXY = import.meta.env.VITE_REVERT_PROXY_URL ?? ''

async function verifyTurnstile(token) {
  try {
    const res = await fetch(`${_PROXY}/turnstile-verify`, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ token }),
    })
    const data = await res.json()
    return data.success === true
  } catch {
    return false
  }
}

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
  const [tsToken, setTsToken]    = useState(null)
  const tsRef                    = useRef(null)

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

  const resetTs = () => { setTsToken(null); tsRef.current?.reset() }

  const withPassword = async (e) => {
    e.preventDefault()
    if (cooldown > 0) return
    if (!email || !pw) return setError('Completa todos los campos')
    if (!isValidEmail(email)) { setEmailErr(true); return setError('Ingresa un email válido') }
    if (!tsToken) return setError('Completa la verificación de seguridad')
    setLoading(true); setError('')
    const ok = await verifyTurnstile(tsToken)
    if (!ok) { resetTs(); setLoading(false); return setError('Verificación fallida. Intenta de nuevo.') }
    const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password: pw })
    resetTs()
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
    if (!tsToken) return setError('Completa la verificación de seguridad')
    setLoading(true); setError('')
    const ok = await verifyTurnstile(tsToken)
    if (!ok) { resetTs(); setLoading(false); return setError('Verificación fallida. Intenta de nuevo.') }
    const { error } = await supabase.auth.signInWithOtp({ email: email.trim(), options:{ emailRedirectTo:`${location.origin}/auth/callback` } })
    resetTs()
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
              <Turnstile ref={tsRef} onVerify={setTsToken} onExpire={()=>setTsToken(null)} />
              {error&&!cooldown&&<div className="m-err">⚠ {error}</div>}
              <button className="m-submit" type="submit" disabled={loading||cooldown>0||!tsToken}>
                {loading?'Verificando...':cooldown>0?`Espera ${cooldown}s...`:'Iniciar sesión'}
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
              <Turnstile ref={tsRef} onVerify={setTsToken} onExpire={()=>setTsToken(null)} />
              {error&&<div className="m-err">⚠ {error}</div>}
              <button className="m-submit" type="submit" disabled={loading||!tsToken}>{loading?'Verificando...':'✉ Enviar Magic Link'}</button>
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
  const [tsToken, setTsToken] = useState(null)
  const tsRef                 = useRef(null)
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
    if (!tsToken) return setError('Completa la verificación de seguridad')
    setLoading(true); setError('')
    const ok = await verifyTurnstile(tsToken)
    if (!ok) {
      setTsToken(null); tsRef.current?.reset()
      setLoading(false)
      return setError('Verificación fallida. Intenta de nuevo.')
    }
    const { error } = await supabase.auth.signUp({
      email: email.trim(),
      password: pw,
      options: { data: { full_name: trimmedName }, emailRedirectTo: `${location.origin}/auth/callback` }
    })
    setTsToken(null); tsRef.current?.reset()
    if (error) {
      setError(error.message.includes('already registered') ? 'Este email ya está registrado' : error.message)
      setLoading(false)
      return
    }
    setDone(true); setLoading(false)
  }

  const canSubmit = !loading && score >= 4 && match && !nameErr && !emailErr && name.trim().length >= 2 && isValidEmail(email) && !!tsToken

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

            <Turnstile ref={tsRef} onVerify={setTsToken} onExpire={()=>setTsToken(null)} />
            {error && <div className="m-err">⚠ {error}</div>}

            <button className="m-submit" type="submit" disabled={!canSubmit}>
              {loading ? 'Verificando...' : 'Crear cuenta gratis'}
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
      <div className="lp-root">
        <div className="lp-nav-wrap">
          <nav className="lp-nav">
            <div className="lp-brand">
              <div className="lp-icon">
                <img src={cryptoHouseLogo} alt="The Crypto House" style={{ width:'22px', height:'22px', objectFit:'contain', display:'block' }} />
              </div>
              <div className="lp-name">The Crypto House</div>
            </div>
            <a className="lp-home-btn" href="/">Página principal</a>
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
                Acceder al Liquidity Engine 🤖
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
