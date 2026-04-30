// src/pages/LiquidityEnginePage.jsx
import { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
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

  .nav-dropdown { position:relative; }
  .nav-dropdown-btn { font-size:12.5px; color:rgba(200,230,240,0.55); font-weight:500; letter-spacing:0.4px; cursor:pointer; padding:7px 14px; border-radius:999px; display:flex; align-items:center; gap:4px; transition:background 0.15s,color 0.15s; background:none; border:none; font-family:'Outfit',sans-serif; white-space:nowrap; }
  .nav-dropdown-btn:hover, .nav-dropdown-btn.open { background:rgba(0,229,255,0.08); color:#c8e6f0; }
  .nav-dropdown-menu { position:absolute; top:calc(100% + 6px); left:50%; transform:translateX(-50%); background:rgba(7,13,20,0.97); border:1px solid rgba(0,229,255,0.18); border-radius:12px; padding:6px; min-width:210px; backdrop-filter:blur(24px); z-index:1000; box-shadow:0 12px 40px rgba(0,0,0,0.5); }
  .nav-dropdown-item { display:flex; align-items:center; gap:10px; padding:10px 14px; border-radius:8px; color:rgba(200,230,240,0.75); font-size:13px; font-weight:500; text-decoration:none; transition:all 0.12s; cursor:pointer; white-space:nowrap; background:none; border:none; font-family:'Outfit',sans-serif; width:100%; text-align:left; }
  .nav-dropdown-item:hover { background:rgba(0,229,255,0.08); color:var(--cyan); }
  .nav-dropdown-sep { height:1px; background:rgba(0,229,255,0.08); margin:4px 6px; }

  .nav-app { position:relative; overflow:hidden; padding:8px 20px; border-radius:999px; font-family:'Outfit',sans-serif; font-size:12.5px; font-weight:700; letter-spacing:0.5px; text-transform:uppercase; text-decoration:none; display:inline-block; cursor:pointer; color:#050a0f; background:linear-gradient(90deg,#00e5ff,#7b61ff,#ff4f6e,#ffb347,#00ff88,#00e5ff); background-size:280% 100%; border:none; transition:background-position 0.55s ease,box-shadow 0.3s ease; box-shadow:0 0 12px rgba(0,229,255,0.3); white-space:nowrap; }
  .nav-app:hover { background-position:100% 0; box-shadow:0 0 20px rgba(123,97,255,0.55),0 0 36px rgba(0,229,255,0.3); }

  @media(max-width:900px){
    .nav-links,.nav-sep { display:none; }
    .nav { padding:5px 5px 5px 14px; }
    .nav-brand { border-right:none; padding-right:8px; margin-right:0; }
    .nav-app { padding:7px 14px; font-size:11.5px; }
  }

  /* ── HERO ── */
  .le-hero { min-height:100vh; display:flex; align-items:center; justify-content:center; text-align:center; padding:100px 40px 80px; position:relative; overflow:hidden; background:var(--dark); }
  .le-hero-grid { position:absolute; inset:0; background-image:linear-gradient(var(--border) 1px,transparent 1px),linear-gradient(90deg,var(--border) 1px,transparent 1px); background-size:60px 60px; opacity:0.25; pointer-events:none; }
  .le-hero::before { content:''; position:absolute; top:-30%; left:50%; transform:translateX(-50%); width:900px; height:900px; border-radius:50%; background:radial-gradient(circle,rgba(0,229,255,0.07) 0%,transparent 60%); pointer-events:none; }
  .le-hero-content { position:relative; z-index:1; max-width:860px; }
  .le-badge { display:inline-flex; align-items:center; gap:8px; padding:6px 16px; border:1px solid rgba(0,229,255,0.3); background:rgba(0,229,255,0.05); margin-bottom:28px; font-size:12px; color:var(--cyan); letter-spacing:1.5px; text-transform:uppercase; }
  .le-badge-dot { width:6px; height:6px; background:var(--cyan); border-radius:50%; animation:pulse 2s infinite; }
  .le-title { font-size:clamp(44px,7vw,76px); font-weight:900; line-height:1; color:#fff; letter-spacing:-2px; margin-bottom:16px; }
  .le-title span { color:var(--cyan); }
  .le-sub { font-size:clamp(16px,2vw,20px); color:var(--muted); line-height:1.7; max-width:600px; margin:0 auto 48px; }
  .le-btns { display:flex; gap:14px; justify-content:center; flex-wrap:wrap; margin-bottom:72px; }
  .le-stats { display:flex; gap:48px; justify-content:center; flex-wrap:wrap; }
  .le-stat-val { font-size:30px; font-weight:900; color:#fff; }
  .le-stat-val span { color:var(--cyan); }
  .le-stat-lab { font-size:11px; color:var(--muted); letter-spacing:1px; text-transform:uppercase; margin-top:4px; }

  /* ── FEATURES ── */
  .le-features { background:var(--dark2); padding:100px 60px; }
  .le-inner { max-width:1140px; margin:0 auto; }
  .section-label { font-size:11px; font-weight:700; color:var(--cyan); letter-spacing:3px; text-transform:uppercase; margin-bottom:16px; display:flex; align-items:center; gap:10px; }
  .section-label::before { content:''; width:24px; height:1px; background:var(--cyan); }
  .section-label.center { justify-content:center; }
  .section-label.center::before { display:none; }
  .section-title { font-size:clamp(28px,4vw,44px); font-weight:800; color:#fff; line-height:1.1; margin-bottom:16px; letter-spacing:-0.5px; }
  .section-title span { color:var(--cyan); }
  .section-desc { font-size:16px; color:var(--muted); line-height:1.7; max-width:580px; }
  .center { text-align:center; }
  .center .section-desc { margin:0 auto; }

  .features-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:20px; margin-top:60px; }
  .feature-card { background:var(--dark3); border:1px solid var(--border); padding:36px 32px; position:relative; overflow:hidden; transition:border-color 0.25s,transform 0.25s; }
  .feature-card::before { content:''; position:absolute; top:0; left:0; right:0; height:2px; background:var(--cyan); transform:scaleX(0); transform-origin:left; transition:transform 0.35s; }
  .feature-card:hover { border-color:rgba(0,229,255,0.35); transform:translateY(-4px); }
  .feature-card:hover::before { transform:scaleX(1); }
  .feature-icon { width:56px; height:56px; background:rgba(0,229,255,0.08); border:1px solid rgba(0,229,255,0.18); display:flex; align-items:center; justify-content:center; font-size:26px; margin-bottom:20px; }
  .feature-name { font-size:20px; font-weight:800; color:#fff; margin-bottom:10px; }
  .feature-desc { font-size:14px; color:var(--muted); line-height:1.75; margin-bottom:16px; }
  .feature-tags { display:flex; flex-wrap:wrap; gap:6px; }
  .feature-tag { padding:3px 10px; border:1px solid rgba(0,229,255,0.2); background:rgba(0,229,255,0.05); font-size:11px; color:var(--cyan); font-weight:600; letter-spacing:0.5px; }

  /* ── EXCHANGES ── */
  .le-exchanges { padding:100px 60px; background:var(--dark); }
  .exchanges-grid { display:grid; grid-template-columns:repeat(5,1fr); gap:16px; margin-top:56px; }
  .exchange-card { background:var(--dark3); border:1px solid var(--border); padding:28px 20px; text-align:center; transition:border-color 0.25s,transform 0.2s; }
  .exchange-card:hover { transform:translateY(-4px); }
  .exchange-dot-large { width:14px; height:14px; border-radius:50%; margin:0 auto 14px; }
  .exchange-name { font-size:15px; font-weight:800; color:#fff; margin-bottom:6px; }
  .exchange-type { font-size:11px; color:var(--dimmed); letter-spacing:1px; text-transform:uppercase; }

  /* ── HOW IT WORKS ── */
  .le-how { padding:100px 60px; background:var(--dark2); }
  .steps-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:40px; margin-top:60px; position:relative; }
  .steps-grid::before { content:''; position:absolute; top:28px; left:calc(16.66% + 20px); right:calc(16.66% + 20px); height:1px; background:linear-gradient(90deg,var(--cyan),#7b61ff,var(--cyan)); opacity:0.3; }
  .step { display:flex; flex-direction:column; gap:16px; }
  .step-num { width:56px; height:56px; border:1px solid rgba(0,229,255,0.3); background:rgba(0,229,255,0.06); display:flex; align-items:center; justify-content:center; font-size:22px; font-weight:900; color:var(--cyan); }
  .step-title { font-size:20px; font-weight:700; color:#fff; }
  .step-desc { font-size:14px; color:var(--muted); line-height:1.7; }

  /* ── ACCESS ── */
  .le-access { padding:100px 60px; background:var(--dark); }
  .access-card { max-width:780px; margin:0 auto; background:linear-gradient(135deg,#0c1e2e,#071830 55%,#0a0f1e); border:1px solid rgba(0,229,255,0.25); padding:64px 56px; text-align:center; position:relative; overflow:hidden; box-shadow:0 0 60px rgba(0,229,255,0.06),0 24px 80px rgba(0,0,0,0.5); }
  .access-card::before { content:''; position:absolute; top:0; left:0; right:0; height:3px; background:linear-gradient(90deg,transparent,var(--cyan),#7b61ff,transparent); }
  .access-badge { display:inline-block; padding:5px 16px; border:1px solid rgba(0,229,255,0.3); background:rgba(0,229,255,0.06); font-size:11px; color:var(--cyan); font-weight:700; letter-spacing:2px; text-transform:uppercase; margin-bottom:24px; }
  .access-title { font-size:clamp(24px,3vw,38px); font-weight:900; color:#fff; margin-bottom:16px; letter-spacing:-0.5px; position:relative; z-index:1; }
  .access-title span { color:var(--cyan); }
  .access-desc { font-size:16px; color:var(--muted); line-height:1.7; margin-bottom:40px; max-width:540px; margin-left:auto; margin-right:auto; position:relative; z-index:1; }
  .access-items { display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-bottom:40px; text-align:left; }
  .access-item { display:flex; align-items:center; gap:12px; padding:14px 18px; background:rgba(0,229,255,0.04); border:1px solid rgba(0,229,255,0.1); font-size:14px; color:var(--text); }
  .access-check { color:var(--cyan); font-weight:900; font-size:14px; flex-shrink:0; }

  /* ── BUTTONS ── */
  .btn-glare { position:relative; overflow:hidden; padding:16px 44px; background:linear-gradient(135deg,#00c8e0,#00e5ff 45%,#7b61ff); color:#050a0f; font-family:'Outfit',sans-serif; font-size:15px; font-weight:800; border:none; cursor:pointer; letter-spacing:0.5px; border-radius:10px; text-decoration:none; display:inline-block; box-shadow:0 0 32px rgba(0,229,255,0.35),0 4px 20px rgba(0,0,0,0.4); transition:box-shadow 0.25s,transform 0.2s; }
  .btn-glare:hover { box-shadow:0 0 48px rgba(0,229,255,0.55),0 8px 32px rgba(0,0,0,0.5); transform:translateY(-2px); }
  .btn-glare-shine { position:absolute; top:0; left:-75%; width:50%; height:100%; background:linear-gradient(120deg,transparent 0%,rgba(255,255,255,0.45) 50%,transparent 100%); transform:skewX(-20deg); animation:glareSlide 3s ease-in-out infinite; }
  @keyframes glareSlide { 0%{left:-75%;opacity:0} 15%{opacity:1} 45%{left:130%;opacity:0} 100%{left:130%;opacity:0} }
  .btn-secondary { padding:14px 36px; background:transparent; color:var(--text); font-family:'Outfit',sans-serif; font-size:15px; font-weight:600; border:1px solid var(--border); cursor:pointer; transition:all 0.15s; text-decoration:none; display:inline-block; border-radius:10px; }
  .btn-secondary:hover { border-color:var(--cyan); color:var(--cyan); }

  /* ── TICKER ── */
  .ticker { background:var(--cyan); padding:10px 0; overflow:hidden; }
  .ticker-track { display:flex; gap:0; white-space:nowrap; animation:ticker 30s linear infinite; }
  @keyframes ticker { from{transform:translateX(0)} to{transform:translateX(-50%)} }
  .ticker-item { font-size:12px; font-weight:700; color:var(--dark); padding:0 32px; letter-spacing:2px; text-transform:uppercase; }

  /* ── FOOTER ── */
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

  @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }

  @media(max-width:900px) {
    .le-hero { padding:120px 20px 60px; min-height:auto; }
    .le-features,.le-exchanges,.le-how,.le-access { padding:70px 20px; }
    .features-grid { grid-template-columns:1fr; }
    .exchanges-grid { grid-template-columns:repeat(2,1fr); }
    .steps-grid { grid-template-columns:1fr; }
    .steps-grid::before { display:none; }
    .access-card { padding:40px 24px; }
    .access-items { grid-template-columns:1fr; }
    .footer { padding:48px 20px 24px; }
    .footer-top { grid-template-columns:1fr 1fr; }
    .le-stats { gap:28px; }
  }
`

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
  const [dropOpen, setDropOpen] = useState(false)
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
          <a className="nav-app" href="/app">Acceder al Ecosistema</a>
        </nav>
      </div>

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
