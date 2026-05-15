import { useState } from 'react'
import { applyTheme, getSavedThemeId, THEME_ORDER, THEMES } from '../styles/themes'

const ICONS = {
  light:     '☀️',
  futurista: '🌙',
  premium:   '✦',
}
const NEXT_LABEL = {
  light:     'Cambiar a modo oscuro',
  futurista: 'Cambiar a modo Premium',
  premium:   'Cambiar a modo claro',
}

export default function ThemeToggle({ mobile = false }) {
  const [theme, setTheme] = useState(getSavedThemeId)

  function cycle() {
    const idx = THEME_ORDER.indexOf(theme)
    const next = THEME_ORDER[(idx + 1) % THEME_ORDER.length]
    applyTheme(next)
    setTheme(next)
  }

  const icon  = ICONS[theme] ?? '✦'
  const label = NEXT_LABEL[theme] ?? `Cambiar tema (${THEMES[theme]?.label ?? theme})`

  if (mobile) {
    return (
      <button
        className="nav-mobile-link nav-mobile-theme"
        onClick={cycle}
        aria-label={label}
      >
        <span style={{ fontSize: 18, lineHeight: 1 }}>{icon}</span>
        {label}
      </button>
    )
  }

  return (
    <button
      className="nav-theme-toggle"
      onClick={cycle}
      title={label}
      aria-label={label}
    >
      {icon}
    </button>
  )
}
