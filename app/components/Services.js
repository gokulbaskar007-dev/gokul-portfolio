import { SERVICES } from "@/data/profile";

export default function Services() {
  return (
    <section className="section" id="services">
      <div className="wrap">
        <div className="head">
          <div>
            <span className="eyebrow rv">Services</span>
            <h2 className="h2 rv">
              <span className="hl">Services</span> I Provide
            </h2>
          </div>
          <p className="sub rv">
            From the first line of code to the first page of Google — one person, the whole job.
          </p>
        </div>
        <div className="services">
          {SERVICES.map((s) => (
            <article className="svc rv" key={s.t}>
              <div className="svc__ic">{s.ic}</div>
              <h3>{s.t}</h3>
              <p>{s.d}</p>
              <a href="#contact">Discuss a project →</a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
