const ROUTES = {
  '/revert-api':      'https://api.revert.finance',
  '/coingecko':       'https://api.coingecko.com',
  '/hl-info':         'https://api.hyperliquid.xyz',
  '/binance-api':     'https://api.binance.com',
  '/bybit-api':       'https://api.bybit.com',
  '/okx-api':         'https://www.okx.com',
  '/bingx-api':       'https://open-api.bingx.com',
  '/coinbase-api':    'https://api.coinbase.com',
  '/dydx-api':        'https://indexer.dydx.trade',
  '/gmx-api':         'https://gmx-server-mainnet.uw.r.appspot.com',
  '/dexscreener-api': 'https://api.dexscreener.com',
  '/curve-api':       'https://api.curve.fi',
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url)

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders() })
    }

    // ── Cloudflare Turnstile server-side verification ──────────────────
    if (url.pathname === '/turnstile-verify') {
      return handleTurnstileVerify(request, env)
    }

    const prefix = Object.keys(ROUTES).find(p => url.pathname.startsWith(p))
    if (!prefix) {
      return new Response('Not found', { status: 404 })
    }

    const targetBase = ROUTES[prefix]
    const targetPath = url.pathname.slice(prefix.length)
    const targetUrl  = `${targetBase}${targetPath}${url.search}`

    const headers = { Accept: 'application/json' }

    // Inject API key secrets — never exposed to the browser
    if (prefix === '/coingecko' && env.COINGECKO_API_KEY) {
      headers['x-cg-demo-api-key'] = env.COINGECKO_API_KEY
    }

    const isReadMethod = request.method === 'GET' || request.method === 'HEAD'

    const response = await fetch(targetUrl, {
      method:  request.method,
      headers,
      body: isReadMethod ? undefined : request.body,
    })

    const body = await response.arrayBuffer()

    return new Response(body, {
      status: response.status,
      headers: {
        'Content-Type': response.headers.get('Content-Type') ?? 'application/json',
        ...corsHeaders(),
      },
    })
  },
}

// ── Turnstile verification ─────────────────────────────────────────────
async function handleTurnstileVerify(request, env) {
  if (request.method !== 'POST') {
    return jsonResponse({ success: false, error: 'method_not_allowed' }, 405)
  }

  let token, remoteip
  try {
    const body = await request.json()
    token    = body.token
    remoteip = body.remoteip
  } catch {
    return jsonResponse({ success: false, error: 'invalid_body' }, 400)
  }

  if (!token) {
    return jsonResponse({ success: false, error: 'missing_token' }, 400)
  }

  // Use real secret key when set, otherwise fall back to Cloudflare test secret
  const secretKey = env.TURNSTILE_SECRET_KEY || '1x0000000000000000000000000000000AA'

  const form = new FormData()
  form.append('secret',   secretKey)
  form.append('response', token)
  if (remoteip) form.append('remoteip', remoteip)

  const result = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    body:   form,
  })
  const data = await result.json()

  return jsonResponse({
    success: data.success === true,
    error:   data['error-codes']?.[0] ?? null,
  })
}

function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', ...corsHeaders() },
  })
}

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin':  '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  }
}
