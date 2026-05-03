import { useState } from 'react'
import HLTestModal from '../wallets/components/HLTestModal'

const P = import.meta.env.VITE_REVERT_PROXY_URL ?? ''

function fmtPrice(v) {
  if (!v || isNaN(v)) return '—'
  if (v >= 1000) return '$' + v.toLocaleString('en-US', { maximumFractionDigits: 0 })
  return '$' + v.toFixed(2)
}
function fmtVol(v) {
  if (!v || isNaN(v)) return null
  if (v >= 1e9) return `$${(v / 1e9).toFixed(1)}B`
  if (v >= 1e6) return `$${(v / 1e6).toFixed(1)}M`
  if (v >= 1e3) return `$${(v / 1e3).toFixed(1)}K`
  return `$${Number(v).toFixed(0)}`
}

const EXCHANGES = [
  // ─── CEX ───────────────────────────────────────────────────────────
  { id:'binance',  name:'Binance',       type:'CEX',        chain:'Multi-chain',  color:'#F0B90B', url:()=>`${P}/binance-api/api/v3/ticker/24hr?symbol=BTCUSDT`,                         method:'GET', parse:d=>({ price:+d.lastPrice,             vol:fmtVol(+d.quoteVolume),      change:+d.priceChangePercent,                          asset:'BTC' }) },
  { id:'bybit',   name:'Bybit',         type:'CEX',        chain:'Multi-chain',  color:'#F7A600', url:()=>`${P}/bybit-api/v5/market/tickers?category=spot&symbol=BTCUSDT`,             method:'GET', parse:d=>{ const t=d.result?.list?.[0]; return { price:+t?.lastPrice, vol:fmtVol(+t?.volume24h), change:+((+t?.price24hPcnt||0)*100).toFixed(2), asset:'BTC' } } },
  { id:'okx',     name:'OKX',           type:'CEX',        chain:'Multi-chain',  color:'#0064FF', url:()=>`${P}/okx-api/api/v5/market/ticker?instId=BTC-USDT`,                         method:'GET', parse:d=>{ const t=d.data?.[0]; return { price:+t?.last, vol:fmtVol(+t?.vol24h), change:null, asset:'BTC' } } },
  { id:'bingx',   name:'BingX',         type:'CEX',        chain:'Multi-chain',  color:'#00D4AA', url:()=>`${P}/bingx-api/openApi/spot/v1/ticker/24hr?symbol=BTC-USDT`,               method:'GET', parse:d=>({ price:+d.data?.lastPrice,       vol:fmtVol(+d.data?.quoteVolume), change:+d.data?.priceChangePercent,                   asset:'BTC' }) },
  { id:'coinbase',name:'Coinbase',       type:'CEX',        chain:'Multi-chain',  color:'#0052FF', url:()=>`${P}/coinbase-api/v2/prices/BTC-USD/spot`,                                  method:'GET', parse:d=>({ price:+d.data?.amount,         vol:null,                         change:null,                                          asset:'BTC' }) },
  { id:'bitget',  name:'Bitget',         type:'CEX',        chain:'Multi-chain',  color:'#00F0FF', url:()=>`${P}/bitget-api/api/v2/spot/market/tickers?symbol=BTCUSDT`,                method:'GET', parse:d=>{ const t=d.data?.[0]; return { price:+t?.lastPr, vol:fmtVol(+t?.usdtVol), change:+(+t?.change24h*100).toFixed(2), asset:'BTC' } } },
  { id:'kucoin',  name:'KuCoin',         type:'CEX',        chain:'Multi-chain',  color:'#23AF91', url:()=>`${P}/kucoin-api/api/v1/market/stats?symbol=BTC-USDT`,                      method:'GET', parse:d=>({ price:+d.data?.last,           vol:fmtVol(+d.data?.volValue),    change:+(+d.data?.changeRate*100).toFixed(2),          asset:'BTC' }) },
  // ─── Perp DEX ──────────────────────────────────────────────────────
  { id:'hyperliquid', name:'Hyperliquid',type:'Perp DEX',   chain:'L1 propio',    color:'#00AAFF', url:()=>`${P}/hl-info/info`,                                                        method:'POST', body:{ type:'allMids' }, parse:d=>({ price:+d.BTC, vol:null, change:null, asset:'BTC' }), hasConsole:true },
  { id:'dydx',    name:'dYdX v4',       type:'Perp DEX',   chain:'dYdX Chain',   color:'#6966FF', url:()=>`${P}/dydx-api/v4/perpetualMarkets`,                                        method:'GET', parse:d=>({ price:+d.markets?.['BTC-USD']?.oraclePrice, vol:fmtVol(+d.markets?.['BTC-USD']?.volume24H), change:null, asset:'BTC' }) },
  { id:'gmx',     name:'GMX v2',        type:'Perp DEX',   chain:'Arbitrum',     color:'#19B2FF', url:()=>`${P}/gmx-api/prices`,                                                      method:'GET', parse:d=>{ const a='0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f'; const v=d[a]||d[a.toLowerCase()]; return { price:v?+v/1e30:null, vol:null, change:null, asset:'BTC' } } },
  // ─── Spot / Stable DEX ─────────────────────────────────────────────
  { id:'uniswap', name:'Uniswap',       type:'Spot DEX',   chain:'Ethereum',     color:'#FF007A', url:()=>`${P}/dexscreener-api/latest/dex/pairs/ethereum/0x88e6a0c2ddd26feeb64f039a2c41296fcb3f5640`, method:'GET', parse:d=>{ const p=d.pairs?.[0]; return { price:+p?.priceNative, vol:p?.volume?.h24?fmtVol(+p.volume.h24):null, change:+p?.priceChange?.h24, asset:'ETH' } } },
  { id:'curve',   name:'Curve Finance', type:'Stable DEX', chain:'Ethereum',     color:'#E84142', url:()=>`${P}/curve-api/api/getPools/ethereum/main`,                                method:'GET', parse:d=>({ price:null, vol:null, change:null, asset:null, extra:`${d.data?.poolData?.length??'?'} pools` }) },
]

const TYPE_LABEL = {
  'CEX':        '#F0B90B',
  'Perp DEX':   '#00AAFF',
  'Spot DEX':   '#FF007A',
  'Stable DEX': '#E84142',
}

function StatusDot({ status }) {
  const colors = { idle:'var(--text-faint)', testing:'#f59e0b', ok:'#16a34a', error:'#dc2626' }
  const glow   = { ok:'0 0 6px #16a34a', error:'0 0 6px #dc2626', testing:'0 0 6px #f59e0b' }
  return (
    <div style={{
      width:8, height:8, borderRadius:'50%',
      background: colors[status] ?? colors.idle,
      boxShadow: glow[status] ?? 'none',
      animation: status === 'testing' ? 'pulse 0.8s infinite' : 'none',
      flexShrink: 0,
    }} />
  )
}

function ExchangeCard({ ex }) {
  const [s, setS]     = useState({ status:'idle', price:null, vol:null, change:null, latency:null, error:null, asset:null, extra:null })
  const [hlOpen, setHlOpen] = useState(false)

  const run = async () => {
    setS(prev => ({ ...prev, status:'testing' }))
    const t0 = performance.now()
    try {
      const opts = { method: ex.method, headers:{ 'Content-Type':'application/json' } }
      if (ex.body) opts.body = JSON.stringify(ex.body)
      const res  = await fetch(ex.url(), opts)
      const lat  = Math.round(performance.now() - t0)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data   = await res.json()
      const parsed = ex.parse(data)
      setS({ status:'ok', latency:lat, error:null, ...parsed })
    } catch (e) {
      setS({ status:'error', latency:Math.round(performance.now()-t0), error:e.message, price:null, vol:null, change:null, asset:null, extra:null })
    }
  }

  return (
    <>
      {hlOpen && <HLTestModal onClose={() => setHlOpen(false)} />}
      <div style={{
        background: 'var(--bg-elevated)',
        border: `1px solid ${ex.color}33`,
        borderLeft: `3px solid ${ex.color}`,
        borderRadius: 10,
        padding: '14px 16px',
        display: 'flex', flexDirection: 'column', gap: 10,
        transition: 'border-color 0.2s',
      }}>
        {/* Header */}
        <div style={{ display:'flex', alignItems:'center', gap:8 }}>
          <StatusDot status={s.status} />
          <span style={{ fontWeight:800, fontSize:14, color:'var(--text-primary)', flex:1, fontFamily:'Outfit,sans-serif' }}>{ex.name}</span>
          <span style={{ fontSize:9, fontWeight:700, letterSpacing:1, padding:'2px 7px', borderRadius:4, color:TYPE_LABEL[ex.type]??'var(--text-dim)', background:`${TYPE_LABEL[ex.type]??'#888'}18`, textTransform:'uppercase', fontFamily:'Outfit,sans-serif' }}>
            {ex.type}
          </span>
        </div>

        {/* Chain */}
        <div style={{ fontSize:10, color:'var(--text-label)', letterSpacing:0.5, fontFamily:'Outfit,sans-serif' }}>{ex.chain}</div>

        {/* Result */}
        <div style={{ minHeight:40 }}>
          {s.status === 'idle' && (
            <div style={{ fontSize:12, color:'var(--text-faint)', fontFamily:'Outfit,sans-serif' }}>Sin probar</div>
          )}
          {s.status === 'testing' && (
            <div style={{ fontSize:12, color:'#f59e0b', fontFamily:'Outfit,sans-serif' }}>Probando conexión...</div>
          )}
          {s.status === 'error' && (
            <div style={{ fontSize:11, color:'var(--color-danger)', wordBreak:'break-all', fontFamily:'Outfit,sans-serif' }}>
              ✗ {s.error}
              {s.latency != null && <span style={{ marginLeft:8, color:'var(--text-dim)' }}>{s.latency}ms</span>}
            </div>
          )}
          {s.status === 'ok' && (
            <div style={{ display:'flex', flexDirection:'column', gap:4 }}>
              {s.price != null && (
                <div style={{ display:'flex', alignItems:'baseline', gap:6 }}>
                  <span style={{ fontSize:20, fontWeight:800, color:ex.color, fontFamily:'monospace' }}>{fmtPrice(s.price)}</span>
                  <span style={{ fontSize:10, color:'var(--text-dim)', fontFamily:'Outfit,sans-serif' }}>{s.asset}</span>
                  {s.change != null && (
                    <span style={{ fontSize:11, fontWeight:700, color: s.change >= 0 ? '#16a34a' : '#dc2626', fontFamily:'Outfit,sans-serif' }}>
                      {s.change >= 0 ? '▲' : '▼'} {Math.abs(s.change).toFixed(2)}%
                    </span>
                  )}
                </div>
              )}
              {s.extra && <div style={{ fontSize:12, color:'var(--text-dim)', fontFamily:'Outfit,sans-serif' }}>{s.extra}</div>}
              <div style={{ display:'flex', gap:12, fontSize:10, color:'var(--text-dim)', marginTop:2, fontFamily:'Outfit,sans-serif' }}>
                {s.latency != null && <span>⚡ {s.latency}ms</span>}
                {s.vol && <span>Vol 24h: {s.vol}</span>}
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div style={{ display:'flex', gap:6, marginTop:'auto' }}>
          <button
            onClick={run}
            data-exchange-test
            disabled={s.status === 'testing'}
            style={{
              flex:1, padding:'6px 0', background:'transparent',
              border:`1px solid ${ex.color}55`, color:ex.color,
              fontSize:11, fontWeight:700,
              cursor: s.status === 'testing' ? 'not-allowed' : 'pointer',
              borderRadius:6, fontFamily:'Outfit,sans-serif',
              letterSpacing:0.5, opacity: s.status === 'testing' ? 0.5 : 1,
              transition:'all 0.15s',
            }}
            onMouseEnter={e => { if (s.status !== 'testing') e.currentTarget.style.background = `${ex.color}18` }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
          >
            {s.status === 'testing' ? '⟳ Probando...' : s.status === 'ok' ? '↺ Volver a probar' : '▷ Probar'}
          </button>
          {ex.hasConsole && (
            <button
              onClick={() => setHlOpen(true)}
              style={{ padding:'6px 10px', background:'transparent', border:'1px solid var(--border-dim)', color:'var(--text-dim)', fontSize:11, cursor:'pointer', borderRadius:6, fontFamily:'Outfit,sans-serif', transition:'all 0.15s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor='#00AAFF'; e.currentTarget.style.color='#00AAFF' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor='var(--border-dim)'; e.currentTarget.style.color='var(--text-dim)' }}
            >
              ⚡ Consola
            </button>
          )}
        </div>
      </div>
    </>
  )
}

export default function ApiTestTab() {
  const cex = EXCHANGES.filter(e => e.type === 'CEX')
  const dex = EXCHANGES.filter(e => e.type !== 'CEX')

  return (
    <div>
      {/* Header */}
      <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:20, flexWrap:'wrap' }}>
        <div>
          <div style={{ fontSize:16, fontWeight:800, color:'var(--text-secondary)', fontFamily:'Outfit,sans-serif' }}>Test de Conectividad — Exchanges</div>
          <div style={{ fontSize:11, color:'var(--text-label)', marginTop:2, fontFamily:'Outfit,sans-serif' }}>
            Verifica latencia y precios en vivo desde {EXCHANGES.length} exchanges
          </div>
        </div>
        {!P && (
          <div style={{ marginLeft:'auto', fontSize:10, color:'var(--color-warning)', padding:'4px 10px', border:'1px solid var(--border-warning-subtle)', borderRadius:6, background:'var(--bg-warning-subtle)', fontFamily:'Outfit,sans-serif' }}>
            ⚠ Sin proxy — algunos CEX pueden fallar por CORS en local
          </div>
        )}
      </div>

      {/* CEX */}
      <div style={{ fontSize:10, fontWeight:700, color:'#F0B90B', letterSpacing:2, textTransform:'uppercase', marginBottom:10, fontFamily:'Outfit,sans-serif' }}>
        Exchanges Centralizados (CEX)
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(220px, 1fr))', gap:12, marginBottom:24 }}>
        {cex.map(ex => <ExchangeCard key={ex.id} ex={ex} />)}
      </div>

      {/* DEX */}
      <div style={{ fontSize:10, fontWeight:700, color:'#00AAFF', letterSpacing:2, textTransform:'uppercase', marginBottom:10, fontFamily:'Outfit,sans-serif' }}>
        Exchanges Descentralizados (DEX)
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(220px, 1fr))', gap:12 }}>
        {dex.map(ex => <ExchangeCard key={ex.id} ex={ex} />)}
      </div>

      <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }`}</style>
    </div>
  )
}
