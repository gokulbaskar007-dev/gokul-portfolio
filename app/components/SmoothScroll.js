"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroll() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let lenis = null;
    let raf = null;
    if (!reduce) {
      lenis = new Lenis({ duration: 1.15, smoothWheel: true, wheelMultiplier: 1 });
      raf = (t) => {
        lenis.raf(t);
        requestAnimationFrame(raf);
      };
      requestAnimationFrame(raf);
      window.__lenis = lenis;
    }

    // Anchor links
    const onClick = (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute("href");
      const isTop = id === "#" || id === "#top";
      const el = isTop ? document.body : document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      if (lenis) lenis.scrollTo(isTop ? 0 : el, { offset: isTop ? 0 : -80, duration: 1.2 });
      else el.scrollIntoView({ behavior: "smooth" });
    };
    document.addEventListener("click", onClick);

    // Scroll reveal
    const rvEls = document.querySelectorAll(".rv");
    if (reduce) {
      rvEls.forEach((el) => el.classList.add("in"));
    } else {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("in");
              io.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12 }
      );
      rvEls.forEach((el, i) => {
        el.style.transitionDelay = `${(i % 4) * 70}ms`;
        io.observe(el);
      });

      return () => {
        document.removeEventListener("click", onClick);
        io.disconnect();
        lenis?.destroy();
      };
    }

    return () => {
      document.removeEventListener("click", onClick);
      lenis?.destroy();
    };
  }, []);

  return null;
}
