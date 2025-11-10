import fs from "fs";
import path from "path";

const dist = path.resolve("dist");
const indexFile = path.join(dist, "index.html");
const fallback = path.join(dist, "404.html");

try {
  fs.copyFileSync(indexFile, fallback);
  console.log("✅ 404.html created successfully.");
} catch (err) {
  console.error("❌ Failed to create 404.html:", err);
}
