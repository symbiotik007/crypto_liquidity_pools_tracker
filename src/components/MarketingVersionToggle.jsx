import { useState, useEffect } from 'react'

const STORAGE_KEY = 'cpe_marketing_v'

export function getMarketingVersion() {
  return localStorage.getItem(STORAGE_KEY) === '2' ? '2' : '1'
}

export function applyMarketingVersion(v) {
  const val = v === '2' ? '2' : '1'
  document.documentElement.setAttribute('data-marketing-v', val)
  localStorage.setItem(STORAGE_KEY, val)
}

/** Apply the saved version on mount. Call once at app/page level. */
export function useMarketingVersionInit() {
  useEffect(() => { applyMarketingVersion(getMarketingVersion()) }, [])
}

/**
 * Temporary visual A/B toggle for marketing pages (Home, /programas, /liquidity-engine).
 * V1 = current visual config. V2 = premium light upgrade (only affects light theme).
 */
export default function MarketingVersionToggle({ mobile = false }) {
  const [v, setV] = useState(getMarketingVersion)
  useEffect(() => { applyMarketingVersion(v) }, [v])

  const next = v === '1' ? '2' : '1'
  const handle = () => setV(next)

  if (mobile) {
    return (
      <button
        className="nav-mobile-link nav-mobile-vtoggle"
        onClick={handle}
        aria-label={`Cambiar a versión ${next}`}
      >
        <span style={{ fontSize: 14, fontWeight: 700, letterSpacing: 1 }}>V{v}</span>
        <span style={{ marginLeft: 8, opacity: 0.6 }}>· cambiar a V{next}</span>
      </button>
    )
  }

  return (
    <div className="mv-toggle" role="group" aria-label="Versión visual">
      {['1', '2'].map(opt => (
        <button
          key={opt}
          className={`mv-toggle-btn ${v === opt ? 'active' : ''}`}
          onClick={() => setV(opt)}
          title={opt === '1' ? 'V1 — visual actual' : 'V2 — premium light'}
        >
          V{opt}
        </button>
      ))}
    </div>
  )
}
