"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { hero, profile } from "@/data/profile";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const Icon = ({ name }) => {
  const p = {
    code: <path d="M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16" />,
    search: <><circle cx="11" cy="11" r="6" /><path d="M20 20l-4.5-4.5" /></>,
    app: <><rect x="3" y="4" width="18" height="16" rx="3" /><path d="M3 9h18M8 13h4M8 16h7" /></>,
    spark: <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M18 6l-2.5 2.5M8.5 15.5L6 18" />,
    atom: <><circle cx="12" cy="12" r="1.6" /><ellipse cx="12" cy="12" rx="9" ry="3.6" /><ellipse cx="12" cy="12" rx="9" ry="3.6" transform="rotate(60 12 12)" /><ellipse cx="12" cy="12" rx="9" ry="3.6" transform="rotate(120 12 12)" /></>,
    wave: <path d="M4 10v4M8 7v10M12 4v16M16 7v10M20 10v4" />,
  }[name];
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      {p}
    </svg>
  );
};

const orbitMeta = [
  { icon: "code", sub: "Hand-coded builds", pos: "o1" },
  { icon: "search", sub: "Page one, on purpose", pos: "o2" },
  { icon: "app", sub: "Full stack, MySQL", pos: "o3" },
  { icon: "spark", sub: "Named by AI answers", pos: "o4" },
  { icon: "atom", sub: "Fast interfaces", pos: "o5" },
];

export default function Hero() {
  const scope = useRef(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(scope);
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      // ---- intro timeline (waits for preloader) ----
      const tl = gsap.timeline({ paused: true, defaults: { ease: "expo.out" } });
      gsap.set(q(".h-word"), { y: 0, yPercent: 115 });
      gsap.set(q(".h-fade"), { y: 24, autoAlpha: 0 });
      gsap.set(q(".hero__photo"), { y: 120, scale: 0.92, autoAlpha: 0 });
      gsap.set(q(".orbit .glass"), { y: 0 });
      gsap.set(q(".orbit .glass"), { scale: 0.4, autoAlpha: 0, rotateY: -50 });
      gsap.set(q(".side-card"), { y: 40, autoAlpha: 0, rotate: (i) => (i ? 6 : -6) });
      gsap.set(q(".hero__lines path"), { strokeDasharray: 1400, strokeDashoffset: 1400 });

      tl.to(q(".h-word"), { yPercent: 0, duration: 1.4, stagger: 0.07 }, 0)
        .to(q(".h-fade"), { y: 0, autoAlpha: 1, duration: 1.1, stagger: 0.08 }, 0.45)
        .to(q(".hero__photo"), { y: 0, scale: 1, autoAlpha: 1, duration: 1.8 }, 0.35)
        .to(q(".orbit .glass"), { scale: 1, autoAlpha: 1, rotateY: 0, duration: 1.4, stagger: 0.09, ease: "back.out(1.6)" }, 0.9)
        .to(q(".side-card"), { y: 0, autoAlpha: 1, rotate: (i) => (i ? 3 : -3), duration: 1.3, stagger: 0.12 }, 1.0)
        .to(q(".hero__lines path"), { strokeDashoffset: 0, duration: 2, ease: "power2.inOut" }, 1.1);

      const play = () => tl.play();
      if (window.__introDone || reduce) play();
      else window.addEventListener("intro:done", play, { once: true });

      if (reduce) return;

      // ---- floating glass panels ----
      q(".orbit .glass").forEach((el, i) => {
        gsap.to(el, { y: i % 2 ? 14 : -14, duration: 2.6 + i * 0.35, yoyo: true, repeat: -1, ease: "sine.inOut", delay: 2 });
      });

      // ---- mouse parallax ----
      const movers = q("[data-depth]").map((el) => ({
        d: parseFloat(el.dataset.depth),
        x: gsap.quickTo(el, "x", { duration: 1.1, ease: "power3" }),
        y: gsap.quickTo(el, "y", { duration: 1.1, ease: "power3" }),
      }));
      const onMove = (e) => {
        const nx = e.clientX / window.innerWidth - 0.5;
        const ny = e.clientY / window.innerHeight - 0.5;
        movers.forEach((m) => { m.x(nx * m.d * 50); m.y(ny * m.d * 36); });
      };
      window.addEventListener("mousemove", onMove);

      // ---- scroll out ----
      gsap.to(q(".hero__top"), {
        y: -120, autoAlpha: 0.1, ease: "none",
        scrollTrigger: { trigger: scope.current, start: "top top", end: "bottom 30%", scrub: true },
      });
      gsap.to(q(".hero__photo-wrap"), {
        scale: 1.08, y: 60, ease: "none",
        scrollTrigger: { trigger: scope.current, start: "top top", end: "bottom top", scrub: true },
      });

      return () => window.removeEventListener("mousemove", onMove);
    },
    { scope }
  );

  const words1 = hero.line1.split(" ");
  const words2 = hero.line2.split(" ");

  return (
    <section className="hero" ref={scope} id="top">
      <div className="hero__top wrap">
        <p className="eyebrow h-fade">
          <span className="dot-live" /> {hero.eyebrow}
        </p>
        <h1 className="hero__title">
          <span className="h-line">
            {words1.map((w, i) => (
              <span className="h-mask" key={i}><span className="h-word">{w}</span></span>
            ))}
          </span>
          <span className="h-line h-line--serif">
            {words2.map((w, i) => (
              <span className="h-mask" key={i}><span className="h-word">{w}</span></span>
            ))}
          </span>
        </h1>
        <p className="hero__sub h-fade">{hero.sub}</p>
        <div className="hero__cta h-fade">
          <a href="#contact" className="btn btn--dark">
            Start a project <span aria-hidden="true">→</span>
          </a>
          <a href="#check" className="btn btn--light">
            <span className="btn__play" aria-hidden="true">●</span> Check your website
          </a>
        </div>
      </div>

      <div className="hero__stage">
        <svg className="hero__lines" viewBox="0 0 1440 700" preserveAspectRatio="none" aria-hidden="true">
          <path d="M250 120 C 240 330, 420 380, 610 400" vectorEffect="non-scaling-stroke" />
          <path d="M1190 150 C 1200 330, 1030 400, 840 420" vectorEffect="non-scaling-stroke" />
        </svg>

        <div className="side-card-wrap side-card-wrap--l" data-depth="0.5">
          <div className="side-card">
            <span className="side-card__icon"><Icon name="wave" /></span>
            <strong>Turn visitors into enquiries.</strong>
            <span>Design, build, rank — done.</span>
          </div>
        </div>

        <div className="side-card-wrap side-card-wrap--r" data-depth="0.7">
          <div className="side-card">
            <span className="avatars">
              <i>G</i><i>AI</i><i>✦</i><b>+</b>
            </span>
            <strong>Found on Google, ChatGPT &amp; Gemini.</strong>
            <span>SEO · GEO · AEO built in.</span>
          </div>
        </div>

        <div className="badge-rotate" aria-hidden="true">
          <svg viewBox="0 0 120 120">
            <defs>
              <path id="circ" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" />
            </defs>
            <text>
              <textPath href="#circ">DESIGN • CODE • RANK • GROW • </textPath>
            </text>
          </svg>
          <span>✦</span>
        </div>

        <div className="hero__photo-wrap">
          <div className="hero__photo">
            <Image
              src={profile.photo}
              alt="Gokul B — web developer and SEO specialist in Bengaluru"
              width={1000}
              height={1377}
              priority
              sizes="(max-width: 760px) 80vw, 520px"
            />
          </div>

          <div className="orbit">
            {hero.orbit.map((label, i) => (
              <div key={label} className={`orbit__item orbit__item--${orbitMeta[i].pos}`} data-depth={(0.9 + i * 0.25).toFixed(2)}>
                <div className="orbit__tilt">
                  <div className="glass">
                    <span className="glass__icon"><Icon name={orbitMeta[i].icon} /></span>
                    <span className="glass__text">
                      <b>{label}</b>
                      <small>{orbitMeta[i].sub}</small>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="hero__trust h-fade">
          <span className="rule" />
          <p>Trusted by 25+ brands<br />across India.</p>
          <span className="avatars avatars--sm">
            <i>NC</i><i>iP</i><i>LM</i><i>GC</i><b>+</b>
          </span>
        </div>

        <div className="hero__note h-fade">
          <span className="star">✦</span>
          <p><span className="rule" />Less guesswork.<br />More growth.</p>
        </div>
      </div>
    </section>
  );
}
