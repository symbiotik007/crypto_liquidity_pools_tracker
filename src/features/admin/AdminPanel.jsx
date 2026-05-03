import { useState } from 'react'
import UsersAdminTab  from './UsersAdminTab'
import ApiTestTab     from './ApiTestTab'
import StylesTab      from './StylesTab'
import LeadsAdminTab  from './LeadsAdminTab'
import LogsTab        from './LogsTab'

const TABS = [
  { id: 'users',     label: 'Usuarios',        icon: '⚙️',  component: <UsersAdminTab /> },
  { id: 'leads',     label: 'Leads',           icon: '📩',  component: <LeadsAdminTab /> },
  { id: 'logs',      label: 'Logs',            icon: '📋',  component: <LogsTab /> },
  { id: 'api-test',  label: 'Test APIs',       icon: '🔌',  component: <ApiTestTab /> },
  { id: 'analytics', label: 'Analytics',       icon: '📊',  component: null },
  { id: 'bots',      label: 'Automatizaciones',icon: '🤖',  component: null },
  { id: 'styles',    label: 'Estilos',         icon: '🎨',  component: <StylesTab /> },
]

function ComingSoon({ name, icon }) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', minHeight: 260, gap: 14,
      background: 'var(--bg-elevated)', borderRadius: 12,
      border: '1px solid var(--border-dim)',
    }}>
      <div style={{ fontSize: 40, lineHeight: 1 }}>{icon}</div>
      <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-secondary)', fontFamily: 'Outfit,sans-serif' }}>{name}</div>
      <div style={{
        fontSize: 11, color: 'var(--text-dim)', fontFamily: 'Outfit,sans-serif',
        padding: '4px 14px', borderRadius: 999,
        background: 'var(--bg-surface)', border: '1px solid var(--border-dim)',
        letterSpacing: 1, textTransform: 'uppercase', fontWeight: 700,
      }}>Próximamente</div>
    </div>
  )
}

export default function AdminPanel() {
  const [active, setActive] = useState('users')
  const tab = TABS.find(t => t.id === active)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>

      {/* ── Tab bar ── */}
      <div style={{
        display: 'flex',
        gap: 4,
        overflowX: 'auto',
        paddingBottom: 2,
        scrollbarWidth: 'none',
        WebkitOverflowScrolling: 'touch',
        marginBottom: 24,
        borderBottom: '1px solid var(--border-dim)',
      }}>
        {TABS.map(t => {
          const isActive = t.id === active
          const disabled = t.component === null
          return (
            <button
              key={t.id}
              onClick={() => setActive(t.id)}
              title={disabled ? `${t.label} — próximamente` : t.label}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '9px 15px',
                background: isActive
                  ? 'rgba(var(--color-accent-rgb), 0.08)'
                  : 'transparent',
                border: 'none',
                borderBottom: isActive
                  ? '2px solid var(--color-accent)'
                  : '2px solid transparent',
                color: isActive
                  ? 'var(--color-accent)'
                  : disabled
                  ? 'var(--text-faint)'
                  : 'var(--text-dim)',
                fontSize: 12,
                fontWeight: isActive ? 700 : 500,
                cursor: disabled ? 'default' : 'pointer',
                fontFamily: 'Outfit, sans-serif',
                letterSpacing: 0.3,
                whiteSpace: 'nowrap',
                transition: 'all 0.15s',
                marginBottom: -1,
                opacity: disabled ? 0.5 : 1,
                borderRadius: '4px 4px 0 0',
                flexShrink: 0,
              }}
              onMouseEnter={e => {
                if (!isActive && !disabled)
                  e.currentTarget.style.color = 'var(--text-hover)'
              }}
              onMouseLeave={e => {
                if (!isActive)
                  e.currentTarget.style.color = disabled ? 'var(--text-faint)' : 'var(--text-dim)'
              }}
            >
              <span style={{ fontSize: 14, lineHeight: 1, flexShrink: 0 }}>{t.icon}</span>
              <span className="admin-tab-label">{t.label}</span>
              {disabled && (
                <span style={{
                  fontSize: 8, fontWeight: 800,
                  color: 'var(--text-faint)',
                  letterSpacing: 1, textTransform: 'uppercase',
                  border: '1px solid var(--border-dim)',
                  borderRadius: 3, padding: '1px 4px',
                  flexShrink: 0,
                }}>BETA</span>
              )}
            </button>
          )
        })}
      </div>

      {/* ── Content ── */}
      <div style={{
        background: 'var(--bg-surface)',
        border: '1px solid var(--border-dim)',
        borderRadius: 12,
        overflow: 'hidden',
        boxShadow: 'var(--shadow-card)',
      }}>
        <div style={{ padding: '20px 24px' }}>
          {tab?.component ?? (
            <ComingSoon name={tab?.label ?? ''} icon={tab?.icon ?? '🔧'} />
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 600px) {
          .admin-tab-label { display: none; }
        }
      `}</style>
    </div>
  )
}
