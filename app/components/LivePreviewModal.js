"use client";

import { useEffect, useRef } from "react";

export default function LivePreviewModal({ url, name, onClose }) {
  const dialogRef = useRef(null);
  const closeButtonRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog.open) dialog.showModal();
    closeButtonRef.current.focus({ preventScroll: true });
  }, []);

  return (
    <dialog
      ref={dialogRef}
      className="modal"
      id="modal"
      aria-label={`Live preview of ${name}`}
      data-lenis-prevent
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) event.currentTarget.close();
      }}
    >
      <div className="modal__box">
        <div className="modal__bar">
          <em>{url}</em>
          <a href={url} target="_blank" rel="noopener noreferrer">
            Open site ↗
          </a>
          <button ref={closeButtonRef} type="button" onClick={() => dialogRef.current.close()}>
            Close ✕
          </button>
        </div>
        <iframe
          src={url}
          title={`${name} website preview`}
          referrerPolicy="no-referrer"
        />
        <p className="modal__note">
          Live preview. If it stays blank, that site blocks embedding — use “Open site”.
        </p>
      </div>
    </dialog>
  );
}
