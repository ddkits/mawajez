import { PROXY_URL } from "../config.js";

export async function fetchYouTubeFeed(channelId) {
  const url = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;

  const res = await fetch(PROXY_URL + encodeURIComponent(url));
  if (!res.ok) return "";

  return res.text();
}

export function parseYouTube(xmlText) {
  if (!xmlText) return [];

  const doc = new DOMParser().parseFromString(xmlText, "text/xml");
  const entries = [...doc.getElementsByTagName("entry")];

  return entries.map((el, index) => {
    const g = (tag) => el.getElementsByTagName(tag)[0]?.textContent?.trim() || "";

    const videoId =
      el.getElementsByTagName("yt:videoId")[0]?.textContent ||
      el.getElementsByTagNameNS("*", "videoId")[0]?.textContent ||
      g("id").replace("yt:video:", "") ||
      `vid-${Date.now()}-${index}`;

    return {
      videoId,
      title: g("title"),
      link: el.getElementsByTagName("link")[0]?.getAttribute("href") || "",
      published: g("published")
    };
  });
}

export function ytToVideoItem(item, source) {
  return {
    id: `${source.id}-${item.videoId}`,   // ✅ ALWAYS UNIQUE
    title: item.title,
    videoId: item.videoId,
    url: item.link,
    channelId: source.id,                 // ✅ MATCH YOUR DATA MODEL
    channelName: source.name,
    publishedAt: Date.parse(item.published) || Date.now(),
  };
}
