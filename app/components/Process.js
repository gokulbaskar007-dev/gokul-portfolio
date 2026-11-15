"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { process } from "@/data/profile";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Process() {
  const scope = useRef(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const mm = gsap.matchMedia();
      mm.add("(min-width: 981px)", () => {
        const steps = gsap.utils.toArray(".step", scope.current);
        steps.forEach((s, i) => {
          if (i === steps.length - 1) return;
          gsap.to(s.querySelector(".step__inner"), {
            scale: 0.94, ease: "none",
            scrollTrigger: { trigger: steps[i + 1], start: "top bottom", end: "top 30%", scrub: true },
          });
        });
      });
    },
    { scope }
  );

  return (
    <section className="section process" ref={scope}>
      <div className="wrap process__grid">
        <div className="process__aside">
          <p className="kicker" data-reveal>( How we work )</p>
          <h2 className="display" data-reveal>
            Simple process.<br /><em>Serious results.</em>
          </h2>
          <p className="section-head__sub" data-reveal>
            Four steps, zero confusion. You always know what&apos;s happening and why.
          </p>
        </div>
        <div className="process__steps">
          {process.map((p, i) => (
            <div className="step" key={p.step} style={{ top: `${110 + i * 18}px` }}>
              <div className={`step__inner ${i === process.length - 1 ? "step__inner--dark" : ""}`}>
                <span className="step__n">{p.step}</span>
                <div>
                  <h3>{p.title}</h3>
                  <p>{p.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
