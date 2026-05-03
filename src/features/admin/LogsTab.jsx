import { useEffect, useState } from 'react'

const ORG     = import.meta.env.VITE_SENTRY_ORG
const PROJECT = import.meta.env.VITE_SENTRY_PROJECT
const TOKEN   = import.meta.env.VITE_SENTRY_AUTH_TOKEN
const PROXY   = import.meta.env.VITE_REVERT_PROXY_URL ?? ''

const LEVEL_COLORS = {
  error:   { bg: 'rgba(220,38,38,0.1)',   border: 'rgba(220,38,38,0.3)',   text: '#ef4444' },
  warning: { bg: 'rgba(217,119,6,0.1)',   border: 'rgba(217,119,6,0.3)',   text: '#f59e0b' },
  info:    { bg: 'rgba(37,99,235,0.08)',  border: 'rgba(37,99,235,0.25)',  text: '#3b82f6' },
  fatal:   { bg: 'rgba(139,0,0,0.12)',    border: 'rgba(220,38,38,0.4)',   text: '#dc2626' },
}

function LevelBadge({ level }) {
  const c = LEVEL_COLORS[level] ?? LEVEL_COLORS.info
  return (
    <span style={{
      fontSize: 10, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase',
      padding: '3px 10px', borderRadius: 999,
      background: c.bg, border: `1px solid ${c.border}`, color: c.text,
      fontFamily: 'Outfit, sans-serif',
    }}>
      {level}
    </span>
  )
}

function timeAgo(dateStr) {
  const diff = (Date.now() - new Date(dateStr)) / 1000
  if (diff < 60)    return `hace ${Math.floor(diff)}s`
  if (diff < 3600)  return `hace ${Math.floor(diff / 60)}m`
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
        style={{ cursor: 'pointer', borderBottom: '1px solid var(--border-dim)', transition: 'background 0.12s' }}
        onMouseEnter={e => e.currentTarget.style.background = 'rgba(var(--color-accent-rgb), 0.04)'}
        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
      >
        <td style={{ padding: '12px 16px', maxWidth: 320 }}>
          <div style={{ fontSize: 13, color: 'var(--text-secondary)', fontWeight: 600, marginBottom: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontFamily: 'Outfit, sans-serif' }}>
            {issue.title}
          </div>
          <div style={{ fontSize: 11, color: 'var(--text-label)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontFamily: 'Outfit, sans-serif' }}>
            {issue.culprit || '—'}
          </div>
        </td>
        <td style={{ padding: '12px 16px' }}><LevelBadge level={issue.level} /></td>
        <td style={{ padding: '12px 16px', fontSize: 12, color: 'var(--text-dim)', textAlign: 'right', fontFamily: 'Outfit, sans-serif' }}>
          <span style={{ fontSize: 15, fontWeight: 700, color: c.text }}>{issue.count}</span>
          <span style={{ fontSize: 10, color: 'var(--text-label)', marginLeft: 4 }}>eventos</span>
        </td>
        <td style={{ padding: '12px 16px', fontSize: 11, color: 'var(--text-label)', whiteSpace: 'nowrap', fontFamily: 'Outfit, sans-serif' }}>
          {timeAgo(issue.lastSeen)}
        </td>
        <td style={{ padding: '12px 16px', fontSize: 14, color: 'var(--text-label)' }}>{open ? '▲' : '▼'}</td>
      </tr>
      {open && (
        <tr style={{ background: 'var(--bg-elevated)', borderBottom: '1px solid var(--border-dim)' }}>
          <td colSpan={5} style={{ padding: '16px 20px' }}>
            <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', marginBottom: 12 }}>
              {[
                { label: 'Primera vez visto', val: new Date(issue.firstSeen).toLocaleString('es-CO') },
                { label: 'Última vez visto',  val: new Date(issue.lastSeen).toLocaleString('es-CO') },
                { label: 'Usuarios afectados',val: issue.userCount ?? '—' },
              ].map(item => (
                <div key={item.label}>
                  <div style={{ fontSize: 10, color: 'var(--text-label)', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 4, fontFamily: 'Outfit, sans-serif' }}>{item.label}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-dim)', fontFamily: 'Outfit, sans-serif' }}>{item.val}</div>
                </div>
              ))}
            </div>
            <a
              href={issue.permalink}
              target="_blank"
              rel="noreferrer"
              onClick={e => e.stopPropagation()}
              style={{ fontSize: 12, color: 'var(--color-accent)', textDecoration: 'none', fontWeight: 600, fontFamily: 'Outfit, sans-serif' }}
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
  const refresh    = () => setTick(t => t + 1)

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
        <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-dim)', marginBottom: 8, fontFamily: 'Outfit, sans-serif' }}>Sentry no configurado</div>
        <div style={{ fontSize: 12, color: 'var(--text-label)', lineHeight: 1.7, maxWidth: 380, margin: '0 auto', fontFamily: 'Outfit, sans-serif' }}>
          Completa las variables en <code style={{ color: 'var(--color-accent)' }}>.env</code>:<br />
          <code style={{ color: 'var(--text-dim)' }}>VITE_SENTRY_ORG</code>, <code style={{ color: 'var(--text-dim)' }}>VITE_SENTRY_PROJECT</code>, <code style={{ color: 'var(--text-dim)' }}>VITE_SENTRY_AUTH_TOKEN</code>
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
          <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 2, fontFamily: 'Outfit, sans-serif' }}>Logs del sistema</div>
          <div style={{ fontSize: 12, color: 'var(--text-label)', fontFamily: 'Outfit, sans-serif' }}>Errores en tiempo real vía Sentry · {issues.length} issues sin resolver</div>
        </div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center' }}>
          <button
            onClick={refresh}
            disabled={loading}
            title="Actualizar"
            style={{
              fontSize: 13, padding: '5px 12px', borderRadius: 999, cursor: loading ? 'not-allowed' : 'pointer',
              background: 'transparent', border: '1px solid var(--border-dim)', color: 'var(--text-dim)',
              fontFamily: 'Outfit, sans-serif', transition: 'all 0.15s', opacity: loading ? 0.5 : 1,
            }}
            onMouseEnter={e => { if (!loading) { e.currentTarget.style.borderColor = 'var(--color-accent)'; e.currentTarget.style.color = 'var(--color-accent)' } }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-dim)'; e.currentTarget.style.color = 'var(--text-dim)' }}
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
                  background: isActive ? (c?.bg ?? 'rgba(var(--color-accent-rgb), 0.1)') : 'transparent',
                  border: `1px solid ${isActive ? (c?.border ?? 'rgba(var(--color-accent-rgb), 0.3)') : 'var(--border-dim)'}`,
                  color: isActive ? (c?.text ?? 'var(--color-accent)') : 'var(--text-dim)',
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
        <div style={{ textAlign: 'center', padding: 48, color: 'var(--text-label)', fontSize: 13, fontFamily: 'Outfit, sans-serif' }}>Consultando Sentry...</div>
      )}

      {error && (
        <div style={{ padding: '20px 24px', background: 'var(--bg-danger-subtle)', border: '1px solid var(--border-danger-subtle)', borderRadius: 10, marginBottom: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--color-danger)', marginBottom: 6, fontFamily: 'Outfit, sans-serif' }}>⚠ No se pudo conectar al proxy de Sentry</div>
          <div style={{ fontSize: 12, color: 'var(--text-dim)', lineHeight: 1.65, marginBottom: 14, fontFamily: 'Outfit, sans-serif' }}>
            La captura de errores funciona correctamente. Para ver los issues aquí dentro se necesita configurar el endpoint <code style={{ color: 'var(--color-accent)' }}>/sentry-issues</code> en el Cloudflare Worker.
          </div>
          <a
            href={`https://${ORG}.sentry.io/issues/?project=${PROJECT}&query=is%3Aunresolved&sort=date`}
            target="_blank"
            rel="noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 12, fontWeight: 700, color: 'var(--color-accent)', textDecoration: 'none', padding: '8px 16px', border: '1px solid rgba(var(--color-accent-rgb),0.3)', borderRadius: 8, background: 'rgba(var(--color-accent-rgb),0.06)', fontFamily: 'Outfit, sans-serif' }}
          >
            Ver issues en Sentry →
          </a>
        </div>
      )}

      {!loading && !error && filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: 48 }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>✅</div>
          <div style={{ fontSize: 14, color: 'var(--text-label)', fontFamily: 'Outfit, sans-serif' }}>
            {filter === 'all' ? 'No hay issues sin resolver' : `No hay issues de nivel "${filter}"`}
          </div>
        </div>
      )}

      {!loading && !error && filtered.length > 0 && (
        <div style={{ border: '1px solid var(--border-dim)', borderRadius: 10, overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'var(--bg-elevated)', borderBottom: '1px solid var(--border-dim)' }}>
                {['Error', 'Nivel', 'Eventos', 'Último', ''].map(h => (
                  <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: 10, fontWeight: 700, color: 'var(--text-label)', letterSpacing: 1.5, textTransform: 'uppercase', fontFamily: 'Outfit, sans-serif' }}>
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
