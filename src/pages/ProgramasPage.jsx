// src/pages/ProgramasPage.jsx
import { useState, useEffect, useRef } from 'react'
import cryptoHouseLogo from '../assets/cryptohouselogo.png'
import CryptoPriceBar from '../components/CryptoPriceBar'

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --cyan:#00e5ff; --dark:#050a0f; --dark2:#070d14; --dark3:#0a1520;
    --border:#0e2435; --text:#c8e6f0; --muted:#4a7a96; --dimmed:#2a5a72;
  }
  html { scroll-behavior: smooth; }
  body { font-family:'Outfit',sans-serif; background:var(--dark); color:var(--text); overflow-x:hidden; }

  /* ── NAVBAR ── */
  .nav-wrap { position:fixed; top:40px; left:0; right:0; z-index:100; display:flex; justify-content:center; pointer-events:none; }
  .nav { pointer-events:all; display:flex; align-items:center; gap:2px; padding:5px 5px 5px 18px; background:rgba(7,13,20,0.82); border:1px solid rgba(0,229,255,0.12); border-radius:999px; backdrop-filter:blur(20px); box-shadow:0 0 0 1px rgba(255,255,255,0.04) inset,0 8px 40px rgba(0,0,0,0.5),0 0 24px rgba(0,229,255,0.05); }
  .nav-brand { display:flex; align-items:center; gap:10px; text-decoration:none; padding-right:16px; border-right:1px solid rgba(0,229,255,0.1); margin-right:6px; cursor:pointer; }
  .nav-name { font-size:12px; font-weight:700; color:rgba(200,230,240,0.85); letter-spacing:1.5px; text-transform:uppercase; }
  .nav-links { display:flex; align-items:center; gap:2px; }
  .nav-link { font-size:12.5px; color:rgba(200,230,240,0.55); text-decoration:none; font-weight:500; letter-spacing:0.4px; cursor:pointer; padding:7px 14px; border-radius:999px; transition:background 0.15s,color 0.15s; white-space:nowrap; background:none; border:none; font-family:'Outfit',sans-serif; }
  .nav-link:hover { background:rgba(0,229,255,0.08); color:#c8e6f0; }
  .nav-link.active { color:var(--cyan); }
  .nav-sep { width:1px; height:20px; background:rgba(0,229,255,0.1); margin:0 8px; flex-shrink:0; }

  /* Dropdown */
  .nav-dropdown { position:relative; }
  .nav-dropdown-btn { font-size:12.5px; color:rgba(200,230,240,0.55); font-weight:500; letter-spacing:0.4px; cursor:pointer; padding:7px 14px; border-radius:999px; display:flex; align-items:center; gap:4px; transition:background 0.15s,color 0.15s; background:none; border:none; font-family:'Outfit',sans-serif; white-space:nowrap; }
  .nav-dropdown-btn:hover, .nav-dropdown-btn.open { background:rgba(0,229,255,0.08); color:#c8e6f0; }
  .nav-dropdown-menu { position:absolute; top:calc(100% + 6px); left:50%; transform:translateX(-50%); background:rgba(7,13,20,0.97); border:1px solid rgba(0,229,255,0.18); border-radius:12px; padding:6px; min-width:210px; backdrop-filter:blur(24px); z-index:1000; box-shadow:0 12px 40px rgba(0,0,0,0.5); }
  .nav-dropdown-item { display:flex; align-items:center; gap:10px; padding:10px 14px; border-radius:8px; color:rgba(200,230,240,0.75); font-size:13px; font-weight:500; text-decoration:none; transition:all 0.12s; cursor:pointer; white-space:nowrap; background:none; border:none; font-family:'Outfit',sans-serif; width:100%; text-align:left; }
  .nav-dropdown-item:hover { background:rgba(0,229,255,0.08); color:var(--cyan); }
  .nav-dropdown-sep { height:1px; background:rgba(0,229,255,0.08); margin:4px 6px; }

  .nav-app { position:relative; overflow:hidden; padding:8px 20px; border-radius:999px; font-family:'Outfit',sans-serif; font-size:12.5px; font-weight:700; letter-spacing:0.5px; text-transform:uppercase; text-decoration:none; display:inline-block; cursor:pointer; color:#050a0f; background:linear-gradient(90deg,#00e5ff,#7b61ff,#ff4f6e,#ffb347,#00ff88,#00e5ff); background-size:280% 100%; border:none; transition:background-position 0.55s ease,box-shadow 0.3s ease; box-shadow:0 0 12px rgba(0,229,255,0.3); white-space:nowrap; }
  .nav-app:hover { background-position:100% 0; box-shadow:0 0 20px rgba(123,97,255,0.55),0 0 36px rgba(0,229,255,0.3); color:#050a0f; }

  @media(max-width:900px) {
    .nav-links,.nav-sep,.nav-cta { display:none; }
    .nav { padding:5px 5px 5px 14px; }
    .nav-brand { border-right:none; padding-right:8px; margin-right:0; }
    .nav-app { padding:7px 14px; font-size:11.5px; }
  }

  /* ── PAGE HERO ── */
  .page-hero { padding:140px 60px 80px; text-align:center; background:var(--dark); position:relative; overflow:hidden; }
  .page-hero::before { content:''; position:absolute; top:-40%; left:50%; transform:translateX(-50%); width:700px; height:700px; border-radius:50%; background:radial-gradient(circle,rgba(0,229,255,0.06) 0%,transparent 65%); pointer-events:none; }
  .page-hero-grid { position:absolute; inset:0; background-image:linear-gradient(var(--border) 1px,transparent 1px),linear-gradient(90deg,var(--border) 1px,transparent 1px); background-size:60px 60px; opacity:0.3; pointer-events:none; }
  .page-hero-content { position:relative; z-index:1; max-width:780px; margin:0 auto; }
  .page-hero-badge { display:inline-flex; align-items:center; gap:8px; padding:6px 16px; border:1px solid rgba(0,229,255,0.3); background:rgba(0,229,255,0.05); margin-bottom:24px; font-size:12px; color:var(--cyan); letter-spacing:1.5px; text-transform:uppercase; }
  .page-hero-title { font-size:clamp(36px,5vw,60px); font-weight:900; line-height:1.05; color:#fff; letter-spacing:-1px; margin-bottom:16px; }
  .page-hero-title span { color:var(--cyan); }
  .page-hero-sub { font-size:17px; color:var(--muted); line-height:1.7; margin-bottom:40px; }

  /* ── PROGRAM SWITCHER ── */
  .prog-switcher { display:flex; gap:12px; justify-content:center; flex-wrap:wrap; margin-bottom:0; }
  .prog-pill { padding:10px 28px; border-radius:999px; font-family:'Outfit',sans-serif; font-size:14px; font-weight:700; cursor:pointer; transition:all 0.2s; letter-spacing:0.3px; border:1px solid rgba(0,229,255,0.2); text-decoration:none; }
  .prog-pill.active { background:var(--cyan); color:var(--dark); border-color:var(--cyan); box-shadow:0 0 24px rgba(0,229,255,0.3); }
  .prog-pill.inactive { background:transparent; color:rgba(200,230,240,0.6); }
  .prog-pill.inactive:hover { background:rgba(0,229,255,0.08); color:#c8e6f0; border-color:rgba(0,229,255,0.35); }

  /* ── SECTIONS ── */
  .prog-section { padding:100px 60px; }
  .prog-section.alt { background:var(--dark2); }
  .prog-inner { max-width:1140px; margin:0 auto; }
  .prog-header { display:grid; grid-template-columns:1fr 1fr; gap:60px; align-items:start; margin-bottom:72px; }
  .prog-badge { display:inline-flex; align-items:center; gap:8px; padding:5px 14px; border:1px solid rgba(0,229,255,0.25); background:rgba(0,229,255,0.06); font-size:11px; color:var(--cyan); font-weight:700; letter-spacing:2px; text-transform:uppercase; margin-bottom:18px; }
  .prog-title { font-size:clamp(30px,4vw,46px); font-weight:900; color:#fff; line-height:1.1; margin-bottom:10px; letter-spacing:-0.5px; }
  .prog-title span { color:var(--cyan); }
  .prog-subtitle { font-size:15px; color:var(--cyan); font-weight:600; letter-spacing:1px; text-transform:uppercase; margin-bottom:18px; }
  .prog-desc { font-size:15px; color:var(--muted); line-height:1.8; margin-bottom:24px; }
  .prog-stats { display:flex; gap:28px; flex-wrap:wrap; }
  .prog-stat { text-align:center; }
  .prog-stat-val { font-size:28px; font-weight:900; color:#fff; }
  .prog-stat-val span { color:var(--cyan); }
  .prog-stat-lab { font-size:11px; color:var(--muted); letter-spacing:1px; text-transform:uppercase; margin-top:4px; }

  /* Modules */
  .modules-title { font-size:11px; font-weight:700; color:var(--cyan); letter-spacing:3px; text-transform:uppercase; margin-bottom:24px; display:flex; align-items:center; gap:10px; }
  .modules-title::before { content:''; width:20px; height:1px; background:var(--cyan); }
  .module-item { border:1px solid var(--border); background:var(--dark3); margin-bottom:8px; }
  .module-header { display:flex; align-items:center; gap:16px; padding:18px 22px; cursor:pointer; width:100%; background:none; border:none; text-align:left; font-family:'Outfit',sans-serif; transition:background 0.15s; }
  .module-header:hover { background:rgba(0,229,255,0.03); }
  .module-num { width:36px; height:36px; min-width:36px; background:rgba(0,229,255,0.08); border:1px solid rgba(0,229,255,0.2); display:flex; align-items:center; justify-content:center; font-size:12px; font-weight:800; color:var(--cyan); }
  .module-info { flex:1; min-width:0; }
  .module-name { font-size:15px; font-weight:700; color:#e0f4ff; }
  .module-meta { font-size:12px; color:var(--dimmed); margin-top:2px; }
  .module-chevron { color:var(--dimmed); font-size:18px; transition:transform 0.15s; margin-left:auto; flex-shrink:0; }
  .module-chevron.open { transform:rotate(90deg); color:var(--cyan); }
  .module-body { padding:0 22px 18px 74px; }
  .module-lessons { display:flex; flex-direction:column; gap:8px; }
  .module-lesson { display:flex; align-items:flex-start; gap:10px; font-size:14px; color:var(--muted); line-height:1.5; }
  .module-lesson::before { content:''; width:5px; height:5px; min-width:5px; background:var(--cyan); border-radius:50%; margin-top:7px; }

  /* Includes */
  .includes-grid { display:grid; grid-template-columns:1fr 1fr; gap:10px; }
  .include-item { display:flex; align-items:center; gap:12px; padding:14px 18px; background:var(--dark3); border:1px solid var(--border); font-size:14px; color:var(--text); }
  .include-check { width:22px; height:22px; min-width:22px; background:rgba(0,255,136,0.12); border:1px solid rgba(0,255,136,0.3); display:flex; align-items:center; justify-content:center; font-size:11px; color:#00ff88; font-weight:900; flex-shrink:0; }

  /* CTA card */
  .prog-cta-card { background:linear-gradient(135deg,#0c1e2e,#071830 55%,#0a0f1e); border:1px solid rgba(0,229,255,0.25); padding:48px 40px; position:relative; overflow:hidden; margin-top:52px; }
  .prog-cta-card::before { content:''; position:absolute; top:0; left:0; right:0; height:2px; background:linear-gradient(90deg,transparent,var(--cyan),#7b61ff,transparent); }
  .prog-cta-title { font-size:28px; font-weight:800; color:#fff; margin-bottom:12px; }
  .prog-cta-sub { font-size:15px; color:var(--muted); margin-bottom:28px; line-height:1.7; }
  .prog-cta-btns { display:flex; gap:12px; flex-wrap:wrap; }

  /* Buttons */
  .btn-primary { padding:14px 36px; background:var(--cyan); color:var(--dark); font-family:'Outfit',sans-serif; font-size:15px; font-weight:700; border:none; cursor:pointer; letter-spacing:0.5px; text-transform:uppercase; transition:all 0.15s; text-decoration:none; display:inline-block; border-radius:10px; }
  .btn-primary:hover { opacity:0.88; transform:translateY(-1px); }
  .btn-secondary { padding:14px 36px; background:transparent; color:var(--text); font-family:'Outfit',sans-serif; font-size:15px; font-weight:600; border:1px solid var(--border); cursor:pointer; transition:all 0.15s; text-decoration:none; display:inline-block; border-radius:10px; }
  .btn-secondary:hover { border-color:var(--cyan); color:var(--cyan); }

  /* Band */
  .band { padding:80px 60px; text-align:center; }
  .band-card { max-width:780px; margin:0 auto; background:linear-gradient(135deg,#0c1e2e,#071830 55%,#0a0f1e); border:1px solid rgba(0,229,255,0.25); padding:64px 56px; position:relative; overflow:hidden; box-shadow:0 0 0 1px rgba(0,229,255,0.06),0 24px 80px rgba(0,0,0,0.5); }
  .band-card::before { content:''; position:absolute; top:0; left:0; right:0; height:3px; background:linear-gradient(90deg,transparent,var(--cyan),#7b61ff,transparent); }
  .band-title { font-size:clamp(24px,3vw,40px); font-weight:900; color:#fff; margin-bottom:14px; position:relative; z-index:1; }
  .band-title span { color:var(--cyan); }
  .band-sub { font-size:16px; color:var(--muted); margin-bottom:36px; position:relative; z-index:1; }

  /* Footer */
  .footer { background:var(--dark); border-top:1px solid var(--border); padding:60px 60px 32px; }
  .footer-inner { max-width:1140px; margin:0 auto; }
  .footer-top { display:grid; grid-template-columns:2fr 1fr 1fr; gap:48px; margin-bottom:48px; }
  .footer-brand-desc { font-size:14px; color:var(--muted); line-height:1.7; margin:16px 0 20px; max-width:280px; }
  .footer-socials { display:flex; gap:12px; }
  .footer-social { width:36px; height:36px; border:1px solid var(--border); display:flex; align-items:center; justify-content:center; color:var(--muted); text-decoration:none; font-size:14px; font-weight:700; transition:all 0.15s; }
  .footer-social:hover { border-color:var(--cyan); color:var(--cyan); }
  .footer-col-title { font-size:12px; font-weight:700; color:#fff; letter-spacing:1.5px; text-transform:uppercase; margin-bottom:20px; }
  .footer-links { display:flex; flex-direction:column; gap:12px; }
  .footer-link { font-size:14px; color:var(--muted); text-decoration:none; transition:color 0.15s; cursor:pointer; background:none; border:none; font-family:'Outfit',sans-serif; text-align:left; }
  .footer-link:hover { color:var(--cyan); }
  .footer-bottom { border-top:1px solid var(--border); padding-top:24px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; font-size:12px; color:var(--dimmed); }

  /* Ticker */
  .ticker { background:var(--cyan); padding:10px 0; overflow:hidden; }
  .ticker-track { display:flex; gap:0; white-space:nowrap; animation:ticker 30s linear infinite; }
  @keyframes ticker { from{transform:translateX(0)} to{transform:translateX(-50%)} }
  .ticker-item { font-size:12px; font-weight:700; color:var(--dark); padding:0 32px; letter-spacing:2px; text-transform:uppercase; }

  @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }

  @media(max-width:900px) {
    .page-hero { padding:120px 20px 60px; }
    .prog-section { padding:70px 20px; }
    .prog-header { grid-template-columns:1fr; gap:40px; }
    .includes-grid { grid-template-columns:1fr; }
    .band { padding:60px 20px; }
    .band-card { padding:40px 24px; }
    .footer { padding:48px 20px 24px; }
    .footer-top { grid-template-columns:1fr 1fr; }
    .prog-cta-card { padding:32px 24px; }
    .module-body { padding:0 16px 16px 16px; }
  }
`

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
  const [active, setActive]     = useState('bootcamp')
  const [dropOpen, setDropOpen] = useState(false)
  const dropTimer = useRef(null)
  const openDrop  = () => { clearTimeout(dropTimer.current); setDropOpen(true) }
  const closeDrop = () => { dropTimer.current = setTimeout(() => setDropOpen(false), 220) }

  useEffect(() => { window.scrollTo(0, 0) }, [])

  const goHome = (sectionId) => {
    if (sectionId) sessionStorage.setItem('pendingScroll', sectionId)
    window.location.hash = ''
  }

  const wa = (program) => {
    const msg = encodeURIComponent(`Hola Oscar! Me interesa el programa *${program}*. ¿Podrías darme más información?`)
    window.open(`https://wa.me/573215646716?text=${msg}`, '_blank')
  }

  return (
    <>
      <style>{CSS}</style>
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
                onClick={() => { window.location.hash = '#programas' }}
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
            <button className="nav-link" onClick={() => { window.location.hash = '#liquidity-engine' }}>Liquidity Engine</button>
            <button className="nav-link" onClick={() => goHome('faq')}>FAQ</button>
            <button className="nav-link" onClick={() => goHome('contacto')}>Contacto</button>
          </div>
          <div className="nav-sep" />
          <a className="nav-app" href="/#app">Acceder al Ecosistema</a>
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
                <button className="footer-link" onClick={() => { window.location.hash = '#liquidity-engine' }}>Liquidity Engine</button>
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
