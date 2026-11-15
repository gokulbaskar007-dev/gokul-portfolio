"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { journey, profile } from "@/data/profile";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Journey() {
  const scope = useRef(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const q = gsap.utils.selector(scope);
      gsap.fromTo(q(".journey__fill"), { scaleY: 0 }, {
        scaleY: 1, ease: "none",
        scrollTrigger: { trigger: q(".journey__list")[0], start: "top 70%", end: "bottom 60%", scrub: true },
      });
      gsap.fromTo(q(".journey__photo img"), { scale: 1.25 }, {
        scale: 1, ease: "none",
        scrollTrigger: { trigger: q(".journey__photo")[0], start: "top bottom", end: "bottom top", scrub: true },
      });
    },
    { scope }
  );

  return (
    <section className="section journey" id="journey" ref={scope}>
      <div className="wrap journey__grid">
        <div className="journey__left">
          <p className="kicker" data-reveal>( About me )</p>
          <h2 className="display" data-reveal>
            Curious mind.<br /><em>Builder by habit.</em>
          </h2>
          <p className="section-head__sub" data-reveal>
            I&apos;m Gokul — from Pondicherry, building in Bengaluru. I love the moment a business owner sees their
            phone ring because of something I built. That&apos;s the job.
          </p>
          <div className="journey__photo" data-reveal>
            <Image src="/gokul-portrait.webp" alt="Portrait of Gokul B" width={1000} height={1333} sizes="(max-width: 900px) 90vw, 420px" />
            <span className="journey__badge">Open to projects ✦</span>
          </div>
        </div>

        <ol className="journey__list">
          <span className="journey__line" aria-hidden="true"><span className="journey__fill" /></span>
          {journey.map((j) => (
            <li key={j.year + j.title} className="journey__item" data-reveal>
              <span className="journey__year">{j.year}</span>
              <h3>{j.title}</h3>
              <p>{j.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
