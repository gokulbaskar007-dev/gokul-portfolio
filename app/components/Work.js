"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { featuredProjects, moreProjects } from "@/data/projects";
import "./work-shots.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const domain = (u) => u.replace(/^https?:\/\//, "").replace(/\/$/, "");

/* ---------- image with graceful fallback ---------- */
// natural = keep the screenshot's own shape (no cropping) — used for desktop screens
function Shot({ src, alt, sizes, fallback, natural = false }) {
  const [failed, setFailed] = useState(!src);
  if (failed) return natural ? <div className="skel-box">{fallback}</div> : fallback;
  if (natural)
    return (
      <Image src={src} alt={alt} width={0} height={0} sizes={sizes} className="shot-natural" onError={() => setFailed(true)} />
    );
  return <Image src={src} alt={alt} fill sizes={sizes} className="shot-img" onError={() => setFailed(true)} />;
}

function DesktopSkeleton({ app }) {
  return app ? (
    <div className="skel skel--app"><aside /><div><i /><i /><i /><i /><i /><i /></div></div>
  ) : (
    <div className="skel skel--site"><b /><span className="l1" /><span className="l2" /><span className="l3" /><div><i /><i /><i /></div></div>
  );
}
function PhoneSkeleton() {
  return <div className="skel skel--phone"><b /><span /><span /><i /><span /><span /></div>;
}

/* ---------- device frames ---------- */
function Laptop({ src, alt, app }) {
  return (
    <div className="laptop">
      <div className="laptop__screen">
        <span className="laptop__cam" />
        <div className="laptop__view">
          <Shot natural src={src} alt={alt} sizes="(max-width: 760px) 80vw, 560px" fallback={<DesktopSkeleton app={app} />} />
        </div>
      </div>
      <div className="laptop__base" />
    </div>
  );
}

function Phone({ src, alt, className = "" }) {
  return (
    <div className={`phone ${className}`}>
      <span className="phone__island" />
      <div className="phone__view">
        <Shot src={src} alt={alt} sizes="200px" fallback={<PhoneSkeleton />} />
      </div>
    </div>
  );
}

function Browser({ src, alt, url, app }) {
  return (
    <div className="browser">
      <div className="browser__bar">
        <span /><span /><span />
        <em>{url}</em>
      </div>
      <div className="browser__view">
        <Shot natural src={src} alt={alt} sizes="(max-width: 760px) 90vw, 620px" fallback={<DesktopSkeleton app={app} />} />
      </div>
    </div>
  );
}

function Slide({ s, p }) {
  const alt = `${p.name} — ${domain(p.url)}`;
  if (s.type === "browser")
    return (
      <div className="slide slide--browser">
        <Browser src={s.src} alt={`${alt} full screen`} url={domain(p.url)} app={p.mock === "app"} />
      </div>
    );
  if (s.type === "phones")
    return (
      <div className="slide slide--phones">
        {s.srcs.map((src, k) => (
          <Phone key={src + k} src={src} alt={`${alt} mobile screen ${k + 1}`} className={k === 1 ? "phone--mid" : ""} />
        ))}
      </div>
    );
  if (s.type === "combo")
    return (
      <div className="slide slide--combo">
        <Laptop src={s.desktop} alt={`${alt} desktop`} app={p.mock === "app"} />
        <Phone src={s.mobile} alt={`${alt} mobile`} className="phone--float" />
      </div>
    );
  return (
    <div className="slide slide--laptop">
      <Laptop src={s.src} alt={`${alt} screen`} app={p.mock === "app"} />
    </div>
  );
}

/* ---------- gallery (arrows, dots, swipe, autoplay on hover) ---------- */
function Gallery({ p }) {
  const n = p.slides.length;
  const [i, setI] = useState(0);
  const timer = useRef(null);
  const startX = useRef(null);
  const go = (d) => setI((v) => (v + d + n) % n);

  const play = () => {
    if (n < 2) return;
    clearInterval(timer.current);
    timer.current = setInterval(() => setI((v) => (v + 1) % n), 2600);
  };
  const stop = () => clearInterval(timer.current);
  useEffect(() => () => clearInterval(timer.current), []);

  return (
    <div
      className="gal"
      onMouseEnter={play}
      onMouseLeave={stop}
      onPointerDown={(e) => (startX.current = e.clientX)}
      onPointerUp={(e) => {
        if (startX.current === null) return;
        const dx = e.clientX - startX.current;
        if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
        startX.current = null;
      }}
    >
      <div className="gal__track" style={{ transform: `translateX(-${i * 100}%)` }}>
        {p.slides.map((s, k) => (
          <div className="gal__item" key={k} aria-hidden={k !== i}>
            <Slide s={s} p={p} />
          </div>
        ))}
      </div>

      {n > 1 && (
        <>
          <span className="gal__count">{i + 1} / {n}</span>
          <button className="gal__arrow gal__arrow--prev" aria-label="Previous screenshot" onClick={() => go(-1)}>←</button>
          <button className="gal__arrow gal__arrow--next" aria-label="Next screenshot" onClick={() => go(1)}>→</button>
          <div className="gal__dots">
            {p.slides.map((_, k) => (
              <button key={k} className={k === i ? "is-on" : ""} aria-label={`Screenshot ${k + 1}`} onClick={() => setI(k)} />
            ))}
          </div>
        </>
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
      gsap.fromTo(q(".work-title__a"), { xPercent: -16 }, {
        xPercent: 0, ease: "none",
        scrollTrigger: { trigger: q(".work-title")[0], start: "top bottom", end: "top 30%", scrub: true },
      });
      gsap.fromTo(q(".work-title__b"), { xPercent: 16 }, {
        xPercent: 0, ease: "none",
        scrollTrigger: { trigger: q(".work-title")[0], start: "top bottom", end: "top 30%", scrub: true },
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
        <div className="pgrid">
          {featuredProjects.map((p) => (
            <article key={p.url} className={`pcard ${p.featured ? "pcard--featured" : ""}`} data-reveal>
              <Gallery p={p} />
              <div className="pcard__body">
                <div className="pcard__head">
                  <h3>{p.name}</h3>
                  <span className="pcard__badge">{p.badge}</span>
                </div>
                <p className="pcard__story">{p.story}</p>
                <div className="pcard__foot">
                  <div className="pills">
                    {p.stack.map((t) => <span key={t}>{t}</span>)}
                  </div>
                  <a href={p.url} target="_blank" rel="noopener noreferrer" className="pcard__link" data-cursor="Visit">
                    {domain(p.url)} <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="wp-list">
          <div className="wp-list__head" data-reveal>
            <p className="kicker">( More launches )</p>
            <p>Part of 25+ WordPress sites I&apos;ve designed and shipped.</p>
          </div>
          {moreProjects.map((p, i) => (
            <a key={p.url} href={p.url} target="_blank" rel="noopener noreferrer" className="wp-row" data-reveal data-cursor="Open">
              <span className="wp-row__n">{String(i + 1 + featuredProjects.length).padStart(2, "0")}</span>
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
