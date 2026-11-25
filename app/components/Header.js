"use client";

import { useEffect, useRef, useState } from "react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuButton = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event) => {
      if (event.key !== "Escape" || event.defaultPrevented) return;
      setOpen(false);
      menuButton.current?.focus();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const closeMenu = () => setOpen(false);

  return (
    <header className={`header${scrolled ? " scrolled" : ""}${open ? " menu-open" : ""}`} id="header">
      <div className="wrap header__in">
        <a href="#top" className="logo" aria-label="Gokul home" onClick={closeMenu}>
          <svg width="36" height="36" viewBox="0 0 48 48" aria-hidden="true">
            <rect width="48" height="48" rx="13" fill="#111" />
            <path
              d="M33.5 17.2A11.5 11.5 0 1 0 35.5 24H24.5"
              fill="none"
              stroke="#fff"
              strokeWidth="4.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="35.6" cy="12.6" r="2.1" fill="#fff" />
          </svg>
          Gokul<sup>°</sup>
        </a>

        <nav className="nav" id="nav" aria-label="Main Navigation">
          <a href="#top" onClick={closeMenu}>Home</a>
          <a href="#services" onClick={closeMenu}>Services</a>
          <a href="#projects" onClick={closeMenu}>Projects</a>
          <a href="#journey" onClick={closeMenu}>Journey</a>
          <a href="#contact" onClick={closeMenu}>Contact</a>
        </nav>

        <a href="#contact" className="btn btn--dark">
          Let&apos;s Talk <i>→</i>
        </a>

        <button
          type="button"
          className="burger"
          id="burger"
          ref={menuButton}
          aria-label="Toggle navigation menu"
          aria-controls="nav"
          aria-expanded={open}
          onClick={() => setOpen((current) => !current)}
        >
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
