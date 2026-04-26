// src/pages/Home.jsx
import { useState, useEffect } from 'react'
import oscarImg from '../assets/OscarB1.jpg'
import cryptoHouseLogo from '../assets/cryptohouselogo.png'

// ── Top 15 CoinGecko IDs ──────────────────────────────────────────
const COIN_IDS = [
  'bitcoin','ethereum','tether','binancecoin','solana',
  'ripple','usd-coin','dogecoin','cardano','tron',
  'avalanche-2','chainlink','shiba-inu','polkadot','bitcoin-cash',
]
const COIN_META = {
  bitcoin:        { symbol:'BTC' },
  ethereum:       { symbol:'ETH' },
  tether:         { symbol:'USDT' },
  binancecoin:    { symbol:'BNB' },
  solana:         { symbol:'SOL' },
  ripple:         { symbol:'XRP' },
  'usd-coin':     { symbol:'USDC' },
  dogecoin:       { symbol:'DOGE' },
  cardano:        { symbol:'ADA' },
  tron:           { symbol:'TRX' },
  'avalanche-2':  { symbol:'AVAX' },
  chainlink:      { symbol:'LINK' },
  'shiba-inu':    { symbol:'SHIB' },
  polkadot:       { symbol:'DOT' },
  'bitcoin-cash': { symbol:'BCH' },
}

function fmtPrice(p) {
  if (!p && p !== 0) return '—'
  if (p >= 1000) return '$' + p.toLocaleString('en-US', { maximumFractionDigits: 0 })
  if (p >= 1)    return '$' + p.toFixed(2)
  if (p >= 0.01) return '$' + p.toFixed(4)
  return '$' + p.toFixed(8)
}

function CryptoPriceBar() {
  const [coins, setCoins]           = useState([])
  const [globalData, setGlobalData] = useState(null)
  const [lastUpdate, setLastUpdate] = useState(null)

  const fetchAll = async () => {
    try {
      const [pRes, gRes] = await Promise.all([
        fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${COIN_IDS.join(',')}&order=market_cap_desc&per_page=15&page=1&sparkline=false&price_change_percentage=24h`),
        fetch('https://api.coingecko.com/api/v3/global'),
      ])
      if (pRes.ok) { setCoins(await pRes.json()); setLastUpdate(new Date()) }
      if (gRes.ok) { const g = await gRes.json(); setGlobalData(g.data) }
    } catch {}
  }

  useEffect(() => {
    fetchAll()
    const t = setInterval(fetchAll, 60000)
    return () => clearInterval(t)
  }, [])

  const btcDom    = globalData?.market_cap_percentage?.btc?.toFixed(1)
  const ethDom    = globalData?.market_cap_percentage?.eth?.toFixed(1)
  const totalMcap = globalData?.total_market_cap?.usd
  const fmtMcap   = (v) => !v ? '—' : v >= 1e12 ? '$'+(v/1e12).toFixed(2)+'T' : '$'+(v/1e9).toFixed(0)+'B'

  const items  = coins.map(c => ({ ...c, symbol: COIN_META[c.id]?.symbol || c.symbol?.toUpperCase(), change: c.price_change_percentage_24h || 0 }))
  const doubled = [...items, ...items]

  const pill = { display:'flex', alignItems:'center', gap:5, padding:'0 12px', height:'100%', flexShrink:0, borderRight:'1px solid rgba(0,229,255,0.08)' }

  return (
    <div style={{ position:'fixed', top:0, left:0, right:0, zIndex:200, background:'#020810', borderBottom:'1px solid rgba(0,229,255,0.12)', height:32, overflow:'hidden', display:'flex', alignItems:'center', fontFamily:"'Outfit',sans-serif" }}>

      {/* LIVE badge */}
      <div style={{ ...pill, background:'rgba(0,229,255,0.04)', borderRight:'1px solid rgba(0,229,255,0.2)', gap:7 }}>
        <div style={{ width:5, height:5, borderRadius:'50%', background:'#00e5ff', boxShadow:'0 0 6px #00e5ff', animation:'livePulse 2s infinite' }} />
        <span style={{ fontSize:9, fontWeight:800, color:'#00e5ff', letterSpacing:2, textTransform:'uppercase' }}>CRYPTO LIVE</span>
      </div>

      {/* Global indicators */}
      {btcDom && <div style={pill}><span style={{ fontSize:9, color:'#2a5a72', letterSpacing:1, textTransform:'uppercase' }}>BTC DOM</span><span style={{ fontSize:11, fontWeight:700, color:'#f7931a' }}>{btcDom}%</span></div>}
      {ethDom && <div style={pill}><span style={{ fontSize:9, color:'#2a5a72', letterSpacing:1, textTransform:'uppercase' }}>ETH DOM</span><span style={{ fontSize:11, fontWeight:700, color:'#627eea' }}>{ethDom}%</span></div>}
      {totalMcap && <div style={pill}><span style={{ fontSize:9, color:'#2a5a72', letterSpacing:1, textTransform:'uppercase' }}>MKT CAP</span><span style={{ fontSize:11, fontWeight:700, color:'#c8e6f0' }}>{fmtMcap(totalMcap)}</span></div>}

      {/* Scrolling coins */}
      <div style={{ flex:1, overflow:'hidden', height:'100%' }}>
        {items.length === 0 ? (
          <div style={{ display:'flex', alignItems:'center', height:'100%', paddingLeft:16, fontSize:10, color:'#2a5a72' }}>Cargando precios...</div>
        ) : (
          <div style={{ display:'flex', alignItems:'center', height:'100%', whiteSpace:'nowrap', animation:'priceScroll 90s linear infinite' }}>
            {doubled.map((c, i) => (
              <div key={i} style={{ display:'inline-flex', alignItems:'center', gap:7, padding:'0 16px', height:'100%', borderRight:'1px solid rgba(0,229,255,0.05)' }}>
                <span style={{ fontSize:11, fontWeight:700, color:'#e0f4ff' }}>{c.symbol}</span>
                <span style={{ fontSize:11, color:'#7ab8d4' }}>{fmtPrice(c.current_price)}</span>
                <span style={{ fontSize:10, fontWeight:700, color: c.change >= 0 ? '#00ff88' : '#ff4f6e' }}>
                  {c.change >= 0 ? '▲' : '▼'} {Math.abs(c.change).toFixed(2)}%
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {lastUpdate && (
        <div style={{ padding:'0 10px', flexShrink:0, fontSize:9, color:'#1a3a5e', borderLeft:'1px solid rgba(0,229,255,0.08)', whiteSpace:'nowrap' }}>
          ↻ {lastUpdate.toLocaleTimeString('es-CO', { hour:'2-digit', minute:'2-digit' })}
        </div>
      )}

      <style>{`
        @keyframes priceScroll { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        @keyframes livePulse { 0%,100%{opacity:1;box-shadow:0 0 6px #00e5ff} 50%{opacity:0.4;box-shadow:0 0 2px #00e5ff} }
      `}</style>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --cyan:    #00e5ff;
    --dark:    #050a0f;
    --dark2:   #070d14;
    --dark3:   #0a1520;
    --border:  #0e2435;
    --text:    #c8e6f0;
    --muted:   #4a7a96;
    --dimmed:  #2a5a72;
  }

  html { scroll-behavior: smooth; }

  body {
    font-family: 'Outfit', sans-serif;
    background: var(--dark);
    color: var(--text);
    overflow-x: hidden;
  }

  /* ── NAVBAR — debajo del price bar (32px) ── */
  .nav {
    position: fixed; top: 32px; left: 0; right: 0; z-index: 100;
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 60px; height: 72px;
    background: rgba(5,10,15,0.92);
    border-bottom: 1px solid var(--border);
    backdrop-filter: blur(20px);
  }
  .nav-brand { display: flex; align-items: center; gap: 12px; text-decoration: none; }
  .nav-icon {
    width: 38px; height: 38px; background: var(--cyan);
    display: flex; align-items: center; justify-content: center;
    font-weight: 900; font-size: 16px; color: var(--dark); letter-spacing: -1px;
  }
  .nav-name { font-size: 13px; font-weight: 700; color: var(--cyan); letter-spacing: 2px; text-transform: uppercase; }
  .nav-sub  { font-size: 10px; color: var(--dimmed); letter-spacing: 1px; text-transform: uppercase; }
  .nav-links { display: flex; align-items: center; gap: 32px; }
  .nav-link {
    font-size: 14px; color: var(--muted); text-decoration: none;
    font-weight: 500; transition: color 0.15s; letter-spacing: 0.3px; cursor: pointer;
  }
  .nav-link:hover { color: var(--cyan); }
  .nav-link.active { color: var(--cyan); }
  .nav-cta {
    padding: 9px 24px; background: var(--cyan); color: var(--dark);
    font-family: 'Outfit', sans-serif; font-size: 13px; font-weight: 700;
    border: none; cursor: pointer; letter-spacing: 0.5px; text-transform: uppercase;
    transition: opacity 0.15s; text-decoration: none; display: inline-block;
  }
  .nav-cta:hover { opacity: 0.88; }
  .nav-ghost {
    padding: 9px 24px; background: transparent; color: var(--text);
    font-family: 'Outfit', sans-serif; font-size: 13px; font-weight: 600;
    border: 1px solid var(--border); cursor: pointer; letter-spacing: 0.3px;
    transition: all 0.15s; text-decoration: none; display: inline-block; margin-right: 12px;
  }
  .nav-ghost:hover { border-color: var(--cyan); color: var(--cyan); }

  /* ── HERO ── */
  .hero {
    min-height: 100vh; display: flex; align-items: center; justify-content: center;
    text-align: center; padding: 120px 40px 80px;
    position: relative; overflow: hidden;
    background: var(--dark);
  }
  .hero::before {
    content: '';
    position: absolute; top: -40%; left: 50%; transform: translateX(-50%);
    width: 800px; height: 800px; border-radius: 50%;
    background: radial-gradient(circle, rgba(0,229,255,0.06) 0%, transparent 65%);
    pointer-events: none;
  }
  .hero-grid {
    position: absolute; inset: 0;
    background-image: linear-gradient(var(--border) 1px, transparent 1px),
                      linear-gradient(90deg, var(--border) 1px, transparent 1px);
    background-size: 60px 60px; opacity: 0.3; pointer-events: none;
  }
  .hero-content { position: relative; z-index: 1; max-width: 820px; }
  .hero-badge {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 6px 16px; border: 1px solid rgba(0,229,255,0.3);
    background: rgba(0,229,255,0.05); margin-bottom: 28px;
    font-size: 12px; color: var(--cyan); letter-spacing: 1.5px; text-transform: uppercase;
  }
  .hero-badge-dot { width: 6px; height: 6px; background: var(--cyan); border-radius: 50%; animation: pulse 2s infinite; }
  @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
  .hero-title {
    font-size: clamp(42px, 7vw, 72px); font-weight: 900;
    line-height: 1.05; margin-bottom: 12px;
    color: #fff; letter-spacing: -1px;
  }
  .hero-title span { color: var(--cyan); }
  .hero-sub {
    font-size: clamp(16px, 2vw, 20px); color: var(--muted);
    line-height: 1.7; max-width: 580px; margin: 0 auto 40px;
    font-weight: 400;
  }
  .hero-btns { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; margin-bottom: 60px; }
  .btn-primary {
    padding: 15px 36px; background: var(--cyan); color: var(--dark);
    font-family: 'Outfit', sans-serif; font-size: 15px; font-weight: 700;
    border: none; cursor: pointer; letter-spacing: 0.5px; text-transform: uppercase;
    transition: all 0.15s; text-decoration: none; display: inline-block;
  }
  .btn-primary:hover { opacity: 0.88; transform: translateY(-1px); }
  .btn-secondary {
    padding: 15px 36px; background: transparent; color: var(--text);
    font-family: 'Outfit', sans-serif; font-size: 15px; font-weight: 600;
    border: 1px solid var(--border); cursor: pointer;
    transition: all 0.15s; text-decoration: none; display: inline-block;
  }
  .btn-secondary:hover { border-color: var(--cyan); color: var(--cyan); }

  .hero-stats { display: flex; gap: 48px; justify-content: center; flex-wrap: wrap; }
  .hero-stat-val { font-size: 32px; font-weight: 800; color: #fff; }
  .hero-stat-val span { color: var(--cyan); }
  .hero-stat-lab { font-size: 12px; color: var(--muted); letter-spacing: 1px; text-transform: uppercase; margin-top: 4px; }

  /* ── SECTIONS COMMON ── */
  section { padding: 100px 60px; }
  .section-label {
    font-size: 11px; font-weight: 700; color: var(--cyan);
    letter-spacing: 3px; text-transform: uppercase; margin-bottom: 16px;
    display: flex; align-items: center; gap: 10px;
  }
  .section-label::before { content: ''; width: 24px; height: 1px; background: var(--cyan); }
  .section-title {
    font-size: clamp(32px, 4vw, 48px); font-weight: 800;
    color: #fff; line-height: 1.1; margin-bottom: 16px; letter-spacing: -0.5px;
  }
  .section-title span { color: var(--cyan); }
  .section-desc { font-size: 17px; color: var(--muted); line-height: 1.7; max-width: 580px; }
  .center { text-align: center; }
  .center .section-label { justify-content: center; }
  .center .section-label::before { display: none; }
  .center .section-desc { margin: 0 auto; }

  /* ── ABOUT (Oscar) ── */
  .about { background: var(--dark); }
  .about-inner {
    max-width: 1140px; margin: 0 auto;
    display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center;
  }
  .about-img-wrap { position: relative; }
  .about-img-box {
    width: 100%; aspect-ratio: 4/5; background: var(--dark3);
    border: 1px solid var(--border); position: relative; overflow: hidden;
  }
  .about-img-placeholder {
    width: 100%; height: 100%;
    display: flex; align-items: center; justify-content: center;
    background: linear-gradient(135deg, #0a1520 0%, #050a0f 100%);
    font-size: 80px; color: var(--border);
  }
  .about-accent {
    position: absolute; bottom: -20px; right: -20px;
    width: 140px; height: 140px; background: var(--cyan);
    display: flex; align-items: center; justify-content: center;
    flex-direction: column; gap: 4px; z-index: 1;
  }
  .about-accent-num { font-size: 36px; font-weight: 900; color: var(--dark); line-height: 1; }
  .about-accent-lab { font-size: 10px; font-weight: 700; color: var(--dark); letter-spacing: 1px; text-transform: uppercase; text-align: center; }
  .about-content { display: flex; flex-direction: column; gap: 20px; }
  .about-tag { font-size: 12px; color: var(--cyan); letter-spacing: 2px; text-transform: uppercase; font-weight: 600; }
  .about-name { font-size: 48px; font-weight: 900; color: #fff; line-height: 1; letter-spacing: -1px; }
  .about-role { font-size: 18px; color: var(--muted); font-weight: 500; }
  .about-text { font-size: 15px; color: var(--muted); line-height: 1.8; }
  .about-highlights { display: flex; flex-direction: column; gap: 12px; }
  .about-hl {
    display: flex; align-items: center; gap: 14px;
    font-size: 14px; color: var(--text); font-weight: 500;
  }
  .about-hl-dot { width: 8px; height: 8px; background: var(--cyan); flex-shrink: 0; }

  /* ── SERVICES (Cursos) ── */
  .services { background: var(--dark2); }
  .services-inner { max-width: 1140px; margin: 0 auto; }
  .services-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-top: 60px; }
  .service-card {
    background: var(--dark3); border: 1px solid var(--border);
    padding: 36px 32px; display: flex; flex-direction: column; gap: 16px;
    transition: border-color 0.2s, transform 0.2s;
    position: relative; overflow: hidden;
  }
  .service-card::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
    background: var(--cyan); transform: scaleX(0); transform-origin: left;
    transition: transform 0.3s;
  }
  .service-card:hover { border-color: rgba(0,229,255,0.3); transform: translateY(-4px); }
  .service-card:hover::before { transform: scaleX(1); }
  .service-icon {
    width: 48px; height: 48px; background: rgba(0,229,255,0.08);
    border: 1px solid rgba(0,229,255,0.15);
    display: flex; align-items: center; justify-content: center;
    font-size: 22px;
  }
  .service-badge {
    display: inline-block; padding: 3px 10px;
    background: rgba(0,229,255,0.08); border: 1px solid rgba(0,229,255,0.2);
    font-size: 10px; color: var(--cyan); font-weight: 700; letter-spacing: 1px;
    text-transform: uppercase; align-self: flex-start;
  }
  .service-name { font-size: 22px; font-weight: 800; color: #fff; }
  .service-sub  { font-size: 12px; color: var(--cyan); font-weight: 600; letter-spacing: 1px; text-transform: uppercase; }
  .service-desc { font-size: 14px; color: var(--muted); line-height: 1.7; }
  .service-list { display: flex; flex-direction: column; gap: 8px; }
  .service-li {
    display: flex; align-items: center; gap: 10px;
    font-size: 13px; color: var(--text);
  }
  .service-li::before { content: '●'; color: var(--cyan); font-size: 8px; flex-shrink: 0; }
  .service-btn {
    margin-top: auto; padding: 12px 0; background: transparent;
    border: 1px solid var(--border); color: var(--muted);
    font-family: 'Outfit', sans-serif; font-size: 13px; font-weight: 700;
    letter-spacing: 1px; text-transform: uppercase; cursor: pointer;
    transition: all 0.15s; text-align: center; text-decoration: none; display: block;
  }
  .service-btn:hover { border-color: var(--cyan); color: var(--cyan); }

  /* ── WHY US ── */
  .why { background: var(--dark); }
  .why-inner { max-width: 1140px; margin: 0 auto; }
  .why-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px; margin-top: 60px; }
  .why-card { display: flex; flex-direction: column; gap: 16px; padding: 8px 0; }
  .why-num {
    font-size: 48px; font-weight: 900; color: rgba(0,229,255,0.15);
    line-height: 1; font-variant-numeric: tabular-nums;
  }
  .why-title { font-size: 20px; font-weight: 700; color: #fff; }
  .why-desc  { font-size: 14px; color: var(--muted); line-height: 1.7; }
  .why-line  { width: 40px; height: 2px; background: var(--cyan); margin-top: 4px; }

  /* ── DARK CTA BAND ── */
  .band {
    background: linear-gradient(135deg, #071a14 0%, #050a0f 50%, #071020 100%);
    border-top: 1px solid var(--border); border-bottom: 1px solid var(--border);
    padding: 80px 60px; text-align: center;
  }
  .band-title { font-size: clamp(28px, 4vw, 44px); font-weight: 900; color: #fff; margin-bottom: 16px; letter-spacing: -0.5px; }
  .band-title span { color: var(--cyan); }
  .band-sub { font-size: 16px; color: var(--muted); margin-bottom: 36px; }

  /* ── TESTIMONIALS ── */
  .testimonials { background: var(--dark2); }
  .testimonials-inner { max-width: 1140px; margin: 0 auto; }
  .testimonials-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-top: 60px; }
  .testi-card {
    background: var(--dark3); border: 1px solid var(--border);
    padding: 32px; display: flex; flex-direction: column; gap: 20px;
  }
  .testi-quote { font-size: 14px; color: var(--text); line-height: 1.8; font-style: italic; flex: 1; }
  .testi-quote::before { content: '"'; color: var(--cyan); font-size: 32px; font-style: normal; line-height: 0; vertical-align: -12px; margin-right: 4px; }
  .testi-author { display: flex; align-items: center; gap: 12px; }
  .testi-avatar {
    width: 44px; height: 44px; background: var(--cyan);
    display: flex; align-items: center; justify-content: center;
    font-weight: 800; font-size: 16px; color: var(--dark); flex-shrink: 0;
  }
  .testi-name { font-size: 14px; font-weight: 700; color: #fff; }
  .testi-role { font-size: 12px; color: var(--cyan); }
  .testi-stars { color: var(--cyan); font-size: 13px; margin-top: 4px; }

  /* ── FAQ ── */
  .faq { background: var(--dark); }
  .faq-inner { max-width: 780px; margin: 0 auto; }
  .faq-list  { display: flex; flex-direction: column; gap: 0; margin-top: 60px; }
  .faq-item  { border-bottom: 1px solid var(--border); }
  .faq-q {
    width: 100%; padding: 24px 0; background: none; border: none;
    display: flex; justify-content: space-between; align-items: center;
    cursor: pointer; font-family: 'Outfit', sans-serif;
    font-size: 16px; font-weight: 600; color: #fff; text-align: left; gap: 16px;
    transition: color 0.15s;
  }
  .faq-q:hover { color: var(--cyan); }
  .faq-icon { font-size: 20px; color: var(--cyan); flex-shrink: 0; line-height: 1; transition: transform 0.2s; }
  .faq-icon.open { transform: rotate(45deg); }
  .faq-a { font-size: 15px; color: var(--muted); line-height: 1.8; padding-bottom: 24px; }

  /* ── CONTACT ── */
  .contact { background: var(--dark2); }
  .contact-inner { max-width: 1140px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: start; }
  .contact-methods { display: flex; flex-direction: column; gap: 16px; margin-top: 32px; }
  .contact-card {
    display: flex; align-items: center; gap: 16px;
    padding: 20px 24px; background: var(--dark3); border: 1px solid var(--border);
    text-decoration: none; transition: border-color 0.15s;
  }
  .contact-card:hover { border-color: var(--cyan); }
  .contact-card-icon { font-size: 24px; }
  .contact-card-label { font-size: 13px; font-weight: 700; color: #fff; }
  .contact-card-val   { font-size: 12px; color: var(--muted); margin-top: 2px; }
  .contact-arrow { margin-left: auto; color: var(--cyan); font-size: 18px; }
  .contact-form { display: flex; flex-direction: column; gap: 16px; }
  .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  .form-group { display: flex; flex-direction: column; gap: 6px; }
  .form-label { font-size: 11px; font-weight: 600; color: var(--muted); letter-spacing: 1px; text-transform: uppercase; }
  .form-input, .form-textarea {
    background: var(--dark3); border: 1px solid var(--border);
    color: var(--text); padding: 12px 16px;
    font-family: 'Outfit', sans-serif; font-size: 14px; outline: none;
    transition: border-color 0.15s; resize: none;
  }
  .form-input:focus, .form-textarea:focus { border-color: var(--cyan); }
  .form-input::placeholder, .form-textarea::placeholder { color: var(--dimmed); }
  .form-submit {
    padding: 14px; background: var(--cyan); color: var(--dark);
    font-family: 'Outfit', sans-serif; font-size: 14px; font-weight: 700;
    border: none; cursor: pointer; letter-spacing: 1px; text-transform: uppercase;
    transition: opacity 0.15s;
  }
  .form-submit:hover { opacity: 0.88; }
  .form-success {
    background: #001a0e; border: 1px solid #003a22;
    padding: 14px; font-size: 14px; color: #00ff88; text-align: center;
  }

  /* ── FOOTER ── */
  .footer { background: var(--dark); border-top: 1px solid var(--border); padding: 60px 60px 32px; }
  .footer-inner { max-width: 1140px; margin: 0 auto; }
  .footer-top { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 48px; margin-bottom: 48px; }
  .footer-brand-desc { font-size: 14px; color: var(--muted); line-height: 1.7; margin: 16px 0 20px; max-width: 280px; }
  .footer-socials { display: flex; gap: 12px; }
  .footer-social {
    width: 36px; height: 36px; border: 1px solid var(--border);
    display: flex; align-items: center; justify-content: center;
    color: var(--muted); text-decoration: none; font-size: 14px; font-weight: 700;
    transition: all 0.15s;
  }
  .footer-social:hover { border-color: var(--cyan); color: var(--cyan); }
  .footer-col-title { font-size: 12px; font-weight: 700; color: #fff; letter-spacing: 1.5px; text-transform: uppercase; margin-bottom: 20px; }
  .footer-links { display: flex; flex-direction: column; gap: 12px; }
  .footer-link { font-size: 14px; color: var(--muted); text-decoration: none; transition: color 0.15s; }
  .footer-link:hover { color: var(--cyan); }
  .footer-bottom {
    border-top: 1px solid var(--border); padding-top: 24px;
    display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;
    font-size: 12px; color: var(--dimmed);
  }
  .footer-disclaimer { font-size: 11px; color: var(--dimmed); line-height: 1.7; margin-top: 24px; padding-top: 24px; border-top: 1px solid var(--border); }

  /* ── TICKER BAND ── */
  .ticker { background: var(--cyan); padding: 10px 0; overflow: hidden; }
  .ticker-track {
    display: flex; gap: 0; white-space: nowrap;
    animation: ticker 30s linear infinite;
  }
  @keyframes ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }
  .ticker-item { font-size: 12px; font-weight: 700; color: var(--dark); padding: 0 32px; letter-spacing: 2px; text-transform: uppercase; }
  .ticker-sep { color: rgba(5,10,15,0.4); }

  /* ── RESPONSIVE ── */
  @media (max-width: 900px) {
    .nav { padding: 0 24px; top: 32px; }
    .nav-links { display: none; }
    section { padding: 70px 24px; }
    .about-inner, .contact-inner { grid-template-columns: 1fr; gap: 40px; }
    .services-grid, .why-grid, .testimonials-grid { grid-template-columns: 1fr; }
    .footer-top { grid-template-columns: 1fr 1fr; }
    .form-row { grid-template-columns: 1fr; }
    .hero { padding: 100px 24px 60px; }
    .band { padding: 60px 24px; }
    .footer { padding: 48px 24px 24px; }
  }
`

const FAQS = [
  {
    q: '¿Necesito experiencia previa en trading para unirme?',
    a: 'No. Nuestros programas están diseñados desde cero. Comenzamos con los fundamentos y avanzamos progresivamente hasta estrategias profesionales. Lo único que necesitas es disciplina y ganas de aprender.',
  },
  {
    q: '¿Qué incluye el Bootcamp Crypto?',
    a: 'Incluye acceso completo a la plataforma, sesiones en vivo semanales, grabaciones de todas las clases, herramientas de análisis, comunidad privada en WhatsApp y acompañamiento personalizado por 90 días.',
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
    sub: 'Inversión en Criptomonedas',
    desc: 'Aprende a invertir en criptomonedas de manera profesional. Análisis técnico, gestión de riesgo, DeFi, Liquidity Pools y estrategias avanzadas para mercados 24/7.',
    list: ['Análisis técnico cripto', 'DeFi & Liquidity Mining', 'Gestión de riesgo', 'Herramientas profesionales', 'Comunidad privada'],
  },
  {
    icon: '📊',
    badge: 'Nuevo',
    name: 'Express Trading',
    sub: 'Trading de Futuros',
    desc: 'Domina el trading de contratos de futuros en Forex y cripto. Estrategias de breakout, gestión de posiciones y psicología del trader profesional.',
    list: ['Futuros Forex & Cripto', 'Estrategias de breakout', 'Gestión de capital', 'Trading en vivo', 'Mentorías 1 a 1'],
  },
  {
    icon: '🏛',
    badge: 'Avanzado',
    name: 'Liquidity Engine',
    sub: 'DeFi Automatizado',
    desc: 'Nuestra herramienta exclusiva para gestionar pools de liquidez en Uniswap V3. Coberturas automáticos, monitoreo 24/7 y trading automatizado en Hyperliquid.',
    list: ['Pools Uniswap V3', 'Cobertura automático SHORT', 'Bot de trading', 'Dashboard futurista', 'Acceso exclusivo'],
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
  { num: '01', title: 'Resultados en tiempo récord', desc: 'Metodología práctica diseñada para que en 90 días tengas el conocimiento y las herramientas para invertir con confianza. Sin rellenos, directo al punto.' },
  { num: '02', title: 'Acompañamiento personalizado', desc: 'No estarás solo. Tendrás acceso directo a Oscar y a la comunidad en todo momento. Preguntas respondidas en menos de 2 horas, garantizado.' },
  { num: '03', title: 'Tecnología exclusiva', desc: 'Acceso al Liquidity Engine, nuestra plataforma DeFi propia para gestionar pools de liquidez con Coberturas automáticos. Una herramienta que no encontrarás en ningún otro lugar.' },
]

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
  const [formData, setFormData] = useState({ name:'', email:'', msg:'' })
  const [sent, setSent] = useState(false)

  const handleContact = (e) => {
    e.preventDefault()
    if (!formData.name || !formData.msg) return
    const subject = encodeURIComponent(`The Crypto House — Mensaje de ${formData.name}`)
    const body    = encodeURIComponent(`Nombre: ${formData.name}\nEmail: ${formData.email}\n\n${formData.msg}`)
    window.location.href = `mailto:profeoscarbol@gmail.com?subject=${subject}&body=${body}`
    setSent(true)
  }

  const scrollTo  = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  const TICKER_ITEMS = ['Bootcamp Crypto', '·', 'Trading de Futuros', '·', 'DeFi & Liquidity Pools', '·', 'Hyperliquid', '·', 'Uniswap V3', '·', 'Formación Profesional', '·']

  return (
    <>
      <style>{CSS}</style>

      {/* ── CRYPTO PRICE BAR (fixed top: 0) ── */}
      <CryptoPriceBar />

      {/* ── NAVBAR (fixed top: 32px, debajo del price bar) ── */}
      <nav className="nav">
        <a href="#" className="nav-brand" onClick={e => { e.preventDefault(); scrollTop(); }}>
          <img src={cryptoHouseLogo} alt="The Crypto House" style={{ height:38, width:'auto', objectFit:'contain' }} />
          <div>
            <div className="nav-name">The Crypto House</div>
          </div>
        </a>
        <div className="nav-links">
          <a className="nav-link" onClick={e => { e.preventDefault(); scrollTop(); }} href="#">INICIO</a>
          <a className="nav-link" onClick={() => scrollTo('sobre')} href="#">INSTRUCTOR</a>
          <a className="nav-link" onClick={() => scrollTo('cursos')} href="#">FORMACIÓN</a>
          <a className="nav-link" onClick={() => scrollTo('faq')} href="#">FAQ</a>
          <a className="nav-link" onClick={() => scrollTo('contacto')} href="#">CONTACTO</a>
        </div>
        <div style={{ display:'flex', alignItems:'center' }}>
          <a className="nav-ghost" href="/app" target="_blank" rel="noreferrer">Ir al App</a>
          <a className="nav-cta" onClick={() => scrollTo('contacto')} href="#">Hablar con Oscar →</a>
        </div>
      </nav>

      {/* TICKER — price bar (32) + navbar (72) = 104px */}
      <div className="ticker" style={{ marginTop: 104 }}>
        <div className="ticker-track">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span key={i} className="ticker-item">{item}</span>
          ))}
        </div>
      </div>

      {/* HERO */}
      <section className="hero" id="inicio" style={{ marginTop: 0, paddingTop: 80 }}>
        <div className="hero-grid" />
        <div className="hero-content">
          <div className="hero-badge">
            <div className="hero-badge-dot" />
            Formación de Trading Profesional · Colombia
          </div>
          <h1 className="hero-title">
            Tu camino hacia la<br />
            <span>libertad financiera</span><br />
            empieza aquí.
          </h1>
          <p className="hero-sub">
            Aprende a invertir en cripto, trading de futuros y DeFi (Finanzas Descentralizadas) con metodología
            práctica y acompañamiento personalizado. Sin experiencia previa necesaria.
          </p>
          <div className="hero-btns">
            <a className="btn-primary" onClick={() => scrollTo('cursos')} href="#">
              Ver programas →
            </a>
            <a className="btn-secondary" onClick={() => scrollTo('sobre')} href="#">
              Conocer a Oscar
            </a>
          </div>
          <div className="hero-stats">
            <div>
              <div className="hero-stat-val"><span>+</span>50</div>
              <div className="hero-stat-lab">Estudiantes formados</div>
            </div>
            <div>
              <div className="hero-stat-val">90</div>
              <div className="hero-stat-lab">Días al resultado</div>
            </div>
            <div>
              <div className="hero-stat-val"><span>3</span></div>
              <div className="hero-stat-lab">Programas activos</div>
            </div>
            <div>
              <div className="hero-stat-val"><span>7</span></div>
              <div className="hero-stat-lab">Días de garantía</div>
            </div>
          </div>
        </div>
      </section>

      {/* SOBRE MÍ */}
      <section className="about" id="sobre">
        <div className="about-inner">
          <div className="about-img-wrap">
            <div className="about-img-box">
              <img src={oscarImg} alt="Oscar Bolaños" style={{ width:'100%', height:'100%', objectFit:'cover' }} />
            </div>
            <div className="about-accent">
              <div className="about-accent-num">+50</div>
              <div className="about-accent-lab">Estudiantes formados</div>
            </div>
          </div>
          <div className="about-content">
            <div className="about-tag">Fundador · The Crypto House</div>
            <div className="about-name">Oscar Bolaños</div>
            <div className="about-role">Trader profesional & Mentor de inversiones</div>
            <p className="about-text">
              Soy Oscar, trader profesional especializado en criptomonedas, DeFi y trading de futuros.
              Llevo años operando los mercados y formando a cientos de personas para que logren
              independencia financiera a través de las inversiones.
            </p>
            <p className="about-text">
              Creé The Crypto House con una misión clara: democratizar el acceso a la educación
              financiera de calidad. Mi metodología combina teoría sólida con práctica real,
              acompañamiento cercano y herramientas tecnológicas propias como el Liquidity Engine.
            </p>
            <div className="about-highlights">
              {[
                'Especialista en Uniswap V3 y Liquidity Mining',
                'Desarrollador del Liquidity Engine — herramienta DeFi propia',
                'Más de 500 estudiantes formados en Colombia y Latam',
                'Acompañamiento 1 a 1 garantizado en todos los programas',
              ].map((h, i) => (
                <div key={i} className="about-hl">
                  <div className="about-hl-dot" />
                  {h}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TICKER 2 */}
      <div className="ticker">
        <div className="ticker-track" style={{ animationDirection:'reverse' }}>
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
              Desde principiantes hasta traders avanzados. Cada programa está diseñado
              para llevarte al siguiente nivel con metodología práctica y resultados reales.
            </p>
          </div>
          <div className="services-grid">
            {SERVICES.map((s, i) => (
              <div key={i} className="service-card">
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
                  <div className="service-icon">{s.icon}</div>
                  <div className="service-badge">{s.badge}</div>
                </div>
                <div>
                  <div className="service-name">{s.name}</div>
                  <div className="service-sub">{s.sub}</div>
                </div>
                <div className="service-desc">{s.desc}</div>
                <div className="service-list">
                  {s.list.map((li, j) => <div key={j} className="service-li">{li}</div>)}
                </div>
                <a className="service-btn" onClick={() => scrollTo('contacto')} href="#">
                  Quiero información →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="why">
        <div className="why-inner">
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:60, alignItems:'center', marginBottom:60 }}>
            <div>
              <div className="section-label">Por qué elegirnos</div>
              <h2 className="section-title">No somos otro<br /><span>curso de internet.</span></h2>
            </div>
            <p className="section-desc" style={{ alignSelf:'end' }}>
              Somos una comunidad real de traders con resultados comprobados.
              Nuestro diferencial está en el acompañamiento, la tecnología propia
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
        <h2 className="band-title">¿Listo para transformar<br /><span>tu relación con el dinero?</span></h2>
        <p className="band-sub">Únete a más de 500 estudiantes que ya están invirtiendo con confianza.</p>
        <a className="btn-primary" onClick={() => scrollTo('contacto')} href="#"
          style={{ fontSize:16, padding:'16px 48px' }}>
          Empezar ahora →
        </a>
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
          <div className="center" style={{ marginBottom:0 }}>
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
            <p className="section-desc" style={{ marginTop:12 }}>
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
            <div style={{ fontSize:18, fontWeight:700, color:'#fff', marginBottom:24 }}>
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
                      value={formData.name} onChange={e => setFormData(p => ({...p, name:e.target.value}))} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email</label>
                    <input className="form-input" type="email" placeholder="tu@email.com"
                      value={formData.email} onChange={e => setFormData(p => ({...p, email:e.target.value}))} />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">¿En qué programa estás interesado? *</label>
                  <textarea className="form-textarea" rows={5}
                    placeholder="Cuéntame sobre tu experiencia actual y qué programa te interesa..."
                    value={formData.msg} onChange={e => setFormData(p => ({...p, msg:e.target.value}))} />
                </div>
                <button className="form-submit" type="submit">
                  Enviar mensaje →
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
              <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:4 }}>
                <img src={cryptoHouseLogo} alt="The Crypto House" style={{ height:38, width:'auto', objectFit:'contain' }} />
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
                <a className="footer-link" href="#">Express Trading</a>
                <a className="footer-link" href="#">Liquidity Engine</a>
              </div>
            </div>
            <div>
              <div className="footer-col-title">Compañía</div>
              <div className="footer-links">
                <a className="footer-link" onClick={() => scrollTo('sobre')} href="#">Sobre Oscar</a>
                <a className="footer-link" onClick={() => scrollTo('faq')} href="#">FAQ</a>
                <a className="footer-link" onClick={() => scrollTo('contacto')} href="#">Contacto</a>
              </div>
            </div>
            <div>
              <div className="footer-col-title">Herramientas</div>
              <div className="footer-links">
                <a className="footer-link" href="/app" target="_blank" rel="noreferrer">Liquidity Engine App</a>
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
    </>
  )
}