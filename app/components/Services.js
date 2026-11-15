"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { services } from "@/data/profile";

gsap.registerPlugin(useGSAP);

// Bento grid. Cards tilt slightly toward the mouse.
export default function Services() {
  const scope = useRef(null);
  const [main, ...rest] = services;

  useGSAP(
    () => {
      if (!window.matchMedia("(hover: hover)").matches) return;
      const cards = gsap.utils.toArray(".bento__card", scope.current);
      const cleanups = cards.map((card) => {
        const rx = gsap.quickTo(card, "rotationX", { duration: 0.6, ease: "power3" });
        const ry = gsap.quickTo(card, "rotationY", { duration: 0.6, ease: "power3" });
        const move = (e) => {
          const r = card.getBoundingClientRect();
          ry(((e.clientX - r.left) / r.width - 0.5) * 8);
          rx(-((e.clientY - r.top) / r.height - 0.5) * 8);
        };
        const leave = () => { rx(0); ry(0); };
        card.addEventListener("mousemove", move);
        card.addEventListener("mouseleave", leave);
        return () => { card.removeEventListener("mousemove", move); card.removeEventListener("mouseleave", leave); };
      });
      return () => cleanups.forEach((c) => c());
    },
    { scope }
  );

  return (
    <section className="section services" id="services" ref={scope}>
      <div className="wrap">
        <div className="section-head">
          <p className="kicker" data-reveal>( What I do )</p>
          <h2 className="display" data-reveal>
            One person.<br /><em>The whole job.</em>
          </h2>
          <p className="section-head__sub" data-reveal>
            No hand-offs between a designer, a developer and an SEO agency. I build it, launch it and grow it.
          </p>
        </div>

        <div className="bento">
          <article className="bento__card bento__card--main" data-reveal>
            <div className="bento__visual" aria-hidden="true">
              <div className="code-lines">
                <span style={{ width: "62%" }} /><span style={{ width: "40%" }} /><span style={{ width: "78%" }} />
                <span style={{ width: "52%" }} /><span style={{ width: "68%" }} /><span style={{ width: "34%" }} />
              </div>
              <div className="bento__cursor">▍</div>
            </div>
            <div>
              <h3>{main.title}</h3>
              <p>{main.text}</p>
              <div className="pills">
                {main.tags.map((t) => <span key={t}>{t}</span>)}
              </div>
            </div>
          </article>

          {rest.map((s, i) => (
            <article key={s.key} className={`bento__card bento__card--${s.key}`} data-reveal>
              <span className="bento__num">0{i + 2}</span>
              <div className={`bento__art bento__art--${s.key}`} aria-hidden="true">
                {s.key === "seo" && (<><b>1</b><i /><i /><i /></>)}
                {s.key === "ai" && (<><span className="bubble">Best web developer in Bengaluru?</span><span className="bubble bubble--me">Gokul B ✦</span></>)}
                {s.key === "social" && (<><i /><i /><i /><i /></>)}
                {s.key === "data" && (<><i style={{ height: "30%" }} /><i style={{ height: "48%" }} /><i style={{ height: "42%" }} /><i style={{ height: "66%" }} /><i style={{ height: "90%" }} /></>)}
              </div>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
