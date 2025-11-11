import sources from '../data/sources.js'
import { fetchRSS, parseRSS } from './rss.js'
import { fetchYouTubeFeed, parseYouTube, ytToVideoItem } from './youtube.js';
 
export async function loadVideos(category, lang) {
  const srcs = sources[lang].filter(s =>
    s.type === "youtube" &&
    (category === "All" || s.category === category)
  );

  const results = await Promise.all(
    srcs.map(async (src) => {
      try {
        const xml = await fetchYouTubeFeed(src.channel_id);
        const items = parseYouTube(xml);
        return items.map((it) => ytToVideoItem(it, src));
      } catch {
        return [];
      }
    })
  );

  const flat = results.flat();

  // ✅ Sort newest first
  flat.sort((a, b) => b.publishedAt - a.publishedAt);

  return flat;
}

export async function loadArticles(category='All', lang='en') {
  console.log("LOADING ARTICLES:", category, lang);

  const list = sources[lang];
  console.log("SOURCES:", list);

  const tasks = list
    .filter(s => s.type === 'rss' && (category === 'All' || s.category === category))
    .map(async (s) => {
      try {
        const xml = await fetchRSS(s.url);
        if (!xml) return [];
        const parsed = parseRSS(xml);
        return parsed.slice(0, 30).map(p => rssToArticle(p, s));
      } catch (err) {
        console.error("Failed feed:", s.name, s.url, err);
        return [];
      }
    });

  const result = (await Promise.all(tasks)).flat().sort((a,b)=> b.publishedAt - a.publishedAt);
  console.log("ARTICLES LOADED:", result.length);
  return result;
}


// export async function loadVideos(category='All', lang='en') {
//   const list = sources[lang];

//   const tasks = list
//     .filter(s => s.type === 'youtube' && (category === 'All' || s.category === category))
//     .map(async (s) => {
//       try {
//         const xml = await fetchYouTubeFeed(s.channel_id);
//         if (!xml) return [];

//         const parsed = parseYouTube(xml);

//         return parsed
//           .map(p => ytToVideoItem(p, s))
//           .filter(Boolean); // ✅ removes null videos

//       } catch {
//         return [];
//       }
//     });

//   return (await Promise.all(tasks))
//     .flat()
//     .sort((a,b)=> b.publishedAt - a.publishedAt);
// }


export function rssToArticle(item, source) {
  const ts = item.published ? Date.parse(item.published) : Date.now();

  return {
    id: item.id,
    title: item.title || "(untitled)",
    excerpt: item.excerpt || "",
    slug: (item.title || "")
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9\u0600-\u06FF\s-]/gi, "")
      .replace(/\s+/g, "-")
      .slice(0, 80),
    url: item.url,
    image: item.image,
    sourceId: source.id,
    sourceName: source.name,
    category: source.category,
    publishedAt: isNaN(ts) ? Date.now() : ts,
  };
}

export function filterBySource(items, id) {
  return items.filter(it => (it.sourceId === id) || (it.channelId === id))
}
