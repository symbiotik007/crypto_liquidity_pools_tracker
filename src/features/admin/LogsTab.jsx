import { useEffect, useState } from 'react'

const ORG     = import.meta.env.VITE_SENTRY_ORG
const PROJECT = import.meta.env.VITE_SENTRY_PROJECT
const TOKEN   = import.meta.env.VITE_SENTRY_AUTH_TOKEN
const PROXY   = import.meta.env.VITE_REVERT_PROXY_URL ?? ''

const LEVEL_COLORS = {
  error:   { bg: 'rgba(220,38,38,0.1)',   border: 'rgba(220,38,38,0.3)',   text: '#f87171' },
  warning: { bg: 'rgba(217,119,6,0.1)',   border: 'rgba(217,119,6,0.3)',   text: '#fbbf24' },
  info:    { bg: 'rgba(0,229,255,0.08)',  border: 'rgba(0,229,255,0.25)',  text: '#00e5ff' },
  fatal:   { bg: 'rgba(139,0,0,0.15)',    border: 'rgba(220,38,38,0.5)',   text: '#ff4f6e' },
}

function LevelBadge({ level }) {
  const c = LEVEL_COLORS[level] ?? LEVEL_COLORS.info
  return (
    <span style={{
      fontSize: 10, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase',
      padding: '3px 10px', borderRadius: 999,
      background: c.bg, border: `1px solid ${c.border}`, color: c.text,
    }}>
      {level}
    </span>
  )
}

function timeAgo(dateStr) {
  const diff = (Date.now() - new Date(dateStr)) / 1000
  if (diff < 60)   return `hace ${Math.floor(diff)}s`
  if (diff < 3600) return `hace ${Math.floor(diff / 60)}m`
  if (diff < 86400) return `hace ${Math.floor(diff / 3600)}h`
  return `hace ${Math.floor(diff / 86400)}d`
}

function IssueRow({ issue }) {
  const [open, setOpen] = useState(false)
  const c = LEVEL_COLORS[issue.level] ?? LEVEL_COLORS.info

  return (
    <>
      <tr
        onClick={() => setOpen(o => !o)}
        style={{ cursor: 'pointer', borderBottom: '1px solid #0e2030', transition: 'background 0.12s' }}
        onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,229,255,0.03)'}
        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
      >
        <td style={{ padding: '12px 16px', maxWidth: 320 }}>
          <div style={{ fontSize: 13, color: '#c8e6f0', fontWeight: 600, marginBottom: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {issue.title}
          </div>
          <div style={{ fontSize: 11, color: '#2a5a72', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {issue.culprit || '—'}
          </div>
        </td>
        <td style={{ padding: '12px 16px' }}><LevelBadge level={issue.level} /></td>
        <td style={{ padding: '12px 16px', fontSize: 12, color: '#4a7a96', textAlign: 'right' }}>
          <span style={{ fontSize: 15, fontWeight: 700, color: c.text }}>{issue.count}</span>
          <span style={{ fontSize: 10, color: '#2a5a72', marginLeft: 4 }}>eventos</span>
        </td>
        <td style={{ padding: '12px 16px', fontSize: 11, color: '#2a5a72', whiteSpace: 'nowrap' }}>
          {timeAgo(issue.lastSeen)}
        </td>
        <td style={{ padding: '12px 16px', fontSize: 14, color: '#2a5a72' }}>{open ? '▲' : '▼'}</td>
      </tr>
      {open && (
        <tr style={{ background: '#070d14', borderBottom: '1px solid #0e2030' }}>
          <td colSpan={5} style={{ padding: '16px 20px' }}>
            <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', marginBottom: 12 }}>
              <div>
                <div style={{ fontSize: 10, color: '#2a5a72', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 4 }}>Primera vez visto</div>
                <div style={{ fontSize: 12, color: '#4a7a96' }}>{new Date(issue.firstSeen).toLocaleString('es-CO')}</div>
              </div>
              <div>
                <div style={{ fontSize: 10, color: '#2a5a72', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 4 }}>Última vez visto</div>
                <div style={{ fontSize: 12, color: '#4a7a96' }}>{new Date(issue.lastSeen).toLocaleString('es-CO')}</div>
              </div>
              <div>
                <div style={{ fontSize: 10, color: '#2a5a72', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 4 }}>Usuarios afectados</div>
                <div style={{ fontSize: 12, color: '#4a7a96' }}>{issue.userCount ?? '—'}</div>
              </div>
            </div>
            <a
              href={issue.permalink}
              target="_blank"
              rel="noreferrer"
              onClick={e => e.stopPropagation()}
              style={{ fontSize: 12, color: '#00e5ff', textDecoration: 'none', fontWeight: 600 }}
            >
              Ver en Sentry →
            </a>
          </td>
        </tr>
      )}
    </>
  )
}

const FILTERS = ['all', 'error', 'warning', 'fatal', 'info']

export default function LogsTab() {
  const [issues, setIssues]   = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState('')
  const [filter, setFilter]   = useState('all')
  const [tick, setTick]       = useState(0)

  const configured = ORG && PROJECT && TOKEN
  const refresh = () => setTick(t => t + 1)

  useEffect(() => {
    if (!configured) return
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const fetch = async () => {
      setLoading(true); setError('')
      try {
        const params = new URLSearchParams({ limit: 50, sort: 'date', query: 'is:unresolved' })
        const res = await window.fetch(
          `${PROXY}/sentry-issues?${params}`,
          { headers: { Authorization: `Bearer ${TOKEN}` } }
        )
        if (!res.ok) throw new Error(`Sentry API ${res.status}`)
        const data = await res.json()
        setIssues(data)
      } catch (e) {
        setError(e.message)
      }
      setLoading(false)
    }
    fetch()
  }, [configured, tick])

  if (!configured) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 24px' }}>
        <div style={{ fontSize: 36, marginBottom: 16 }}>🔧</div>
        <div style={{ fontSize: 15, fontWeight: 700, color: '#4a7a96', marginBottom: 8 }}>Sentry no configurado</div>
        <div style={{ fontSize: 12, color: '#1a3a5e', lineHeight: 1.7, maxWidth: 380, margin: '0 auto' }}>
          Completa las variables en <code style={{ color: '#00e5ff' }}>.env</code>:<br />
          <code style={{ color: '#4a7a96' }}>VITE_SENTRY_ORG</code>, <code style={{ color: '#4a7a96' }}>VITE_SENTRY_PROJECT</code>, <code style={{ color: '#4a7a96' }}>VITE_SENTRY_AUTH_TOKEN</code>
        </div>
      </div>
    )
  }

  const filtered = filter === 'all' ? issues : issues.filter(i => i.level === filter)
  const counts   = FILTERS.reduce((acc, f) => {
    acc[f] = f === 'all' ? issues.length : issues.filter(i => i.level === f).length
    return acc
  }, {})

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <div style={{ fontSize: 16, fontWeight: 700, color: '#c8e6f0', marginBottom: 2 }}>Logs del sistema</div>
          <div style={{ fontSize: 12, color: '#2a5a72' }}>Errores en tiempo real vía Sentry · {issues.length} issues sin resolver</div>
        </div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center' }}>
          <button
            onClick={refresh}
            disabled={loading}
            title="Actualizar"
            style={{
              fontSize: 13, padding: '5px 10px', borderRadius: 999, cursor: loading ? 'not-allowed' : 'pointer',
              background: 'transparent', border: '1px solid #0e2030', color: '#4a7a96',
              fontFamily: 'Outfit, sans-serif', transition: 'all 0.15s', opacity: loading ? 0.5 : 1,
              lineHeight: 1,
            }}
            onMouseEnter={e => { if (!loading) e.currentTarget.style.borderColor = '#00e5ff'; e.currentTarget.style.color = '#00e5ff' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = '#0e2030'; e.currentTarget.style.color = '#4a7a96' }}
          >
            {loading ? '...' : '↻'}
          </button>
          {FILTERS.map(f => {
            const isActive = filter === f
            const c = LEVEL_COLORS[f]
            return (
              <button
                key={f}
                onClick={() => setFilter(f)}
                style={{
                  fontSize: 11, fontWeight: 700, letterSpacing: 0.8, textTransform: 'uppercase',
                  padding: '5px 14px', borderRadius: 999, cursor: 'pointer',
                  background: isActive ? (c?.bg ?? 'rgba(0,229,255,0.1)') : 'transparent',
                  border: `1px solid ${isActive ? (c?.border ?? 'rgba(0,229,255,0.3)') : '#0e2030'}`,
                  color: isActive ? (c?.text ?? '#00e5ff') : '#2a5a72',
                  fontFamily: 'Outfit, sans-serif', transition: 'all 0.15s',
                }}
              >
                {f} {counts[f] > 0 ? `(${counts[f]})` : ''}
              </button>
            )
          })}
        </div>
      </div>

      {loading && (
        <div style={{ textAlign: 'center', padding: 48, color: '#2a5a72', fontSize: 13 }}>Consultando Sentry...</div>
      )}

      {error && (
        <div style={{ padding: '20px 24px', background: 'rgba(220,38,38,0.06)', border: '1px solid rgba(220,38,38,0.18)', borderRadius: 10, marginBottom: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#f87171', marginBottom: 6 }}>⚠ No se pudo conectar al proxy de Sentry</div>
          <div style={{ fontSize: 12, color: '#4a7a96', lineHeight: 1.65, marginBottom: 14 }}>
            La captura de errores funciona correctamente. Para ver los issues aquí dentro se necesita configurar el endpoint <code style={{ color: '#00e5ff' }}>/sentry-issues</code> en el Cloudflare Worker.
          </div>
          <a
            href={`https://${ORG}.sentry.io/issues/?project=${PROJECT}&query=is%3Aunresolved&sort=date`}
            target="_blank"
            rel="noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 12, fontWeight: 700, color: '#00e5ff', textDecoration: 'none', padding: '8px 16px', border: '1px solid rgba(0,229,255,0.3)', borderRadius: 8, background: 'rgba(0,229,255,0.06)' }}
          >
            Ver issues en Sentry →
          </a>
        </div>
      )}

      {!loading && !error && filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: 48 }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>✅</div>
          <div style={{ fontSize: 14, color: '#2a5a72' }}>
            {filter === 'all' ? 'No hay issues sin resolver' : `No hay issues de nivel "${filter}"`}
          </div>
        </div>
      )}

      {!loading && !error && filtered.length > 0 && (
        <div style={{ border: '1px solid #0e2030', borderRadius: 10, overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#070d14', borderBottom: '1px solid #0e2030' }}>
                {['Error', 'Nivel', 'Eventos', 'Último', ''].map(h => (
                  <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: 10, fontWeight: 700, color: '#2a5a72', letterSpacing: 1.5, textTransform: 'uppercase' }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(issue => <IssueRow key={issue.id} issue={issue} />)}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
