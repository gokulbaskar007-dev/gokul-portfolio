"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

// Custom cursor (desktop only): dot + ring that grows on links/buttons
export default function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    document.documentElement.classList.add("has-cursor");

    // Hide initially until mouse moves to prevent (0,0) flicker
    gsap.set([dot.current, ring.current], { opacity: 0 });

    const xDot = gsap.quickTo(dot.current, "x", { duration: 0.08 });
    const yDot = gsap.quickTo(dot.current, "y", { duration: 0.08 });
    const xRing = gsap.quickTo(ring.current, "x", { duration: 0.45, ease: "power3" });
    const yRing = gsap.quickTo(ring.current, "y", { duration: 0.45, ease: "power3" });

    let hasMoved = false;
    const move = (e) => {
      if (!hasMoved) {
        hasMoved = true;
        gsap.to([dot.current, ring.current], { opacity: 1, duration: 0.25 });
      }
      xDot(e.clientX); yDot(e.clientY);
      xRing(e.clientX); yRing(e.clientY);
    };
    const onLeave = () => {
      gsap.to([dot.current, ring.current], { opacity: 0, duration: 0.25 });
    };
    const onEnter = () => {
      if (hasMoved) gsap.to([dot.current, ring.current], { opacity: 1, duration: 0.25 });
    };
    const over = (e) => {
      const t = e.target.closest("a, button, summary, label, [data-cursor]");
      ring.current.classList.toggle("cursor-ring--big", !!t);
      const txt = t?.getAttribute?.("data-cursor") || "";
      ring.current.dataset.label = txt;
      ring.current.classList.toggle("cursor-ring--label", !!txt);
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      document.documentElement.classList.remove("has-cursor");
    };
  }, []);

  return (
    <>
      <div ref={ring} className="cursor-ring" aria-hidden="true" />
      <div ref={dot} className="cursor-dot" aria-hidden="true" />
    </>
  );
}
