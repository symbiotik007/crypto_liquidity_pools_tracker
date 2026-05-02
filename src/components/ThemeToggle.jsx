import { useState } from 'react'
import { applyTheme, getSavedThemeId } from '../styles/themes'

export default function ThemeToggle({ mobile = false }) {
  const [theme, setTheme] = useState(getSavedThemeId)

  function toggle() {
    const next = theme === 'light' ? 'futurista' : 'light'
    applyTheme(next)
    setTheme(next)
  }

  const isLight = theme === 'light'

  if (mobile) {
    return (
      <button
        className="nav-mobile-link nav-mobile-theme"
        onClick={toggle}
        aria-label={isLight ? 'Modo oscuro' : 'Modo claro'}
      >
        <span style={{ fontSize: 18, lineHeight: 1 }}>{isLight ? '🌙' : '☀️'}</span>
        {isLight ? 'Cambiar a modo oscuro' : 'Cambiar a modo claro'}
      </button>
    )
  }

  return (
    <button
      className="nav-theme-toggle"
      onClick={toggle}
      title={isLight ? 'Cambiar a modo oscuro' : 'Cambiar a modo claro'}
      aria-label={isLight ? 'Modo oscuro' : 'Modo claro'}
    >
      {isLight ? '🌙' : '☀️'}
    </button>
  )
}
