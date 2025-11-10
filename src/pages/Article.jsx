import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { loadArticles } from "../lib/aggregators";
import SourceBadge from "../components/SourceBadge";
import { useI18n } from "../i18n.jsx";
import { Helmet } from "react-helmet-async";

export default function Article() {
  const { sourceId, slug } = useParams();
  const { state } = useLocation();
  const { lang } = useI18n();
  const [article, setArticle] = useState(state || null);

  useEffect(() => {
    if (state && state.slug === slug) {
      setArticle(state);
      return;
    }

    (async () => {
      const all = await loadArticles("All", lang);
      const found = all.find(a => a.sourceId === sourceId && a.slug === slug);
      setArticle(found || null);
    })();
  }, [state, lang, sourceId, slug]);

  if (!article) {
    return <div style={{ padding: 20 }}>Loading…</div>;
  }

  return (
    <section>
      <Helmet>
        <title>{article.title} • Mawajez</title>
        <meta name="description" content={article.excerpt} />
      </Helmet>

      <h1 className="title">{article.title}</h1>

      <div className="meta" style={{ margin: "8px 0 18px" }}>
        <SourceBadge id={article.sourceId} name={article.sourceName} />
        <span style={{ opacity: 0.7, marginLeft: 8 }}>
          • {new Date(article.publishedAt).toLocaleString()}
        </span>
      </div>

      {article.image && (
        <img
          src={article.image}
          alt=""
          style={{
            width: "100%",
            borderRadius: "12px",
            marginBottom: "18px",
            objectFit: "cover",
            maxHeight: "420px"
          }}
        />
      )}

      <p style={{ fontSize: "17px", lineHeight: "1.6", marginBottom: "24px" }}>
        {article.excerpt}
      </p>

      <a
        href={article.url}
        className="button"
        target="_blank"
        rel="noopener noreferrer"
        style={{ display: "inline-block", fontSize: "16px" }}
      >
        {lang === "ar" ? "المصدر الأصلي" : "Open Original Source"}
      </a>
    </section>
  );
}
