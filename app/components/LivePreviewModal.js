"use client";

import { useEffect } from "react";

export default function LivePreviewModal({ url, onClose }) {
  useEffect(() => {
    if (!url) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [url, onClose]);

  if (!url) return null;

  return (
    <div
      className="modal open"
      id="modal"
      aria-modal="true"
      role="dialog"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal__box">
        <div className="modal__bar">
          <em>{url}</em>
          <a href={url} target="_blank" rel="noopener noreferrer">
            Open site ↗
          </a>
          <button type="button" onClick={onClose} aria-label="Close modal">
            Close ✕
          </button>
        </div>
        <iframe
          src={url}
          title="Live website preview"
          loading="lazy"
          referrerPolicy="no-referrer"
        />
        <p className="modal__note">
          Live preview. If it stays blank, that site blocks embedding — use “Open site”.
        </p>
      </div>
    </div>
  );
}
