import "../CSS/Intro.css";
import React, { useEffect, useState } from "react";

type IntroPhase = "play" | "exit" | "done";

const BOOT_LINES = [
  "mounting community",
  "linking mentors",
  "compiling careers",
] as const;
const SEEN_KEY = "swecc:intro-seen";

function shouldPlay(): IntroPhase {
  if (new URLSearchParams(window.location.search).has("intro")) return "play";
  if (window.location.pathname !== "/") return "done";
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
    return "done";
  try {
    if (localStorage.getItem(SEEN_KEY)) return "done";
  } catch {
    return "done";
  }
  return "play";
}

function Intro() {
  const [phase, setPhase] = useState<IntroPhase>(shouldPlay);

  useEffect(() => {
    // Mark seen at start, not at completion, so a reload mid-intro doesn't replay it.
    if (phase !== "play") return;
    try {
      localStorage.setItem(SEEN_KEY, "1");
    } catch {
      /* privacy mode: nothing to persist */
    }
  }, [phase]);

  useEffect(() => {
    if (phase === "done") return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [phase]);

  if (phase === "done") return null;

  return (
    <div
      aria-hidden="true"
      className={`intro${phase === "exit" ? " intro--exit" : ""}`}
      onAnimationEnd={(e) => {
        if (
          e.target === e.currentTarget &&
          e.animationName === "intro-curtain"
        ) {
          setPhase("done");
        }
      }}
    >
      <div className="intro__stage">
        <div className="intro__term mono">
          <p className="intro__cmd">
            <span className="intro__prompt">~ $</span>{" "}
            <span className="intro__typed">swecc --init</span>
            <span className="intro__cursor" />
          </p>
          {BOOT_LINES.map((line, i) => (
            <p
              key={line}
              className="intro__line"
              style={{ "--i": i } as React.CSSProperties}
            >
              <span className="intro__ok">[ok]</span> {line}
            </p>
          ))}
        </div>
        <div className="intro__brand">
          <div className="intro__title">
            <span className="intro__mask">
              <span className="intro__word type-hero-mono">Software</span>
            </span>
            <span className="intro__mask">
              <span className="intro__word type-hero-mono">Engineering</span>
            </span>
            <span className="intro__mask">
              <span className="intro__word type-hero-sans">CAREER CLUB</span>
            </span>
          </div>
          <p
            className="intro__kicker"
            onAnimationEnd={(e) => {
              if (e.animationName === "intro-kicker" && phase === "play")
                setPhase("exit");
            }}
          >
            AT THE <em>UNIVERSITY OF WASHINGTON</em>
          </p>
          <span className="intro__rule" />
        </div>
      </div>
    </div>
  );
}

export default Intro;
