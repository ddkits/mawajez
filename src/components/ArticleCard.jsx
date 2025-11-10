import { useNavigate } from "react-router-dom";
import { slugify } from "../lib/slug";
import { useI18n } from "../i18n.jsx";
import { formatDistanceToNow } from "date-fns";
import { ar, enUS } from "date-fns/locale";
import SourceBadge from "./SourceBadge";

export default function ArticleCard({ item }) {
  const navigate = useNavigate();
  const { lang } = useI18n();
  const slug = item.slug || slugify(item.title || "article");
  const openArticle = () => {
    navigate(`/${lang}/${item.sourceId}/${slug}`, { state: item });
  };

  const timeAgo = item.publishedAt
    ? formatDistanceToNow(item.publishedAt, {
        addSuffix: true,
        locale: lang === "ar" ? ar : enUS,
      })
    : "";

  return (
    <article className="card" onClick={openArticle} style={{ cursor: "pointer" }}>
      {item.image && (
        <img
          className="thumb"
          src={item.image}
          alt={item.title}
          loading="lazy"
          style={{ objectFit: "cover" }}
        />
      )}

      <div className="content" style={{ textAlign: lang === "ar" ? "right" : "left" }}>
        <div className="title">{item.title}</div>

        {item.excerpt && (
          <div className="excerpt" style={{ opacity: 0.8 }}>
            {item.excerpt}
          </div>
        )}

        <div className="meta">
          <SourceBadge id={item.sourceId} name={item.sourceName} />
          {timeAgo && <span> • {timeAgo}</span>}
        </div>
      </div>
    </article>
  );
}
