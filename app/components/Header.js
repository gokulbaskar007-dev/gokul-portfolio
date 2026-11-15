"use client";

import { useEffect, useRef, useState } from "react";
import Logo from "./Logo";

const links = [
  { href: "#work", label: "Work" },
  { href: "#services", label: "Services" },
  { href: "#check", label: "Website Check" },
  { href: "#journey", label: "About" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const last = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 30);
      setHidden(y > 400 && y > last.current && !open);
      last.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      window.__lenis?.stop();
    } else {
      document.body.style.overflow = "";
      window.__lenis?.start();
    }
    return () => {
      document.body.style.overflow = "";
      window.__lenis?.start();
    };
  }, [open]);

  return (
    <header className={`header ${scrolled ? "is-scrolled" : ""} ${hidden ? "is-hidden" : ""} ${open ? "is-open" : ""}`}>
      <div className="wrap header__inner">
        <a href="#top" aria-label="Gokul — home">
          <Logo />
        </a>

        <nav className="nav-pill" aria-label="Main">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
        </nav>

        <a href="#contact" className="btn btn--dark btn--sm header__cta">
          Let&apos;s talk <span aria-hidden="true">↗</span>
        </a>

        <button className="burger" aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)}>
          <span />
          <span />
        </button>
      </div>

      <div className="mobile-menu">
        {[...links, { href: "#contact", label: "Contact" }].map((l, i) => (
          <a key={l.href} href={l.href} onClick={() => setOpen(false)} style={{ transitionDelay: `${open ? 80 + i * 50 : 0}ms` }}>
            {l.label}
          </a>
        ))}
      </div>
    </header>
  );
}
