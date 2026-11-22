export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer__top">
          <h2>
            Let&apos;s <span className="hl">Connect</span> there
          </h2>
          <a href="#contact" className="btn btn--dark">
            Hire Me Now <i>→</i>
          </a>
        </div>
        <div className="footer__cols">
          <div>
            <a href="#top" className="logo">
              <svg width="32" height="32" viewBox="0 0 48 48" aria-hidden="true">
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
            <p>
              Head of Creative Developer — Next.js &amp; 3D Web Experiences. Building websites people trust and find.
            </p>
            <div className="socials">
              <a
                href="https://www.linkedin.com/in/gokul-b-062165229"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                in
              </a>
              <a
                href="https://github.com/gokulbaskar007-dev"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                GH
              </a>
              <a
                href="https://wa.me/919342687447"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
              >
                WA
              </a>
              <a href="mailto:gokulbaskar007@gmail.com" aria-label="Email">
                @
              </a>
            </div>
          </div>
          <div>
            <h4>Navigation</h4>
            <ul>
              <li><a href="#services">Services</a></li>
              <li><a href="#projects">Projects</a></li>
              <li><a href="#journey">Journey</a></li>
              <li><a href="#check">Website Check</a></li>
            </ul>
          </div>
          <div>
            <h4>Contact</h4>
            <ul>
              <li>+91 93426 87447</li>
              <li>gokulbaskar007@gmail.com</li>
              <li>Bengaluru, India</li>
            </ul>
          </div>
          <div>
            <h4>Currently</h4>
            <ul>
              <li>Head of Creative Developer</li>
              <li>
                <a href="https://betadigitalmarketing.in/" target="_blank" rel="noopener noreferrer">
                  Beta Digital Marketing ↗
                </a>
              </li>
              <li>Open to freelance projects</li>
            </ul>
          </div>
        </div>
        <div className="footer__bottom">
          <span>© 2026 Gokul B. Designed &amp; coded in Next.js.</span>
          <a href="#top">Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}
