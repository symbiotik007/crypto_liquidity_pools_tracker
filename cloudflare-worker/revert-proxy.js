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

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin':  '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  }
}
