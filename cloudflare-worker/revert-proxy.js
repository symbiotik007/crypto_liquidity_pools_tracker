export default {
  async fetch(request) {
    const url = new URL(request.url);
    const targetPath = url.pathname.replace(/^\/revert-api/, '');
    const targetUrl = `https://api.revert.finance${targetPath}${url.search}`;

    const response = await fetch(targetUrl, {
      method: request.method,
      headers: { Accept: 'application/json' },
    });

    const body = await response.arrayBuffer();

    return new Response(body, {
      status: response.status,
      headers: {
        'Content-Type': response.headers.get('Content-Type') ?? 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
      },
    });
  },
};
