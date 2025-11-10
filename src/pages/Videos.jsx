import { useEffect, useRef, useState } from "react";
import Loader from "../components/Loader";
import VideoCard from "../components/VideoCard";
import { loadVideos } from "../lib/aggregators";
import { useI18n } from "../i18n.jsx";
import { Helmet } from "react-helmet-async";

const CATS = ["All", "World", "Business", "Tech", "Sports"];

export default function Videos() {
  const [videos, setVideos] = useState(null);
  const [visible, setVisible] = useState(18);
  const [cat, setCat] = useState("All"); // ✅ ADD CATEGORY STATE
  const loaderRef = useRef(null);
  const { t, lang } = useI18n();

  // ✅ Load videos when language or category changes
  useEffect(() => {
    setVideos(null);
    setVisible(18);
    window.scrollTo({ top: 0, behavior: "smooth" });
    (async () => {
      setVideos(await loadVideos(cat, lang)); // ✅ use cat instead of category
    })();
  }, [lang, cat]);

  // ✅ Infinite scroll
  useEffect(() => {
    const el = loaderRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible((v) => v + 12);
        }
      },
      { rootMargin: "300px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section>
      <Helmet>
        <title>Mawajez — {t("videos")}</title>
        <meta
          name="description"
          content="Watch the latest news video updates from global channels."
        />
        <meta property="og:title" content="News Videos — Mawajez" />
        <meta
          property="og:description"
          content="Latest curated video news in Arabic and English."
        />
      </Helmet>
      {/* ✅ Category Tabs */}
      <div className="home-tabs">
        {CATS.map((c) => (
          <button
            key={c}
            className={c === cat ? "home-tab active" : "home-tab"}
            onClick={() => setCat(c)}
          >
            {t("category_" + c.toLowerCase()) || c}
          </button>
        ))}
      </div>

      {/* ✅ Video Feed */}
      {!videos ? (
        <Loader rows={6} />
      ) : (
        <>
          <div className="home-grid">
            {videos.slice(0, visible).map((v) => (
              <VideoCard key={v.id} item={v} />
            ))}
          </div>
          <div ref={loaderRef} style={{ height: 1 }} />
        </>
      )}
    </section>
  );
}
