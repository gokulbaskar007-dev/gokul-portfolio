"use client";

import { useEffect, useRef, useState } from "react";

export default function RemoteProjectScreenshot({ url, alt }) {
  const imgRef = useRef(null);
  const [attempt, setAttempt] = useState(0);
  const sources = [
    `https://s0.wp.com/mshots/v1/${encodeURIComponent(url)}?w=1280&h=800`,
    `https://image.thum.io/get/width/1280/crop/800/noanimate/${url}`,
  ];
  const src = sources[attempt];

  useEffect(() => {
    const img = imgRef.current;
    // The screenshot may finish loading before React hydrates.
    if (img?.complete && img.naturalWidth < 900) setAttempt(attempt + 1);
  }, [attempt]);

  if (!src) return <p className="shot__fallback">Preview unavailable</p>;

  return (
    <img
      key={src}
      ref={imgRef}
      src={src}
      alt={alt}
      width={1280}
      height={800}
      loading="lazy"
      decoding="async"
      onError={() => setAttempt(attempt + 1)}
      onLoad={(event) => {
        if (event.currentTarget.naturalWidth < 900) setAttempt(attempt + 1);
      }}
    />
  );
}
