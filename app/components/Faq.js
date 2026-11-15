"use client";

import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { faqs } from "@/data/profile";

export default function Faq() {
  const scope = useRef(null);

  useEffect(() => {
    const el = scope.current;
    if (!el) return;
    const onToggle = () => ScrollTrigger.refresh();
    const items = el.querySelectorAll("details");
    items.forEach((item) => item.addEventListener("toggle", onToggle));
    return () => items.forEach((item) => item.removeEventListener("toggle", onToggle));
  }, []);

  return (
    <section className="section faq" id="faq" ref={scope}>
      <div className="wrap faq__grid">
        <div>
          <p className="kicker" data-reveal>( Quick answers )</p>
          <h2 className="display" data-reveal>Questions,<br /><em>answered.</em></h2>
        </div>
        <div className="faq__list">
          {faqs.map((f) => (
            <details key={f.q} className="faq__item" data-reveal>
              <summary>
                {f.q}
                <span className="faq__plus" aria-hidden="true" />
              </summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
