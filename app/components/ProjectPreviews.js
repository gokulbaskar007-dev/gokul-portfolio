"use client";

import { createContext, useCallback, useContext, useRef, useState } from "react";
import dynamic from "next/dynamic";

const LivePreviewModal = dynamic(() => import("./LivePreviewModal"));
const PreviewContext = createContext(null);

export default function ProjectPreviews({ children }) {
  const [preview, setPreview] = useState(null);
  const trigger = useRef(null);

  const openPreview = useCallback((url, name, button) => {
    trigger.current = button;
    setPreview({ url, name });
  }, []);

  const closePreview = useCallback(() => {
    setPreview(null);
    trigger.current?.focus({ preventScroll: true });
    trigger.current = null;
  }, []);

  return (
    <PreviewContext.Provider value={openPreview}>
      {children}
      {preview && <LivePreviewModal {...preview} onClose={closePreview} />}
    </PreviewContext.Provider>
  );
}

export function ProjectPreviewButton({ url, name }) {
  const openPreview = useContext(PreviewContext);

  return (
    <button
      type="button"
      aria-haspopup="dialog"
      aria-label={`Live preview of ${name}`}
      onClick={(event) => openPreview(url, name, event.currentTarget)}
    >
      Live preview
    </button>
  );
}
