import "../CSS/Intro.css";
import { useLayoutEffect, useRef, useState } from "react";

declare module "react" {
  interface CSSProperties {
    "--i"?: number;
    "--flip-x"?: string;
    "--flip-y"?: string;
    "--flip-scale"?: number;
  }
}

type Flip = { x: number; y: number; scale: number };

type IntroState =
  | { phase: "play" }
  | { phase: "exit"; flip: Flip | null }
  | { phase: "done" };

const BOOT_LINES = [
  "mounting community",
  "linking mentors",
  "compiling careers",
] as const;
const CHEVRON_OUTLINE = "37.5,0 37.5,8.7 8.3,19 37.5,29 37.5,37.8 0,24 0,13.3";
const CHEVRON_X = [0, 46.7] as const;
const HERO_REVEAL = [
  ".home-hero__kicker",
  ".home-hero__actions",
  ".home-hero__terminal",
] as const;

function initialState(): IntroState {
  if (new URLSearchParams(window.location.search).has("intro"))
    return { phase: "play" };
  if (window.location.pathname !== "/") return { phase: "done" };
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
    return { phase: "done" };
  return { phase: "play" };
}

function measureFlip(title: HTMLElement): Flip | null {
  const hero = document.querySelector(".home-hero__title");
  if (!hero) return null;
  const from = title.getBoundingClientRect();
  const to = hero.getBoundingClientRect();
  return {
    x: to.left - from.left,
    y: to.top - from.top,
    scale: to.height / from.height,
  };
}

function revealHero(easing: string) {
  HERO_REVEAL.forEach((selector, i) => {
    document.querySelector(selector)?.animate(
      [
        { opacity: 0, translate: "0 1.5rem" },
        { opacity: 1, translate: "0 0" },
      ],
      {
        duration: 800,
        delay: 450 + i * 110,
        easing,
        fill: "backwards",
      },
    );
  });
}

function Intro() {
  const [state, setState] = useState<IntroState>(initialState);
  const titleRef = useRef<HTMLDivElement>(null);
  const { phase } = state;

  useLayoutEffect(() => {
    const root = document.documentElement;
    if (phase === "done") {
      delete root.dataset.intro;
      return;
    }
    root.dataset.intro = phase;
    const { overflow, scrollbarGutter } = root.style;
    // The gutter keeps the hero where it was measured once the scrollbar returns.
    root.style.overflow = "hidden";
    root.style.scrollbarGutter = "stable";
    return () => {
      root.style.overflow = overflow;
      root.style.scrollbarGutter = scrollbarGutter;
    };
  }, [phase]);

  if (phase === "done") return null;

  const beginExit = () => {
    const title = titleRef.current;
    const flip = title ? measureFlip(title) : null;
    if (title && flip)
      revealHero(getComputedStyle(title).getPropertyValue("--ease-handoff"));
    setState({ phase: "exit", flip });
  };

  const flip = state.phase === "exit" ? state.flip : null;
  const exitClass =
    phase === "exit"
      ? flip
        ? " intro--exit intro--flip"
        : " intro--exit"
      : "";

  return (
    <div
      aria-hidden="true"
      className={`intro${exitClass}`}
      onAnimationEnd={(e) => {
        if (e.animationName === "intro-curtain") setState({ phase: "done" });
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
            <p key={line} className="intro__line" style={{ "--i": i }}>
              <span className="intro__ok">[ok]</span> {line}
            </p>
          ))}
        </div>
        <div
          className="intro__brand"
          onAnimationEnd={(e) => {
            if (e.animationName === "intro-clock" && phase === "play")
              beginExit();
          }}
        >
          <svg className="intro__mark" viewBox="0 0 84.2 37.8">
            <clipPath id="intro-chevron">
              <polygon points={CHEVRON_OUTLINE} />
            </clipPath>
            {CHEVRON_X.map((x, i) => (
              <path
                key={x}
                className="intro__chevron"
                transform={`translate(${x} 0)`}
                clipPath="url(#intro-chevron)"
                d="M42 4.3 L4 18.9 L42 33.5"
                pathLength={1}
                style={{ "--i": i }}
              />
            ))}
          </svg>
          <div
            ref={titleRef}
            className="intro__title"
            style={
              flip
                ? {
                    "--flip-x": `${flip.x}px`,
                    "--flip-y": `${flip.y}px`,
                    "--flip-scale": flip.scale,
                  }
                : undefined
            }
          >
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
        </div>
      </div>
    </div>
  );
}

export default Intro;
