"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { statement, stats } from "@/data/profile";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Words fill from grey to black as you scroll + count-up numbers
export default function Statement() {
  const scope = useRef(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(scope);
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.fromTo(
        q(".st-word"),
        { opacity: 0.12 },
        {
          opacity: 1,
          stagger: 0.05,
          ease: "none",
          scrollTrigger: { trigger: q(".statement__text")[0], start: "top 80%", end: "bottom 45%", scrub: true },
        }
      );

      q(".stat__num").forEach((el) => {
        const end = parseFloat(el.dataset.value);
        const obj = { v: 0 };
        el.textContent = "0";
        gsap.to(obj, {
          v: end,
          duration: 2,
          ease: "power3.out",
          onUpdate: () => (el.textContent = Math.round(obj.v)),
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });
    },
    { scope }
  );

  const highlight = new Set(["fast,", "clear,", "found", "business."]);

  return (
    <section className="statement" ref={scope} id="about">
      <div className="wrap">
        <p className="kicker" data-reveal>( The short version )</p>
        <p className="statement__text">
          {statement.split(" ").map((w, i) => (
            <span key={i} className={`st-word ${highlight.has(w) ? "st-word--em" : ""}`}>
              {w}{" "}
            </span>
          ))}
        </p>

        <div className="stats">
          {stats.map((s) => (
            <div className="stat" key={s.label} data-reveal>
              <p className="stat__value">
                <span className="stat__num" data-value={s.value}>{s.value}</span>
                <span className="stat__suffix">{s.suffix}</span>
              </p>
              <p className="stat__label">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
