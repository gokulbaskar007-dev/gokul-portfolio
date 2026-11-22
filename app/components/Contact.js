"use client";

import { useState } from "react";
import { profile } from "@/data/profile";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    need: "Next.js website",
    msg: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const msg = `Hi Gokul, I'm ${form.name}.\nI need: ${form.need}\n${form.msg || ""}\n${form.email || ""} ${form.phone || ""}`;
    window.open(`https://wa.me/${profile.whatsapp}?text=${encodeURIComponent(msg)}`, "_blank");
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
        <form className="form rv" id="contact-form" onSubmit={handleSubmit}>
          <label>
            Your name
            <input
              name="name"
              required
              placeholder="e.g. Priya"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </label>
          <label>
            Email
            <input
              name="email"
              type="email"
              placeholder="you@company.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </label>
          <label>
            Phone
            <input
              name="phone"
              placeholder="+91"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          </label>
          <label>
            I need
            <select
              name="need"
              value={form.need}
              onChange={(e) => setForm({ ...form, need: e.target.value })}
            >
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
              name="msg"
              placeholder="Tell me a little about your project…"
              value={form.msg}
              onChange={(e) => setForm({ ...form, msg: e.target.value })}
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
