// Metadata de temas para la UI (StylesTab).
// Las variables de color viven en src/styles/themes/<nombre>.css.
// El tema activo se aplica poniendo data-theme="<id>" en <html>.
// Futurista es el default: tokens.css ya lo define, no necesita atributo.

export const THEMES = {
  futurista: {
    id: 'futurista',
    label: 'Futurista',
    description: 'Ciberpunk oscuro con acentos neón. El estilo actual.',
    preview: {
      bg: '#050a0f',
      surface: '#070d14',
      accent: '#00e5ff',
      success: '#00ff88',
      danger: '#ff4f6e',
      text: '#f0f6ff',
    },
  },

  profesional: {
    id: 'profesional',
    label: 'Profesional',
    description: 'Ultra profesional. Paleta neutral, azul corporativo limpio.',
    preview: {
      bg: '#0d1117',
      surface: '#161b22',
      accent: '#3b82f6',
      success: '#22c55e',
      danger: '#ef4444',
      text: '#e6edf3',
    },
  },

  glassmorphism: {
    id: 'glassmorphism',
    label: 'Glassmorphism',
    description: 'Transparencias tipo vidrio. Profundidad suave y moderno.',
    preview: {
      bg: '#0d0221',
      surface: 'rgba(255,255,255,0.05)',
      accent: '#a78bfa',
      success: '#34d399',
      danger: '#f87171',
      text: '#f0f0ff',
    },
  },

  neumorphism: {
    id: 'neumorphism',
    label: 'Neumorphism',
    description: 'Relieves suaves, monocromático oscuro. Minimalista.',
    preview: {
      bg: '#1e1e2e',
      surface: '#252537',
      accent: '#6c63ff',
      success: '#4ade80',
      danger: '#fb7185',
      text: '#cdd6f4',
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

export const THEME_ORDER = ['futurista', 'profesional', 'glassmorphism', 'neumorphism', 'light']

export const DEFAULT_THEME = 'futurista'

const STORAGE_KEY = 'cpe_theme'

export function applyTheme(themeId) {
  const id = THEMES[themeId] ? themeId : DEFAULT_THEME
  if (id === DEFAULT_THEME) {
    document.documentElement.removeAttribute('data-theme')
  } else {
    document.documentElement.setAttribute('data-theme', id)
  }
  localStorage.setItem(STORAGE_KEY, id)
}

export function loadSavedTheme() {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved && THEMES[saved]) applyTheme(saved)
}

export function getSavedThemeId() {
  const saved = localStorage.getItem(STORAGE_KEY)
  return saved && THEMES[saved] ? saved : DEFAULT_THEME
}
