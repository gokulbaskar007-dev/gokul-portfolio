import { getImageProps } from "next/image";
import { profile } from "@/data/profile";
import HeroStats from "./HeroStats";

export default function Hero() {
  const { props: photo } = getImageProps({
    className: "hero__photo",
    src: profile.photo,
    alt: "Gokul B — Creative Developer, Bengaluru",
    width: 1000,
    height: 1377,
    sizes: "(max-width: 555px) 72vw, 400px",
    loading: "eager",
    fetchPriority: "high",
  });

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

          <HeroStats />
        </div>

        <div className="hero__visual rv">
          <div className="circle" aria-hidden="true" />
          <img {...photo} />
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
