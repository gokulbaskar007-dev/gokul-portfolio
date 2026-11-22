import { TOOLS } from "@/data/profile";

export default function Tools() {
  return (
    <section className="section">
      <div className="wrap">
        <div className="head head--center">
          <span className="eyebrow rv">My Stack</span>
          <h2 className="h2 rv">
            Exploring the <span className="hl">tools</span>
            <br />
            behind my work
          </h2>
        </div>
        <div className="tools">
          {TOOLS.map((t) => (
            <div className="tool rv" key={t.t}>
              <div className="tool__ic">{t.ic}</div>
              <b>{t.t}</b>
              <span>{t.s}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
