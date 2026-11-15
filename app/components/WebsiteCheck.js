"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { quiz, quizGoals, profile } from "@/data/profile";

const OPTIONS = [
  { label: "Yes", score: 2 },
  { label: "Not sure", score: 1 },
  { label: "No", score: 0 },
];

function tier(score) {
  if (score >= 80) return { title: "Strong foundation.", text: "You're ahead of most businesses. A few sharp moves can make you the obvious choice." };
  if (score >= 50) return { title: "Good base — but leaking leads.", text: "People are finding you, but some are slipping away before they enquire. These fixes plug the gaps." };
  return { title: "Your website could be costing you clients.", text: "The good news: every item below is fixable, and each one moves the needle." };
}

// Interactive "60-second website check": client answers, gets a score + personal fixes, then sends it on WhatsApp.
export default function WebsiteCheck() {
  const [step, setStep] = useState("intro"); // intro | goal | 0..n-1 | details | result
  const [goal, setGoal] = useState("");
  const [answers, setAnswers] = useState([]);
  const [info, setInfo] = useState({ name: "", business: "", website: "" });
  const panel = useRef(null);
  const ring = useRef(null);
  const scoreEl = useRef(null);

  const total = quiz.length;
  const qIndex = typeof step === "number" ? step : null;
  const progress =
    step === "intro" ? 0 : step === "goal" ? 6 : qIndex !== null ? 10 + (qIndex / total) * 80 : step === "details" ? 92 : 100;

  const score = useMemo(() => {
    if (!answers.length) return 0;
    return Math.round((answers.reduce((a, b) => a + b, 0) / (total * 2)) * 100);
  }, [answers, total]);

  const fixes = quiz
    .map((item, i) => ({ ...item, s: answers[i] }))
    .filter((x) => x.s !== undefined && x.s < 2)
    .sort((a, b) => a.s - b.s);
  const wins = quiz.filter((_, i) => answers[i] === 2);

  // Animate each new panel in
  useEffect(() => {
    if (!panel.current) return;
    gsap.fromTo(panel.current, { y: 34, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.7, ease: "expo.out" });
    if (step === "result" && ring.current) {
      const C = 2 * Math.PI * 54;
      const obj = { v: 0 };
      gsap.fromTo(ring.current, { strokeDashoffset: C }, { strokeDashoffset: C * (1 - score / 100), duration: 1.8, ease: "power3.out", delay: 0.2 });
      gsap.to(obj, { v: score, duration: 1.8, ease: "power3.out", delay: 0.2, onUpdate: () => scoreEl.current && (scoreEl.current.textContent = Math.round(obj.v)) });
      gsap.fromTo(".result__fix", { x: 30, autoAlpha: 0 }, { x: 0, autoAlpha: 1, stagger: 0.08, duration: 0.7, ease: "expo.out", delay: 0.5 });
    }
    const t = setTimeout(() => {
      if (typeof window !== "undefined") {
        import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => ScrollTrigger.refresh());
      }
    }, 720);
    return () => clearTimeout(t);
  }, [step, score]);

  const answer = (s) => {
    const next = [...answers];
    next[qIndex] = s;
    setAnswers(next);
    setStep(qIndex + 1 < total ? qIndex + 1 : "details");
  };

  const back = () => {
    if (step === "goal") setStep("intro");
    else if (qIndex === 0) setStep("goal");
    else if (qIndex) setStep(qIndex - 1);
    else if (step === "details") setStep(total - 1);
  };

  const restart = () => {
    setAnswers([]); setGoal(""); setStep("goal");
  };

  const message = useMemo(() => {
    const lines = [
      "Hi Gokul, I just took your Website Check.",
      info.name && `Name: ${info.name}`,
      info.business && `Business: ${info.business}`,
      info.website && `Website: ${info.website}`,
      goal && `Looking for: ${goal}`,
      `Score: ${score}/100`,
      fixes.length ? `Needs work: ${fixes.map((f) => f.area).join(", ")}` : "",
      "Can we talk?",
    ].filter(Boolean);
    return encodeURIComponent(lines.join("\n"));
  }, [info, goal, score, fixes]);

  const C = 2 * Math.PI * 54;

  return (
    <section className="section check" id="check">
      <div className="wrap check__grid">
        <div className="check__aside">
          <p className="kicker" data-reveal>( 60-second website check )</p>
          <h2 className="display" data-reveal>
            Is your website<br /><em>working for you?</em>
          </h2>
          <p className="section-head__sub" data-reveal>
            Seven honest questions. Get a score, see exactly what to fix, and send it to me if you want help.
            Free, no sign-up.
          </p>
          <ul className="check__points" data-reveal>
            <li>Speed &amp; mobile experience</li>
            <li>Google &amp; local visibility</li>
            <li>AI answers — ChatGPT, Gemini</li>
            <li>Leads &amp; tracking</li>
          </ul>
        </div>

        <div className="quiz" aria-live="polite">
          <div className="quiz__top">
            <span className="quiz__label">
              {qIndex !== null ? `Question ${qIndex + 1} / ${total}` : step === "result" ? "Your report" : "Website check"}
            </span>
            {step !== "intro" && step !== "result" && (
              <button className="quiz__back" onClick={back}>← Back</button>
            )}
          </div>
          <div className="quiz__progress"><span style={{ width: `${progress}%` }} /></div>

          <div className="quiz__panel" ref={panel} key={String(step)}>
            {step === "intro" && (
              <div className="quiz__intro">
                <p className="quiz__big">Let&apos;s see how your website is doing.</p>
                <p className="quiz__muted">Answer honestly — there are no wrong answers, only things to improve.</p>
                <button className="btn btn--dark" onClick={() => setStep("goal")}>
                  Start the check <span aria-hidden="true">→</span>
                </button>
              </div>
            )}

            {step === "goal" && (
              <div>
                <p className="quiz__q">First — what do you want most right now?</p>
                <div className="quiz__options quiz__options--grid">
                  {quizGoals.map((g) => (
                    <button key={g} className={`opt ${goal === g ? "is-on" : ""}`} onClick={() => { setGoal(g); setStep(0); }}>
                      {g}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {qIndex !== null && (
              <div>
                <p className="quiz__area">{quiz[qIndex].area}</p>
                <p className="quiz__q">{quiz[qIndex].q}</p>
                <div className="quiz__options">
                  {OPTIONS.map((o) => (
                    <button key={o.label} className={`opt ${answers[qIndex] === o.score ? "is-on" : ""}`} onClick={() => answer(o.score)}>
                      <span className="opt__key">{o.label[0]}</span>
                      {o.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === "details" && (
              <form
                className="quiz__form"
                onSubmit={(e) => { e.preventDefault(); setStep("result"); }}
              >
                <p className="quiz__q">Almost done. Who&apos;s this report for?</p>
                <p className="quiz__muted">Optional — it just makes your report personal.</p>
                <label>
                  <span>Your name</span>
                  <input value={info.name} onChange={(e) => setInfo({ ...info, name: e.target.value })} placeholder="e.g. Priya" />
                </label>
                <label>
                  <span>Business</span>
                  <input value={info.business} onChange={(e) => setInfo({ ...info, business: e.target.value })} placeholder="e.g. Bright Dental Clinic" />
                </label>
                <label>
                  <span>Website</span>
                  <input value={info.website} onChange={(e) => setInfo({ ...info, website: e.target.value })} placeholder="e.g. brightdental.in" />
                </label>
                <button type="submit" className="btn btn--dark">See my score <span aria-hidden="true">→</span></button>
              </form>
            )}

            {step === "result" && (
              <div className="result">
                <div className="result__head">
                  <div className="result__ring">
                    <svg viewBox="0 0 120 120">
                      <circle cx="60" cy="60" r="54" className="ring-bg" />
                      <circle cx="60" cy="60" r="54" className="ring-fg" ref={ring} strokeDasharray={C} strokeDashoffset={C} />
                    </svg>
                    <p><b ref={scoreEl}>0</b><span>/100</span></p>
                  </div>
                  <div>
                    <p className="result__for">{info.business || info.name ? `Report for ${info.business || info.name}` : "Your website report"}</p>
                    <h3>{tier(score).title}</h3>
                    <p className="quiz__muted">{tier(score).text}</p>
                  </div>
                </div>

                {fixes.length > 0 && (
                  <div className="result__block">
                    <p className="result__label">Fix these first</p>
                    <ol className="result__fixes">
                      {fixes.map((f) => (
                        <li className="result__fix" key={f.area}>
                          <b>{f.area}</b>
                          <span>{f.fix}</span>
                          <em>{f.s === 0 ? "High impact" : "Check this"}</em>
                        </li>
                      ))}
                    </ol>
                  </div>
                )}

                {wins.length > 0 && (
                  <div className="result__block">
                    <p className="result__label">Already working</p>
                    <div className="pills">
                      {wins.map((w) => <span key={w.area}>✓ {w.good}</span>)}
                    </div>
                  </div>
                )}

                <div className="result__cta">
                  <a className="btn btn--dark" href={`https://wa.me/${profile.whatsapp}?text=${message}`} target="_blank" rel="noopener noreferrer">
                    Send my report to Gokul <span aria-hidden="true">↗</span>
                  </a>
                  <button className="btn btn--light" onClick={restart}>Retake</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
