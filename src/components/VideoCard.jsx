import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useI18n } from "../i18n.jsx";
import { formatDistanceToNow } from "date-fns";
import VideoModal from "./VideoModal";

export default function VideoCard({ item }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { lang } = useI18n();

  const openVideo = () => {
    if (!item.videoId) return;
    setOpen(true);
    navigate(`/${lang}/videos?v=${item.videoId}`, { replace: false });
  };

  const closeVideo = () => {
    setOpen(false);
    navigate(`/${lang}/videos`, { replace: true });
  };

  return (
    <>
      <article className="card" onClick={openVideo} style={{ cursor: "pointer" }}>
        <div className="thumb">
          <img
            src={`https://i.ytimg.com/vi/${item.videoId}/hqdefault.jpg`}
            alt={item.title}
            loading="lazy"
          />
          <div className="play-overlay">▶</div>
        </div>

        <div className="content">
          <div className="title">{item.title}</div>
          <div className="meta">
            <span className="badge">{item.channelName}</span>
            <span>• {formatDistanceToNow(item.publishedAt, { addSuffix: true })}</span>
          </div>
        </div>
      </article>

      {open && (
        <VideoModal key={item.videoId} videoId={item.videoId} title={item.title} onClose={closeVideo} />
      )}
    </>
  );
}
