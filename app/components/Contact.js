"use client";

import { profile } from "@/data/profile";

export default function Contact() {
  const handleSubmit = (event) => {
    event.preventDefault();

    // Field IDs keep their values out of native form submissions.
    const { elements } = event.currentTarget;
    const value = (field) => elements.namedItem(`contact-${field}`).value.trim();
    const message = [
      `Hi Gokul, I'm ${value("name")}.`,
      `I need: ${value("need")}`,
      value("message"),
      [value("email"), value("phone")].filter(Boolean).join(" "),
    ].filter(Boolean).join("\n");

    window.open(
      `https://wa.me/${profile.whatsapp}?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  return (
    <section className="section" id="contact" style={{ paddingTop: 0 }}>
      <div className="wrap contact">
        <div>
          <span className="eyebrow rv">Contact</span>
          <h2 className="h2 rv">
            Let&apos;s talk about your <span className="hl">next project</span>
          </h2>
          <p className="rv" style={{ color: "var(--muted)", marginTop: "14px" }}>
            A website, a web app, a 3D experience or more people finding you on Google — tell me what you need. I reply within a day.
          </p>
          <div className="contact__list rv">
            <a href={`https://wa.me/${profile.whatsapp}`} target="_blank" rel="noopener noreferrer">
              <i>☏</i>+91 93426 87447
            </a>
            <a href={`mailto:${profile.email}`}>
              <i>@</i>{profile.email}
            </a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
              <i>in</i>linkedin.com/in/gokul-b
            </a>
            <div>
              <i>⌖</i>{profile.location}
            </div>
          </div>
        </div>
        <form className="form rv" id="contact-form" action="#contact" onSubmit={handleSubmit}>
          <label>
            Your name
            <input
              id="contact-name"
              required
              autoComplete="name"
              placeholder="e.g. Priya"
            />
          </label>
          <label>
            Email
            <input
              id="contact-email"
              type="email"
              autoComplete="email"
              placeholder="you@company.com"
            />
          </label>
          <label>
            Phone
            <input
              id="contact-phone"
              type="tel"
              autoComplete="tel"
              placeholder="+91"
            />
          </label>
          <label>
            I need
            <select id="contact-need">
              <option>Next.js website</option>
              <option>3D web experience</option>
              <option>Web application</option>
              <option>SEO / GEO / AEO</option>
              <option>Digital marketing</option>
            </select>
          </label>
          <label className="full">
            Message
            <textarea
              id="contact-message"
              placeholder="Tell me a little about your project…"
            />
          </label>
          <button className="btn btn--dark" type="submit">
            Send on WhatsApp <i>→</i>
          </button>
        </form>
      </div>
    </section>
  );
}
