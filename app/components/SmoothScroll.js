"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroll() {
  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let lenis;
    let observer;
    let pending = [];

    const stopMotion = () => {
      lenis?.destroy();
      lenis = undefined;
      observer?.disconnect();
      observer = undefined;
      pending.forEach((element) => {
        element.classList.remove("rv--pending");
        element.style.removeProperty("transition-delay");
      });
      pending = [];
    };

    const syncMotion = () => {
      stopMotion();
      if (motion.matches) return;

      lenis = new Lenis({ duration: 1.15, autoRaf: true });
      if (!("IntersectionObserver" in window)) return;

      const viewportHeight = window.innerHeight;
      pending = [...document.querySelectorAll(".rv")].filter(
        (element) => element.getBoundingClientRect().top >= viewportHeight
      );
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(({ isIntersecting, target }) => {
            if (!isIntersecting) return;
            target.classList.remove("rv--pending");
            observer?.unobserve(target);
          });
        },
        { threshold: 0.12 }
      );
      pending.forEach((element, index) => {
        element.style.transitionDelay = `${(index % 4) * 70}ms`;
        element.classList.add("rv--pending");
        observer.observe(element);
      });
    };

    syncMotion();
    motion.addEventListener("change", syncMotion);
    return () => {
      motion.removeEventListener("change", syncMotion);
      stopMotion();
    };
  }, []);

  return null;
}
