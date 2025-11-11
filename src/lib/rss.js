import { XMLParser } from "fast-xml-parser";
import { PROXY_URL } from "../config.js";

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "",
});

// /**
//  * Parse RSS feed text into unified article entries
//  */
// export function parseRSS(xmlText) {
//   if (!xmlText) return [];

//   const doc = parser.parse(xmlText);
//   const feed = doc.rss?.channel;
//   if (!feed || !feed.item) return [];

//   return feed.item.map((el, index) => {
//     const id =
//       el.guid?.content ||
//       el.guid ||
//       el.link ||
//       `rss-${Date.now()}-${index}`;

//     // Extract image if available
//     const image =
//       el.enclosure?.url ||
//       el["media:content"]?.url ||
//       el["media:thumbnail"]?.url ||
//       null;

//     return {
//       id: String(id).trim(),
//       title: el.title?.trim() || "",
//       url: el.link || null,
//       excerpt: (el.description || el["media:description"] || "")
//         .replace(/<[^>]+>/g, "")
//         .trim(),
//       image,
//       published: el.pubDate || el.published || null,
//     };
//   });
// }

export function parseRSS(xmlText) {
  if (!xmlText) return [];

  const doc = parser.parse(xmlText);

  // Case 1: Traditional RSS
  const items = doc?.rss?.channel?.item;
  if (items) return normalize(items);

  // Case 2: Atom feeds (like الجزيرة, DW, سكاي)
  const entries = doc?.feed?.entry;
  if (entries) return normalize(entries);

  return [];
}

function normalize(raw) {
  return raw.map((el, i) => {
    const link = el.link?.href || el.link || null;
    const published = el.published || el.pubDate || el.updated || null;

    // ✅ Unique stable ID rule:
    const uniqueId =
      el.id ||
      link ||
      el.title?.substring(0, 80) ||
      `item-${Date.now()}-${i}`;

    const excerpt = (el.summary || el.description || el.content || "")
      .replace(/<[^>]+>/g, "")
      .trim();

    const image =
      el.enclosure?.url ||
      el["media:thumbnail"]?.url ||
      el["media:content"]?.url ||
      null;

    return {
      id: String(uniqueId),            // ✅ ALWAYS STRING
      title: (el.title?.content || el.title || "").trim(),
      url: link,
      excerpt,
      image,
      published,
    };
  });
}


export async function fetchRSS(url) {
  try {
    const resp = await fetch(PROXY_URL + encodeURIComponent(url), {
      headers: { "User-Agent": "Mozilla/5.0" },
    });
    if (!resp.ok) return "";
    return await resp.text();
  } catch {
    return "";
  }
}