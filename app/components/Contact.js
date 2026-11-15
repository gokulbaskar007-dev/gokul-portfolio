"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Logo from "./Logo";
import { profile } from "@/data/profile";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Contact() {
  const scope = useRef(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const q = gsap.utils.selector(scope);
      gsap.fromTo(q(".giant span"), { yPercent: 100 }, {
        yPercent: 0, stagger: 0.06, ease: "none",
        scrollTrigger: { trigger: q(".giant")[0], start: "top bottom", end: "bottom bottom", scrub: true },
      });

      // Magnetic buttons
      if (!window.matchMedia("(hover: hover)").matches) return;
      const cleanups = q(".magnetic").map((el) => {
        const x = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3" });
        const y = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3" });
        const move = (e) => {
          const r = el.getBoundingClientRect();
          x((e.clientX - r.left - r.width / 2) * 0.3);
          y((e.clientY - r.top - r.height / 2) * 0.3);
        };
        const leave = () => { x(0); y(0); };
        el.addEventListener("mousemove", move);
        el.addEventListener("mouseleave", leave);
        return () => { el.removeEventListener("mousemove", move); el.removeEventListener("mouseleave", leave); };
      });
      return () => cleanups.forEach((c) => c());
    },
    { scope }
  );

  const year = new Date().getFullYear();

  return (
    <footer className="contact" id="contact" ref={scope}>
      <div className="wrap">
        <p className="kicker kicker--light" data-reveal>( Let&apos;s work together )</p>
        <h2 className="contact__title" data-reveal>
          Have an idea?<br /><em>Let&apos;s build it.</em>
        </h2>
        <p className="contact__sub" data-reveal>
          A new website, a web app, or more people finding you on Google and AI — tell me what you need. I reply within a day.
        </p>

        <div className="contact__actions" data-reveal>
          <a className="btn btn--white magnetic" href={`https://wa.me/${profile.whatsapp}?text=${encodeURIComponent("Hi Gokul, I saw your portfolio and want to talk about a project.")}`} target="_blank" rel="noopener noreferrer">
            WhatsApp me <span aria-hidden="true">↗</span>
          </a>
          <a className="btn btn--outline-light magnetic" href={`mailto:${profile.email}?subject=${encodeURIComponent("Project enquiry")}`}>
            Email me
          </a>
          <a className="btn btn--outline-light magnetic" href={profile.resume} download>
            Résumé
          </a>
        </div>

        <div className="contact__grid" data-reveal>
          <div>
            <span>Email</span>
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
          </div>
          <div>
            <span>Phone</span>
            <a href={`tel:${profile.phone.replace(/\s/g, "")}`}>{profile.phone}</a>
          </div>
          <div>
            <span>LinkedIn</span>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">gokul-b ↗</a>
          </div>
          <div>
            <span>Based in</span>
            <p>{profile.location}</p>
          </div>
        </div>
      </div>

      <div className="giant" aria-hidden="true">
        {"GOKUL".split("").map((c, i) => <span key={i}>{c}</span>)}
      </div>

      <div className="wrap footer-bar">
        <Logo invert />
        <p>© {year} Gokul B. Designed &amp; coded in Next.js.</p>
        <a href="#top">Back to top ↑</a>
      </div>
    </footer>
  );
}
