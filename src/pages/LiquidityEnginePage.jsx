// src/pages/LiquidityEnginePage.jsx
import { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import cryptoHouseLogo from '../assets/cryptohouselogo.png'
import CryptoPriceBar from '../components/CryptoPriceBar'
import '../styles/marketing.css'
import './LiquidityEnginePage.css'

const FEATURES = [
  {
    icon:'📊',
    name:'Pool Tracker en Tiempo Real',
    desc:'Visualiza todas tus posiciones de liquidez en Uniswap con métricas precisas: fees acumulados, estado del rango, impermanent loss actual y ROI por posición.',
    tags:['Uniswap','Tiempo real','Métricas DeFi','Multi-pool'],
  },
  {
    icon:'🛡',
    name:'Hedge Manager',
    desc:'Gestiona coberturas SHORT programables en los 5 principales exchanges vía API. Protege tu capital de la volatilidad de mercado mientras tu pool genera fees.',
    tags:['Binance','Bybit','OKX','SHORT API'],
  },
  {
    icon:'⚡',
    name:'Dashboard Multi-Pool',
    desc:'Administra múltiples pools simultáneamente desde un solo panel. Compara rendimiento, fees y exposure de todas tus posiciones en una vista unificada.',
    tags:['Multi-wallet','Comparativa','Exposición neta'],
  },
  {
    icon:'🔔',
    name:'Alertas Inteligentes',
    desc:'Recibe notificaciones en tiempo real cuando tus pools salen de rango, cuando se alcanzan umbrales de fees definidos o cuando el mercado activa tus condiciones de cobertura.',
    tags:['Out-of-range','Threshold alerts','Cobertura automática'],
  },
]

const EXCHANGES = [
  { name:'Binance',  type:'CEX · Futuros',  color:'#F0B90B', bg:'rgba(240,185,11,0.08)',  border:'rgba(240,185,11,0.25)'  },
  { name:'Bybit',    type:'CEX · Perpetuos', color:'#F7A600', bg:'rgba(247,166,0,0.08)',   border:'rgba(247,166,0,0.25)'   },
  { name:'OKX',      type:'CEX · Futuros',  color:'#e0e0e0', bg:'rgba(224,224,224,0.05)', border:'rgba(224,224,224,0.18)' },
  { name:'Bitget',   type:'CEX · Copy',     color:'#00F0FF', bg:'rgba(0,240,255,0.06)',   border:'rgba(0,240,255,0.22)'   },
  { name:'KuCoin',   type:'CEX · Spot',     color:'#23AF91', bg:'rgba(35,175,145,0.08)',  border:'rgba(35,175,145,0.25)'  },
]

const STEPS = [
  {
    num:'01',
    title:'Conecta tus wallets y APIs',
    desc:'Agrega tus wallets de Ethereum para rastrear pools en Uniswap y conecta las APIs de tus exchanges para activar el módulo de coberturas.',
  },
  {
    num:'02',
    title:'Monitorea tus posiciones',
    desc:'El dashboard centraliza todas tus posiciones en tiempo real. Consulta fees, rangos activos, impermanent loss y rendimiento neto de cada pool.',
  },
  {
    num:'03',
    title:'Activa coberturas automáticas',
    desc:'Configura reglas de cobertura basadas en precio, rango o exposición. El engine ejecuta las posiciones SHORT necesarias para neutralizar el riesgo.',
  },
]

const ACCESS_ITEMS = [
  'Acceso completo con Bootcamp Crypto (90 días)',
  'Panel multi-pool con todas las funciones',
  'Conexión API a 5 exchanges',
  'Módulo de cobertura con SHORT',
  'Alertas y notificaciones en tiempo real',
  'Actualizaciones continuas de la plataforma',
]

const TICKER_ITEMS = ['Liquidity Engine','·','Uniswap','·','DeFi Hedging','·','Real-time Pools','·','The Crypto House','·']

export default function LiquidityEnginePage() {
  const navigate = useNavigate()
  const [dropOpen, setDropOpen]           = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const dropTimer = useRef(null)
  const openDrop  = () => { clearTimeout(dropTimer.current); setDropOpen(true) }
  const closeDrop = () => { dropTimer.current = setTimeout(() => setDropOpen(false), 220) }

  useEffect(() => { window.scrollTo(0, 0) }, [])

  const goHome = (sectionId) => {
    if (sectionId) sessionStorage.setItem('pendingScroll', sectionId)
    navigate('/')
  }

  const wa = () => {
    const msg = encodeURIComponent('Hola Oscar! Me interesa acceder al *Liquidity Engine*. ¿Podrías darme más información?')
    window.open(`https://wa.me/573215646716?text=${msg}`, '_blank')
  }

  return (
    <>
      <CryptoPriceBar />

      {/* NAVBAR */}
      <div className="nav-wrap">
        <nav className="nav">
          <div className="nav-brand" onClick={() => goHome()}>
            <img src={cryptoHouseLogo} alt="The Crypto House" style={{ height:30, width:'auto', objectFit:'contain' }} />
            <div className="nav-name">The Crypto House</div>
          </div>
          <div className="nav-links">
            <button className="nav-link" onClick={() => goHome()}>Inicio</button>
            <button className="nav-link" onClick={() => goHome('sobre')}>Instructor</button>
            <div className="nav-dropdown" onMouseEnter={openDrop} onMouseLeave={closeDrop}>
              <button
                className={`nav-dropdown-btn${dropOpen ? ' open' : ''}`}
                onClick={() => { navigate('/programas') }}
              >Formación ▾</button>
              {dropOpen && (
                <div className="nav-dropdown-menu">
                  <button className="nav-dropdown-item" onClick={() => { navigate('/programas') }}>
                    <span>₿</span> Bootcamp Crypto
                  </button>
                  <div className="nav-dropdown-sep" />
                  <button className="nav-dropdown-item" onClick={() => { navigate('/programas') }}>
                    <span>📊</span> Express Trading
                  </button>
                </div>
              )}
            </div>
            <button className="nav-link active" style={{ color:'var(--cyan)' }}>Liquidity Engine</button>
            <button className="nav-link" onClick={() => goHome('faq')}>FAQ</button>
            <button className="nav-link" onClick={() => goHome('contacto')}>Contacto</button>
          </div>
          <div className="nav-sep" />
          <button
            className="nav-hamburger"
            onClick={e => { e.stopPropagation(); setMobileMenuOpen(o => !o) }}
            aria-label="Menú"
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
          <a className="nav-app" href="/app">Acceder al Ecosistema</a>
        </nav>
        {mobileMenuOpen && (
          <div className="nav-mobile-menu" onClick={e => e.stopPropagation()}>
            <button className="nav-mobile-link" onClick={() => { goHome(); setMobileMenuOpen(false) }}>Inicio</button>
            <button className="nav-mobile-link" onClick={() => { goHome('sobre'); setMobileMenuOpen(false) }}>Instructor</button>
            <button className="nav-mobile-link" onClick={() => { navigate('/programas'); setMobileMenuOpen(false) }}>Formación</button>
            <button className="nav-mobile-link" onClick={() => { navigate('/liquidity-engine'); setMobileMenuOpen(false) }}>Liquidity Engine</button>
            <button className="nav-mobile-link" onClick={() => { goHome('faq'); setMobileMenuOpen(false) }}>FAQ</button>
            <button className="nav-mobile-link" onClick={() => { goHome('contacto'); setMobileMenuOpen(false) }}>Contacto</button>
            <div className="nav-mobile-sep" />
            <a className="nav-mobile-app" href="/app" onClick={() => setMobileMenuOpen(false)}>Acceder al Ecosistema →</a>
          </div>
        )}
      </div>
      {mobileMenuOpen && <div className="nav-mobile-backdrop" onClick={() => setMobileMenuOpen(false)} />}

      {/* HERO */}
      <section className="le-hero">
        <div className="le-hero-grid" />
        <div className="le-hero-content">
          <div className="le-badge">
            <div className="le-badge-dot" />
            The Crypto House · Herramienta exclusiva
          </div>
          <h1 className="le-title">
            <span>Liquidity</span><br />Engine
          </h1>
          <p className="le-sub">
            La herramienta que ningún crypto exchange te va a dar.<br />
            Gestiona tus posiciones DeFi en Uniswap con cobertura automática en tiempo real.
          </p>
          <div className="le-btns">
            <a className="btn-glare" href="/app">
              <span className="btn-glare-shine" />
              Acceder al Ecosistema →
            </a>
            <button className="btn-secondary" onClick={wa}>Saber más</button>
          </div>
          <div className="le-stats">
            {[['5','exchanges integrados'],['Uniswap compatible'],['24/7','monitoreo activo'],['API','ejecución directa']].map(([v,l],i) => (
              <div key={i}>
                <div className="le-stat-val"><span>{v}</span></div>
                <div className="le-stat-lab">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TICKER */}
      <div className="ticker">
        <div className="ticker-track">
          {[...TICKER_ITEMS,...TICKER_ITEMS].map((item, i) => <span key={i} className="ticker-item">{item}</span>)}
        </div>
      </div>

      {/* FEATURES */}
      <section className="le-features">
        <div className="le-inner">
          <div className="center">
            <div className="section-label center">Funcionalidades</div>
            <h2 className="section-title">Todo lo que necesitas para<br /><span>operar en DeFi</span></h2>
            <p className="section-desc">Cuatro módulos diseñados para simplificar, proteger y optimizar tus operaciones en Uniswap.</p>
          </div>
          <div className="features-grid">
            {FEATURES.map((f, i) => (
              <div key={i} className="feature-card">
                <div className="feature-icon">{f.icon}</div>
                <div className="feature-name">{f.name}</div>
                <div className="feature-desc">{f.desc}</div>
                <div className="feature-tags">
                  {f.tags.map((t, j) => <span key={j} className="feature-tag">{t}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EXCHANGES */}
      <section className="le-exchanges">
        <div className="le-inner">
          <div className="center">
            <div className="section-label center">Compatibilidad</div>
            <h2 className="section-title">5 exchanges integrados<br /><span>vía API directa</span></h2>
            <p className="section-desc">El módulo de coberturas ejecuta posiciones SHORT directamente en los exchanges más líquidos del mundo.</p>
          </div>
          <div className="exchanges-grid">
            {EXCHANGES.map((ex, i) => (
              <div key={i} className="exchange-card" style={{ background:ex.bg, borderColor:ex.border }}>
                <div className="exchange-dot-large" style={{ background:ex.color, boxShadow:`0 0 10px ${ex.color}50` }} />
                <div className="exchange-name" style={{ color:ex.color }}>{ex.name}</div>
                <div className="exchange-type">{ex.type}</div>
              </div>
            ))}
          </div>
          <div style={{ textAlign:'center', marginTop:36 }}>
            <div style={{ display:'inline-flex', alignItems:'center', gap:12, padding:'12px 24px', border:'1px solid rgba(0,229,255,0.15)', background:'rgba(0,229,255,0.04)', fontSize:14, color:'var(--muted)' }}>
              <span style={{ color:'var(--cyan)', fontWeight:700 }}>+</span>
              Uniswap — Protocolo DeFi principal
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="le-how">
        <div className="le-inner">
          <div>
            <div className="section-label">Cómo funciona</div>
            <h2 className="section-title">Tres pasos para<br /><span>tener control total</span></h2>
          </div>
          <div className="steps-grid">
            {STEPS.map((s, i) => (
              <div key={i} className="step">
                <div className="step-num">{s.num}</div>
                <div className="step-title">{s.title}</div>
                <div className="step-desc">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ACCESS */}
      <section className="le-access">
        <div className="le-inner">
          <div className="access-card">
            <div className="access-badge">Acceso exclusivo</div>
            <h2 className="access-title">Disponible para<br />estudiantes del <span>Bootcamp Crypto</span></h2>
            <p className="access-desc">
              El Liquidity Engine no es un producto de venta individual. Es la herramienta que construimos
              para operar nuestras propias estrategias y que ahora está disponible para los estudiantes del programa.
            </p>
            <div className="access-items">
              {ACCESS_ITEMS.map((item, i) => (
                <div key={i} className="access-item">
                  <span className="access-check">◈</span>
                  {item}
                </div>
              ))}
            </div>
            <div style={{ display:'flex', gap:14, justifyContent:'center', flexWrap:'wrap', position:'relative', zIndex:1 }}>
              <a className="btn-glare" href="/app">
                <span className="btn-glare-shine" />
                Acceder al Ecosistema →
              </a>
              <button className="btn-secondary" onClick={() => { navigate('/programas') }}>
                Ver Bootcamp Crypto
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-top">
            <div>
              <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:4 }}>
                <img src={cryptoHouseLogo} alt="The Crypto House" style={{ height:36, width:'auto', objectFit:'contain' }} />
                <div className="nav-name">The Crypto House</div>
              </div>
              <p className="footer-brand-desc">Formación profesional en criptomonedas, trading y DeFi para Colombia y Latam.</p>
              <div className="footer-socials">
                <a className="footer-social" href="https://wa.me/573215646716" target="_blank" rel="noreferrer">W</a>
                <a className="footer-social" href="mailto:profeoscarbol@gmail.com">@</a>
                <a className="footer-social" href="https://www.linkedin.com/in/oscandrebol/" target="_blank" rel="noreferrer">in</a>
              </div>
            </div>
            <div>
              <div className="footer-col-title">Programas</div>
              <div className="footer-links">
                <button className="footer-link" onClick={() => { navigate('/programas') }}>Bootcamp Crypto</button>
                <button className="footer-link" onClick={() => { navigate('/programas') }}>Express Trading</button>
                <button className="footer-link" style={{ color:'var(--cyan)' }}>Liquidity Engine</button>
              </div>
            </div>
            <div>
              <div className="footer-col-title">Compañía</div>
              <div className="footer-links">
                <button className="footer-link" onClick={() => goHome('sobre')}>Sobre Oscar</button>
                <button className="footer-link" onClick={() => goHome('faq')}>FAQ</button>
                <button className="footer-link" onClick={() => goHome('contacto')}>Contacto</button>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© 2026 The Crypto House · Todos los derechos reservados.</span>
            <span>profeoscarbol@gmail.com · +57 321 564 6716</span>
          </div>
        </div>
      </footer>
    </>
  )
}
