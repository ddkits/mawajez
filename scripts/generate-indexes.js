import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { loadArticles, loadVideos } from "../src/lib/aggregators.js";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


async function run() {
  const outDir = path.join(__dirname, "..", "public", "api");
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const langs = ["en", "ar"];

  for (const lang of langs) {
    console.log(`🔄 Fetching articles & videos for: ${lang}`);

    const articles = await loadArticles("All", lang);
    const videos = await loadVideos("All", lang);

    const articleList = articles.map(a => ({
      lang,
      url: `https://mawajez.com/${lang}/${a.sourceId}/${a.slug}`
    }));

    const videoList = videos.map(v => ({
      lang,
      url: `https://mawajez.com/${lang}/videos?v=${v.videoId}`
    }));

    fs.writeFileSync(
      path.join(outDir, `list-${lang}.json`),
      JSON.stringify(articleList, null, 2)
    );

    fs.writeFileSync(
      path.join(outDir, `videos-${lang}.json`),
      JSON.stringify(videoList, null, 2)
    );
  }

  console.log("✅ DONE: Indexes generated successfully.");
}

run();
