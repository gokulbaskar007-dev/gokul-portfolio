"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { featuredProjects, wordpressProjects } from "@/data/profile";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const domain = (u) => u.replace(/^https?:\/\//, "").replace(/\/$/, "");

function Mock({ type, url }) {
  return (
    <div className="mock">
      <div className="mock__bar">
        <span /><span /><span />
        <em>{domain(url)}</em>
      </div>
      {type === "site" && (
        <div className="mock__site">
          <div className="mock__nav"><b /><i /><i /><i /><u /></div>
          <div className="mock__hero">
            <span className="l1" /><span className="l2" /><span className="l3" />
            <div className="mock__btns"><u /><s /></div>
          </div>
          <div className="mock__tiles"><i /><i /><i /></div>
        </div>
      )}
      {type === "app" && (
        <div className="mock__app">
          <aside><b /><i /><i /><i /><i /></aside>
          <div className="mock__board">
            {["To do", "In progress", "Done"].map((c, ci) => (
              <div className="mock__col" key={c}>
                <p>{c}</p>
                {Array.from({ length: 3 - (ci === 2 ? 1 : 0) }).map((_, k) => (
                  <div className={`mock__task ${ci === 2 ? "is-done" : ""}`} key={k}>
                    <span /><span style={{ width: `${50 + ((k * 17 + ci * 11) % 40)}%` }} />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
      {type === "grid" && (
        <div className="mock__grid">
          {wordpressProjects.map((p) => (
            <div key={p.name}><span>{p.category}</span><b>{p.name}</b></div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Work() {
  const scope = useRef(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(scope);
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      // Giant "Selected Work" slides in from both sides
      gsap.fromTo(q(".work-title__a"), { xPercent: -16 }, {
        xPercent: 0, ease: "none",
        scrollTrigger: { trigger: q(".work-title")[0], start: "top bottom", end: "top 30%", scrub: true },
      });
      gsap.fromTo(q(".work-title__b"), { xPercent: 16 }, {
        xPercent: 0, ease: "none",
        scrollTrigger: { trigger: q(".work-title")[0], start: "top bottom", end: "top 30%", scrub: true },
      });

      // Stacked cards: each card shrinks & dims as the next one covers it
      // (desktop only — on phones the cards are taller than the screen)
      const mm = gsap.matchMedia();
      mm.add("(min-width: 981px)", () => {
        const cards = q(".work-card");
        cards.forEach((card, i) => {
          if (i === cards.length - 1) return;
          gsap.to(card.querySelector(".work-card__inner"), {
            scale: 0.9, opacity: 0.35, ease: "none",
            scrollTrigger: { trigger: cards[i + 1], start: "top bottom", end: "top 15%", scrub: true },
          });
        });
      });

      // Mock screens float in with a slight tilt
      q(".mock").forEach((m) => {
        gsap.fromTo(m, { rotateX: 18, y: 60 }, {
          rotateX: 0, y: 0, ease: "none",
          scrollTrigger: { trigger: m, start: "top bottom", end: "top 40%", scrub: true },
        });
      });
    },
    { scope }
  );

  return (
    <section className="section work" id="work" ref={scope}>
      <h2 className="work-title" aria-label="Selected Work">
        <span className="work-title__a">Selected</span>
        <span className="work-title__b"><em>Work</em></span>
      </h2>

      <div className="wrap">
        <div className="work-stack">
          {featuredProjects.map((p, i) => (
            <article className="work-card" key={p.index} style={{ top: `${90 + i * 22}px` }}>
              <div className="work-card__inner">
                <div className="work-card__info">
                  <span className="work-card__index">{p.index}</span>
                  <p className="work-card__kind">{p.kind}</p>
                  <h3>{p.name}</h3>
                  <p className="work-card__story">{p.story}</p>
                  <div className="pills pills--dark">
                    {p.stack.map((t) => <span key={t}>{t}</span>)}
                  </div>
                  <a href={p.url} target="_blank" rel="noopener noreferrer" className="btn btn--dark btn--sm" data-cursor="Visit">
                    View live <span aria-hidden="true">↗</span>
                  </a>
                </div>
                <div className="work-card__visual">
                  <Mock type={p.mock} url={p.url} />
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="wp-list">
          <div className="wp-list__head" data-reveal>
            <p className="kicker">( More launches )</p>
            <p>A few of the 25+ WordPress sites I&apos;ve shipped.</p>
          </div>
          {wordpressProjects.map((p, i) => (
            <a key={p.url} href={p.url} target="_blank" rel="noopener noreferrer" className="wp-row" data-reveal data-cursor="Open">
              <span className="wp-row__n">{String(i + 1).padStart(2, "0")}</span>
              <span className="wp-row__name">{p.name}</span>
              <span className="wp-row__cat">{p.category}</span>
              <span className="wp-row__arrow" aria-hidden="true">↗</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
