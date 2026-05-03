// Metadata de temas para la UI (StylesTab).
// Las variables de color viven en src/styles/themes/<nombre>.css.
// El tema activo se aplica poniendo data-theme="<id>" en <html>.
// Futurista es el default: tokens.css ya lo define, no necesita atributo.

export const THEMES = {
  futurista: {
    id: 'futurista',
    label: 'Futurista',
    description: 'Ciberpunk oscuro con acentos neón.',
    preview: {
      bg: '#050a0f',
      surface: '#070d14',
      accent: '#00e5ff',
      success: '#00ff88',
      danger: '#ff4f6e',
      text: '#f0f6ff',
    },
  },

  light: {
    id: 'light',
    label: 'Light Mode',
    description: 'Limpio, corporativo y accesible. Fondo claro tradicional.',
    preview: {
      bg: '#f8fafc',
      surface: '#ffffff',
      accent: '#2563eb',
      success: '#16a34a',
      danger: '#dc2626',
      text: '#0f172a',
    },
  },
}

export const THEME_ORDER = ['light', 'futurista']

export const DEFAULT_THEME = 'light'

const STORAGE_KEY = 'cpe_theme'

export function applyTheme(themeId) {
  const id = THEMES[themeId] ? themeId : DEFAULT_THEME
  document.documentElement.setAttribute('data-theme', id)
  localStorage.setItem(STORAGE_KEY, id)
}

export function loadSavedTheme() {
  const saved = localStorage.getItem(STORAGE_KEY)
  applyTheme(saved && THEMES[saved] ? saved : DEFAULT_THEME)
}

export function getSavedThemeId() {
  const saved = localStorage.getItem(STORAGE_KEY)
  return saved && THEMES[saved] ? saved : DEFAULT_THEME
}
