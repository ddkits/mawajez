import React, { useEffect } from "react";

export default function VideoModal({ videoId, title, onClose }) {
  // Lock scroll when modal open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "auto");
  }, []);

  if (!videoId) return null;

  return (
    <div
      className="video-overlay"
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.75)",
        backdropFilter: "blur(6px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
        padding: "20px",
      }}
    >
      <div
        className="video-box"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: "900px",
          position: "relative",
          borderRadius: "12px",
          overflow: "hidden",
          background: "#000",
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            background: "rgba(0,0,0,0.6)",
            border: "none",
            borderRadius: "50%",
            color: "#fff",
            width: "36px",
            height: "36px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          ✕
        </button>

        <iframe
          width="100%"
          height="500"
          style={{ width: "100%", border: 0, aspectRatio: "16/9" }}
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&modestbranding=1&playsinline=1&enablejsapi=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}
