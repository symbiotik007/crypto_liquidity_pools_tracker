// supabase/functions/send-pool-alert/index.ts
// Edge Function — corre en servidores de Supabase (Deno runtime)
// Envía email de alerta "pool fuera de rango" via Resend
//
// Deploy:
//   npx supabase functions deploy send-pool-alert
//
// Secret requerido (una vez):
//   npx supabase secrets set RESEND_API_KEY=re_xxxxxxxxxx
//
// Resend gratis: https://resend.com  →  3,000 emails/mes, sin tarjeta

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const RESEND_KEY   = Deno.env.get("RESEND_API_KEY") ?? "";
const FROM_ADDRESS = Deno.env.get("FROM_EMAIL") ?? "The Crypto House <alerts@thecryptohouse.co>";
const WA_LINK      = "https://wa.me/573215646716";

const CORS = {
  "Access-Control-Allow-Origin":  "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// ── Formateador de precio ─────────────────────────────────────────────────────
function fmt(n: number) {
  return Number(n).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

// ── Plantilla HTML del email ──────────────────────────────────────────────────
function buildHtml(p: {
  direction: "below" | "above";
  pair: string;
  currentPrice: number;
  priceLower: number;
  priceUpper: number;
  chain: string;
  tokenId: string | number;
}) {
  const isBelow   = p.direction === "below";
  const accentHex = isBelow ? "#ff4f6e" : "#ffb347";
  const arrow     = isBelow ? "⬇" : "⬆";
  const dirLabel  = isBelow ? "por debajo del mínimo del rango" : "por encima del máximo del rango";
  const token100  = isBelow ? p.pair.split("/")[1] : p.pair.split("/")[0];
  const actionTip = isBelow
    ? "Puedes rebalancear tu posición o configurar una <strong>cobertura SHORT</strong> para protegerte."
    : "Tu posición está acumulando el token base. Puedes ampliar el rango o cerrar la posición.";

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>Alerta Pool Fuera de Rango</title>
</head>
<body style="margin:0;padding:0;background:#050a0f;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#050a0f;padding:40px 0;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#070d14;border:1px solid #0e2435;border-top:3px solid ${accentHex};">

        <!-- Header -->
        <tr>
          <td style="padding:28px 32px 20px;">
            <div style="font-size:11px;font-weight:700;color:#00e5ff;letter-spacing:3px;text-transform:uppercase;margin-bottom:6px;">
              THE CRYPTO HOUSE · LIQUIDITY ENGINE
            </div>
            <div style="font-size:22px;font-weight:800;color:#ffffff;letter-spacing:-0.5px;">
              ${arrow} Pool <span style="color:${accentHex};">${p.pair}</span> fuera de rango
            </div>
          </td>
        </tr>

        <!-- Alert badge -->
        <tr>
          <td style="padding:0 32px 24px;">
            <div style="display:inline-block;background:${isBelow ? "#1a0810" : "#1a0e00"};border:1px solid ${isBelow ? "#5a1a28" : "#5a3a00"};padding:10px 18px;">
              <span style="font-size:13px;font-weight:700;color:${accentHex};">
                ⚠️ &nbsp;Tu posición está ${dirLabel}
              </span>
            </div>
          </td>
        </tr>

        <!-- Price info -->
        <tr>
          <td style="padding:0 32px 24px;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td width="33%" style="text-align:center;background:#060b16;border:1px solid #0d1f35;padding:16px 8px;">
                  <div style="font-size:9px;font-weight:700;color:#2e5070;letter-spacing:2px;text-transform:uppercase;margin-bottom:6px;">PRECIO ACTUAL</div>
                  <div style="font-size:20px;font-weight:800;color:${accentHex};">${fmt(p.currentPrice)}</div>
                </td>
                <td width="2%" style="background:#050a0f;"></td>
                <td width="31%" style="text-align:center;background:#060b16;border:1px solid #0d1f35;padding:16px 8px;">
                  <div style="font-size:9px;font-weight:700;color:#2e5070;letter-spacing:2px;text-transform:uppercase;margin-bottom:6px;">▼ MÍNIMO</div>
                  <div style="font-size:16px;font-weight:700;color:#ff6b88;">${fmt(p.priceLower)}</div>
                </td>
                <td width="2%" style="background:#050a0f;"></td>
                <td width="31%" style="text-align:center;background:#060b16;border:1px solid #0d1f35;padding:16px 8px;">
                  <div style="font-size:9px;font-weight:700;color:#2e5070;letter-spacing:2px;text-transform:uppercase;margin-bottom:6px;">▲ MÁXIMO</div>
                  <div style="font-size:16px;font-weight:700;color:#00ff88;">${fmt(p.priceUpper)}</div>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Info -->
        <tr>
          <td style="padding:0 32px 24px;">
            <div style="background:#060b16;border:1px solid #0d1f35;border-left:3px solid ${accentHex};padding:16px 20px;">
              <p style="margin:0 0 10px;font-size:14px;color:#c8e6f0;line-height:1.6;">
                Tu posición <strong style="color:#fff;">#${p.tokenId}</strong> en <strong style="color:#fff;">${p.chain}</strong>
                está compuesta actualmente <strong style="color:${accentHex};">100% en ${token100}</strong>
                y <strong>no está generando fees</strong>.
              </p>
              <p style="margin:0;font-size:13px;color:#7a9ab0;line-height:1.6;">
                ${actionTip}
              </p>
            </div>
          </td>
        </tr>

        <!-- Actions -->
        <tr>
          <td style="padding:0 32px 32px;">
            <div style="font-size:12px;font-weight:700;color:#4a7a96;letter-spacing:1px;text-transform:uppercase;margin-bottom:14px;">
              ¿Necesitas ayuda?
            </div>
            <table cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding-right:10px;">
                  <a href="${WA_LINK}" style="display:inline-block;padding:12px 24px;background:transparent;border:1px solid ${accentHex};color:${accentHex};font-size:12px;font-weight:700;letter-spacing:1px;text-transform:uppercase;text-decoration:none;">
                    💬 Contactar a Oscar
                  </a>
                </td>
                <td>
                  <a href="https://thecryptohouse.co/#faq" style="display:inline-block;padding:12px 24px;background:transparent;border:1px solid #1a3a5e;color:#4a7a96;font-size:12px;font-weight:700;letter-spacing:1px;text-transform:uppercase;text-decoration:none;">
                    📚 Ver FAQ
                  </a>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="padding:16px 32px;border-top:1px solid #0e2435;">
            <p style="margin:0;font-size:11px;color:#1a3a5e;line-height:1.7;">
              Este email fue generado automáticamente por Liquidity Engine · The Crypto House.<br/>
              Pool #${p.tokenId} · ${p.chain} · ${p.pair}
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

// ── Handler principal ─────────────────────────────────────────────────────────
serve(async (req) => {
  // CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: CORS });
  }

  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405, headers: CORS });
  }

  if (!RESEND_KEY) {
    return new Response(
      JSON.stringify({ error: "RESEND_API_KEY no configurado en secrets" }),
      { status: 500, headers: { ...CORS, "Content-Type": "application/json" } },
    );
  }

  let body: {
    direction: "below" | "above";
    pair: string;
    currentPrice: number;
    priceLower: number;
    priceUpper: number;
    chain: string;
    tokenId: string | number;
    userEmail: string;
  };

  try {
    body = await req.json();
  } catch {
    return new Response(
      JSON.stringify({ error: "Body JSON inválido" }),
      { status: 400, headers: { ...CORS, "Content-Type": "application/json" } },
    );
  }

  const { direction, pair, userEmail, tokenId } = body;

  if (!userEmail || !pair || !direction) {
    return new Response(
      JSON.stringify({ error: "Faltan campos: userEmail, pair, direction" }),
      { status: 400, headers: { ...CORS, "Content-Type": "application/json" } },
    );
  }

  const isBelow  = direction === "below";
  const subject  = isBelow
    ? `⚠️ Tu pool ${pair} está fuera de rango — precio por debajo del mínimo`
    : `⚠️ Tu pool ${pair} está fuera de rango — precio por encima del máximo`;

  const resendRes = await fetch("https://api.resend.com/emails", {
    method:  "POST",
    headers: {
      "Authorization": `Bearer ${RESEND_KEY}`,
      "Content-Type":  "application/json",
    },
    body: JSON.stringify({
      from:    FROM_ADDRESS,
      to:      [userEmail],
      subject,
      html:    buildHtml(body),
    }),
  });

  const resendData = await resendRes.json();

  if (!resendRes.ok) {
    console.error("[send-pool-alert] Resend error:", resendData);
    return new Response(
      JSON.stringify({ error: "Resend falló", detail: resendData }),
      { status: 502, headers: { ...CORS, "Content-Type": "application/json" } },
    );
  }

  console.info(`[send-pool-alert] ✓ Email enviado → ${userEmail} | ${pair} ${direction} | id: ${resendData.id}`);

  return new Response(
    JSON.stringify({ ok: true, id: resendData.id }),
    { headers: { ...CORS, "Content-Type": "application/json" } },
  );
});
