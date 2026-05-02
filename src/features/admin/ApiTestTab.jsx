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
  // ─── CEX ────────────────────────────────────────────────────────────
  {
    id: 'binance', name: 'Binance', type: 'CEX', chain: 'Multi-chain', color: '#F0B90B', bg: '#120e00',
    badge: '#1a1300',
    url: () => `${P}/binance-api/api/v3/ticker/24hr?symbol=BTCUSDT`,
    method: 'GET',
    parse: d => ({ price: +d.lastPrice, vol: fmtVol(+d.quoteVolume), change: +d.priceChangePercent, asset: 'BTC' }),
  },
  {
    id: 'bybit', name: 'Bybit', type: 'CEX', chain: 'Multi-chain', color: '#F7A600', bg: '#120b00',
    badge: '#1a1000',
    url: () => `${P}/bybit-api/v5/market/tickers?category=spot&symbol=BTCUSDT`,
    method: 'GET',
    parse: d => {
      const t = d.result?.list?.[0]
      return { price: +t?.lastPrice, vol: fmtVol(+t?.volume24h), change: +((+t?.price24hPcnt || 0) * 100).toFixed(2), asset: 'BTC' }
    },
  },
  {
    id: 'okx', name: 'OKX', type: 'CEX', chain: 'Multi-chain', color: '#0064FF', bg: '#00050f',
    badge: '#000a1a',
    url: () => `${P}/okx-api/api/v5/market/ticker?instId=BTC-USDT`,
    method: 'GET',
    parse: d => {
      const t = d.data?.[0]
      return { price: +t?.last, vol: fmtVol(+t?.vol24h), change: null, asset: 'BTC' }
    },
  },
  {
    id: 'bingx', name: 'BingX', type: 'CEX', chain: 'Multi-chain', color: '#00D4AA', bg: '#00120d',
    badge: '#001a11',
    url: () => `${P}/bingx-api/openApi/spot/v1/ticker/24hr?symbol=BTC-USDT`,
    method: 'GET',
    parse: d => ({ price: +d.data?.lastPrice, vol: fmtVol(+d.data?.quoteVolume), change: +d.data?.priceChangePercent, asset: 'BTC' }),
  },
  {
    id: 'coinbase', name: 'Coinbase', type: 'CEX', chain: 'Multi-chain', color: '#0052FF', bg: '#00050f',
    badge: '#000a1a',
    url: () => `${P}/coinbase-api/v2/prices/BTC-USD/spot`,
    method: 'GET',
    parse: d => ({ price: +d.data?.amount, vol: null, change: null, asset: 'BTC' }),
  },
  // ─── Perp DEX ───────────────────────────────────────────────────────
  {
    id: 'hyperliquid', name: 'Hyperliquid', type: 'Perp DEX', chain: 'L1 propio', color: '#00AAFF', bg: '#00080f',
    badge: '#000d1a',
    url: () => `${P}/hl-info/info`,
    method: 'POST',
    body: { type: 'allMids' },
    parse: d => ({ price: +d.BTC, vol: null, change: null, asset: 'BTC' }),
    hasConsole: true,
  },
  {
    id: 'dydx', name: 'dYdX v4', type: 'Perp DEX', chain: 'dYdX Chain', color: '#6966FF', bg: '#05051a',
    badge: '#08081f',
    url: () => `${P}/dydx-api/v4/perpetualMarkets`,
    method: 'GET',
    parse: d => ({
      price: +d.markets?.['BTC-USD']?.oraclePrice,
      vol: fmtVol(+d.markets?.['BTC-USD']?.volume24H),
      change: null,
      asset: 'BTC',
    }),
  },
  {
    id: 'gmx', name: 'GMX v2', type: 'Perp DEX', chain: 'Arbitrum', color: '#19B2FF', bg: '#001015',
    badge: '#001820',
    url: () => `${P}/gmx-api/prices`,
    method: 'GET',
    parse: d => {
      const btcAddr = '0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f'
      const val = d[btcAddr] || d[btcAddr.toLowerCase()]
      return { price: val ? +val / 1e30 : null, vol: null, change: null, asset: 'BTC' }
    },
  },
  // ─── Spot / Stable DEX ──────────────────────────────────────────────
  {
    id: 'uniswap', name: 'Uniswap', type: 'Spot DEX', chain: 'Ethereum', color: '#FF007A', bg: '#0f0008',
    badge: '#1a000f',
    url: () => `${P}/dexscreener-api/latest/dex/pairs/ethereum/0x88e6a0c2ddd26feeb64f039a2c41296fcb3f5640`,
    method: 'GET',
    parse: d => {
      const pair = d.pairs?.[0]
      return {
        price: +pair?.priceNative,
        vol: pair?.volume?.h24 ? fmtVol(+pair.volume.h24) : null,
        change: +pair?.priceChange?.h24,
        asset: 'ETH',
      }
    },
  },
  {
    id: 'curve', name: 'Curve Finance', type: 'Stable DEX', chain: 'Ethereum', color: '#E84142', bg: '#0f0404',
    badge: '#1a0505',
    url: () => `${P}/curve-api/api/getPools/ethereum/main`,
    method: 'GET',
    parse: d => ({
      price: null,
      vol: null,
      change: null,
      asset: null,
      extra: `${d.data?.poolData?.length ?? '?'} pools`,
    }),
  },
]

const TYPE_COLOR = {
  'CEX':        { text: '#F0B90B', bg: 'rgba(240,185,11,0.12)' },
  'Perp DEX':   { text: '#00AAFF', bg: 'rgba(0,170,255,0.12)' },
  'Spot DEX':   { text: '#FF007A', bg: 'rgba(255,0,122,0.12)' },
  'Stable DEX': { text: '#E84142', bg: 'rgba(232,65,66,0.12)' },
}

function StatusDot({ status }) {
  const map = {
    idle:    '#2a5a72',
    testing: '#ffb347',
    ok:      '#00ff88',
    error:   '#ff4f6e',
  }
  const glow = status === 'ok' ? '0 0 6px #00ff88' : status === 'error' ? '0 0 6px #ff4f6e' : status === 'testing' ? '0 0 6px #ffb347' : 'none'
  return (
    <div style={{
      width: 8, height: 8, borderRadius: '50%',
      background: map[status] ?? '#2a5a72',
      boxShadow: glow,
      animation: status === 'testing' ? 'pulse 0.8s infinite' : 'none',
    }} />
  )
}

function ExchangeCard({ ex }) {
  const [s, setS] = useState({ status: 'idle', price: null, vol: null, change: null, latency: null, error: null, asset: null, extra: null })
  const [hlOpen, setHlOpen] = useState(false)

  const run = async () => {
    setS(prev => ({ ...prev, status: 'testing' }))
    const t0 = performance.now()
    try {
      const opts = { method: ex.method, headers: { 'Content-Type': 'application/json' } }
      if (ex.body) opts.body = JSON.stringify(ex.body)
      const res = await fetch(ex.url(), opts)
      const latency = Math.round(performance.now() - t0)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data  = await res.json()
      const parsed = ex.parse(data)
      setS({ status: 'ok', latency, error: null, ...parsed })
    } catch (e) {
      setS({ status: 'error', latency: Math.round(performance.now() - t0), error: e.message, price: null, vol: null, change: null, asset: null, extra: null })
    }
  }

  const tc = TYPE_COLOR[ex.type] ?? TYPE_COLOR['CEX']

  return (
    <>
      {hlOpen && <HLTestModal onClose={() => setHlOpen(false)} />}
      <div style={{
        background: ex.bg,
        border: `1px solid ${ex.color}22`,
        borderLeft: `3px solid ${ex.color}`,
        borderRadius: 10,
        padding: '14px 16px',
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        transition: 'border-color 0.2s',
      }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <StatusDot status={s.status} />
          <span style={{ fontWeight: 800, fontSize: 14, color: '#e0f4ff', flex: 1 }}>{ex.name}</span>
          <span style={{
            fontSize: 9, fontWeight: 700, letterSpacing: 1,
            padding: '2px 7px', borderRadius: 4,
            color: tc.text, background: tc.bg,
            textTransform: 'uppercase',
          }}>{ex.type}</span>
        </div>

        {/* Chain */}
        <div style={{ fontSize: 10, color: '#2a5a72', letterSpacing: 0.5 }}>{ex.chain}</div>

        {/* Data */}
        <div style={{ minHeight: 40 }}>
          {s.status === 'idle' && (
            <div style={{ fontSize: 12, color: '#1a3a5e' }}>Sin probar</div>
          )}
          {s.status === 'testing' && (
            <div style={{ fontSize: 12, color: '#ffb347' }}>Probando conexión...</div>
          )}
          {s.status === 'error' && (
            <div style={{ fontSize: 11, color: '#ff4f6e', wordBreak: 'break-all' }}>
              ✗ {s.error}
              {s.latency != null && <span style={{ marginLeft: 8, color: '#4a7a96' }}>{s.latency}ms</span>}
            </div>
          )}
          {s.status === 'ok' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {s.price != null && (
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                  <span style={{ fontSize: 20, fontWeight: 800, color: ex.color, fontFamily: 'monospace' }}>
                    {fmtPrice(s.price)}
                  </span>
                  <span style={{ fontSize: 10, color: '#4a7a96' }}>{s.asset}</span>
                  {s.change != null && (
                    <span style={{ fontSize: 11, fontWeight: 700, color: s.change >= 0 ? '#00ff88' : '#ff4f6e' }}>
                      {s.change >= 0 ? '▲' : '▼'} {Math.abs(s.change).toFixed(2)}%
                    </span>
                  )}
                </div>
              )}
              {s.extra && (
                <div style={{ fontSize: 12, color: '#7ab8d4' }}>{s.extra}</div>
              )}
              <div style={{ display: 'flex', gap: 12, fontSize: 10, color: '#4a7a96', marginTop: 2 }}>
                {s.latency != null && <span>⚡ {s.latency}ms</span>}
                {s.vol && <span>Vol 24h: {s.vol}</span>}
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: 6, marginTop: 'auto' }}>
          <button
            onClick={run}
            disabled={s.status === 'testing'}
            style={{
              flex: 1,
              padding: '6px 0',
              background: 'transparent',
              border: `1px solid ${ex.color}55`,
              color: ex.color,
              fontSize: 11,
              fontWeight: 700,
              cursor: s.status === 'testing' ? 'not-allowed' : 'pointer',
              borderRadius: 5,
              fontFamily: 'Outfit, sans-serif',
              letterSpacing: 0.5,
              opacity: s.status === 'testing' ? 0.5 : 1,
              transition: 'all 0.15s',
            }}
            onMouseEnter={e => { if (s.status !== 'testing') { e.target.style.background = `${ex.color}18` } }}
            onMouseLeave={e => { e.target.style.background = 'transparent' }}
          >
            {s.status === 'testing' ? '⟳ Probando...' : s.status === 'ok' ? '↺ Volver a probar' : '▷ Probar conexión'}
          </button>
          {ex.hasConsole && (
            <button
              onClick={() => setHlOpen(true)}
              style={{
                padding: '6px 10px',
                background: 'transparent',
                border: '1px solid #1a3a5e',
                color: '#4a7a96',
                fontSize: 11,
                cursor: 'pointer',
                borderRadius: 5,
                fontFamily: 'Outfit, sans-serif',
                transition: 'all 0.15s',
              }}
              onMouseEnter={e => { e.target.style.borderColor = '#00AAFF'; e.target.style.color = '#00AAFF' }}
              onMouseLeave={e => { e.target.style.borderColor = '#1a3a5e'; e.target.style.color = '#4a7a96' }}
              title="Abrir consola de trading completa"
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
  const [testingAll, setTestingAll] = useState(false)
  const [keys, setKeys]   = useState(() => EXCHANGES.map((_, i) => i))

  const testAll = () => {
    setTestingAll(true)
    // Reset all cards by changing keys, then re-mount will auto-trigger nothing (user still clicks per card)
    // Instead, we simulate a "test all" by dispatching a custom event each card listens to
    document.querySelectorAll('[data-exchange-test]').forEach(btn => btn.click())
    setTimeout(() => setTestingAll(false), 3000)
  }

  const cex  = EXCHANGES.filter(e => e.type === 'CEX')
  const dex  = EXCHANGES.filter(e => e.type !== 'CEX')

  return (
    <div style={{ padding: '4px 0' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
        <div>
          <div style={{ fontSize: 16, fontWeight: 800, color: '#e0f4ff' }}>Test de Conectividad — Exchanges</div>
          <div style={{ fontSize: 11, color: '#2a5a72', marginTop: 2 }}>
            Verifica latencia y precios en vivo desde {EXCHANGES.length} exchanges (5 CEX + 5 DEX)
          </div>
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
          {!P && (
            <div style={{ fontSize: 10, color: '#ffb347', padding: '4px 10px', border: '1px solid #5a3a00', borderRadius: 5, background: '#1a0e00' }}>
              ⚠ Sin proxy — algunos CEX pueden fallar por CORS en local
            </div>
          )}
        </div>
      </div>

      {/* CEX section */}
      <div style={{ fontSize: 10, fontWeight: 700, color: '#F0B90B', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 10 }}>
        Exchanges Centralizados (CEX)
      </div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
        gap: 12,
        marginBottom: 24,
      }}>
        {cex.map(ex => <ExchangeCard key={ex.id} ex={ex} />)}
      </div>

      {/* DEX section */}
      <div style={{ fontSize: 10, fontWeight: 700, color: '#00AAFF', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 10 }}>
        Exchanges Descentralizados (DEX)
      </div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
        gap: 12,
      }}>
        {dex.map(ex => <ExchangeCard key={ex.id} ex={ex} />)}
      </div>

      <style>{`
        @keyframes pulse {
          0%,100% { opacity:1 }
          50%      { opacity:0.3 }
        }
      `}</style>
    </div>
  )
}
