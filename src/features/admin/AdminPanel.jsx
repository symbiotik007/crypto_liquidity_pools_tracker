import { useState } from 'react'
import UsersAdminTab from './UsersAdminTab'
import ApiTestTab    from './ApiTestTab'

const TABS = [
  { id: 'users',      label: '⚙  Gestión de Usuarios', component: <UsersAdminTab /> },
  { id: 'api-test',   label: '🔌 Test APIs',            component: <ApiTestTab /> },
  { id: 'analytics',  label: '📊 Analytics',            component: null },
  { id: 'bots',       label: '🤖 Automatizaciones',     component: null },
  { id: 'logs',       label: '📋 Logs del Sistema',     component: null },
]

function ComingSoon({ name }) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      minHeight: 300, gap: 12,
    }}>
      <div style={{ fontSize: 36 }}>🔧</div>
      <div style={{ fontSize: 16, fontWeight: 700, color: '#4a7a96' }}>{name}</div>
      <div style={{ fontSize: 12, color: '#1a3a5e' }}>Esta sección está en desarrollo</div>
    </div>
  )
}

export default function AdminPanel() {
  const [active, setActive] = useState('users')
  const tab = TABS.find(t => t.id === active)

  return (
    <div>
      {/* Tab bar */}
      <div style={{
        display: 'flex',
        gap: 2,
        borderBottom: '1px solid #0e2030',
        marginBottom: 24,
        overflowX: 'auto',
        paddingBottom: 0,
      }}>
        {TABS.map(t => {
          const isActive = t.id === active
          return (
            <button
              key={t.id}
              onClick={() => setActive(t.id)}
              style={{
                padding: '9px 16px',
                background: 'transparent',
                border: 'none',
                borderBottom: isActive ? '2px solid #00e5ff' : '2px solid transparent',
                color: isActive ? '#00e5ff' : t.component === null ? '#1a3a5e' : '#4a7a96',
                fontSize: 12,
                fontWeight: isActive ? 700 : 500,
                cursor: 'pointer',
                fontFamily: 'Outfit, sans-serif',
                letterSpacing: 0.3,
                whiteSpace: 'nowrap',
                transition: 'all 0.15s',
                marginBottom: -1,
                position: 'relative',
              }}
              onMouseEnter={e => { if (!isActive) e.currentTarget.style.color = '#7ab8d4' }}
              onMouseLeave={e => { if (!isActive) e.currentTarget.style.color = t.component === null ? '#1a3a5e' : '#4a7a96' }}
            >
              {t.label}
              {t.component === null && (
                <span style={{
                  marginLeft: 6, fontSize: 8, fontWeight: 700,
                  color: '#1a3a5e', letterSpacing: 1,
                  textTransform: 'uppercase', verticalAlign: 'middle',
                }}>pronto</span>
              )}
            </button>
          )
        })}
      </div>

      {/* Content */}
      {tab?.component ?? <ComingSoon name={tab?.label?.replace(/^[\S]+\s+/, '') ?? ''} />}
    </div>
  )
}
