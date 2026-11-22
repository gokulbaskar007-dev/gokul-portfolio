"use client";

import { useEffect, useRef } from "react";

export default function Hero() {
  const statsRef = useRef(null);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const counters = el.querySelectorAll("[data-count]");
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        counters.forEach((c) => {
          const end = +c.dataset.count;
          let t0 = null;
          const step = (t) => {
            t0 ??= t;
            const p = Math.min((t - t0) / 1400, 1);
            c.textContent = Math.round(end * (1 - Math.pow(1 - p, 3)));
            if (p < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        });
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="hero">
      <div className="wrap hero__grid">
        <div>
          <span className="hello rv">✦ <b>Hello there!</b> Welcome to my space</span>
          <h1 className="rv">
            I&apos;m <span className="hl">Gokul B</span>,<br />
            Creative Developer <span className="muted">based in Bengaluru.</span>
          </h1>
          <p className="hero__role rv">
            Head of Creative Developer <span>— Next.js &amp; 3D Web Experiences · Beta Digital Marketing</span>
          </p>
          <p className="lead rv">
            I design and build fast Next.js websites, immersive 3D web experiences and full stack web apps — then make them rank on Google and show up in AI search.
          </p>

          <div className="hero__cta rv">
            <a href="#projects" className="btn btn--dark">
              View My Work <i>→</i>
            </a>
            <a href="#contact" className="btn btn--light">
              Hire Me <i>→</i>
            </a>
          </div>

          <div className="hero__stats rv" ref={statsRef}>
            <div>
              <b data-count="25">25</b>
              <span>+ websites shipped</span>
            </div>
            <div>
              <b data-count="10">10</b>
              <span>live projects below</span>
            </div>
            <div>
              <b data-count="44">44</b>
              <span>% traffic growth (SEO)</span>
            </div>
          </div>
        </div>

        <div className="hero__visual rv">
          <div className="circle" aria-hidden="true" />
          <img
            className="hero__photo"
            src="/gokul.webp"
            alt="Gokul B — Creative Developer, Bengaluru"
            width={400}
            height={551}
          />
          <div className="chip chip--1">
            <i>N</i>
            <div>
              Next.js Developer
              <small>React · SQL · APIs</small>
            </div>
          </div>
          <div className="chip chip--2">
            <i>3D</i>
            <div>
              3D Web Design
              <small>Immersive scroll sites</small>
            </div>
          </div>
          <div className="chip chip--3">
            <i>↗</i>
            <div>
              SEO · GEO · AEO
              <small>Found on Google &amp; AI</small>
            </div>
          </div>
          <div className="ring" aria-hidden="true">
            <svg viewBox="0 0 104 104">
              <defs>
                <path id="c" d="M52,52 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
              </defs>
              <text>
                <textPath href="#c">OPEN TO PROJECTS • HIRE ME • </textPath>
              </text>
            </svg>
            <b>✦</b>
          </div>
        </div>
      </div>
    </section>
  );
}
