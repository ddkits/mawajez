import sources from '../data/sources'
import { fetchRSS, parseRSS, rssToArticle } from './rss'
import { fetchYouTubeFeed, parseYouTube, ytToVideoItem } from './youtube';

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


export async function loadVideos(category='All', lang='en') {
  const list = sources[lang];

  const tasks = list
    .filter(s => s.type === 'youtube' && (category === 'All' || s.category === category))
    .map(async (s) => {
      try {
        const xml = await fetchYouTubeFeed(s.channel_id);
        if (!xml) return [];

        const parsed = parseYouTube(xml);

        return parsed
          .map(p => ytToVideoItem(p, s))
          .filter(Boolean); // ✅ removes null videos

      } catch {
        return [];
      }
    });

  return (await Promise.all(tasks))
    .flat()
    .sort((a,b)=> b.publishedAt - a.publishedAt);
}

export function filterBySource(items, id) {
  return items.filter(it => (it.sourceId === id) || (it.channelId === id))
}
