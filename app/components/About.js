import { getImageProps } from "next/image";
import { profile } from "@/data/profile";

export default function About() {
  const { props: portrait } = getImageProps({
    src: profile.portrait,
    alt: "Portrait of Gokul B",
    width: 1000,
    height: 1333,
    sizes: "(max-width: 496px) calc(84.6vw - 20px), 400px",
  });

  return (
    <section className="about" id="about">
      <div className="wrap about__grid">
        <div className="about__photo rv">
          <div className="pc">
            <img {...portrait} />
          </div>
          <span className="tag t1">Next.js</span>
          <span className="tag t2">3D Web</span>
          <span className="tag t3">SEO · GEO · AEO</span>
        </div>
        <div>
          <span className="eyebrow rv">About me</span>
          <h2 className="h2 rv">
            Who is <span className="hl">Gokul B?</span>
          </h2>
          <p className="txt rv">
            I&apos;m the Head of Creative Developer at Beta Digital Marketing, Bengaluru. I lead how our websites look, move and perform — building in Next.js, React and SQL, crafting 3D scroll experiences, and shipping web apps our team uses every day.
          </p>
          <p className="txt rv">
            I started with WordPress, delivered 25+ business websites, and now build modern, hand-coded products. Every build ships with SEO, GEO and AEO baked in — because a beautiful site nobody finds is just a poster.
          </p>
          <div className="about__stats rv">
            <div>
              <b>25+</b>
              <span>Websites delivered</span>
            </div>
            <div>
              <b>8</b>
              <span>Featured live projects</span>
            </div>
            <div>
              <b>5</b>
              <span>Skills under one roof</span>
            </div>
          </div>
          <div className="about__cta rv">
            <a href={profile.resume} download className="btn btn--ghost-w">
              Download CV <i>↓</i>
            </a>
            <span className="sign">Gokul</span>
          </div>
        </div>
      </div>
    </section>
  );
}
