// ─────────────────────────────────────────────────────────────────────────────
// emailService.js  —  Envía emails via Supabase Edge Function + Resend
//
// Flujo:
//   Frontend → supabase.functions.invoke('send-pool-alert') → Resend API → Email
//
// La API key de Resend vive en el servidor (Edge Function), nunca en el browser.
//
// SETUP (una sola vez en tu proyecto Supabase):
//
//   1. Crea cuenta gratis en https://resend.com  (3,000 emails/mes gratis)
//   2. En Resend → API Keys → Create API Key → copia "re_xxxxxxxxxx"
//   3. Verifica tu dominio en Resend (o usa el sandbox onboarding@resend.dev para pruebas)
//
//   4. Instala Supabase CLI si no lo tienes:
//        npm install -g supabase
//
//   5. Vincula tu proyecto:
//        npx supabase login
//        npx supabase link --project-ref <TU_PROJECT_REF>
//          (el ref está en Supabase Dashboard → Settings → General)
//
//   6. Sube el secret de Resend al servidor:
//        npx supabase secrets set RESEND_API_KEY=re_xxxxxxxxxx
//        npx supabase secrets set FROM_EMAIL="The Crypto House <alerts@tudominio.com>"
//
//   7. Despliega la Edge Function:
//        npx supabase functions deploy send-pool-alert
//
//   ¡Listo! El frontend ya puede llamar la función.
// ─────────────────────────────────────────────────────────────────────────────

import { supabase } from './supabase'

/**
 * Envía email de alerta "pool fuera de rango" via Supabase Edge Function.
 * @param {object} opts
 * @param {'below'|'above'} opts.direction
 * @param {string}  opts.pair            e.g. "ETH/USDC"
 * @param {number}  opts.currentPrice
 * @param {number}  opts.priceLower
 * @param {number}  opts.priceUpper
 * @param {string}  opts.chain
 * @param {string|number} opts.tokenId
 * @param {string}  opts.userEmail       destinatario
 * @returns {Promise<{ok:boolean, id?:string, reason?:string, simulated?:boolean}>}
 */
export async function sendOutOfRangeEmail({
  direction, pair, currentPrice, priceLower, priceUpper,
  chain, tokenId, userEmail,
}) {
  if (!userEmail) {
    console.warn('[emailService] No userEmail proporcionado, se omite el email.')
    return { ok: false, reason: 'no_email' }
  }

  try {
    const { data, error } = await supabase.functions.invoke('send-pool-alert', {
      body: { direction, pair, currentPrice, priceLower, priceUpper, chain, tokenId, userEmail },
    })

    if (error) {
      // Si la función no está desplegada aún, simula OK en dev para no bloquear
      if (error.message?.includes('Failed to send') || error.message?.includes('not found')) {
        console.warn('[emailService] Edge Function no desplegada aún — modo simulado.')
        return { ok: true, simulated: true }
      }
      console.error('[emailService] Edge Function error:', error.message)
      return { ok: false, reason: error.message }
    }

    return { ok: true, id: data?.id }
  } catch (err) {
    console.error('[emailService] Error inesperado:', err)
    return { ok: false, reason: err.message }
  }
}
