import { PROXY_URL } from '../config'

export async function fetchYouTubeFeed(channelId) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 2000);

  try {
    const url = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;
    const resp = await fetch(PROXY_URL + encodeURIComponent(url), {
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!resp.ok) throw new Error("YouTube feed fetch failed");
    return resp.text();
  } catch (err) {
    clearTimeout(timeout);
    console.warn("YouTube feed timeout/skip:", channelId);
    return ""; // ✅ Skip broken/slow channel instead of blocking everything
  }
}


export function parseYouTube(xmlText) {
  const doc = new DOMParser().parseFromString(xmlText, 'text/xml');
  const entries = Array.from(doc.getElementsByTagName('entry'));

  return entries.map((el, i) => {
    const g = (sel) => el.getElementsByTagName(sel)[0]?.textContent?.trim() || "";

    // ✅ Correct namespace-safe video ID extraction
    const videoId =
      el.getElementsByTagName('yt:videoId')[0]?.textContent ||
      el.getElementsByTagNameNS('*', 'videoId')[0]?.textContent ||
      "";

    const link = el.getElementsByTagName('link')[0]?.getAttribute('href') || "";

    return {
      id: g('id') || videoId || `${Date.now()}-${i}`,
      title: g('title') || '(untitled) video',
      link,
      videoId,
      published: g('published'),
    };
  });
}

export function ytToVideoItem(item, source) {
  const videoId = item.videoId ||
    (item.id ? item.id.replace("yt:video:", "") : null);

  const ts = item.published ? Date.parse(item.published) : Date.now();

  return {
    id: videoId || `${source.channel_id}-${Math.random().toString(36).slice(2)}`,
    title: item.title || "(untitled video)",
    videoId,
    url: item.link || null,
    channelId: source.channel_id,     // ✅ FIXED
    channelName: source.name,
    publishedAt: isNaN(ts) ? Date.now() : ts,
  };
}
