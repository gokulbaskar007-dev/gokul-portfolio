"use client";

import { useMemo, useState } from "react";
import { quiz, quizGoals, profile } from "@/data/profile";

const OPTIONS = [
  { label: "Yes", key: "Y", score: 2 },
  { label: "Not sure", key: "N", score: 1 },
  { label: "No", key: "N", score: 0 },
];

function tier(score) {
  if (score >= 80)
    return {
      title: "Strong foundation.",
      text: "You're ahead of most businesses. A few sharp moves can make you the obvious choice.",
    };
  if (score >= 50)
    return {
      title: "Good base — but leaking leads.",
      text: "People are finding you, but some are slipping away before they enquire. These fixes plug the gaps.",
    };
  return {
    title: "Your website could be costing you clients.",
    text: "The good news: every item below is fixable, and each one moves the needle.",
  };
}

export default function WebsiteCheck() {
  const [step, setStep] = useState("intro"); // intro | goal | 0..total-1 | details | result
  const [goal, setGoal] = useState("");
  const [answers, setAnswers] = useState([]);
  const [info, setInfo] = useState({ name: "", business: "", website: "" });

  const total = quiz.length;
  const qIndex = typeof step === "number" ? step : null;
  const progress =
    step === "intro"
      ? 0
      : step === "goal"
      ? 8
      : qIndex !== null
      ? 12 + (qIndex / total) * 76
      : step === "details"
      ? 92
      : 100;

  const score = useMemo(() => {
    if (!answers.length) return 0;
    return Math.round((answers.reduce((a, b) => a + b, 0) / (total * 2)) * 100);
  }, [answers, total]);

  const fixes = quiz
    .map((item, i) => ({ ...item, s: answers[i] }))
    .filter((x) => x.s !== undefined && x.s < 2)
    .sort((a, b) => a.s - b.s);

  const wins = quiz.filter((_, i) => answers[i] === 2);

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
    setAnswers([]);
    setGoal("");
    setStep("goal");
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

  const C = 2 * Math.PI * 46;

  return (
    <section className="section" id="check" style={{ paddingTop: 0 }}>
      <div className="wrap check">
        <div>
          <span className="eyebrow rv">Free · 60 seconds</span>
          <h2 className="h2 rv">
            Is your website <span className="hl">working for you?</span>
          </h2>
          <p className="sub rv" style={{ color: "var(--muted)", marginTop: "14px", maxWidth: "460px" }}>
            Answer 7 quick questions, get a score and a personal fix list — then send it to me on WhatsApp if you want help.
          </p>
          <ul className="rv">
            <li>Speed &amp; mobile experience</li>
            <li>Google &amp; local visibility</li>
            <li>AI answers — ChatGPT, Gemini</li>
            <li>Leads &amp; tracking</li>
          </ul>
        </div>

        <div className="quiz rv" aria-live="polite">
          <div className="quiz__top">
            <span>
              {qIndex !== null
                ? `Question ${qIndex + 1} / ${total}`
                : step === "result"
                ? "Your report"
                : step === "details"
                ? "Almost done"
                : "Website check"}
            </span>
            {step !== "intro" && step !== "result" && (
              <button type="button" className="quiz__back" onClick={back}>
                ← Back
              </button>
            )}
          </div>

          <div className="quiz__bar">
            <span style={{ width: `${progress}%` }} />
          </div>

          <div className="quiz__panel">
            {step === "intro" && (
              <div>
                <p className="quiz__q" style={{ marginBottom: "14px" }}>
                  Let&apos;s see how your website is doing.
                </p>
                <p style={{ color: "var(--muted)", fontSize: "15px", marginBottom: "26px" }}>
                  Answer honestly — there are no wrong answers, only things to improve.
                </p>
                <button
                  type="button"
                  className="btn btn--dark"
                  onClick={() => setStep("goal")}
                >
                  Start the check <i>→</i>
                </button>
              </div>
            )}

            {step === "goal" && (
              <div>
                <p className="quiz__q">First — what do you want most right now?</p>
                <div className="quiz__options quiz__options--grid">
                  {quizGoals.map((g) => (
                    <button
                      type="button"
                      key={g}
                      className={`opt ${goal === g ? "on" : ""}`}
                      onClick={() => {
                        setGoal(g);
                        setStep(0);
                      }}
                    >
                      <b>✦</b>
                      {g}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {qIndex !== null && (
              <div>
                <p style={{ fontSize: "13px", color: "var(--muted)", marginBottom: "6px" }}>
                  {quiz[qIndex].area}
                </p>
                <p className="quiz__q">{quiz[qIndex].q}</p>
                <div className="quiz__options">
                  {OPTIONS.map((o) => (
                    <button
                      type="button"
                      key={o.label}
                      className={`opt ${answers[qIndex] === o.score ? "on" : ""}`}
                      onClick={() => answer(o.score)}
                    >
                      <b>{o.key}</b>
                      {o.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === "details" && (
              <form
                className="quiz__form"
                onSubmit={(e) => {
                  e.preventDefault();
                  setStep("result");
                }}
              >
                <p className="quiz__q" style={{ marginBottom: "6px" }}>
                  Almost done. Who&apos;s this report for?
                </p>
                <p style={{ color: "var(--muted)", fontSize: "14px", marginBottom: "16px" }}>
                  Optional — it just personalizes your action plan.
                </p>
                <label>
                  <span>Your name</span>
                  <input
                    value={info.name}
                    onChange={(e) => setInfo({ ...info, name: e.target.value })}
                    placeholder="e.g. Priya"
                  />
                </label>
                <label>
                  <span>Business</span>
                  <input
                    value={info.business}
                    onChange={(e) => setInfo({ ...info, business: e.target.value })}
                    placeholder="e.g. Bright Dental Clinic"
                  />
                </label>
                <label>
                  <span>Website</span>
                  <input
                    value={info.website}
                    onChange={(e) => setInfo({ ...info, website: e.target.value })}
                    placeholder="e.g. brightdental.in"
                  />
                </label>
                <button type="submit" className="btn btn--dark" style={{ marginTop: "10px" }}>
                  See my score <i>→</i>
                </button>
              </form>
            )}

            {step === "result" && (
              <div>
                <div className="result__head">
                  <div className="result__ring">
                    <svg viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="46" className="ring-bg" />
                      <circle
                        cx="50"
                        cy="50"
                        r="46"
                        className="ring-fg"
                        strokeDasharray={C}
                        strokeDashoffset={C * (1 - score / 100)}
                      />
                    </svg>
                    <p>
                      <b>{score}</b>
                      <span>/100</span>
                    </p>
                  </div>
                  <div>
                    <p style={{ fontSize: "13px", color: "var(--muted)" }}>
                      {info.business || info.name
                        ? `Report for ${info.business || info.name}`
                        : "Your website report"}
                    </p>
                    <h3 style={{ fontSize: "22px", fontWeight: "600", marginTop: "4px" }}>
                      {tier(score).title}
                    </h3>
                    <p style={{ fontSize: "14px", color: "var(--muted)", marginTop: "4px" }}>
                      {tier(score).text}
                    </p>
                  </div>
                </div>

                {fixes.length > 0 && (
                  <div style={{ marginTop: "20px" }}>
                    <p style={{ fontSize: "13px", fontWeight: "600", color: "var(--muted)" }}>
                      Fix these first
                    </p>
                    <ol className="result__fixes">
                      {fixes.map((f) => (
                        <li className="result__fix" key={f.area}>
                          <b>{f.area}</b>
                          <span>{f.fix}</span>
                          <em>{f.s === 0 ? "High impact" : "Recommended"}</em>
                        </li>
                      ))}
                    </ol>
                  </div>
                )}

                {wins.length > 0 && (
                  <div style={{ marginTop: "18px" }}>
                    <p style={{ fontSize: "13px", fontWeight: "600", color: "var(--muted)", marginBottom: "8px" }}>
                      Already working
                    </p>
                    <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                      {wins.map((w) => (
                        <span className="pill" key={w.area}>
                          ✓ {w.good}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="result__cta">
                  <a
                    className="btn btn--dark"
                    href={`https://wa.me/${profile.whatsapp}?text=${message}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Send report on WhatsApp <i>↗</i>
                  </a>
                  <button type="button" className="btn btn--light" onClick={restart}>
                    Retake
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
