import { supabase } from "../../../lib/supabase";
import { insertarNotificacion } from "../../../lib/useSupabaseSync";

export const OOR_COOLDOWN_MS = 30 * 60 * 1000;

export async function sendOorAlert({ userId, userEmail, pair, direction, currentPrice, priceLower, priceUpper, tokenId }) {
  const dir  = direction === "below" ? "por debajo del mínimo" : "por encima del máximo";
  const icon = direction === "below" ? "⬇" : "⬆";
  await insertarNotificacion(
    userId,
    "oor_alert",
    `${icon} Pool ${pair} fuera de rango`,
    `Tu posición salió de rango (${dir}). Precio actual: ${currentPrice.toFixed(2)}.`,
  );

  try {
    await supabase.functions.invoke("send-oor-alert", {
      body: { userId, userEmail, pair, direction, currentPrice, priceLower, priceUpper, tokenId },
    });
  } catch (e) {
    console.warn("Edge Function OOR email:", e?.message);
  }
}
