"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { LogoMark } from "./Logo";

// Short intro: G draws in, counter runs 0 → 100, curtain lifts.
export default function Preloader() {
  const ref = useRef(null);
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const finish = () => {
      window.__introDone = true;
      window.dispatchEvent(new Event("intro:done"));
    };

    let seen = false;
    try {
      seen = sessionStorage.getItem("gk-intro") === "1";
      sessionStorage.setItem("gk-intro", "1");
    } catch {}
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (seen || reduce) {
      setDone(true);
      finish();
      return;
    }

    const obj = { v: 0 };
    const tl = gsap.timeline({
      onComplete: () => {
        setDone(true);
      },
    });
    tl.fromTo(
      ref.current.querySelector(".logo-mark__g"),
      { strokeDasharray: 80, strokeDashoffset: 80 },
      { strokeDashoffset: 0, duration: 1.1, ease: "power2.inOut" },
      0
    )
      .to(obj, { v: 100, duration: 1.5, ease: "power2.inOut", onUpdate: () => setCount(Math.round(obj.v)) }, 0)
      .to(ref.current.querySelector(".preloader__inner"), { y: -30, autoAlpha: 0, duration: 0.45, ease: "power2.in" }, 1.6)
      .add(finish, 1.75)
      .to(ref.current, { yPercent: -100, duration: 1, ease: "expo.inOut" }, 1.75);

    return () => tl.kill();
  }, []);

  if (done) return null;

  return (
    <div className="preloader" ref={ref} aria-hidden="true">
      <div className="preloader__inner">
        <LogoMark size={64} invert />
        <span className="preloader__count">{String(count).padStart(3, "0")}</span>
      </div>
      <p className="preloader__tag">Design · Code · Rank</p>
    </div>
  );
}
