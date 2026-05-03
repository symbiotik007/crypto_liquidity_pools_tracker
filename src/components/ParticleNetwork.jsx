import { useEffect, useRef } from 'react'

export default function ParticleNetwork() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animId
    const mouse = { x: -9999, y: -9999 }

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const onMouseMove = (e) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }
    const onMouseLeave = () => {
      mouse.x = -9999
      mouse.y = -9999
    }
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseleave', onMouseLeave)

    const COUNT = 55
    const MAX_DIST = 110
    const MOUSE_DIST = 160
    const MOUSE_ATTRACT = 0.008

    const particles = Array.from({ length: COUNT }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.8 + 1.2,
      baseVx: 0,
      baseVy: 0,
    }))
    particles.forEach(p => { p.baseVx = p.vx; p.baseVy = p.vy })

    const draw = () => {
      const isLight = document.documentElement.getAttribute('data-theme') === 'light'

      // Background
      ctx.fillStyle = isLight ? '#f0f4ff' : '#030810'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Radial vignette / depth
      const cx = canvas.width / 2
      const cy = canvas.height / 2
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(canvas.width, canvas.height) * 0.75)
      if (isLight) {
        grad.addColorStop(0, 'rgba(219,234,254,0.5)')
        grad.addColorStop(1, 'rgba(226,232,240,0.0)')
      } else {
        grad.addColorStop(0, 'rgba(0,30,60,0.35)')
        grad.addColorStop(1, 'rgba(0,0,0,0.0)')
      }
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const accentRgb = isLight ? '37,99,235' : '0,200,255'
      const dotAlpha  = isLight ? 0.35 : 0.45
      const lineAlpha = isLight ? 0.10 : 0.13

      // Update + draw connections
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        // Mouse attraction
        const mdx = mouse.x - p.x
        const mdy = mouse.y - p.y
        const mDist2 = mdx * mdx + mdy * mdy
        const mDist = Math.sqrt(mDist2)

        if (mDist < MOUSE_DIST) {
          p.vx += mdx * MOUSE_ATTRACT * (1 - mDist / MOUSE_DIST)
          p.vy += mdy * MOUSE_ATTRACT * (1 - mDist / MOUSE_DIST)
        }

        // Damping back toward base speed
        p.vx += (p.baseVx - p.vx) * 0.03
        p.vy += (p.baseVy - p.vy) * 0.03

        // Cap speed
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy)
        if (speed > 2.5) { p.vx = (p.vx / speed) * 2.5; p.vy = (p.vy / speed) * 2.5 }

        p.x += p.vx
        p.y += p.vy

        // Wrap edges
        if (p.x < -10) p.x = canvas.width + 10
        if (p.x > canvas.width + 10) p.x = -10
        if (p.y < -10) p.y = canvas.height + 10
        if (p.y > canvas.height + 10) p.y = -10

        // Particle → particle lines
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j]
          const dx = p.x - q.x
          const dy = p.y - q.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < MAX_DIST) {
            const a = lineAlpha * (1 - dist / MAX_DIST)
            ctx.beginPath()
            ctx.strokeStyle = `rgba(${accentRgb},${a.toFixed(3)})`
            ctx.lineWidth = 0.7
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(q.x, q.y)
            ctx.stroke()
          }
        }

        // Particle → mouse lines
        if (mDist < MOUSE_DIST) {
          const a = 0.22 * (1 - mDist / MOUSE_DIST)
          ctx.beginPath()
          ctx.strokeStyle = `rgba(${accentRgb},${a.toFixed(3)})`
          ctx.lineWidth = 1.1
          ctx.moveTo(p.x, p.y)
          ctx.lineTo(mouse.x, mouse.y)
          ctx.stroke()
        }
      }

      // Draw dots on top
      for (const p of particles) {
        const mdx = mouse.x - p.x
        const mdy = mouse.y - p.y
        const near = Math.sqrt(mdx * mdx + mdy * mdy) < MOUSE_DIST
        const r = near ? p.r * 1.6 : p.r
        const alpha = near ? Math.min(dotAlpha + 0.25, 1) : dotAlpha

        // Glow
        if (near) {
          const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r * 5)
          glow.addColorStop(0, `rgba(${accentRgb},0.25)`)
          glow.addColorStop(1, `rgba(${accentRgb},0)`)
          ctx.beginPath()
          ctx.arc(p.x, p.y, r * 5, 0, Math.PI * 2)
          ctx.fillStyle = glow
          ctx.fill()
        }

        ctx.beginPath()
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${accentRgb},${alpha.toFixed(2)})`
        ctx.fill()
      }

      // Mouse dot
      if (mouse.x > 0) {
        const mg = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 18)
        mg.addColorStop(0, `rgba(${accentRgb},0.35)`)
        mg.addColorStop(1, `rgba(${accentRgb},0)`)
        ctx.beginPath()
        ctx.arc(mouse.x, mouse.y, 18, 0, Math.PI * 2)
        ctx.fillStyle = mg
        ctx.fill()

        ctx.beginPath()
        ctx.arc(mouse.x, mouse.y, 3, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${accentRgb},0.9)`
        ctx.fill()
      }

      animId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        display: 'block',
        pointerEvents: 'none',
      }}
    />
  )
}
