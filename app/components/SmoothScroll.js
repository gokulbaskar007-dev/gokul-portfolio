"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

// Buttery smooth scroll (Lenis) + GSAP ScrollTrigger sync + generic [data-reveal] animations
export default function SmoothScroll() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let lenis = null;
    let raf = null;
    if (!reduce) {
      lenis = new Lenis({ duration: 1.15, smoothWheel: true, wheelMultiplier: 1 });
      lenis.on("scroll", ScrollTrigger.update);
      raf = (t) => lenis.raf(t * 1000);
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);
      window.__lenis = lenis;
    }

    // Smooth anchor links
    const onClick = (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute("href");
      const isTop = id === "#" || id === "#top";
      const el = isTop ? document.body : document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      if (lenis) lenis.scrollTo(isTop ? 0 : el, { offset: isTop ? 0 : -60, duration: 1.4 });
      else el.scrollIntoView({ behavior: "smooth" });
    };
    document.addEventListener("click", onClick);

    // Generic reveal: any element with data-reveal fades & rises in
    const els = gsap.utils.toArray("[data-reveal]");
    if (!reduce) {
      gsap.set(els, { y: 50, autoAlpha: 0 });
      ScrollTrigger.batch(els, {
        start: "top 90%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, { y: 0, autoAlpha: 1, duration: 1.1, ease: "expo.out", stagger: 0.09, overwrite: true }),
      });
    }

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    window.addEventListener("intro:done", () => {
      setTimeout(refresh, 200);
      setTimeout(refresh, 1400);
    });
    const t1 = setTimeout(refresh, 1200);
    const t2 = setTimeout(refresh, 2800);

    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("load", refresh);
      clearTimeout(t1);
      clearTimeout(t2);
      if (raf) gsap.ticker.remove(raf);
      lenis?.destroy();
    };
  }, []);

  return null;
}
