"use client";

import { useEffect, useRef } from "react";

export default function HeroStats() {
  const statsRef = useRef(null);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motion.matches || !("IntersectionObserver" in window)) return;

    const stats = statsRef.current;
    const counters = [...stats.querySelectorAll("[data-count]")].map((element) => ({
      element,
      end: Number(element.dataset.count),
    }));

    let frame;
    let start;
    const tick = (time) => {
      start ??= time;
      const progress = motion.matches ? 1 : Math.min((time - start) / 1400, 1);
      const eased = 1 - (1 - progress) ** 3;
      counters.forEach(({ element, end }) => {
        element.textContent = Math.round(end * eased);
      });
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      if (!motion.matches) frame = requestAnimationFrame(tick);
    }, { threshold: 0.2 });

    observer.observe(stats);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="hero__stats rv" ref={statsRef}>
      <div>
        <b data-count="25">25</b>
        <span>+ websites shipped</span>
      </div>
      <div>
        <b data-count="8">8</b>
        <span>live projects below</span>
      </div>
      <div>
        <b data-count="44">44</b>
        <span>% traffic growth (SEO)</span>
      </div>
    </div>
  );
}
