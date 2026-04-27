import { useState, useEffect, useRef } from 'react'
import OutOfRangeAlertBanner from './OutOfRangeAlertBanner'

// ─── Mock data — cubre todos los campos de calcPoolStats + pos ────────────────
const MOCK_BASE = {
  // pos fields
  tokenId:      '847291',
  chainName:    'Arbitrum',
  token0Symbol: 'ETH',
  token1Symbol: 'USDC',
  poolAddress:  '0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640',
  fee:          500,
  // calc fields
  netInvested:   12800,
  depositsValue: 13200,
  withdrawalsVal:400,
  totalDep1:     13200,
  totalWit1:     400,
  feesValue:     312.40,
  feesApr:       22.4,
  collected0:    0.0821,
  collected1:    154.20,
  uncollected0:  0.0124,
  uncollected1:  23.80,
  pnlVsHodl:    -187.30,
  aprVsHodl:    -12.1,
  pnlToken0:    -0.142,
  pnlToken1:    -312.40,
  ilUsd:        -187.30,
  ageDays:      14,
  ageHours:     6,
  priceLower:   1820,
  priceUpper:   2100,
  entryPrice:   1965,
  // 24h (simula datos revert)
  delta24hPnl:  42.10,
  delta24hApr:  18.6,
  hasRevert:    true,
}

const STATES = {
  inRange: {
    ...MOCK_BASE,
    currentPrice: 1985,
    valueUsd:     14342,
    amount0:      2.8710,
    amount1:      3241.50,
    pnlUsd:       342.10,
    pnlPct:       2.67,
    aprUsd:       18.6,
  },
  below: {
    ...MOCK_BASE,
    currentPrice: 1710,
    valueUsd:     13950,
    amount0:      7.2340,
    amount1:      0,
    pnlUsd:       -185.40,
    pnlPct:       -1.44,
    aprUsd:       -9.4,
  },
}

const STATE_LABELS = {
  inRange: '✅  En Rango',
  below:   '⬇  Fuera (Abajo)',
}

// ─── Formatters ────────────────────���───────────────────────���──────────────────
const fmtUsd = (v, d = 2) => `${v >= 0 ? '+' : ''}$${Math.abs(v).toLocaleString('en-US', { minimumFractionDigits: d, maximumFractionDigits: d })}`
const fmtPct = (v, d = 2) => `${v >= 0 ? '+' : ''}${parseFloat(v).toFixed(d)}%`
const fmtP   = (v) => Number(v).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
const fmtAmt = (v, d = 4) => parseFloat(v || 0).toFixed(d)

// ─── Email + Notif toasts ───────────────────────────���─────────────────────────
function EmailToast({ direction, onDone }) {
  useEffect(() => { const t = setTimeout(onDone, 4000); return () => clearTimeout(t) }, [onDone])
  return (
    <div style={{
      position:'fixed', bottom:28, right:28, zIndex:9998,
      background:'#0a1628', border:'1px solid #00e5ff44', borderLeft:'3px solid #00e5ff',
      borderRadius:8, padding:'12px 18px', display:'flex', alignItems:'center', gap:10,
      boxShadow:'0 8px 32px rgba(0,0,0,0.5)', animation:'oor-toast-in 0.4s ease',
      fontFamily:'Outfit, sans-serif',
    }}>
      <span style={{fontSize:18}}>📧</span>
      <div>
        <div style={{fontSize:12,fontWeight:700,color:'#00e5ff'}}>Email enviado</div>
        <div style={{fontSize:11,color:'#4a7a96',marginTop:2}}>
          Alerta {direction==='below'?'⬇ bajo rango':'⬆ sobre rango'} enviada a tu correo
        </div>
      </div>
      <button onClick={onDone} style={{background:'none',border:'none',color:'#2a5a72',cursor:'pointer',fontSize:14,marginLeft:4}}>✕</button>
    </div>
  )
}

function NotifToast({ direction, onDone }) {
  useEffect(() => { const t = setTimeout(onDone, 4500); return () => clearTimeout(t) }, [onDone])
  return (
    <div style={{
      position:'fixed', bottom:90, right:28, zIndex:9997,
      background:'#0a1628', border:'1px solid #8b5cf644', borderLeft:'3px solid #8b5cf6',
      borderRadius:8, padding:'12px 18px', display:'flex', alignItems:'center', gap:10,
      boxShadow:'0 8px 32px rgba(0,0,0,0.5)', animation:'oor-toast-in 0.4s ease',
      fontFamily:'Outfit, sans-serif',
    }}>
      <span style={{fontSize:18}}>🔔</span>
      <div>
        <div style={{fontSize:12,fontWeight:700,color:'#a78bfa'}}>Notificación registrada</div>
        <div style={{fontSize:11,color:'#4a7a96',marginTop:2}}>
          Aparece en tu panel · {direction==='below'?'⬇ bajo rango':'⬆ sobre rango'}
        </div>
      </div>
      <button onClick={onDone} style={{background:'none',border:'none',color:'#2a5a72',cursor:'pointer',fontSize:14,marginLeft:4}}>✕</button>
    </div>
  )
}

// ─── Modal de protección demo ─────────────────────────────────────────────────
function DemoProtectionModal({ s, sym0, sym1, onClose }) {
  const [leverage, setLeverage] = useState(10)
  const [stopLoss, setStopLoss] = useState('8.0')
  const [breakeven, setBreakeven] = useState(1)
  const [buffer, setBuffer] = useState(20)

  const exposedToken = sym0
  const coin         = sym0.replace('W','') + '-PERP'
  const poolValue    = s.valueUsd
  const capital      = poolValue * (1 + buffer / 100)
  const margin       = capital / leverage
  const distToRange  = ((s.priceLower - s.currentPrice) / s.currentPrice * 100)

  const S = {
    overlay:{ position:'fixed',inset:0,background:'rgba(0,0,0,0.78)',zIndex:2000,display:'flex',alignItems:'center',justifyContent:'center',padding:16 },
    modal:  { background:'#070d14',border:'1px solid #1a3a5e',width:'100%',maxWidth:480,maxHeight:'90vh',overflowY:'auto',display:'flex',flexDirection:'column',fontFamily:'Outfit,sans-serif' },
    header: { padding:'16px 20px',borderBottom:'1px solid #0e2435',display:'flex',justifyContent:'space-between',alignItems:'flex-start' },
    body:   { padding:'16px 20px',display:'flex',flexDirection:'column',gap:16 },
    label:  { fontSize:11,color:'#4a7a96',letterSpacing:'0.8px',textTransform:'uppercase',marginBottom:6 },
    input:  { width:'100%',background:'#0a1520',border:'1px solid #1a3a5e',color:'#c8e6f0',padding:'8px 12px',fontSize:14,fontFamily:'Outfit,sans-serif',outline:'none',boxSizing:'border-box' },
    footer: { padding:'14px 20px',borderTop:'1px solid #0e2435',display:'flex',gap:10 },
  }

  return (
    <div style={S.overlay} onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={S.modal}>

        {/* Header */}
        <div style={S.header}>
          <div>
            <div style={{fontSize:16,fontWeight:700,color:'#c8e6f0',display:'flex',alignItems:'center',gap:8}}>
              🛡 Configurar Protección
            </div>
            <div style={{fontSize:12,color:'#4a7a96',marginTop:4}}>
              {sym0}/{sym1} · Rango {fmtP(s.priceLower)} – {fmtP(s.priceUpper)}
            </div>
          </div>
          <button onClick={onClose} style={{background:'none',border:'none',color:'#4a7a96',fontSize:18,cursor:'pointer'}}>✕</button>
        </div>

        <div style={S.body}>

          {/* OOR Warning */}
          <div style={{background:'#1a0810', border:'1px solid #5a1a28', padding:'12px 14px', fontSize:12, color:'#ff6b88', lineHeight:1.6}}>
            <div style={{fontWeight:700,marginBottom:6}}>⬇ Pool fuera de rango — lee esto antes de activar</div>
            <div>
              Tu posición es <strong>100% {exposedToken}</strong>.
              El SHORT se abrirá <strong>inmediatamente</strong> al precio actual (~{fmtP(s.currentPrice)}).
            </div>
            <div style={{marginTop:6}}>
              El <strong>Stop Loss</strong> debería estar por encima del borde inferior de tu rango ({fmtP(s.priceLower)}).
              Si {sym0} sube hasta ahí, el pool vuelve a rango y el SHORT se cierra.
            </div>
            <div style={{marginTop:6,color:'#ff9944'}}>
              Distancia al rango: <strong>{distToRange.toFixed(1)}%</strong> — el SL debe ser mayor a este valor.
            </div>
          </div>

          {/* Wallet — simulado */}
          <div>
            <div style={S.label}>🔑 Wallet</div>
            <div style={{background:'#0a1520',border:'1px solid #1a3a5e',padding:'8px 12px',fontSize:13,color:'#4a7a96'}}>
              Demo · Wallet_Principal (0xf2db3d...)
            </div>
            <div style={{fontSize:12,color:'#00ff88',marginTop:4}}>Balance: $2,450.00</div>
          </div>

          {/* Perp */}
          <div>
            <div style={S.label}>📊 Perp (SHORT)</div>
            <div style={{background:'#0a1520',border:'1px solid #1a3a5e',padding:'8px 12px',fontSize:14,fontWeight:700,color:'#c8e6f0'}}>{coin}</div>
          </div>

          {/* Capital + Leverage */}
          <div>
            <div style={{display:'flex',justifyContent:'space-between',marginBottom:8}}>
              <div style={S.label}>⚡ Capital por Operación</div>
              <span style={{fontSize:16,fontWeight:700,color:'#ffb347'}}>${capital.toFixed(2)}</span>
            </div>
            <div style={{display:'flex',justifyContent:'space-between',marginBottom:6,fontSize:12,color:'#4a7a96'}}>
              <span>Leverage (Isolated)</span>
              <span style={{color:'#ffb347',fontWeight:700}}>{leverage}x</span>
            </div>
            <input type="range" min={1} max={50} value={leverage}
              onChange={e => setLeverage(Number(e.target.value))}
              style={{width:'100%',accentColor:'#ffb347'}} />
            <div style={{display:'flex',justifyContent:'space-between',fontSize:10,color:'#2a5a72'}}><span>1x</span><span>50x max (HL)</span></div>
            {/* Margen */}
            <div style={{background:'#001a0e',border:'1px solid #003a22',padding:'10px 12px',marginTop:10,fontSize:12,color:'#00ff88',lineHeight:1.6}}>
              <div style={{display:'flex',justifyContent:'space-between'}}><span>Margen requerido:</span><span style={{fontWeight:700}}>${margin.toFixed(2)}</span></div>
              <div style={{display:'flex',justifyContent:'space-between'}}><span>Balance wallet:</span><span>$2,450.00</span></div>
              <div style={{color:'#00ff88',marginTop:4}}>✓ Balance suficiente</div>
            </div>
          </div>

          {/* Buffer */}
          <div>
            <div style={S.label}>🛡 Buffer de Capital</div>
            <div style={{display:'flex',gap:6,flexWrap:'wrap'}}>
              {[{label:'Sin',value:0},{label:'+20%',value:20},{label:'+40%',value:40},{label:'+60%',value:60}].map(opt => (
                <button key={opt.value} onClick={() => setBuffer(opt.value)} style={{
                  padding:'5px 12px',fontSize:12,fontWeight:600,cursor:'pointer',fontFamily:'Outfit,sans-serif',
                  background:'transparent',
                  border:`1px solid ${buffer===opt.value?'#ffb347':'#1a3a5e'}`,
                  color: buffer===opt.value?'#ffb347':'#4a7a96',
                }}>{opt.label}</button>
              ))}
            </div>
            <div style={{fontSize:11,color:'#ffb347',marginTop:6}}>
              Posición efectiva: ${capital.toFixed(0)} (pool ${poolValue.toFixed(0)} + {buffer}%)
            </div>
          </div>

          {/* Stop Loss */}
          <div>
            <div style={S.label}>🔴 Stop Loss Fijo (%)</div>
            <input style={S.input} value={stopLoss} onChange={e => setStopLoss(e.target.value)} placeholder="8.0" />
            <div style={{fontSize:11,color:'#4a7a96',marginTop:4}}>
              Cierra el short si el precio sube este % desde la entrada
              <span style={{color:'#4a7aff'}}> · Distancia al rango: {distToRange.toFixed(1)}%</span>
            </div>
          </div>

          {/* Breakeven */}
          <div>
            <div style={{display:'flex',justifyContent:'space-between',marginBottom:6}}>
              <div style={S.label}>📈 Breakeven (% para mover SL)</div>
              <span style={{fontSize:12,color:'#00ff88',fontWeight:700}}>{breakeven}%</span>
            </div>
            <input type="range" min={1} max={5} step={0.5} value={breakeven}
              onChange={e => setBreakeven(Number(e.target.value))}
              style={{width:'100%',accentColor:'#00ff88'}} />
          </div>

          {/* Take Profits */}
          <div>
            <div style={S.label}>🎯 Take Profits (opcional)</div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}>
              {['TP1 — % ganancia','TP1 — % cierre','TP2 — % ganancia','TP2 — % cierre'].map((lbl,i) => (
                <div key={i}>
                  <div style={{fontSize:10,color:'#4a7a96',marginBottom:3}}>{lbl}</div>
                  <input style={S.input} defaultValue={['3','50','5','100'][i]} />
                </div>
              ))}
            </div>
          </div>

          {/* Demo notice */}
          <div style={{background:'#0a0820',border:'1px solid #3730a344',padding:'10px 14px',fontSize:11,color:'#6b5fa0',lineHeight:1.6}}>
            🧪 <strong style={{color:'#a78bfa'}}>Vista demo</strong> — En producción, al hacer click en "Activar Protección" se abre un SHORT real en Hyperliquid usando tu API key configurada en la pestaña Wallets.
          </div>
        </div>

        {/* Footer */}
        <div style={S.footer}>
          <button onClick={onClose} style={{flex:1,padding:'10px 0',background:'transparent',border:'1px solid #1a3a5e',color:'#4a7a96',fontSize:13,cursor:'pointer',fontFamily:'Outfit,sans-serif'}}>
            Cancelar
          </button>
          <button onClick={() => {
            // Escribe cobertura DEMO en localStorage para que Monitor de Cobertura la detecte
            const existing = (() => { try { return JSON.parse(localStorage.getItem('hl_hedge_demo') || '[]') } catch { return [] } })()
            const demo = {
              id:             crypto.randomUUID(),   // ← ID único
              poolId:         s.tokenId,
              walletId:       'demo-wallet',
              coin,
              size:           (capital / s.currentPrice).toFixed(4),
              leverage,
              buffer,
              stopLoss:       parseFloat(stopLoss),
              breakeven,
              tp1Pct: '3', tp1Close: '50', tp2Pct: '5', tp2Close: '100',
              noProtectReentry: false,
              openedAt:       Date.now(),
              openPrice:      s.currentPrice,
              sym0:           s.token0Symbol,
              sym1:           s.token1Symbol,
              chainName:      s.chainName,
              poolPair:       `${s.token0Symbol}/${s.token1Symbol}`,
              _demo:          true,
            }
            // Guarda en hl_protections para que Monitor de Cobertura lo lea
            const allProts = (() => { try { return JSON.parse(localStorage.getItem('hl_protections') || '[]') } catch { return [] } })()
            const alreadyExists = allProts.some(p => p.poolId === s.tokenId && p._demo)
            if (!alreadyExists) {
              allProts.push(demo)
              localStorage.setItem('hl_protections', JSON.stringify(allProts))
            }
            onClose()
            // Notifica al usuario
            setTimeout(() => {
              const event = new CustomEvent('demo-hedge-activated')
              window.dispatchEvent(event)
            }, 300)
          }} style={{
            flex:2,padding:'10px 0',background:'linear-gradient(135deg,#1a0e00,#2a1800)',border:'1px solid #ffb347',color:'#ffb347',
            fontSize:13,fontWeight:700,cursor:'pointer',fontFamily:'Outfit,sans-serif',
          }}>
            🛡 Activar Cobertura SHORT Demo
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Componente principal ─────────────────────────────────────────────────────
export default function PoolAlertDemo() {
  const [stateKey,   setStateKey]   = useState('inRange')
  const [expanded,   setExpanded]   = useState(false)
  const [showBanner,     setShowBanner]     = useState(false)
  const [emailToast,     setEmailToast]     = useState(null)
  const [notifToast,     setNotifToast]     = useState(null)
  const [showDemoModal,  setShowDemoModal]  = useState(false)
  const [hedgeActivated, setHedgeActivated] = useState(false)
  const prevStateRef = useRef('inRange')

  // Escucha el evento de cobertura demo activada
  useEffect(() => {
    const handler = () => {
      setHedgeActivated(true)
      setTimeout(() => setHedgeActivated(false), 6000)
    }
    window.addEventListener('demo-hedge-activated', handler)
    return () => window.removeEventListener('demo-hedge-activated', handler)
  }, [])

  const s         = STATES[stateKey]
  const inRange   = stateKey === 'inRange'
  const isBelow   = stateKey === 'below'
  const isOor     = !inRange
  const direction = isBelow ? 'below' : null

  const statusObj = inRange
    ? { label:'En Rango',        color:'#00ff88', bg:'#001a0e', border:'#003a22' }
    : { label:'Fuera (Abajo)',   color:'#ff4f6e', bg:'#1a0810', border:'#5a1a28' }

  // Detecta transición inRange → fuera y dispara alerts
  useEffect(() => {
    const prev = prevStateRef.current
    prevStateRef.current = stateKey
    if (prev === 'inRange' && stateKey !== 'inRange') {
      setShowBanner(true)
      setTimeout(() => setEmailToast(direction), 600)
      setTimeout(() => setNotifToast(direction), 1200)
    }
    if (stateKey === 'inRange') setShowBanner(false)
  }, [stateKey]) // eslint-disable-line

  // Range bar math
  const pad   = 0.20
  const span  = Math.max(s.priceUpper - s.priceLower, 1)
  const lo    = s.priceLower - span * pad
  const hi    = s.priceUpper + span * pad
  const total = hi - lo
  const toP   = (v) => Math.max(1, Math.min(99, (v - lo) / total * 100))
  const loP   = toP(s.priceLower)
  const hiP   = toP(s.priceUpper)
  const curP  = toP(s.currentPrice)
  const entP  = toP(s.entryPrice)

  const poolUrl   = `https://app.uniswap.org/positions/v3/arbitrum/${s.tokenId}`
  const revertUrl = `https://revert.finance/#/uniswap-position/arbitrum/${s.tokenId}`
  const feeRate   = ((s.fee || 500) / 10000).toFixed(2)

  return (
    <div>
      <style>{`
        @keyframes oor-toast-in { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
      `}</style>

      {/* ── Header demo ── */}
      <div style={{
        display:'flex', alignItems:'center', gap:10, marginBottom:10,
        padding:'7px 14px', background:'#070d14', border:'1px solid #0e2435',
      }}>
        <span style={{fontSize:10,fontWeight:700,color:'#00e5ff',letterSpacing:'2px',textTransform:'uppercase',fontFamily:'Outfit,sans-serif'}}>
          🧪 Demo — Alertas de Rango
        </span>
        <span style={{fontSize:10,color:'#2a5a72',fontFamily:'Outfit,sans-serif'}}>
          Cambia el estado para simular el flujo completo (email + notificación + banner)
        </span>
      </div>

      {/* ── Toggles ── */}
      <div style={{display:'flex',gap:6,marginBottom:10}}>
        {Object.keys(STATES).map(k => (
          <button key={k} onClick={() => setStateKey(k)} style={{
            flex:1, padding:'8px 4px',
            background: stateKey===k ? (k==='inRange'?'#001a0e':k==='below'?'#1a0810':'#1a0e00') : 'transparent',
            border:`1px solid ${stateKey===k?(k==='inRange'?'#00ff88':k==='below'?'#ff4f6e':'#ffb347'):'#0e2435'}`,
            color: stateKey===k?(k==='inRange'?'#00ff88':k==='below'?'#ff4f6e':'#ffb347'):'#4a7a96',
            fontFamily:'Outfit,sans-serif',fontSize:11,fontWeight:700,cursor:'pointer',
            letterSpacing:'0.5px',textTransform:'uppercase',transition:'all 0.15s',borderRadius:3,
          }}>
            {STATE_LABELS[k]}
          </button>
        ))}
      </div>

      {/* ════════════════���═══════════════════════
          PC-WRAP — replica exacta del PoolCard
      ═══════════════════���════════════════════ */}
      <div className="pc-wrap" style={{ border: isOor ? `1px solid ${statusObj.border}` : undefined }}>

        {/* ── COLLAPSED ROW ── */}
        <div className="pc-row" onClick={() => setExpanded(e => !e)}>
          <div className="pc-left">
            <span className="pc-pair">{s.token0Symbol}/{s.token1Symbol}</span>
            <span className="pc-status" style={{color:statusObj.color,background:statusObj.bg,border:`1px solid ${statusObj.border}`}}>
              {statusObj.label}
            </span>
            <span className="pc-chain">{s.chainName}</span>
            <span className="pc-revert-badge">R</span>
          </div>
          <div className="pc-stats">
            <div className="pc-stat">
              <div className="pc-stat-label">Valor LP</div>
              <div className="pc-stat-val">${fmtP(s.valueUsd)}</div>
            </div>
            <div className="pc-stat">
              <div className="pc-stat-label">Entry</div>
              <div className="pc-stat-val">{fmtP(s.entryPrice)}</div>
            </div>
            <div className="pc-stat">
              <div className="pc-stat-label">PNL</div>
              <div className={`pc-stat-val ${s.pnlUsd >= 0 ? 'green' : 'red'}`}>{fmtUsd(s.pnlUsd)}</div>
            </div>
            <div className="pc-stat">
              <div className="pc-stat-label">APR</div>
              <div className={`pc-stat-val ${s.aprUsd >= 0 ? 'green' : 'red'}`}>{s.aprUsd.toFixed(1)}%</div>
            </div>
            <div className="pc-stat">
              <div className="pc-stat-label">Fee APR</div>
              <div className="pc-stat-val green">{s.feesApr.toFixed(1)}%</div>
            </div>
            <div className="pc-stat">
              <div className="pc-stat-label">Fees</div>
              <div className="pc-stat-val green">${fmtP(s.feesValue)}</div>
            </div>
          </div>
          <div className={`pc-chevron ${expanded ? 'open' : ''}`}>›</div>
        </div>

        {/* ── EXPANDED PANEL ── */}
        {expanded && (
          <div className="pc-panel">

            {/* ── Precio + barra de rango ── */}
            <div className="pc-price-section">
              <div className="pc-current-price" style={{color: isOor ? statusObj.color : '#00e5ff'}}>
                {fmtP(s.currentPrice)}
              </div>

              {/* Price tag row */}
              <div style={{position:'relative',height:32,marginBottom:4}}>
                <div style={{
                  position:'absolute', left:`${curP}%`, transform:'translateX(-50%)', bottom:0,
                  background:'#070d14', border:`1px solid ${isOor?statusObj.color:'#00e5ff'}`,
                  padding:'2px 8px', fontSize:12, fontWeight:700,
                  color: isOor ? statusObj.color : '#00e5ff', whiteSpace:'nowrap',
                  boxShadow:`0 0 10px ${isOor?'rgba(255,79,110,0.4)':'rgba(0,229,255,0.4)'}`, zIndex:10,
                }}>
                  {fmtP(s.currentPrice)}
                  <span style={{
                    position:'absolute', top:'100%', left:'50%', transform:'translateX(-50%)',
                    borderLeft:'5px solid transparent', borderRight:'5px solid transparent',
                    borderTop:`6px solid ${isOor?statusObj.color:'#00e5ff'}`,
                    display:'block', width:0,
                  }} />
                </div>
              </div>

              {/* Bar row */}
              <div style={{position:'relative',height:18}}>
                <div style={{
                  position:'absolute', inset:0, borderRadius:9, background:'#020810',
                  border:'1px solid rgba(0,229,255,0.12)',
                  boxShadow:'inset 0 2px 6px rgba(0,0,0,0.9)', overflow:'hidden',
                }}>
                  <div style={{position:'absolute',top:0,bottom:0,left:0,width:`${loP}%`,background:'linear-gradient(90deg,rgba(120,10,25,0.8),rgba(255,79,110,0.5))'}} />
                  <div style={{
                    position:'absolute',top:0,bottom:0,left:`${loP}%`,width:`${hiP-loP}%`,
                    background:'linear-gradient(180deg,rgba(0,255,100,0.1) 0%,rgba(0,210,85,0.95) 18%,rgba(0,255,130,1) 45%,rgba(200,255,210,1) 50%,rgba(0,255,130,1) 55%,rgba(0,180,65,0.95) 82%,rgba(0,60,25,0.3) 100%)',
                    boxShadow:'inset 0 1px 0 rgba(255,255,255,0.25)', overflow:'hidden',
                  }}>
                    <div style={{
                      position:'absolute',top:'-50%',left:'-60%',width:'35%',height:'200%',
                      background:'linear-gradient(105deg,transparent 30%,rgba(255,255,255,0.22) 50%,transparent 70%)',
                      animation:'rb-shine 3.5s ease-in-out infinite',
                    }} />
                  </div>
                  <div style={{position:'absolute',top:0,bottom:0,right:0,width:`${100-hiP}%`,background:'linear-gradient(90deg,rgba(255,150,30,0.3),rgba(140,60,0,0.65))'}} />
                </div>
                {[loP,hiP].map((p,i) => (
                  <div key={i} style={{position:'absolute',top:-3,bottom:-3,left:`${p}%`,width:2,transform:'translateX(-50%)',background:'rgba(255,255,255,0.2)',zIndex:2}} />
                ))}
                <div style={{
                  position:'absolute',top:'50%',left:`${curP}%`,
                  transform:'translate(-50%,-50%)',zIndex:5,
                  width:22,height:22,borderRadius:'50%',
                  background: isOor
                    ? 'radial-gradient(circle at 32% 30%,#fff 0%,#ff4f6e 35%,#7a0020 80%)'
                    : 'radial-gradient(circle at 32% 30%,#fff 0%,#00e5ff 35%,#006a99 80%)',
                  border:'2px solid rgba(255,255,255,0.35)',
                  animation: isOor ? 'rb-glow-out 2s ease-in-out infinite' : 'rb-glow-in 2s ease-in-out infinite',
                }} />
              </div>

              {/* Entry tick + MIN/MAX row */}
              <div style={{position:'relative',height:36,marginTop:6}}>
                <div style={{position:'absolute',left:`${entP}%`,top:0,transform:'translateX(-50%)',display:'flex',flexDirection:'column',alignItems:'center',gap:2}}>
                  <div style={{width:1,height:8,background:'#4a7aff',boxShadow:'0 0 4px rgba(74,122,255,0.8)'}} />
                  <div style={{fontSize:10,color:'#4a7aff',whiteSpace:'nowrap',fontWeight:600}}>Entry</div>
                </div>
                <div style={{position:'absolute',left:0,top:0,lineHeight:1.3}}>
                  <div style={{fontSize:9,letterSpacing:'1.5px',textTransform:'uppercase',fontWeight:700,color:'#ff4f6e'}}>▼ MIN</div>
                  <div style={{fontSize:13,fontWeight:700,color:'#ff6b88'}}>{fmtP(s.priceLower)}</div>
                </div>
                <div style={{position:'absolute',right:0,top:0,textAlign:'right',lineHeight:1.3}}>
                  <div style={{fontSize:9,letterSpacing:'1.5px',textTransform:'uppercase',fontWeight:700,color:'#00ff88'}}>▲ MAX</div>
                  <div style={{fontSize:13,fontWeight:700,color:'#00ff88'}}>{fmtP(s.priceUpper)}</div>
                </div>
              </div>

              {/* Token amounts */}
              <div className="pc-amounts">
                <span>{fmtAmt(s.amount0)} {s.token0Symbol}</span>
                <span>{fmtAmt(s.amount1, 2)} {s.token1Symbol}</span>
              </div>
            </div>

            {/* ── ⭐ ALERT BANNER (feature nueva) ── */}
            {showBanner && direction && (
              <OutOfRangeAlertBanner
                direction={direction}
                pair={`${s.token0Symbol}/${s.token1Symbol}`}
                onDismiss={() => setShowBanner(false)}
              />
            )}

            {/* ── Action banner Cobertura (fuera de rango) ── */}
            {isOor && (
              <div style={{marginBottom:16}}>
                <div style={{background:'#1a0e00',border:'1px solid #5a3a00',padding:'10px 14px',fontSize:12,color:'#ffb347',marginBottom:8}}>
                  ⚠ Tu posición es 100% {isBelow ? s.token0Symbol : s.token1Symbol} — máxima exposición al precio. Recomendado configurar Cobertura SHORT.
                </div>
                <button onClick={() => setShowDemoModal(true)} style={{
                  width:'100%',padding:'12px 0',background:'transparent',border:'1px solid #ffb347',color:'#ffb347',
                  fontSize:14,fontWeight:700,cursor:'pointer',fontFamily:'Outfit,sans-serif',letterSpacing:'0.5px',
                  display:'flex',alignItems:'center',justifyContent:'center',gap:8,
                }}>
                  🛡 Configurar Protección (100% expuesto a {isBelow ? s.token0Symbol : s.token1Symbol})
                </button>
              </div>
            )}

            {/* ── Resultado Total ── */}
            <div className="pc-section-title">Resultado Total</div>
            <div className="pc-grid4">
              <div className="pc-metric">
                <div className="pc-metric-label">PNL Total (USD)</div>
                <div className={`pc-metric-val ${s.pnlUsd >= 0 ? 'green' : 'red'}`}>
                  {fmtUsd(s.pnlUsd)} ({fmtPct(s.pnlPct)})
                </div>
              </div>
              <div className="pc-metric">
                <div className="pc-metric-label">Invertido (neto)</div>
                <div className="pc-metric-val">${fmtP(s.netInvested)}</div>
              </div>
              <div className="pc-metric">
                <div className="pc-metric-label">Tiempo de Vida</div>
                <div className="pc-metric-val">{s.ageDays}d {s.ageHours}h</div>
              </div>
              <div className="pc-metric">
                <div className="pc-metric-label">APR Total</div>
                <div className={`pc-metric-val ${s.aprUsd >= 0 ? 'green' : 'red'}`}>{s.aprUsd.toFixed(1)}%</div>
              </div>
            </div>

            {/* ── Performance vs Benchmark ── */}
            <div className="pc-section-title">Performance vs Benchmark</div>
            <div className="pc-grid4">
              <div className="pc-metric">
                <div className="pc-metric-label">PNL vs HODL</div>
                <div className={`pc-metric-val ${s.pnlVsHodl >= 0 ? 'green' : 'red'}`}>{fmtUsd(s.pnlVsHodl)}</div>
                <div className="pc-metric-sub">APR: {s.aprVsHodl.toFixed(1)}%</div>
              </div>
              <div className="pc-metric">
                <div className="pc-metric-label">PNL vs {s.token0Symbol}</div>
                <div className={`pc-metric-val ${s.pnlToken0 >= 0 ? 'green' : 'red'}`}>{fmtAmt(s.pnlToken0)} {s.token0Symbol}</div>
              </div>
              <div className="pc-metric">
                <div className="pc-metric-label">PNL vs {s.token1Symbol}</div>
                <div className={`pc-metric-val ${s.pnlToken1 >= 0 ? 'green' : 'red'}`}>{fmtUsd(s.pnlToken1)}</div>
              </div>
              <div className="pc-metric">
                <div className="pc-metric-label">Imperm. Loss</div>
                <div className={`pc-metric-val ${s.ilUsd >= 0 ? 'green' : 'red'}`}>{fmtUsd(s.ilUsd)}</div>
              </div>
            </div>

            {/* ── Capital ── */}
            <div className="pc-section-title">Capital</div>
            <div className="pc-grid4">
              <div className="pc-metric">
                <div className="pc-metric-label">PNL Capital</div>
                <div className={`pc-metric-val ${s.pnlUsd >= 0 ? 'green' : 'red'}`}>{fmtUsd(s.pnlUsd)} ({fmtPct(s.pnlPct)})</div>
              </div>
              <div className="pc-metric">
                <div className="pc-metric-label">Depositado</div>
                <div className="pc-metric-val">${fmtP(s.depositsValue)}</div>
                <div className="pc-metric-sub">{fmtAmt(s.totalDep1, 2)} {s.token1Symbol}</div>
              </div>
              <div className="pc-metric">
                <div className="pc-metric-label">APR Capital</div>
                <div className={`pc-metric-val ${s.aprUsd >= 0 ? 'green' : 'red'}`}>{s.aprUsd.toFixed(1)}%</div>
              </div>
              <div className="pc-metric">
                <div className="pc-metric-label">Retirado</div>
                <div className="pc-metric-val">${fmtP(s.withdrawalsVal)}</div>
                <div className="pc-metric-sub">{fmtAmt(s.totalWit1, 2)} {s.token1Symbol}</div>
              </div>
            </div>

            {/* ── Fees Ganadas ── */}
            <div className="pc-section-title">Fees Ganadas</div>
            <div className="pc-grid4">
              <div className="pc-metric">
                <div className="pc-metric-label">Total Fees (USD)</div>
                <div className="pc-metric-val green">${fmtP(s.feesValue)}</div>
                <div className="pc-metric-sub">uncollected: ${fmtP(s.uncollected0 + s.uncollected1)}</div>
              </div>
              <div className="pc-metric">
                <div className="pc-metric-label">Fees {s.token0Symbol}</div>
                <div className="pc-metric-val green">{fmtAmt(s.collected0)} {s.token0Symbol}</div>
                <div className="pc-metric-sub">unc: {fmtAmt(s.uncollected0)}</div>
              </div>
              <div className="pc-metric">
                <div className="pc-metric-label">Fees {s.token1Symbol}</div>
                <div className="pc-metric-val green">{fmtAmt(s.collected1, 2)} {s.token1Symbol}</div>
                <div className="pc-metric-sub">unc: {fmtAmt(s.uncollected1, 2)}</div>
              </div>
              <div className="pc-metric">
                <div className="pc-metric-label">APR Fees</div>
                <div className="pc-metric-val green">{s.feesApr.toFixed(1)}%</div>
              </div>
            </div>

            {/* ── Proyección Fees ── */}
            <div className="pc-section-title">Proyección Fees</div>
            <div className="pc-grid4">
              {['Diario','Semanal','Mensual','Anual'].map((label, i) => {
                const mult = [1/365, 7/365, 30/365, 1][i]
                const proj = s.netInvested * (s.feesApr / 100) * mult
                const pct  = s.feesApr * mult
                return (
                  <div key={label} className="pc-metric">
                    <div className="pc-metric-label">{label}</div>
                    <div className="pc-metric-val green">${fmtP(proj)} ({pct.toFixed(2)}%)</div>
                  </div>
                )
              })}
            </div>

            {/* ── Cambios 24h (revert) ── */}
            <div className="pc-section-title">Cambios 24h</div>
            <div className="pc-grid4">
              <div className="pc-metric">
                <div className="pc-metric-label">PNL 24h</div>
                <div className={`pc-metric-val ${s.delta24hPnl >= 0 ? 'green' : 'red'}`}>{fmtUsd(s.delta24hPnl)}</div>
              </div>
              <div className="pc-metric">
                <div className="pc-metric-label">APR 24h</div>
                <div className={`pc-metric-val ${s.delta24hApr >= 0 ? 'green' : 'red'}`}>{fmtPct(s.delta24hApr, 1)}</div>
              </div>
              <div className="pc-metric" />
              <div className="pc-metric" />
            </div>

            {/* ── Info ── */}
            <div className="pc-section-title">Info</div>
            <div className="pc-info-row">
              <span>Edad: {s.ageDays}d {s.ageHours}h</span>
              <span>NFT: #{s.tokenId}</span>
              <span>Chain: {s.chainName}</span>
              <span>DEX: uniswap_v3</span>
              <span>Fee: {feeRate}%</span>
              <span>Pool: <span className="pc-addr">{s.poolAddress.slice(0,8)}...{s.poolAddress.slice(-4)}</span></span>
              <span style={{color:'#00ff88',fontSize:11}}>✓ Datos Revert</span>
            </div>

            {/* ── Footer actions ── */}
            <div className="pc-actions">
              <a href={poolUrl}   target="_blank" rel="noreferrer" className="pc-btn-link">🔗 Uniswap</a>
              <a href={revertUrl} target="_blank" rel="noreferrer" className="pc-btn-link">📊 Revert</a>
              <button className="pc-btn-close" onClick={() => setExpanded(false)}>Cerrar</button>
              <button className="pc-btn-remove" onClick={() => alert('Demo — no elimina nada')}>🗑 Eliminar pool</button>
            </div>
          </div>
        )}
      </div>

      {/* ── Leyenda ── */}
      <div style={{
        marginTop:10,padding:'10px 14px',
        background:'#060b16',border:'1px solid #0d1f35',
        fontSize:11,color:'#2e5070',fontFamily:'Outfit,sans-serif',lineHeight:1.7,
      }}>
        <strong style={{color:'#4a7a96'}}>Flujo en producción:</strong>{' '}
        <span style={{color:'#00e5ff'}}>①</span> Email vía Supabase Edge Function + Resend &nbsp;
        <span style={{color:'#a78bfa'}}>②</span> Notificación en panel (campana 🔔) &nbsp;
        <span style={{color:'#ffb347'}}>③</span> Banner dentro del pool card &nbsp;
        <span style={{color:'#00ff88'}}>④</span> Cooldown 30 min anti-spam
      </div>

      {emailToast && <EmailToast direction={emailToast} onDone={() => setEmailToast(null)} />}
      {notifToast && <NotifToast direction={notifToast} onDone={() => setNotifToast(null)} />}

      {/* Toast: cobertura demo activada */}
      {hedgeActivated && (
        <div style={{
          position:'fixed', bottom:28, right:28, zIndex:9999,
          background:'#0a1628', border:'1px solid #00ff8866', borderLeft:'3px solid #00ff88',
          borderRadius:8, padding:'14px 20px',
          display:'flex', alignItems:'center', gap:12,
          boxShadow:'0 8px 32px rgba(0,0,0,0.5)',
          animation:'oor-toast-in 0.4s ease',
          fontFamily:'Outfit, sans-serif',
          maxWidth: 360,
        }}>
          <span style={{fontSize:22}}>🛡</span>
          <div>
            <div style={{fontSize:13,fontWeight:700,color:'#00ff88'}}>¡Cobertura demo activada!</div>
            <div style={{fontSize:11,color:'#4a7a96',marginTop:3,lineHeight:1.5}}>
              Ve al tab <strong style={{color:'#00e5ff'}}>Monitor de Cobertura</strong> para ver<br/>
              el tracking en tiempo real del SHORT.
            </div>
          </div>
          <button onClick={() => setHedgeActivated(false)}
            style={{background:'none',border:'none',color:'#2a5a72',cursor:'pointer',fontSize:16,marginLeft:'auto',flexShrink:0}}>
            ✕
          </button>
        </div>
      )}
      {showDemoModal && (
        <DemoProtectionModal
          s={s}
          sym0={s.token0Symbol} sym1={s.token1Symbol}
          onClose={() => setShowDemoModal(false)}
        />
      )}
    </div>
  )
}
