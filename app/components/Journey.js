export default function Journey() {
  return (
    <section className="section" id="journey" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="head head--center">
          <span className="eyebrow rv">Education &amp; Work</span>
          <h2 className="h2 rv">
            My Academic and<br />
            <span className="hl">Professional Journey</span>
          </h2>
        </div>
        <div className="journey">
          <div className="jcard rv">
            <div className="jcard__head">
              <i>✦</i>Work Experience
            </div>
            <div className="jitem now">
              <time>Jan 2026 — Present</time>
              <b>Head of Creative Developer</b>
              <span>Beta Digital Marketing · Bengaluru</span>
              <p>Leading Next.js &amp; 3D web experiences, web applications, SEO, GEO and AEO for agency clients.</p>
            </div>
            <div className="jitem">
              <time>May 2025 — Nov 2025</time>
              <b>WordPress Developer</b>
              <span>Pondy Web Makers · Pondicherry</span>
              <p>Custom WordPress websites, landing pages, technical SEO and analytics.</p>
            </div>
          </div>
          <div className="jcard rv">
            <div className="jcard__head">
              <i>◎</i>Education
            </div>
            <div className="jitem">
              <time>2021 — 2024</time>
              <b>Bachelor of Computer Applications (BCA)</b>
              <span>Indira Gandhi College of Arts and Science</span>
            </div>
            <div className="jitem">
              <time>2019 — 2021</time>
              <b>Diploma in Information Technology</b>
              <span>Motilal Nehru Government Polytechnic College</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
