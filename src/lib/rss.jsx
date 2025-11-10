import { PROXY_URL } from '../config'
import { slugify } from './slug';

export async function fetchRSS(url) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 2000); // 2 seconds

  try {
    const resp = await fetch(PROXY_URL + encodeURIComponent(url), {
      signal: controller.signal
    });
    clearTimeout(timeout);

    if (!resp.ok) throw new Error("RSS fetch failed");
    return resp.text();
  } catch (err) {
    clearTimeout(timeout);
    console.warn("RSS Timeout/Fail:", url);
    return ""; // return empty → parsed → ignored → no delay
  }
}


export function parseRSS(xmlText) {
  const doc = new DOMParser().parseFromString(xmlText, 'text/xml')
  const isAtom = !!doc.querySelector('feed')
  const items = Array.from(doc.querySelectorAll(isAtom ? 'entry' : 'item'))

  return items.map((el, i) => {
  const g = (sel) => el.querySelector(sel)?.textContent?.trim() || '';
  const title = g('title');
  const link = g('link') || el.querySelector('link')?.getAttribute('href') || '';

  const description = g('description') || g('summary') || g('content:encoded') || '';
  const pubDate = g('pubDate') || g('published') || g('updated');

  let image =
    el.querySelector('media\\:thumbnail')?.getAttribute('url') ||
    el.querySelector('media\\:content')?.getAttribute('url') ||
    el.querySelector('enclosure')?.getAttribute('url') || '';

  if (!image) {
    const html = el.querySelector('content\\:encoded')?.textContent || '';
    const m = html.match(/<img[^>]+src=["']([^"']+)/i);
    if (m) image = m[1];
  }

  return {
    id: g('guid') || link || `${Date.now()}-${i}`,
    title,
    link,
    description,
    pubDate,
    image
  };
});

}

export function rssToArticle(parsed, source) {
  const cleanLink = (parsed.link || '').split('#')[0].split('?')[0];

  const idBase = cleanLink || parsed.title || source.id;
  const idHash = btoa(unescape(encodeURIComponent(idBase))).replace(/=+$/, '');
  const id = `${source.id}-${idHash}`;

  const dateStr = parsed.pubDate || parsed.updated;
  const ts = dateStr ? Date.parse(dateStr) : Date.now();

  return {
    id,
    title: parsed.title || '(untitled)',
    slug: slugify(parsed.title || '(untitled)'),   // ✅ ALWAYS store slug
    url: cleanLink || parsed.link,
    sourceId: source.id,
    sourceName: source.name,
    publishedAt: isNaN(ts) ? Date.now() : ts,
    excerpt: (parsed.description || '').replace(/<[^>]+>/g, '').slice(0, 200),
    image: parsed.image || null
  };
}
