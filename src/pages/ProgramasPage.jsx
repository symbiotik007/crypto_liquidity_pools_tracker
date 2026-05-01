// src/pages/ProgramasPage.jsx
import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import cryptoHouseLogo from '../assets/cryptohouselogo.png'
import CryptoPriceBar from '../components/CryptoPriceBar'
import '../styles/marketing.css'
import './ProgramasPage.css'

const BOOTCAMP_MODULES = [
  {
    num:'01', name:'Fundamentos del Ecosistema Cripto', weeks:'Semana 1–2',
    lessons:['¿Qué es Bitcoin y cómo funciona la blockchain?','Tipos de activos cripto: cómo evaluarlos y diferenciarlos','Wallets, exchanges y buenas prácticas de seguridad','Criptomonedas como clase de activo global'],
  },
  {
    num:'02', name:'Análisis Técnico Aplicado', weeks:'Semana 3–5',
    lessons:['Lectura de velas japonesas y patrones de reversión','Indicadores clave: RSI, MACD, Bandas de Bollinger','Soporte, resistencia y análisis de tendencias','Construcción de un plan de trading con AT'],
  },
  {
    num:'03', name:'DeFi & Liquidity Mining', weeks:'Semana 6–8',
    lessons:['Protocolos DeFi: Uniswap, Aave, Compound','Liquidity Pools: cómo funcionan y cómo generar rendimiento','Gestión de posiciones en Uniswap V3 con rangos personalizados','Impermanent Loss: cálculo y estrategias de mitigación'],
  },
  {
    num:'04', name:'Gestión de Riesgo Profesional', weeks:'Semana 9–10',
    lessons:['Stop loss, take profit y position sizing','Cobertura con futuros para proteger capital DeFi','Psicología del inversor y control de sesgos cognitivos','Construcción de un diario de inversión profesional'],
  },
  {
    num:'05', name:'Estrategias Avanzadas & Portafolio', weeks:'Semana 11–13',
    lessons:['Estrategias combinadas DeFi + CeFi','Análisis on-chain: métricas clave de blockchain','Construcción y rebalanceo de portafolio cripto','Uso del Liquidity Engine para gestión avanzada'],
  },
]

const EXPRESS_MODULES = [
  {
    num:'01', name:'Arquitectura de Futuros', weeks:'Semana 1–2',
    lessons:['Contratos perpetuos vs. fechados: diferencias y usos','Apalancamiento: uso correcto, riesgos y gestión','Plataformas: Binance Futures, Bybit, Hyperliquid','Estructura del mercado de futuros cripto'],
  },
  {
    num:'02', name:'Estrategias de Entrada de Alta Probabilidad', weeks:'Semana 3–4',
    lessons:['Breakout de rangos y consolidaciones','Retesteo de niveles clave con confirmación de volumen','Order blocks y zonas de liquidez','Construcción de setups con R/B mínimo 1:2'],
  },
  {
    num:'03', name:'Gestión de Capital Avanzada', weeks:'Semana 5–6',
    lessons:['Kelly Criterion adaptado al trading de futuros','Drawdown máximo y reglas de corte automático','Journal de trading: métricas que realmente importan','Evaluación de rendimiento y ajuste de estrategia'],
  },
  {
    num:'04', name:'Trading en Vivo con Oscar', weeks:'Semana 7–8',
    lessons:['Sesiones de análisis en vivo del mercado','Revisión y feedback de operaciones reales','Estrategia de escalada gradual de capital','Preparación para Prop Firms'],
  },
]

const BOOTCAMP_INCLUDES = [
  '90 días de acceso completo al Liquidity Engine',
  'Sesiones en vivo semanales con Oscar',
  'Grabaciones de todas las clases',
  'Grupo privado de análisis diario',
  'Mentoría directa 1 a 1',
  'Herramientas y plantillas de análisis',
  'Alertas de mercado en tiempo real',
  'Certificado de finalización',
]

const EXPRESS_INCLUDES = [
  'Acceso a sala de trading en vivo',
  '60 días de mentoría directa',
  'Plantillas de gestión de riesgo',
  'Análisis diario de mercado',
  'Grupo privado de traders activos',
  'Grabaciones de todas las sesiones',
  'Evaluación personalizada de operaciones',
  'Preparación para Prop Firms',
]

function ModuleAccordion({ mod }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="module-item">
      <button className="module-header" onClick={() => setOpen(o => !o)}>
        <div className="module-num">{mod.num}</div>
        <div className="module-info">
          <div className="module-name">{mod.name}</div>
          <div className="module-meta">{mod.weeks} · {mod.lessons.length} temas</div>
        </div>
        <span className={`module-chevron${open ? ' open' : ''}`}>›</span>
      </button>
      {open && (
        <div className="module-body">
          <div className="module-lessons">
            {mod.lessons.map((l, i) => <div key={i} className="module-lesson">{l}</div>)}
          </div>
        </div>
      )}
    </div>
  )
}

const TICKER_ITEMS = ['Bootcamp Crypto','·','Express Trading','·','DeFi & Liquidity Pools','·','Uniswap V3','·','Futuros Cripto','·','Formación Profesional','·']

export default function ProgramasPage() {
  const navigate = useNavigate()
  const [active, setActive]     = useState('bootcamp')
  const [dropOpen, setDropOpen] = useState(false)
  const dropTimer = useRef(null)
  const openDrop  = () => { clearTimeout(dropTimer.current); setDropOpen(true) }
  const closeDrop = () => { dropTimer.current = setTimeout(() => setDropOpen(false), 220) }

  useEffect(() => { window.scrollTo(0, 0) }, [])

  const goHome = (sectionId) => {
    if (sectionId) sessionStorage.setItem('pendingScroll', sectionId)
    navigate('/')
  }

  const wa = (program) => {
    const msg = encodeURIComponent(`Hola Oscar! Me interesa el programa *${program}*. ¿Podrías darme más información?`)
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
                style={{ color:'var(--cyan)' }}
                onClick={() => { navigate('/programas') }}
              >Formación ▾</button>
              {dropOpen && (
                <div className="nav-dropdown-menu">
                  <button className="nav-dropdown-item" onClick={() => { setActive('bootcamp'); setDropOpen(false); window.scrollTo(0,0) }}>
                    <span>₿</span> Bootcamp Crypto
                  </button>
                  <div className="nav-dropdown-sep" />
                  <button className="nav-dropdown-item" onClick={() => { setActive('express'); setDropOpen(false); window.scrollTo(0,0) }}>
                    <span>📊</span> Express Trading
                  </button>
                </div>
              )}
            </div>
            <button className="nav-link" onClick={() => { navigate('/liquidity-engine') }}>Liquidity Engine</button>
            <button className="nav-link" onClick={() => goHome('faq')}>FAQ</button>
            <button className="nav-link" onClick={() => goHome('contacto')}>Contacto</button>
          </div>
          <div className="nav-sep" />
          <a className="nav-app" href="/app">Acceder al Ecosistema</a>
        </nav>
      </div>

      {/* HERO */}
      <div className="page-hero">
        <div className="page-hero-grid" />
        <div className="page-hero-content">
          <div className="page-hero-badge">
            <div style={{ width:6, height:6, background:'var(--cyan)', borderRadius:'50%', animation:'pulse 2s infinite' }} />
            The Crypto House · Formación
          </div>
          <h1 className="page-hero-title">
            Elige el programa que<br />te lleve al <span>siguiente nivel</span>
          </h1>
          <p className="page-hero-sub">
            Formación práctica y estructurada para dominar las criptomonedas, el trading de futuros y DeFi.
          </p>
          <div className="prog-switcher">
            <button className={`prog-pill ${active === 'bootcamp' ? 'active' : 'inactive'}`} onClick={() => setActive('bootcamp')}>
              ₿ &nbsp;Bootcamp Crypto
            </button>
            <button className={`prog-pill ${active === 'express' ? 'active' : 'inactive'}`} onClick={() => setActive('express')}>
              📊 &nbsp;Express Trading
            </button>
          </div>
        </div>
      </div>

      {/* TICKER */}
      <div className="ticker">
        <div className="ticker-track">
          {[...TICKER_ITEMS,...TICKER_ITEMS].map((item, i) => <span key={i} className="ticker-item">{item}</span>)}
        </div>
      </div>

      {/* BOOTCAMP SECTION */}
      {active === 'bootcamp' && (
        <section className="prog-section" id="bootcamp">
          <div className="prog-inner">
            <div className="prog-header">
              <div>
                <div className="prog-badge">₿ · 90 Días · Más popular</div>
                <h2 className="prog-title">Bootcamp <span>Crypto</span></h2>
                <div className="prog-subtitle">Inversión y Trading de Criptomonedas</div>
                <p className="prog-desc">
                  El programa más completo para aprender a invertir en criptomonedas de manera profesional.
                  Desde los fundamentos hasta estrategias avanzadas en DeFi, Liquidity Mining y gestión de riesgo.
                  Diseñado para ir de cero al nivel profesional en 90 días.
                </p>
                <p className="prog-desc">
                  Incluye acceso exclusivo al Liquidity Engine — nuestra herramienta propia para gestionar
                  posiciones en Uniswap V3 con cobertura automática en los 5 principales exchanges del mundo.
                </p>
                <div className="prog-stats">
                  {[['90','días de programa'],['5','módulos'],['1·1','mentoría directa'],['13','semanas']].map(([v,l],i) => (
                    <div key={i} className="prog-stat">
                      <div className="prog-stat-val"><span>{v}</span></div>
                      <div className="prog-stat-lab">{l}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className="modules-title">Módulos del programa</div>
                {BOOTCAMP_MODULES.map((mod, i) => <ModuleAccordion key={i} mod={mod} />)}
              </div>
            </div>

            <div style={{ marginBottom:52 }}>
              <div className="modules-title">¿Qué incluye?</div>
              <div className="includes-grid">
                {BOOTCAMP_INCLUDES.map((item, i) => (
                  <div key={i} className="include-item">
                    <div className="include-check">✓</div>
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="prog-cta-card">
              <div className="prog-cta-title">¿Listo para empezar el Bootcamp Crypto?</div>
              <div className="prog-cta-sub">
                Plazas limitadas para garantizar acompañamiento 1 a 1.<br />
                Oscar responde en menos de 2 horas por WhatsApp.
              </div>
              <div className="prog-cta-btns">
                <button className="btn-primary" onClick={() => wa('Bootcamp Crypto')}>Quiero inscribirme →</button>
                <button className="btn-secondary" onClick={() => goHome('contacto')}>Más información</button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* EXPRESS TRADING SECTION */}
      {active === 'express' && (
        <section className="prog-section alt" id="express">
          <div className="prog-inner">
            <div className="prog-header">
              <div>
                <div className="prog-badge">📊 · 60 Días · Nuevo</div>
                <h2 className="prog-title">Express <span>Trading</span></h2>
                <div className="prog-subtitle">Trading de Futuros Profesional</div>
                <p className="prog-desc">
                  Programa intensivo para dominar el trading de contratos de futuros en cripto y Forex.
                  Enfocado en resultados desde el primer mes con estrategias de alta probabilidad,
                  gestión de capital profesional y sesiones en vivo con Oscar.
                </p>
                <p className="prog-desc">
                  Incluye preparación para operar con Prop Firms, análisis en tiempo real
                  y un sistema de evaluación continua para asegurar consistencia en tus operaciones.
                </p>
                <div className="prog-stats">
                  {[['60','días de programa'],['4','módulos'],['1·1','mentoría directa'],['8','semanas']].map(([v,l],i) => (
                    <div key={i} className="prog-stat">
                      <div className="prog-stat-val"><span>{v}</span></div>
                      <div className="prog-stat-lab">{l}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className="modules-title">Módulos del programa</div>
                {EXPRESS_MODULES.map((mod, i) => <ModuleAccordion key={i} mod={mod} />)}
              </div>
            </div>

            <div style={{ marginBottom:52 }}>
              <div className="modules-title">¿Qué incluye?</div>
              <div className="includes-grid">
                {EXPRESS_INCLUDES.map((item, i) => (
                  <div key={i} className="include-item">
                    <div className="include-check">✓</div>
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="prog-cta-card">
              <div className="prog-cta-title">¿Listo para dominar el trading de futuros?</div>
              <div className="prog-cta-sub">
                Cupos limitados para mantener el nivel de mentoría 1 a 1.<br />
                Oscar responde en menos de 2 horas por WhatsApp.
              </div>
              <div className="prog-cta-btns">
                <button className="btn-primary" onClick={() => wa('Express Trading')}>Quiero inscribirme →</button>
                <button className="btn-secondary" onClick={() => goHome('contacto')}>Más información</button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* BAND */}
      <div className="band">
        <div className="band-card">
          <h2 className="band-title">¿No sabes cuál <span>elegir?</span></h2>
          <p className="band-sub">Escríbenos y Oscar te ayuda a decidir cuál programa se adapta mejor a tu nivel y objetivos.</p>
          <button className="btn-primary" onClick={() => wa('uno de los programas')}>
            Hablar con Oscar →
          </button>
        </div>
      </div>

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
                <button className="footer-link" onClick={() => setActive('bootcamp')}>Bootcamp Crypto</button>
                <button className="footer-link" onClick={() => setActive('express')}>Express Trading</button>
                <button className="footer-link" onClick={() => { navigate('/liquidity-engine') }}>Liquidity Engine</button>
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
