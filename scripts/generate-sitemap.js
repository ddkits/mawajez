import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const site = "https://mawajez.com";

function readJSON(file) {
  try {
    return JSON.parse(fs.readFileSync(file, "utf8"));
  } catch {
    return [];
  }
}

function createEntry(url) {
  return `<url>
  <loc>${url}</loc>
  <lastmod>${new Date().toISOString()}</lastmod>
  <changefreq>hourly</changefreq>
  <priority>0.9</priority>
</url>`;
}

function build() {
  const outDir = path.resolve("public");
  const articlesEn = readJSON("public/api/list-en.json");
  const articlesAr = readJSON("public/api/list-ar.json");
  const videosEn = readJSON("public/api/videos-en.json");
  const videosAr = readJSON("public/api/videos-ar.json");

  let urls = [];

  // Static pages:
  ["en", "ar"].forEach(lang => {
    urls.push(createEntry(`${site}/${lang}`));
    urls.push(createEntry(`${site}/${lang}/videos`));
    urls.push(createEntry(`${site}/${lang}/about`));
  });

  // Articles:
  [...articlesEn, ...articlesAr].forEach(a => {
    urls.push(createEntry(a.url));
  });

  // Videos:
  [...videosEn, ...videosAr].forEach(v => {
    urls.push(createEntry(v.url));
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>`;

  const fileOut = path.join(outDir, "sitemap.xml");
  fs.writeFileSync(fileOut, xml);
  console.log("✅ Sitemap updated:", fileOut);
}

build();
