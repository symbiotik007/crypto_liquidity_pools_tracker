import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

const STATUS_COLORS = {
  nuevo:      { bg: 'rgba(37,99,235,0.1)',   border: 'rgba(37,99,235,0.3)',   text: '#2563eb' },
  contactado: { bg: 'rgba(217,119,6,0.1)',   border: 'rgba(217,119,6,0.3)',   text: '#d97706' },
  convertido: { bg: 'rgba(22,163,74,0.1)',   border: 'rgba(22,163,74,0.3)',   text: '#16a34a' },
  descartado: { bg: 'rgba(100,116,139,0.1)', border: 'rgba(100,116,139,0.3)', text: '#64748b' },
}

const SOURCE_LABELS = {
  home_form:  { label: 'Contacto',    color: '#7c3aed', bg: 'rgba(124,58,237,0.1)',  border: 'rgba(124,58,237,0.3)'  },
  home_modal: { label: 'Info modal',  color: '#2563eb', bg: 'rgba(37,99,235,0.08)',  border: 'rgba(37,99,235,0.25)'  },
}

const STATUS_OPTIONS = ['nuevo', 'contactado', 'convertido', 'descartado']

function SourceBadge({ source }) {
  const s = SOURCE_LABELS[source] ?? { label: source ?? '—', color: '#64748b', bg: 'rgba(100,116,139,0.1)', border: 'rgba(100,116,139,0.3)' }
  return (
    <span style={{
      fontSize: 10, fontWeight: 700, letterSpacing: 0.8, textTransform: 'uppercase',
      padding: '2px 8px', borderRadius: 999,
      background: s.bg, border: `1px solid ${s.border}`, color: s.color,
      fontFamily: 'Outfit, sans-serif',
    }}>
      {s.label}
    </span>
  )
}

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
  const [open, setOpen]         = useState(false)
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
        <td style={{ padding: '12px 16px', fontSize: 13, color: 'var(--text-secondary)', fontWeight: 600, fontFamily: 'Outfit, sans-serif' }}>
          <div>{lead.name}</div>
          {lead.phone && (
            <div style={{ fontSize: 11, color: 'var(--text-dim)', fontWeight: 400, marginTop: 2 }}>
              📱 {lead.phone}
            </div>
          )}
        </td>
        <td style={{ padding: '12px 16px', fontSize: 12, color: 'var(--text-dim)', fontFamily: 'Outfit, sans-serif' }}>{lead.email || '—'}</td>
        <td style={{ padding: '12px 16px' }}><SourceBadge source={lead.source} /></td>
        <td style={{ padding: '12px 16px', fontSize: 11, color: 'var(--text-label)', fontFamily: 'Outfit, sans-serif', whiteSpace: 'nowrap' }}>{date}</td>
        <td style={{ padding: '12px 16px' }}><StatusBadge status={lead.status} /></td>
        <td style={{ padding: '12px 16px', fontSize: 14, color: 'var(--text-label)' }}>{open ? '▲' : '▼'}</td>
      </tr>
      {open && (
        <tr style={{ background: 'var(--bg-elevated)', borderBottom: '1px solid var(--border-dim)' }}>
          <td colSpan={6} style={{ padding: '16px 20px' }}>

            {/* Datos de contacto rápidos */}
            <div style={{ display: 'flex', gap: 24, marginBottom: 16, flexWrap: 'wrap' }}>
              {lead.phone && (
                <a href={`https://wa.me/${lead.phone.replace(/\D/g, '')}`} target="_blank" rel="noreferrer"
                  onClick={e => e.stopPropagation()}
                  style={{ fontSize: 12, color: '#16a34a', textDecoration: 'none', fontWeight: 600, fontFamily: 'Outfit, sans-serif' }}>
                  💬 WhatsApp {lead.phone}
                </a>
              )}
              {lead.email && (
                <a href={`mailto:${lead.email}`} onClick={e => e.stopPropagation()}
                  style={{ fontSize: 12, color: 'var(--color-accent)', textDecoration: 'none', fontWeight: 600, fontFamily: 'Outfit, sans-serif' }}>
                  ✉ {lead.email}
                </a>
              )}
            </div>

            {/* Mensaje */}
            <div style={{ fontSize: 12, color: 'var(--text-label)', marginBottom: 8, letterSpacing: 1, textTransform: 'uppercase', fontFamily: 'Outfit, sans-serif' }}>Mensaje</div>
            <div style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.65, whiteSpace: 'pre-wrap', marginBottom: 16, fontFamily: 'Outfit, sans-serif' }}>
              {lead.message || '—'}
            </div>

            {/* Cambiar estado */}
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
  const [sourceFilter, setSourceFilter] = useState('todos')

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

  const filtered = leads
    .filter(l => filter === 'todos' || l.status === filter)
    .filter(l => sourceFilter === 'todos' || l.source === sourceFilter)

  const counts = STATUS_OPTIONS.reduce((acc, s) => {
    acc[s] = leads.filter(l => l.status === s).length
    return acc
  }, {})

  const sourceCounts = Object.keys(SOURCE_LABELS).reduce((acc, s) => {
    acc[s] = leads.filter(l => l.source === s).length
    return acc
  }, {})

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 2, fontFamily: 'Outfit, sans-serif' }}>Leads</div>
          <div style={{ fontSize: 12, color: 'var(--text-label)', fontFamily: 'Outfit, sans-serif' }}>{leads.length} contacto{leads.length !== 1 ? 's' : ''} en total</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-end' }}>
          {/* Filtro por estado */}
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
            {['todos', ...STATUS_OPTIONS].map(s => {
              const isActive = filter === s
              const c = s === 'todos' ? null : STATUS_COLORS[s]
              return (
                <button key={s} onClick={() => setFilter(s)} style={{
                  fontSize: 11, fontWeight: 700, letterSpacing: 0.8, textTransform: 'uppercase',
                  padding: '5px 14px', borderRadius: 999, cursor: 'pointer',
                  background: isActive ? (c?.bg ?? 'rgba(var(--color-accent-rgb),0.1)') : 'transparent',
                  border: `1px solid ${isActive ? (c?.border ?? 'rgba(var(--color-accent-rgb),0.3)') : 'var(--border-dim)'}`,
                  color: isActive ? (c?.text ?? 'var(--color-accent)') : 'var(--text-dim)',
                  fontFamily: 'Outfit, sans-serif', transition: 'all 0.15s',
                }}>
                  {s} {s !== 'todos' && counts[s] > 0 ? `(${counts[s]})` : s === 'todos' ? `(${leads.length})` : ''}
                </button>
              )
            })}
          </div>
          {/* Filtro por origen */}
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
            <button onClick={() => setSourceFilter('todos')} style={{
              fontSize: 10, fontWeight: 700, letterSpacing: 0.8, textTransform: 'uppercase',
              padding: '3px 10px', borderRadius: 999, cursor: 'pointer',
              background: sourceFilter === 'todos' ? 'rgba(var(--color-accent-rgb),0.08)' : 'transparent',
              border: `1px solid ${sourceFilter === 'todos' ? 'rgba(var(--color-accent-rgb),0.25)' : 'var(--border-dim)'}`,
              color: sourceFilter === 'todos' ? 'var(--color-accent)' : 'var(--text-faint)',
              fontFamily: 'Outfit, sans-serif',
            }}>
              Todos los orígenes
            </button>
            {Object.entries(SOURCE_LABELS).map(([key, s]) => (
              <button key={key} onClick={() => setSourceFilter(key)} style={{
                fontSize: 10, fontWeight: 700, letterSpacing: 0.8, textTransform: 'uppercase',
                padding: '3px 10px', borderRadius: 999, cursor: 'pointer',
                background: sourceFilter === key ? s.bg : 'transparent',
                border: `1px solid ${sourceFilter === key ? s.border : 'var(--border-dim)'}`,
                color: sourceFilter === key ? s.color : 'var(--text-faint)',
                fontFamily: 'Outfit, sans-serif',
              }}>
                {s.label} {sourceCounts[key] > 0 ? `(${sourceCounts[key]})` : ''}
              </button>
            ))}
          </div>
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: 48, color: 'var(--text-label)', fontSize: 13, fontFamily: 'Outfit, sans-serif' }}>Cargando leads...</div>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: 48 }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>📭</div>
          <div style={{ fontSize: 14, color: 'var(--text-label)', fontFamily: 'Outfit, sans-serif' }}>
            {filter === 'todos' && sourceFilter === 'todos' ? 'No hay leads aún' : 'No hay leads con ese filtro'}
          </div>
        </div>
      ) : (
        <div style={{ border: '1px solid var(--border-dim)', borderRadius: 10, overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'var(--bg-elevated)', borderBottom: '1px solid var(--border-dim)' }}>
                {['Nombre / Teléfono', 'Email', 'Origen', 'Fecha', 'Estado', ''].map(h => (
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
