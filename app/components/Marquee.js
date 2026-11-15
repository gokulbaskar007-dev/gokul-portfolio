// Infinite scrolling strip (pure CSS animation)
export default function Marquee({ items, reverse = false, label, variant = "" }) {
  const row = (
    <div className="marquee__row" aria-hidden="true">
      {items.map((t, i) => (
        <span key={i} className="marquee__item">
          {t}
          <span className="marquee__sep">✦</span>
        </span>
      ))}
    </div>
  );
  return (
    <section className={`marquee ${variant}`} aria-label={label}>
      {label && <p className="marquee__label">{label}</p>}
      <div className={`marquee__track ${reverse ? "marquee__track--rev" : ""}`}>
        {row}
        {row}
        {row}
        {row}
      </div>
      <span className="sr-only">{items.join(", ")}</span>
    </section>
  );
}
