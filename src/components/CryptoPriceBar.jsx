// src/components/CryptoPriceBar.jsx
import { useState, useEffect } from 'react'

const COIN_IDS = [
  'bitcoin','ethereum','tether','binancecoin','solana',
  'ripple','usd-coin','dogecoin','cardano','tron',
  'avalanche-2','chainlink','shiba-inu','polkadot','bitcoin-cash',
]
const COIN_META = {
  bitcoin:{symbol:'BTC'},ethereum:{symbol:'ETH'},tether:{symbol:'USDT'},
  binancecoin:{symbol:'BNB'},solana:{symbol:'SOL'},ripple:{symbol:'XRP'},
  'usd-coin':{symbol:'USDC'},dogecoin:{symbol:'DOGE'},cardano:{symbol:'ADA'},
  tron:{symbol:'TRX'},'avalanche-2':{symbol:'AVAX'},chainlink:{symbol:'LINK'},
  'shiba-inu':{symbol:'SHIB'},polkadot:{symbol:'DOT'},'bitcoin-cash':{symbol:'BCH'},
}

function fmtPrice(p) {
  if (!p && p !== 0) return '—'
  if (p >= 1000) return '$' + p.toLocaleString('en-US', { maximumFractionDigits: 0 })
  if (p >= 1)    return '$' + p.toFixed(2)
  if (p >= 0.01) return '$' + p.toFixed(4)
  return '$' + p.toFixed(8)
}

export default function CryptoPriceBar() {
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

  useEffect(() => { fetchAll(); const t = setInterval(fetchAll, 60000); return () => clearInterval(t) }, [])

  const btcDom   = globalData?.market_cap_percentage?.btc?.toFixed(1)
  const ethDom   = globalData?.market_cap_percentage?.eth?.toFixed(1)
  const totalMcap = globalData?.total_market_cap?.usd
  const fmtMcap  = v => !v ? '—' : v >= 1e12 ? '$'+(v/1e12).toFixed(2)+'T' : '$'+(v/1e9).toFixed(0)+'B'
  const items    = coins.map(c => ({ ...c, symbol: COIN_META[c.id]?.symbol || c.symbol?.toUpperCase(), change: c.price_change_percentage_24h || 0 }))
  const doubled  = [...items, ...items]
  const pill     = { display:'flex', alignItems:'center', gap:5, padding:'0 12px', height:'100%', flexShrink:0, borderRight:'1px solid rgba(0,229,255,0.08)' }

  return (
    <div style={{ position:'fixed', top:0, left:0, right:0, zIndex:200, background:'#020810', borderBottom:'1px solid rgba(0,229,255,0.12)', height:32, overflow:'hidden', display:'flex', alignItems:'center', fontFamily:"'Outfit',sans-serif" }}>
      <div style={{ ...pill, background:'rgba(0,229,255,0.04)', borderRight:'1px solid rgba(0,229,255,0.2)', gap:7 }}>
        <div style={{ width:5, height:5, borderRadius:'50%', background:'#00e5ff', boxShadow:'0 0 6px #00e5ff', animation:'livePulse 2s infinite' }} />
        <span style={{ fontSize:9, fontWeight:800, color:'#00e5ff', letterSpacing:2, textTransform:'uppercase' }}>CRYPTO LIVE</span>
      </div>
      {btcDom   && <div style={pill}><span style={{ fontSize:9, color:'#2a5a72', letterSpacing:1, textTransform:'uppercase' }}>BTC DOM</span><span style={{ fontSize:11, fontWeight:700, color:'#f7931a' }}>{btcDom}%</span></div>}
      {ethDom   && <div style={pill}><span style={{ fontSize:9, color:'#2a5a72', letterSpacing:1, textTransform:'uppercase' }}>ETH DOM</span><span style={{ fontSize:11, fontWeight:700, color:'#627eea' }}>{ethDom}%</span></div>}
      {totalMcap && <div style={pill}><span style={{ fontSize:9, color:'#2a5a72', letterSpacing:1, textTransform:'uppercase' }}>MKT CAP</span><span style={{ fontSize:11, fontWeight:700, color:'#c8e6f0' }}>{fmtMcap(totalMcap)}</span></div>}
      <div style={{ flex:1, overflow:'hidden', height:'100%' }}>
        {items.length === 0
          ? <div style={{ display:'flex', alignItems:'center', height:'100%', paddingLeft:16, fontSize:10, color:'#2a5a72' }}>Cargando precios...</div>
          : <div style={{ display:'flex', alignItems:'center', height:'100%', whiteSpace:'nowrap', animation:'priceScroll 90s linear infinite' }}>
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
        }
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
