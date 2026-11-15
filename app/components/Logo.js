// "G" monogram — geometric G inside a black rounded square
export function LogoMark({ size = 38, invert = false }) {
  const bg = invert ? "#fff" : "#0a0a0a";
  const fg = invert ? "#0a0a0a" : "#fff";
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true" className="logo-mark">
      <rect width="48" height="48" rx="13" fill={bg} />
      <path
        className="logo-mark__g"
        d="M33.5 17.2A11.5 11.5 0 1 0 35.5 24H24.5"
        fill="none"
        stroke={fg}
        strokeWidth="4.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="35.6" cy="12.6" r="2.1" fill={fg} />
    </svg>
  );
}

export default function Logo({ invert = false }) {
  return (
    <span className={`logo ${invert ? "logo--invert" : ""}`}>
      <LogoMark invert={invert} />
      <span className="logo__word">
        Gokul<sup>°</sup>
      </span>
    </span>
  );
}
