// src/pages/Home.jsx
import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import oscarImg from '../assets/IMG_7704(1).jpg'
import cryptoHouseLogo from '../assets/cryptohouselogo.png'
import CryptoPriceBar from '../components/CryptoPriceBar'
import Turnstile from '../components/Turnstile'
import ThemeToggle from '../components/ThemeToggle'
import '../styles/marketing.css'
import './Home.css'

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

const FAQS = [
  {
    q: '¿Necesito experiencia previa en trading para unirme?',
    a: 'No. Nuestros programas están diseñados desde cero. Comenzamos con los fundamentos y avanzamos progresivamente hasta estrategias profesionales. Lo único que necesitas es disciplina y ganas de aprender.',
  },
  {
    q: '¿Qué incluye el Bootcamp Crypto?',
    a: 'Incluye acceso completo a la plataforma, sesiones en vivo semanales, grabaciones de todas las clases, herramientas de análisis y acompañamiento personalizado de Oscar por 90 días.',
  },
  {
    q: '¿Cómo accedo después de inscribirme?',
    a: 'Tan pronto confirmes tu pago te enviamos las credenciales de acceso por WhatsApp en menos de 2 horas. Puedes comenzar inmediatamente desde cualquier dispositivo.',
  },
  {
    q: '¿Cuánto dinero necesito para empezar a invertir?',
    a: 'Puedes comenzar desde $50 USD de manera progresiva. Lo importante es entender el mercado antes de invertir capital real. En el programa usamos cuentas de práctica hasta que tengas el conocimiento necesario.',
  },
  {
    q: '¿Qué métodos de pago aceptan?',
    a: 'Aceptamos tarjeta débito/crédito, PSE (transferencia bancaria Colombia), PayPal, Nequi, Daviplata y criptomonedas. Escríbenos por WhatsApp y te guiamos paso a paso.',
  },
  {
    q: '¿Qué pasa si el programa no es lo que esperaba?',
    a: 'Nuestro enfoque no está diseñado para "gustar", sino para generar resultados reales. Es una formación estructurada, práctica y exigente, pensada para personas comprometidas con su crecimiento financiero. Si aplicas la metodología y participas activamente, vas a obtener valor. Esto no es contenido superficial ni promesas vacías: es un proceso serio de aprendizaje y ejecución. Por eso, más que una garantía, ofrecemos acompañamiento cercano, claridad en cada paso y una metodología probada.',
  },
]

const SERVICES = [
  {
    icon: '₿',
    badge: 'Más popular',
    name: 'Bootcamp Crypto',
    sub: 'Inversión y Trading de Criptomonedas',
    desc: 'Aprende a navegar el mercado cripto con estructura y disciplina, dominando análisis técnico, gestión de riesgo, DeFi y estrategias avanzadas para resultados consistentes. Todo depende de ti.',
    list: ['Análisis técnico cripto', 'DeFi & Liquidity Mining', 'Gestión de riesgo', 'Herramientas profesionales', 'Mentoría directa con Oscar'],
  },
  // PRÓXIMAMENTE — Express Trading (tarjeta comentada)
  /* {
    icon: '📊',
    badge: 'Nuevo',
    name: 'Express Trading',
    sub: 'Trading de Futuros',
    desc: 'Domina el trading de contratos de futuros en Forex. Estrategias de breakout, gestión de posiciones y psicología.',
    list: ['Futuros Forex', 'Estrategias de breakout', 'Gestión de capital', 'Mentoría directa con Oscar'],
  }, */
  {
    icon: '🏛',
    badge: 'Beta',
    name: 'Liquidity Engine',
    sub: 'Gestión de Pools DeFi',
    desc: 'Nuestra plataforma exclusiva para gestionar tus pools de liquidez en Uniswap. Monitoreo en tiempo real, Configuración de cobertura de riesgo en los 5 mejores exchanges de criptomonedas del mundo.',
    list: ['Múltiples pools en un solo lugar', 'Seguimiento en tiempo real', 'SHORT de protección apalancado vía API en futuros', 'Acceso exclusivo para estudiantes'],
    exchanges: [
      { name: 'Binance', color: '#F0B90B', bg: 'rgba(240,185,11,0.1)', border: 'rgba(240,185,11,0.3)' },
      { name: 'Bybit', color: '#F7A600', bg: 'rgba(247,166,0,0.1)', border: 'rgba(247,166,0,0.3)' },
      { name: 'OKX', color: '#a0a0a0', bg: 'rgba(160,160,160,0.10)', border: 'rgba(160,160,160,0.30)' },
      { name: 'Bitget', color: '#00F0FF', bg: 'rgba(0,240,255,0.08)', border: 'rgba(0,240,255,0.25)' },
      { name: 'KuCoin', color: '#23AF91', bg: 'rgba(35,175,145,0.1)', border: 'rgba(35,175,145,0.3)' },
    ],
  },
]

const TESTIMONIALS = [
  {
    quote: 'Llevaba meses buscando alguien que realmente enseñara cripto de manera práctica. Con Oscar aprendí en 3 meses lo que no encontré en años de cursos online. La inversión valió completamente la pena.',
    name: 'María C.',
    role: 'Estudiante · Bogotá',
    initials: 'MC',
  },
  {
    quote: 'El Bootcamp Crypto me cambió la perspectiva. No solo aprendes estrategias sino que entiendes el mercado de verdad. Hoy manejo mis inversiones con confianza y resultados reales.',
    name: 'Juan P.',
    role: 'Ingeniero · Medellín',
    initials: 'JP',
  },
  {
    quote: 'Lo que más valoro es el acompañamiento personalizado. Oscar siempre está disponible para resolver dudas. En 90 días pasé de no saber nada a tener un portafolio activo y rentable.',
    name: 'Andrés R.',
    role: 'Emprendedor · Cali',
    initials: 'AR',
  },
]

const WHY = [
  { num: '01', title: 'Resultados medibles, no promesas', desc: 'Metodología práctica diseñada para que en aproximadamente 90 días adquieras el conocimiento y las herramientas necesarias para operar con confianza y criterio profesional. Todo depende de ti.' },
  { num: '02', title: 'Acceso directo, sin intermediarios', desc: 'Mentoría personalizada con acompañamiento real, soporte cercano y respuestas rápidas para acelerar tu evolución como trader.' },
  { num: '03', title: 'Ventaja tecnológica exclusiva', desc: 'Utiliza Liquidity Engine, nuestra tecnología propia para generar ingresos pasivos utilizando proveendo liquidez a un mercado descentralizado. Allí también puedes automatizar coberturas y proteger tu capital. (Finanzas descentralizadas)' },
]

function InfoModal({ program, onClose }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [done, setDone] = useState(false)
  const [errs, setErrs] = useState({})
  const [tsToken, setTsToken] = useState(null)
  const [tsError, setTsError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const tsRef = useRef(null)

  const validate = () => {
    const e = {}
    if (!name.trim()) e.name = true
    if (!phone.trim()) e.phone = true
    return e
  }

  const handleSubmit = async (ev) => {
    ev.preventDefault()
    const e = validate()
    if (Object.keys(e).length) { setErrs(e); return }
    if (!tsToken) { setTsError('Completa la verificación de seguridad'); return }
    setTsError(''); setSubmitting(true)
    const ok = await verifyTurnstile(tsToken)
    setTsToken(null); tsRef.current?.reset()
    setSubmitting(false)
    if (!ok) { setTsError('Verificación fallida. Intenta de nuevo.'); return }
    const msg = encodeURIComponent(
      `Hola Oscar! Me interesa el programa *${program.name}*.\n\n` +
      `Nombre: ${name.trim()}\n` +
      (email.trim() ? `Email: ${email.trim()}\n` : '') +
      `WhatsApp: ${phone.trim()}\n\n` +
      `¿Podrías darme más información?`
    )
    window.open(`https://wa.me/573215646716?text=${msg}`, '_blank')
    setDone(true)
  }

  return (
    <div className="info-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="info-box">
        {done ? (
          <div className="info-ok">
            <div className="info-ok-icon">🚀</div>
            <div className="info-ok-title">¡Te redirigimos a WhatsApp!</div>
            <div className="info-ok-sub">
              Oscar responde en menos de 2 horas.<br />
              Si no se abrió automáticamente,<br />
              escríbenos al <strong style={{ color: '#00e5ff' }}>+57 321 564 6716</strong>
            </div>
            <button className="info-submit" style={{ marginTop: 24, width: 'auto', padding: '12px 32px' }} onClick={onClose}>
              Cerrar
            </button>
          </div>
        ) : (
          <>
            <div className="info-top">
              <button className="info-close" onClick={onClose}>✕</button>
              <div className="info-tag">The Crypto House</div>
              <div className="info-title">Déjanos tus datos</div>
              <div className="info-sub">Te contactamos en menos de 2 horas</div>
              <div className="info-program-pill">
                <span>{program.icon}</span>
                <span>{program.name}</span>
              </div>
            </div>
            <form className="info-body" onSubmit={handleSubmit}>
              <div>
                <label className="info-lbl">Nombre completo *</label>
                <input
                  className={`info-inp${errs.name ? ' err' : ''}`}
                  placeholder="Tu nombre"
                  value={name}
                  onChange={e => { setName(e.target.value); setErrs(v => ({ ...v, name: false })) }}
                  autoFocus
                />
              </div>
              <div>
                <label className="info-lbl">Email</label>
                <input
                  className="info-inp"
                  type="email"
                  placeholder="tu@email.com (opcional)"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label className="info-lbl">WhatsApp / Teléfono *</label>
                <input
                  className={`info-inp${errs.phone ? ' err' : ''}`}
                  placeholder="+57 300 000 0000"
                  value={phone}
                  onChange={e => { setPhone(e.target.value); setErrs(v => ({ ...v, phone: false })) }}
                />
              </div>
              <Turnstile ref={tsRef} onVerify={setTsToken} onExpire={() => setTsToken(null)} />
              {tsError && <div style={{ fontSize: 12, color: '#ff6b88', marginTop: -6 }}>⚠ {tsError}</div>}
              <button className="info-submit" type="submit" disabled={submitting || !tsToken}
                style={{ opacity: submitting || !tsToken ? 0.5 : 1 }}>
                {submitting ? 'Verificando...' : 'Quiero información →'}
              </button>
              <div className="info-note">
                Al enviar, se abrirá WhatsApp con tus datos.<br />
                No spam. Solo te contactamos para ayudarte.
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  )
}

function AccessModal({ onClose }) {
  return (
    <div className="info-overlay" onClick={e => e.stopPropagation()}>
      <div className="acc-modal">
        <button className="info-close" onClick={onClose}>✕</button>
        <div className="acc-modal-head">
          <div className="info-tag">The Crypto House</div>
          <div className="acc-modal-title">Acceso Miembros</div>
          <div className="acc-modal-sub">Selecciona tu plataforma para continuar</div>
        </div>
        <div className="acc-modal-cards">
          <a className="acc-card" href="/bootcamp">
            <div className="acc-card-icon">🎓</div>
            <div className="acc-card-name">Crypto Bootcamp</div>
            <div className="acc-card-desc">Accede al programa formativo: clases, sesiones en vivo y comunidad privada.</div>
            <div className="acc-card-cta">Entrar al Bootcamp →</div>
          </a>
          <a className="acc-card" href="/app">
            <div className="acc-card-icon">🤖</div>
            <div className="acc-card-name">Liquidity Engine</div>
            <div className="acc-card-desc">Gestiona tus pools de Uniswap, monitorea precios y activa coberturas SHORT.</div>
            <div className="acc-card-cta">Entrar al Engine →</div>
          </a>
        </div>
      </div>
    </div>
  )
}

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="faq-item">
      <button className="faq-q" onClick={() => setOpen(o => !o)}>
        {q}
        <span className={`faq-icon ${open ? 'open' : ''}`}>+</span>
      </button>
      {open && <div className="faq-a">{a}</div>}
    </div>
  )
}

export default function Home() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ name: '', email: '', msg: '' })
  const [sent, setSent] = useState(false)
  const [infoProgram, setInfoProgram] = useState(null)
  const [ctsTsToken, setCtsTsToken] = useState(null)
  const [ctsTsError, setCtsTsError] = useState('')
  const [ctsSending, setCtsSending] = useState(false)
  const ctsTsRef = useRef(null)
  const [dropOpen, setDropOpen] = useState(false)
  const dropTimer = useRef(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [accessOpen, setAccessOpen] = useState(false)
  const openDrop  = () => { clearTimeout(dropTimer.current); setDropOpen(true) }
  const closeDrop = () => { dropTimer.current = setTimeout(() => setDropOpen(false), 220) }

  const handleContact = async (e) => {
    e.preventDefault()
    if (!formData.name || !formData.msg) return
    if (!ctsTsToken) { setCtsTsError('Completa la verificación de seguridad'); return }
    setCtsTsError(''); setCtsSending(true)
    const ok = await verifyTurnstile(ctsTsToken)
    setCtsTsToken(null); ctsTsRef.current?.reset()
    if (!ok) { setCtsSending(false); setCtsTsError('Verificación fallida. Intenta de nuevo.'); return }
    const { error } = await supabase.from('leads').insert({
      name:    formData.name.trim(),
      email:   formData.email.trim() || null,
      message: formData.msg.trim(),
      source:  'home_form',
      status:  'nuevo',
    })
    setCtsSending(false)
    if (error) { setCtsTsError('Error al enviar. Intenta de nuevo.'); return }
    setSent(true)
  }

  const HEADER_H = 96 // price bar 32 + nav pill ~56 + gap

  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (!el) return
    const top = el.getBoundingClientRect().top + window.pageYOffset - HEADER_H
    window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' })
  }

  const goTo = (e, id) => { e.preventDefault(); scrollTo(id) }
  const scrollTop = (e) => { e?.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }

  // Handle pending scroll from sub-pages (e.g. when navigating back from Programas/LE)
  useEffect(() => {
    const target = sessionStorage.getItem('pendingScroll')
    if (target) {
      sessionStorage.removeItem('pendingScroll')
      setTimeout(() => scrollTo(target), 150)
    }
  }, [])

  const TICKER_ITEMS = ['Bootcamp Crypto', '·', 'Trading de Futuros', '·', 'DeFi y pools de liquidez', '·', 'Uniswap', '·', 'Formación Profesional', '·']

  return (
    <>
      {/* ── CRYPTO PRICE BAR (fixed top: 0) — shared component ── */}
      <CryptoPriceBar />

      {/* ── NAVBAR pill flotante ── */}
      <div className="nav-wrap">
        <nav className="nav">
          <a href="#" className="nav-brand" onClick={scrollTop}>
            <img src={cryptoHouseLogo} alt="The Crypto House" style={{ height: 30, width: 'auto', objectFit: 'contain' }} />
            <div className="nav-name">The Crypto House</div>
          </a>
          <div className="nav-links">
            <a className="nav-link" onClick={scrollTop} href="#">Inicio</a>
            <a className="nav-link" onClick={e => goTo(e, 'sobre')} href="#">Instructor</a>
            <div className="nav-dropdown" onMouseEnter={openDrop} onMouseLeave={closeDrop}>
              <button
                className={`nav-dropdown-btn${dropOpen ? ' open' : ''}`}
                onClick={() => { navigate('/programas') }}
              >
                Formación ▾
              </button>
              {dropOpen && (
                <div className="nav-dropdown-menu">
                  <button className="nav-dropdown-item" onClick={() => { navigate('/programas') }}>
                    <span>₿</span> Bootcamp Crypto
                  </button>
                  {/* PRÓXIMAMENTE — Express Trading
                  <div className="nav-dropdown-sep" />
                  <button className="nav-dropdown-item" onClick={() => { navigate('/programas') }}>
                    <span>📊</span> Express Trading
                  </button> */}
                </div>
              )}
            </div>
            <a className="nav-link" onClick={e => { e.preventDefault(); navigate('/liquidity-engine') }} href="#">Liquidity Engine</a>
            <a className="nav-link" onClick={e => goTo(e, 'faq')} href="#">FAQ</a>
            <a className="nav-link" onClick={e => goTo(e, 'contacto')} href="#">Contacto</a>
          </div>
          <div className="nav-sep" />
          <ThemeToggle />
          <button
            className="nav-hamburger"
            onClick={e => { e.stopPropagation(); setMobileMenuOpen(o => !o) }}
            aria-label="Menú"
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
          <button className="nav-app" onClick={() => setAccessOpen(true)}>Acceso Miembros</button>
        </nav>
        {mobileMenuOpen && (
          <div className="nav-mobile-menu" onClick={e => e.stopPropagation()}>
            <a className="nav-mobile-link" href="#" onClick={() => { scrollTop(); setMobileMenuOpen(false) }}>Inicio</a>
            <a className="nav-mobile-link" href="#" onClick={e => { goTo(e, 'sobre'); setMobileMenuOpen(false) }}>Instructor</a>
            <button className="nav-mobile-link" onClick={() => { navigate('/programas'); setMobileMenuOpen(false) }}>Formación</button>
            <button className="nav-mobile-link" onClick={() => { navigate('/liquidity-engine'); setMobileMenuOpen(false) }}>Liquidity Engine</button>
            <a className="nav-mobile-link" href="#" onClick={e => { goTo(e, 'faq'); setMobileMenuOpen(false) }}>FAQ</a>
            <a className="nav-mobile-link" href="#" onClick={e => { goTo(e, 'contacto'); setMobileMenuOpen(false) }}>Contacto</a>
            <div className="nav-mobile-sep" />
            <ThemeToggle mobile />
            <div className="nav-mobile-sep" />
            <button className="nav-mobile-app" onClick={() => { setMobileMenuOpen(false); setAccessOpen(true) }}>Acceso Miembros</button>
          </div>
        )}
      </div>
      {mobileMenuOpen && <div className="nav-mobile-backdrop" onClick={() => setMobileMenuOpen(false)} />}

      {/* TICKER — debajo del nav pill */}
      <div className="ticker ticker-top">
        <div className="ticker-track">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span key={i} className="ticker-item">{item}</span>
          ))}
        </div>
      </div>

      {/* HERO */}
      <section className="hero" id="inicio" style={{ marginTop: 0 }}>
        <div className="hero-grid" />
        <div className="hero-content">
          <div className="hero-badge">
            <div className="hero-badge-dot" />
            DEJA DE IMPROVISAR, EMPIEZA A OPERAR
          </div>
          <h1 className="hero-title">
            Domina <span>Crypto</span>, Futuros<br />
            y <span className="defi-tip">DeFi<span className="defi-tip-label">Finanzas Descentralizadas</span></span> con una estrategia profesional.
          </h1>
          <p className="hero-sub">
            Aprende a operar con disciplina, gestión de riesgo y una metodología diseñada para resultados consistentes.
            <br />

          </p>
          <div className="hero-btns">
            <a className="btn-glare" onClick={e => goTo(e, 'cursos')} href="#">
              <span className="btn-glare-shine" />
              Acceder al bootcamp →
            </a>
          </div>
          <div className="hero-stats">
            <div>
              <div className="hero-stat-val"><span>3</span></div>
              <div className="hero-stat-lab">Programas disponibles</div>
            </div>
            <div>
              <div className="hero-stat-val">90</div>
              <div className="hero-stat-lab">Días al resultado</div>
            </div>
            <div>
              <div className="hero-stat-val">1<span>·</span>1</div>
              <div className="hero-stat-lab">Mentoría personalizada</div>
            </div>
          </div>
        </div>
      </section>

      {/* SOBRE MÍ */}
      <section className="about" id="sobre">
        <div className="about-inner">
          <div className="about-img-wrap">
            <div className="about-img-box">
              <img src={oscarImg} alt="Oscar Bolaños" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 35%' }} />
            </div>
          </div>
          <div className="about-content">
            <div className="about-tag">Fundador · The Crypto House</div>
            <div className="about-name">Oscar Bolaños</div>
            <div className="about-role">Trader profesional & Mentor de inversiones</div>
            <p className="about-text">
              Mucho gusto soy Oscar Bolaños, operador activo de criptomonedas VIP en Bybit con experiencia en Prop Firms, brokers y estructuras de inversión enfocadas en finanzas descentralizadas, futuros y gestión de liquidez. Durante más de 4 años he trabajado en la ejecución, análisis y desarrollo de estrategias aplicadas a mercados reales, con enfoque en consistencia, control de riesgo y toma de decisiones basada en datos.
            </p>
            <p className="about-text">
              The Crypto House nace para redefinir cómo se aprende y se ejecuta en el mundo financiero. No es solo educación: es una plataforma diseñada para transformar conocimiento en resultados reales.

Aquí no te quedas en la teoría. Accedes a una metodología enfocada en acción, donde cada concepto se aplica directamente en el mercado, con acompañamiento estratégico y herramientas tecnológicas propias que marcan la diferencia. Entre ellas, el Liquidity Engine, desarrollado para optimizar y potenciar operaciones en entornos des y centralizados.
            </p>
            {/* <div className="about-highlights">
              {[                
                'Desarrollador del Liquidity Engine — herramienta de monitoreo y cobertura de capital DeFi propia. 🤖'
              ].map((h, i) => (
                <div key={i} className="about-hl">
                  <div className="about-hl-dot" />
                  {h}
                </div>
              ))}
            </div> */}
          </div>
        </div>
      </section>

      {/* TICKER 2 */}
      <div className="ticker">
        <div className="ticker-track" style={{ animationDirection: 'reverse' }}>
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span key={i} className="ticker-item">{item}</span>
          ))}
        </div>
      </div>

      {/* SERVICIOS */}
      <section className="services" id="cursos">
        <div className="services-inner">
          <div className="center">
            <div className="section-label">Nuestros Programas</div>
            <h2 className="section-title">La solución correcta<br /><span>para tu nivel</span></h2>
            <p className="section-desc">
              No importa si estás comenzando o ya tienes experiencia: aquí desarrollas una operativa profesional con procesos claros y resultados sostenibles.
            </p>
          </div>
          <div className="services-grid">
            {SERVICES.map((s, i) => (
              <div key={i} className={`service-card${i === 0 ? ' featured' : ''}`}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div className="service-icon">{s.icon}</div>
                  <div className="service-badge">{s.badge}</div>
                </div>
                <div>
                  <div className="service-name">{s.name}</div>
                  <div className="service-sub">{s.sub}</div>
                </div>
                <div className="service-desc">{s.desc}</div>
                <div className="service-divider" />
                <div className="service-list">
                  {s.list.map((li, j) => <div key={j} className="service-li">{li}</div>)}
                </div>
                {s.exchanges && (
                  <div>
                    <div className="exchange-row-label">Compatible con</div>
                    <div className="exchange-row">
                      {s.exchanges.map((ex, j) => (
                        <span key={j} className="exchange-badge" style={{ background: ex.bg, border: `1px solid ${ex.border}`, color: ex.color }}>
                          <span className="exchange-dot" style={{ background: ex.color }} />
                          {ex.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                <button className="service-btn" onClick={() => {
                  if (i === 2) navigate('/liquidity-engine')
                  else navigate('/programas')
                }}>
                  {i === 2 ? 'Explorar Liquidity Engine →' : 'Ver programa completo →'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="why">
        <div className="why-inner">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center', marginBottom: 60 }}>
            <div>
              <div className="section-label">Por qué elegirnos</div>
              <h2 className="section-title">No somos otro<br /><span>curso de internet.</span></h2>
            </div>
            <p className="section-desc" style={{ alignSelf: 'end' }}>
              Oscar trabaja directamente contigo — sin intermediarios, sin grupos masivos.
              Nuestro diferencial está en el acompañamiento 1 a 1, la tecnología propia
              y la metodología práctica que funciona desde el primer mes.
            </p>
          </div>
          <div className="why-grid">
            {WHY.map((w, i) => (
              <div key={i} className="why-card">
                <div className="why-num">{w.num}</div>
                <div className="why-line" />
                <div className="why-title">{w.title}</div>
                <div className="why-desc">{w.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BAND */}
      <div className="band">
        <div className="band-card">
          <div className="band-glare" />
          <h2 className="band-title">El momento de empezar<br />es <span>ahora.</span></h2>
          <p className="band-sub">Sé de los primeros en formarse directamente con Oscar.<br />Plazas limitadas para garantizar acompañamiento 1 a 1.</p>
          <a className="btn-glare" onClick={e => goTo(e, 'contacto')} href="#" style={{ fontSize: 15, padding: '15px 44px', position: 'relative', zIndex: 1 }}>
            <span className="btn-glare-shine" />
            Empezar ahora →
          </a>
        </div>
      </div>

      {/* TESTIMONIOS */}
      <section className="testimonials">
        <div className="testimonials-inner">
          <div className="center">
            <div className="section-label">Testimonios</div>
            <h2 className="section-title">Lo que dicen<br /><span>nuestros estudiantes</span></h2>
          </div>
          <div className="testimonials-grid">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="testi-card">
                <div className="testi-quote">{t.quote}</div>
                <div className="testi-author">
                  <div className="testi-avatar">{t.initials}</div>
                  <div>
                    <div className="testi-name">{t.name}</div>
                    <div className="testi-role">{t.role}</div>
                    <div className="testi-stars">★★★★★</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq" id="faq">
        <div className="faq-inner">
          <div className="center" style={{ marginBottom: 0 }}>
            <div className="section-label">FAQ</div>
            <h2 className="section-title">Preguntas<br /><span>frecuentes</span></h2>
          </div>
          <div className="faq-list">
            {FAQS.map((f, i) => <FAQItem key={i} q={f.q} a={f.a} />)}
          </div>
        </div>
      </section>

      {/* CONTACTO */}
      <section className="contact" id="contacto">
        <div className="contact-inner">
          <div>
            <div className="section-label">Contacto</div>
            <h2 className="section-title">Hablemos<br /><span>hoy mismo.</span></h2>
            <p className="section-desc" style={{ marginTop: 12 }}>
              ¿Tienes dudas sobre algún programa? Escríbenos directamente.
              Respondemos en menos de 2 horas.
            </p>
            <div className="contact-methods">
              <a className="contact-card" href="https://wa.me/573215646716" target="_blank" rel="noreferrer">
                <div className="contact-card-icon">💬</div>
                <div>
                  <div className="contact-card-label">WhatsApp</div>
                  <div className="contact-card-val">+57 321 564 6716 · Respuesta inmediata</div>
                </div>
                <div className="contact-arrow">→</div>
              </a>
              <a className="contact-card" href="mailto:profeoscarbol@gmail.com">
                <div className="contact-card-icon">✉</div>
                <div>
                  <div className="contact-card-label">Email</div>
                  <div className="contact-card-val">profeoscarbol@gmail.com</div>
                </div>
                <div className="contact-arrow">→</div>
              </a>
              <a className="contact-card" href="https://www.linkedin.com/in/oscandrebol/" target="_blank" rel="noreferrer">
                <div className="contact-card-icon">💼</div>
                <div>
                  <div className="contact-card-label">LinkedIn</div>
                  <div className="contact-card-val">Oscar Bolaños · Perfil profesional</div>
                </div>
                <div className="contact-arrow">→</div>
              </a>
            </div>
          </div>

          <div>
            <div style={{ fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 24 }}>
              Envíanos un mensaje
            </div>
            {sent ? (
              <div className="form-success">
                ✓ Mensaje enviado — nos pondremos en contacto pronto!
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleContact}>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Nombre *</label>
                    <input className="form-input" placeholder="Tu nombre"
                      value={formData.name} onChange={e => setFormData(p => ({ ...p, name: e.target.value }))} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email</label>
                    <input className="form-input" type="email" placeholder="tu@email.com"
                      value={formData.email} onChange={e => setFormData(p => ({ ...p, email: e.target.value }))} />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">¿En qué programa estás interesado? *</label>
                  <textarea className="form-textarea" rows={5}
                    placeholder="Cuéntame sobre tu experiencia actual y qué programa te interesa..."
                    value={formData.msg} onChange={e => setFormData(p => ({ ...p, msg: e.target.value }))} />
                </div>
                <Turnstile ref={ctsTsRef} onVerify={setCtsTsToken} onExpire={() => setCtsTsToken(null)} />
                {ctsTsError && <div style={{ fontSize: 12, color: '#ff6b88', marginTop: -8 }}>⚠ {ctsTsError}</div>}
                <button className="form-submit" type="submit" disabled={ctsSending || !ctsTsToken}
                  style={{ opacity: ctsSending || !ctsTsToken ? 0.55 : 1 }}>
                  {ctsSending ? 'Verificando...' : 'Enviar mensaje →'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-top">
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 4 }}>
                <img src={cryptoHouseLogo} alt="The Crypto House" style={{ height: 38, width: 'auto', objectFit: 'contain' }} />
                <div className="nav-name">The Crypto House</div>
              </div>
              <p className="footer-brand-desc">
                Formación profesional en criptomonedas, trading y DeFi para Colombia y Latam.
                Transformamos vidas a través de la educación financiera.
              </p>
              <div className="footer-socials">
                <a className="footer-social" href="https://wa.me/573215646716" target="_blank" rel="noreferrer">W</a>
                <a className="footer-social" href="mailto:profeoscarbol@gmail.com">@</a>
                <a className="footer-social" href="https://www.linkedin.com/in/oscandrebol/" target="_blank" rel="noreferrer" title="LinkedIn">in</a>
              </div>
            </div>
            <div>
              <div className="footer-col-title">Programas</div>
              <div className="footer-links">
                <a className="footer-link" href="#">Bootcamp Crypto</a>
                {/* <a className="footer-link" href="#">Express Trading</a> */}
                <a className="footer-link" href="#">Liquidity Engine</a>
              </div>
            </div>
            <div>
              <div className="footer-col-title">Compañía</div>
              <div className="footer-links">
                <a className="footer-link" onClick={e => goTo(e, 'sobre')} href="#">Sobre Oscar</a>
                <a className="footer-link" onClick={e => goTo(e, 'faq')} href="#">FAQ</a>
                <a className="footer-link" onClick={e => goTo(e, 'contacto')} href="#">Contacto</a>
              </div>
            </div>
            <div>
              <div className="footer-col-title">Herramientas</div>
              <div className="footer-links">
                <a className="footer-link" href="/app">Liquidity Engine App</a>
                <a className="footer-link" href="https://app.hyperliquid.xyz" target="_blank" rel="noreferrer">Hyperliquid</a>
                <a className="footer-link" href="https://app.uniswap.org" target="_blank" rel="noreferrer">Uniswap</a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© 2026 The Crypto House · Todos los derechos reservados.</span>
            <span>profeoscarbol@gmail.com · +57 321 564 6716</span>
          </div>
          <div className="footer-disclaimer">
            <strong>Aviso de riesgo:</strong> El trading e inversión en criptomonedas conlleva riesgo significativo de pérdida.
            Los resultados pasados no garantizan resultados futuros. Todo el contenido de The Crypto House es de carácter educativo
            y no constituye asesoramiento financiero. Invierte solo lo que estás dispuesto a perder.
          </div>
        </div>
      </footer>

      {infoProgram && <InfoModal program={infoProgram} onClose={() => setInfoProgram(null)} />}
      {accessOpen  && <AccessModal onClose={() => setAccessOpen(false)} />}
    </>
  )
}