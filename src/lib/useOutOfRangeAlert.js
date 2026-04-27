// ─────────────────────────────────────────────────────────────────────────────
// useOutOfRangeAlert.js
// Detecta cuando un pool pasa de "en rango" a "fuera de rango"
// y dispara: email + notificación Supabase + toast visual (callback).
//
// Lógica anti-spam:
//   - Solo dispara en la TRANSICIÓN inRange true→false (no en cada re-render)
//   - Cooldown de 30 min por pool × dirección (guardado en localStorage)
//   - No dispara en el primer render (cuando aún no hay estado previo)
// ─────────────────────────────────────────────────────────────────────────────
import { useEffect, useRef } from 'react'
import { insertarNotificacion } from './useSupabaseSync'
import { sendOutOfRangeEmail }  from './emailService'

const COOLDOWN_MS = 30 * 60 * 1000  // 30 minutos entre alertas del mismo pool

function getCooldownKey(tokenId, direction) {
  return `oor_alert_${tokenId}_${direction}`
}

function isOnCooldown(tokenId, direction) {
  const key  = getCooldownKey(tokenId, direction)
  const last = parseInt(localStorage.getItem(key) || '0', 10)
  return Date.now() - last < COOLDOWN_MS
}

function stampCooldown(tokenId, direction) {
  localStorage.setItem(getCooldownKey(tokenId, direction), String(Date.now()))
}

/**
 * @param {object} opts
 * @param {object}  opts.pool        — objeto pool completo
 * @param {boolean} opts.inRange     — estado actual
 * @param {'below'|'above'|null} opts.direction  — dirección si está fuera
 * @param {string}  opts.userId      — Supabase userId
 * @param {string}  opts.userEmail   — email del usuario (para enviar el correo)
 * @param {function} opts.onAlert    — callback(direction) para mostrar toast local
 */
export function useOutOfRangeAlert({ pool, inRange, direction, userId, userEmail, onAlert }) {
  // null = primer render, aún sin estado previo conocido
  const prevInRangeRef = useRef(null)

  useEffect(() => {
    // Primer render: registra el estado inicial sin disparar alerta
    if (prevInRangeRef.current === null) {
      prevInRangeRef.current = inRange
      return
    }

    const wasInRange = prevInRangeRef.current
    prevInRangeRef.current = inRange

    // Solo actúa en la transición true → false
    if (wasInRange !== true || inRange !== false) return
    if (!direction) return

    const pair    = `${pool.token0Symbol}/${pool.token1Symbol}`
    const tokenId = pool.tokenId

    // Cooldown: evita spam si el componente se re-monta o re-renderiza
    if (isOnCooldown(tokenId, direction)) return
    stampCooldown(tokenId, direction)

    const dirLabel = direction === 'below' ? 'hacia abajo ⬇' : 'hacia arriba ⬆'

    // ── 1. Notificación in-app (Supabase) ──────────────────────────
    if (userId) {
      insertarNotificacion(
        userId,
        'pool_out_of_range',
        `⚠️ Pool ${pair} fuera de rango ${dirLabel}`,
        `Tu pool #${tokenId} salió del rango de precios. ` +
        `Si necesitas ayuda contacta a Oscar o revisa el FAQ.`,
      ).catch(console.error)
    }

    // ── 2. Email ───────────────────────────────────────────────────
    if (userEmail) {
      sendOutOfRangeEmail({
        direction,
        pair,
        currentPrice: pool.currentPrice,
        priceLower:   pool.priceLower,
        priceUpper:   pool.priceUpper,
        chain:        pool.chainName,
        tokenId,
        userEmail,
      }).then(result => {
        if (result.ok) console.info(`[OutOfRangeAlert] Email enviado (${pair} ${direction})`)
        else           console.warn(`[OutOfRangeAlert] Email falló:`, result.reason)
      })
    }

    // ── 3. Toast visual local ──────────────────────────────────────
    onAlert?.(direction)

  }, [inRange]) // eslint-disable-line react-hooks/exhaustive-deps
  // ↑ Intencionalmente solo inRange como dep — queremos detectar la transición.
}
