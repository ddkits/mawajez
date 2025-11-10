import { useEffect } from "react";

export default function VideoModal({ videoId, title, onClose }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "auto");
  }, []);

  if (!videoId) return null;

  return (
    <div className="video-overlay" onClick={onClose}>
      <div className="video-container" onClick={(e) => e.stopPropagation()}>
        <button className="video-close" onClick={onClose}>✕</button>
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&modestbranding=1&playsinline=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          allowFullScreen
        />
      </div>
    </div>
  );
}
