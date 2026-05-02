// src/components/Turnstile.jsx
// Cloudflare Turnstile — managed mode: Cloudflare auto-decides by IP/browser
// whether to show a visible challenge or pass silently.
import { useEffect, useRef, forwardRef, useImperativeHandle } from 'react'

const SITE_KEY  = import.meta.env.VITE_TURNSTILE_SITE_KEY ?? '1x00000000000000000000AA'
const SCRIPT_ID = 'cf-turnstile-script'
const SCRIPT_SRC = 'https://challenges.cloudflare.com/turnstile/v0/api.js'

const Turnstile = forwardRef(function Turnstile({ onVerify, onExpire, theme = 'dark' }, ref) {
  const containerRef = useRef(null)
  const widgetId     = useRef(null)
  const cbRef        = useRef(onVerify)
  const expRef       = useRef(onExpire)

  cbRef.current  = onVerify
  expRef.current = onExpire

  useImperativeHandle(ref, () => ({
    reset: () => {
      if (widgetId.current != null && window.turnstile) {
        window.turnstile.reset(widgetId.current)
      }
    },
  }))

  useEffect(() => {
    let alive = true

    const mount = () => {
      if (!alive || !containerRef.current || widgetId.current != null) return
      widgetId.current = window.turnstile.render(containerRef.current, {
        sitekey:            SITE_KEY,
        theme,
        callback:           (token) => cbRef.current?.(token),
        'expired-callback': ()      => expRef.current?.(),
        'error-callback':   ()      => expRef.current?.(),
      })
    }

    if (window.turnstile) {
      mount()
    } else {
      let script = document.getElementById(SCRIPT_ID)
      if (!script) {
        script    = document.createElement('script')
        script.id  = SCRIPT_ID
        script.src = SCRIPT_SRC
        script.async = true
        document.head.appendChild(script)
      }
      script.addEventListener('load', mount)
    }

    return () => {
      alive = false
      if (widgetId.current != null && window.turnstile) {
        window.turnstile.remove(widgetId.current)
        widgetId.current = null
      }
    }
  }, [theme])

  return <div ref={containerRef} />
})

export default Turnstile
