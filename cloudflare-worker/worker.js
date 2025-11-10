// Minimal CORS proxy for RSS/Atom/JSON feeds using Cloudflare Workers
// Deploy: wrangler deploy
// Usage: https://your-worker.workers.dev/?url=<ENCODED_TARGET_URL>
export default {
  async fetch(request) {
    const url = new URL(request.url)
    const target = url.searchParams.get('url')
    if (!target) {
      return new Response('Missing ?url=', { status: 400 })
    }
    try {
      const resp = await fetch(target, { headers: { 'User-Agent': 'MawajezFetcher/1.0' } })
      const body = await resp.text()
      const headers = new Headers(resp.headers)
      headers.set('Access-Control-Allow-Origin', '*')
      headers.set('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS')
      headers.set('Cache-Control', 's-maxage=300, max-age=60')
      headers.delete('set-cookie')
      return new Response(body, { status: resp.status, headers })
    } catch (e) {
      return new Response('Proxy error: ' + e.message, { status: 502 })
    }
  }
}
