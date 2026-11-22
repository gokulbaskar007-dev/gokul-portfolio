import { FAQS } from "@/data/profile";

export default function Faq() {
  return (
    <section className="faq" id="faq">
      <div className="wrap">
        <div className="head head--center">
          <span className="eyebrow rv">FAQ</span>
          <h2 className="h2 rv">
            Questions? <span className="hl">Look here.</span>
          </h2>
        </div>
        <div className="faq__list" id="faq-list">
          {FAQS.map((f, i) => (
            <details className="fq rv" key={f.q} open={i === 1 ? true : undefined}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
