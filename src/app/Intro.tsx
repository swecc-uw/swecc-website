import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import * as stylex from "@stylexjs/stylex";
import { typeStyles } from "@swecc/ui";
import { colors, easings, fonts, media } from "@swecc/ui/tokens.stylex";

type Flip = { x: number; y: number; scale: number };

type IntroState =
  { phase: "play" } | { phase: "exit"; flip: Flip | null } | { phase: "done" };

const BOOT_LINES = [
  "mounting community",
  "linking mentors",
  "compiling careers",
] as const;
const TITLE_WORDS = [
  { text: "Software", delay: "1850ms" },
  { text: "Engineering", delay: "1940ms" },
  { text: "CAREER CLUB", delay: "2030ms", accent: true },
] as const;
const CHEVRON_OUTLINE = "37.5,0 37.5,8.7 8.3,19 37.5,29 37.5,37.8 0,24 0,13.3";
const CHEVRON_X = [0, 46.7] as const;
const EXIT_MS = 900;
const PHASE_MS = { play: 2500, exit: EXIT_MS } as const;

// Home.tsx tags the hero's title and the parts that fade in after it.
const HERO_TITLE = '[data-intro-part="title"]';
const HERO_REVEAL = '[data-intro-part="reveal"]';

function initialState(): IntroState {
  if (typeof window === "undefined") return { phase: "done" };
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
    return { phase: "done" };
  if (new URLSearchParams(window.location.search).has("intro"))
    return { phase: "play" };
  if (window.location.pathname !== "/") return { phase: "done" };
  return { phase: "play" };
}

function measureFlip(title: HTMLElement): Flip | null {
  const hero = document.querySelector(HERO_TITLE);
  if (!hero) return null;
  const from = title.getBoundingClientRect();
  const to = hero.getBoundingClientRect();
  return {
    x: to.left - from.left,
    y: to.top - from.top,
    scale: to.height / from.height,
  };
}

function revealHero() {
  document.querySelectorAll(HERO_REVEAL).forEach((el, i) => {
    el.animate(
      [
        { opacity: 0, translate: "0 1.5rem" },
        { opacity: 1, translate: "0 0" },
      ],
      {
        duration: 800,
        delay: 450 + i * 110,
        easing: easings.handoff,
        fill: "backwards",
      },
    );
  });
}

async function handoff(title: HTMLElement | null): Promise<IntroState> {
  await document.fonts.ready;
  const flip = title ? measureFlip(title) : null;
  if (title && flip) revealHero();
  return { phase: "exit", flip };
}

function Intro() {
  const [state, setState] = useState<IntroState>(initialState);
  const titleRef = useRef<HTMLDivElement>(null);
  const { phase } = state;

  useEffect(() => {
    if (phase === "done") return;
    let cancelled = false;
    // Timers, not animationend, drive the phases so the overlay still leaves when animations are disabled.
    const timer = window.setTimeout(async () => {
      const next: IntroState =
        phase === "play" ? await handoff(titleRef.current) : { phase: "done" };
      if (!cancelled) setState(next);
    }, PHASE_MS[phase]);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [phase]);

  useLayoutEffect(() => {
    const root = document.documentElement;
    const app = document.getElementById("root");
    if (app) app.inert = phase !== "done";
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

  const exiting = phase === "exit";
  const flip = state.phase === "exit" ? state.flip : null;

  return createPortal(
    <div
      aria-hidden="true"
      {...stylex.props(styles.overlay, exiting && styles.overlayExit)}
    >
      <div
        {...stylex.props(styles.stage, exiting && !flip && styles.stageExit)}
      >
        <div {...stylex.props(styles.term)}>
          <p {...stylex.props(styles.termLine)}>
            <span {...stylex.props(styles.prompt)}>~ $</span>{" "}
            <span {...stylex.props(styles.typed)}>swecc --init</span>
            <span {...stylex.props(styles.cursor)} />
          </p>
          {BOOT_LINES.map((line, i) => (
            <p
              key={line}
              {...stylex.props(styles.termLine, styles.bootLine(i))}
            >
              <span {...stylex.props(styles.prompt)}>[ok]</span> {line}
            </p>
          ))}
        </div>
        <div {...stylex.props(styles.brand)}>
          <svg
            viewBox="0 0 84.2 37.8"
            {...stylex.props(styles.mark, exiting && styles.markExit)}
          >
            <clipPath id="intro-chevron">
              <polygon points={CHEVRON_OUTLINE} />
            </clipPath>
            {CHEVRON_X.map((x, i) => (
              <path
                key={x}
                transform={`translate(${x} 0)`}
                clipPath="url(#intro-chevron)"
                d="M42 4.3 L4 18.9 L42 33.5"
                pathLength={1}
                {...stylex.props(styles.chevron(i))}
              />
            ))}
          </svg>
          <div
            ref={titleRef}
            {...stylex.props(
              styles.title,
              flip &&
                styles.titleFlip(`${flip.x}px`, `${flip.y}px`, flip.scale),
            )}
          >
            {TITLE_WORDS.map((word) => (
              <span key={word.text} {...stylex.props(styles.mask)}>
                <span
                  {...stylex.props(
                    typeStyles.hero,
                    "accent" in word && typeStyles.heroAccent,
                    styles.word(word.delay),
                  )}
                >
                  {word.text}
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}

const titleSize = "clamp(2.5rem, 5vw + 1rem, 6rem)";
const handoffTiming = {
  animationDuration: `${EXIT_MS}ms`,
  animationTimingFunction: easings.handoff,
  animationFillMode: "both",
} as const;

const blink = stylex.keyframes({ "50%": { opacity: 0 } });
const type = stylex.keyframes({ from: { width: 0 }, to: { width: "12ch" } });
const lineIn = stylex.keyframes({
  from: { opacity: 0, transform: "translateY(6px)" },
});
const termOut = stylex.keyframes({
  to: { opacity: 0, transform: "translateY(-12px)", filter: "blur(4px)" },
});
const wordUp = stylex.keyframes({
  from: { transform: "translateY(110%) rotate(3deg)" },
});
const draw = stylex.keyframes({
  from: { strokeDashoffset: "1" },
  to: { strokeDashoffset: "0" },
});
const flipTo = stylex.keyframes({
  to: {
    transform:
      "translate(var(--flip-x), var(--flip-y)) scale(var(--flip-scale))",
  },
});
const markOut = stylex.keyframes({
  to: { opacity: 0, transform: "translate(-25%, -60%) scale(0.4)" },
});
const stageOut = stylex.keyframes({
  to: { opacity: 0, transform: "translateY(-8vh)" },
});
const curtain = stylex.keyframes({ to: { transform: "translateY(-100%)" } });

const styles = stylex.create({
  overlay: {
    position: "fixed",
    inset: 0,
    zIndex: 1100,
    display: "grid",
    placeItems: "center",
    "::before": {
      content: '""',
      position: "absolute",
      inset: 0,
      backgroundColor: colors.background,
      borderBottomWidth: "2px",
      borderBottomStyle: "solid",
      borderBottomColor: colors.primary,
    },
  },
  overlayExit: {
    "::before": {
      content: '""',
      animationName: curtain,
      ...handoffTiming,
    },
  },
  stage: {
    position: "relative",
    display: "grid",
    width: "max-content",
    maxWidth: "90vw",
  },
  stageExit: {
    animationName: stageOut,
    ...handoffTiming,
    animationDuration: "600ms",
  },
  term: {
    gridArea: "1 / 1",
    alignSelf: "center",
    fontFamily: fonts.mono,
    fontSize: "clamp(0.95rem, 1vw + 0.6rem, 1.25rem)",
    animationName: termOut,
    animationDuration: "320ms",
    animationTimingFunction: easings.in,
    animationDelay: "1650ms",
    animationFillMode: "both",
  },
  termLine: {
    margin: "0 0 0.35em",
    fontFamily: fonts.mono,
    fontSize: "inherit",
    fontWeight: 400,
    lineHeight: 1.5,
    color: colors.text,
  },
  bootLine: (i: number) => ({
    color: "rgba(250, 250, 250, 0.6)",
    animationName: lineIn,
    animationDuration: "280ms",
    animationTimingFunction: easings.outExpo,
    animationDelay: `${950 + i * 140}ms`,
    animationFillMode: "both",
  }),
  prompt: {
    fontFamily: fonts.mono,
    color: colors.primary,
  },
  typed: {
    display: "inline-block",
    verticalAlign: "bottom",
    overflow: "hidden",
    whiteSpace: "nowrap",
    fontFamily: fonts.mono,
    animationName: type,
    animationDuration: "600ms",
    animationTimingFunction: "steps(12, end)",
    animationDelay: "250ms",
    animationFillMode: "both",
  },
  cursor: {
    display: "inline-block",
    width: "0.6em",
    height: "1.1em",
    marginLeft: "0.1em",
    verticalAlign: "text-bottom",
    backgroundColor: colors.primary,
    animationName: blink,
    animationDuration: "0.9s",
    animationTimingFunction: "steps(1)",
    animationIterationCount: "infinite",
  },
  brand: {
    gridArea: "1 / 1",
    alignSelf: "center",
    display: "flex",
    flexDirection: { default: null, [media.max768]: "column" },
    alignItems: { default: "center", [media.max768]: "flex-start" },
    gap: {
      default: `calc(${titleSize} * 0.4)`,
      [media.max768]: `calc(${titleSize} * 0.3)`,
    },
  },
  mark: {
    flexShrink: 0,
    height: { default: titleSize, [media.max768]: `calc(${titleSize} * 0.72)` },
  },
  markExit: {
    transformOrigin: "left center",
    animationName: markOut,
    animationDuration: "280ms",
    animationTimingFunction: easings.outExpo,
    animationFillMode: "both",
  },
  chevron: (i: number) => ({
    fill: "none",
    stroke: colors.primary,
    strokeWidth: "14",
    strokeDasharray: "1",
    animationName: draw,
    animationDuration: "800ms",
    animationTimingFunction: easings.outExpo,
    animationDelay: `${1950 + i * 140}ms`,
    animationFillMode: "both",
  }),
  title: {
    display: "flex",
    flexDirection: "column",
    transformOrigin: "top left",
  },
  titleFlip: (x: string, y: string, scale: number) => ({
    "--flip-x": x,
    "--flip-y": y,
    "--flip-scale": scale,
    animationName: flipTo,
    ...handoffTiming,
  }),
  mask: {
    display: "block",
    overflow: "hidden",
    paddingBottom: "0.12em",
    marginBottom: "-0.12em",
    fontSize: titleSize,
  },
  word: (delay: string) => ({
    display: "block",
    fontSize: "inherit",
    lineHeight: 1.1,
    transformOrigin: "left bottom",
    animationName: wordUp,
    animationDuration: "900ms",
    animationTimingFunction: easings.outExpo,
    animationDelay: delay,
    animationFillMode: "both",
  }),
});

export default Intro;
