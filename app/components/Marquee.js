import { MARQUEE } from "@/data/profile";

export default function Marquee({ flat = false }) {
  const items = [...MARQUEE, ...MARQUEE, ...MARQUEE, ...MARQUEE];
  return (
    <div className={`band ${flat ? "band--flat" : ""}`} aria-hidden="true">
      <div className="band__track">
        {items.map((text, i) => (
          <span key={i}>{text}</span>
        ))}
      </div>
    </div>
  );
}
