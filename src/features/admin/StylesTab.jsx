import { useState } from 'react'
import { THEMES, THEME_ORDER, applyTheme, getSavedThemeId } from '../../styles/themes'

const DESCRIPTIONS = {
  futurista:      'Ciberpunk oscuro · Neón · Actual',
  profesional:    'Azul neutro · Corporativo · Ultra limpio',
  glassmorphism:  'Púrpura suave · Vidrio · Profundidad',
  neumorphism:    'Índigo · Relieve suave · Monocromático',
  light:          'Azul corporativo · Fondo claro · Accesible',
}

function ColorSwatch({ color, size = 18 }) {
  return (
    <div style={{
      width: size,
      height: size,
      borderRadius: 4,
      background: color,
      flexShrink: 0,
      border: '1px solid rgba(255,255,255,0.08)',
    }} />
  )
}

function ThemeCard({ theme, isActive, onApply }) {
  const [hovered, setHovered] = useState(false)
  const p = theme.preview

  const cardBg    = isActive ? 'rgba(255,255,255,0.06)' : hovered ? 'rgba(255,255,255,0.03)' : 'transparent'
  const borderCol = isActive
    ? `var(--color-accent)`
    : hovered
    ? 'rgba(255,255,255,0.12)'
    : 'rgba(255,255,255,0.06)'

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: cardBg,
        border: `1px solid ${borderCol}`,
        borderRadius: 12,
        padding: '18px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        cursor: isActive ? 'default' : 'pointer',
        transition: 'border-color 0.2s, background 0.2s',
        position: 'relative',
      }}
    >
      {/* Mini preview panel */}
      <div style={{
        width: 72,
        height: 56,
        borderRadius: 8,
        background: p.bg,
        border: `1px solid ${p.accent}30`,
        flexShrink: 0,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
        padding: 6,
      }}>
        {/* top bar simulation */}
        <div style={{
          height: 6,
          borderRadius: 3,
          background: p.surface,
          border: `1px solid ${p.accent}20`,
        }} />
        {/* accent bar */}
        <div style={{
          height: 3,
          borderRadius: 2,
          background: p.accent,
          width: '60%',
        }} />
        {/* content rows */}
        <div style={{ display: 'flex', gap: 3, marginTop: 2 }}>
          <div style={{ height: 3, flex: 1, borderRadius: 2, background: p.text + '40' }} />
          <div style={{ height: 3, flex: 0.6, borderRadius: 2, background: p.success + '80' }} />
        </div>
        <div style={{ display: 'flex', gap: 3 }}>
          <div style={{ height: 3, flex: 0.7, borderRadius: 2, background: p.text + '25' }} />
          <div style={{ height: 3, flex: 0.5, borderRadius: 2, background: p.danger + '70' }} />
        </div>
      </div>

      {/* Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          marginBottom: 4,
        }}>
          <span style={{
            fontSize: 13,
            fontWeight: 700,
            color: isActive ? 'var(--color-accent)' : 'var(--text-primary)',
            fontFamily: 'Outfit, sans-serif',
          }}>
            {theme.label}
          </span>
          {isActive && (
            <span style={{
              fontSize: 9,
              fontWeight: 700,
              color: 'var(--color-accent)',
              border: '1px solid var(--color-accent)',
              borderRadius: 4,
              padding: '1px 5px',
              letterSpacing: 0.8,
              textTransform: 'uppercase',
              fontFamily: 'Outfit, sans-serif',
            }}>
              Activo
            </span>
          )}
        </div>
        <div style={{
          fontSize: 11,
          color: 'var(--text-dim)',
          fontFamily: 'Outfit, sans-serif',
          marginBottom: 10,
        }}>
          {DESCRIPTIONS[theme.id]}
        </div>

        {/* Color swatches row */}
        <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
          <ColorSwatch color={p.bg} />
          <ColorSwatch color={p.surface} />
          <ColorSwatch color={p.accent} />
          <ColorSwatch color={p.success} />
          <ColorSwatch color={p.danger} />
          <ColorSwatch color={p.text} />
        </div>
      </div>

      {/* Apply button */}
      {!isActive && (
        <button
          onClick={onApply}
          style={{
            flexShrink: 0,
            padding: '7px 14px',
            background: hovered ? p.accent : 'transparent',
            border: `1px solid ${p.accent}`,
            borderRadius: 7,
            color: hovered ? (p.bg.startsWith('#f') ? '#fff' : p.bg) : p.accent,
            fontSize: 11,
            fontWeight: 600,
            cursor: 'pointer',
            fontFamily: 'Outfit, sans-serif',
            transition: 'background 0.15s, color 0.15s',
            letterSpacing: 0.3,
          }}
        >
          Aplicar
        </button>
      )}

      {isActive && (
        <div style={{
          flexShrink: 0,
          width: 20,
          height: 20,
          borderRadius: '50%',
          background: 'var(--color-accent)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
            <path d="M1 4L3.5 6.5L9 1" stroke="#050a0f" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      )}
    </div>
  )
}

export default function StylesTab() {
  const [activeId, setActiveId] = useState(getSavedThemeId)

  function handleApply(themeId) {
    applyTheme(themeId)
    setActiveId(themeId)
  }

  return (
    <div style={{ maxWidth: 580 }}>
      <div style={{ marginBottom: 20 }}>
        <div style={{
          fontSize: 13,
          fontWeight: 700,
          color: 'var(--text-primary)',
          fontFamily: 'Outfit, sans-serif',
          marginBottom: 4,
        }}>
          Paleta de Colores
        </div>
        <div style={{
          fontSize: 11,
          color: 'var(--text-dim)',
          fontFamily: 'Outfit, sans-serif',
          lineHeight: 1.5,
        }}>
          Selecciona el esquema de colores de la interfaz. Solo cambia colores — contenido, fuentes y estructura permanecen igual.
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {THEME_ORDER.map(id => (
          <ThemeCard
            key={id}
            theme={THEMES[id]}
            isActive={activeId === id}
            onApply={() => handleApply(id)}
          />
        ))}
      </div>
    </div>
  )
}
