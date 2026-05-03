import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

const STATUS_COLORS = {
  nuevo:      { bg: 'rgba(37,99,235,0.1)',   border: 'rgba(37,99,235,0.3)',   text: '#2563eb' },
  contactado: { bg: 'rgba(217,119,6,0.1)',   border: 'rgba(217,119,6,0.3)',   text: '#d97706' },
  convertido: { bg: 'rgba(22,163,74,0.1)',   border: 'rgba(22,163,74,0.3)',   text: '#16a34a' },
  descartado: { bg: 'rgba(100,116,139,0.1)', border: 'rgba(100,116,139,0.3)', text: '#64748b' },
}

const STATUS_OPTIONS = ['nuevo', 'contactado', 'convertido', 'descartado']

function StatusBadge({ status }) {
  const c = STATUS_COLORS[status] ?? STATUS_COLORS.nuevo
  return (
    <span style={{
      fontSize: 10, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase',
      padding: '3px 10px', borderRadius: 999,
      background: c.bg, border: `1px solid ${c.border}`, color: c.text,
      fontFamily: 'Outfit, sans-serif',
    }}>
      {status}
    </span>
  )
}

function LeadRow({ lead, onStatusChange }) {
  const [open, setOpen]       = useState(false)
  const [updating, setUpdating] = useState(false)

  const changeStatus = async (newStatus) => {
    setUpdating(true)
    await supabase.from('leads').update({ status: newStatus }).eq('id', lead.id)
    onStatusChange(lead.id, newStatus)
    setUpdating(false)
  }

  const date = new Date(lead.created_at).toLocaleString('es-CO', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })

  return (
    <>
      <tr
        onClick={() => setOpen(o => !o)}
        style={{ cursor: 'pointer', borderBottom: '1px solid var(--border-dim)', transition: 'background 0.12s' }}
        onMouseEnter={e => e.currentTarget.style.background = 'rgba(var(--color-accent-rgb), 0.04)'}
        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
      >
        <td style={{ padding: '12px 16px', fontSize: 13, color: 'var(--text-secondary)', fontWeight: 600, fontFamily: 'Outfit, sans-serif' }}>{lead.name}</td>
        <td style={{ padding: '12px 16px', fontSize: 12, color: 'var(--text-dim)', fontFamily: 'Outfit, sans-serif' }}>{lead.email || '—'}</td>
        <td style={{ padding: '12px 16px', fontSize: 11, color: 'var(--text-label)', fontFamily: 'Outfit, sans-serif', whiteSpace: 'nowrap' }}>{date}</td>
        <td style={{ padding: '12px 16px' }}><StatusBadge status={lead.status} /></td>
        <td style={{ padding: '12px 16px', fontSize: 14, color: 'var(--text-label)' }}>{open ? '▲' : '▼'}</td>
      </tr>
      {open && (
        <tr style={{ background: 'var(--bg-elevated)', borderBottom: '1px solid var(--border-dim)' }}>
          <td colSpan={5} style={{ padding: '16px 20px' }}>
            <div style={{ fontSize: 12, color: 'var(--text-label)', marginBottom: 8, letterSpacing: 1, textTransform: 'uppercase', fontFamily: 'Outfit, sans-serif' }}>Mensaje</div>
            <div style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.65, whiteSpace: 'pre-wrap', marginBottom: 16, fontFamily: 'Outfit, sans-serif' }}>
              {lead.message}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
              <span style={{ fontSize: 11, color: 'var(--text-label)', letterSpacing: 1, textTransform: 'uppercase', fontFamily: 'Outfit, sans-serif' }}>Cambiar estado:</span>
              {STATUS_OPTIONS.map(s => (
                <button
                  key={s}
                  disabled={updating || lead.status === s}
                  onClick={e => { e.stopPropagation(); changeStatus(s) }}
                  style={{
                    fontSize: 10, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase',
                    padding: '4px 12px', borderRadius: 999, cursor: lead.status === s ? 'default' : 'pointer',
                    background: lead.status === s ? STATUS_COLORS[s].bg : 'transparent',
                    border: `1px solid ${STATUS_COLORS[s].border}`,
                    color: STATUS_COLORS[s].text,
                    opacity: updating ? 0.5 : 1,
                    fontFamily: 'Outfit, sans-serif',
                    transition: 'background 0.15s',
                  }}
                >
                  {s}
                </button>
              ))}
              {lead.email && (
                <a
                  href={`mailto:${lead.email}`}
                  onClick={e => e.stopPropagation()}
                  style={{ marginLeft: 'auto', fontSize: 12, color: 'var(--color-accent)', textDecoration: 'none', fontWeight: 600, fontFamily: 'Outfit, sans-serif' }}
                >
                  ✉ Responder por email →
                </a>
              )}
            </div>
          </td>
        </tr>
      )}
    </>
  )
}

export default function LeadsAdminTab() {
  const [leads, setLeads]     = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter]   = useState('todos')

  useEffect(() => {
    const fetch = async () => {
      setLoading(true)
      const { data } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false })
      setLeads(data ?? [])
      setLoading(false)
    }
    fetch()
  }, [])

  const handleStatusChange = (id, newStatus) => {
    setLeads(prev => prev.map(l => l.id === id ? { ...l, status: newStatus } : l))
  }

  const filtered = filter === 'todos' ? leads : leads.filter(l => l.status === filter)
  const counts   = STATUS_OPTIONS.reduce((acc, s) => {
    acc[s] = leads.filter(l => l.status === s).length
    return acc
  }, {})

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 2, fontFamily: 'Outfit, sans-serif' }}>Leads del formulario</div>
          <div style={{ fontSize: 12, color: 'var(--text-label)', fontFamily: 'Outfit, sans-serif' }}>{leads.length} contacto{leads.length !== 1 ? 's' : ''} en total</div>
        </div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {['todos', ...STATUS_OPTIONS].map(s => {
            const isActive = filter === s
            const c = s === 'todos' ? null : STATUS_COLORS[s]
            return (
              <button
                key={s}
                onClick={() => setFilter(s)}
                style={{
                  fontSize: 11, fontWeight: 700, letterSpacing: 0.8, textTransform: 'uppercase',
                  padding: '5px 14px', borderRadius: 999, cursor: 'pointer',
                  background: isActive ? (c?.bg ?? 'rgba(var(--color-accent-rgb),0.1)') : 'transparent',
                  border: `1px solid ${isActive ? (c?.border ?? 'rgba(var(--color-accent-rgb),0.3)') : 'var(--border-dim)'}`,
                  color: isActive ? (c?.text ?? 'var(--color-accent)') : 'var(--text-dim)',
                  fontFamily: 'Outfit, sans-serif', transition: 'all 0.15s',
                }}
              >
                {s} {s !== 'todos' && counts[s] > 0 ? `(${counts[s]})` : s === 'todos' ? `(${leads.length})` : ''}
              </button>
            )
          })}
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: 48, color: 'var(--text-label)', fontSize: 13, fontFamily: 'Outfit, sans-serif' }}>Cargando leads...</div>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: 48 }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>📭</div>
          <div style={{ fontSize: 14, color: 'var(--text-label)', fontFamily: 'Outfit, sans-serif' }}>{filter === 'todos' ? 'No hay leads aún' : `No hay leads con estado "${filter}"`}</div>
        </div>
      ) : (
        <div style={{ border: '1px solid var(--border-dim)', borderRadius: 10, overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'var(--bg-elevated)', borderBottom: '1px solid var(--border-dim)' }}>
                {['Nombre', 'Email', 'Fecha', 'Estado', ''].map(h => (
                  <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: 10, fontWeight: 700, color: 'var(--text-label)', letterSpacing: 1.5, textTransform: 'uppercase', fontFamily: 'Outfit, sans-serif' }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(lead => (
                <LeadRow key={lead.id} lead={lead} onStatusChange={handleStatusChange} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
