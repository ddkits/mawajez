export function slugify(str = "") {
  return str
    .normalize("NFD")
    .replace(/[\u064B-\u0652]/g, "") // remove tashkeel
    .replace(/[^\w\u0600-\u06FF]+/g, "-") // allow Arabic + English
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();
}