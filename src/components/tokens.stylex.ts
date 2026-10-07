import * as stylex from "@stylexjs/stylex";

// Design tokens. Every StyleX style in the app reads from these instead of
// hard-coding values, and `stylex.createTheme` can override any `defineVars`
// group for a subtree.

export const colors = stylex.defineVars({
  // Page and panel surfaces, darkest to lightest.
  background: "#1f1d20",
  surface: "#2e2f33",
  surfaceRaised: "#43454a",
  surfaceAccent: "#484a4d",

  text: "#fafafa",
  textMuted: "rgb(250 250 250 / 0.7)",
  textSubtle: "#a7aab1",
  textOnPrimary: "#1f1d20",

  primary: "#7ea266",
  accent: "#d5c6f8",
  danger: "#d96b6b",

  border: "#43454a",
  hairline: "rgb(250 250 250 / 0.1)",
});

const sans =
  '"Roboto", sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI"';

export const fonts = stylex.defineVars({
  sans,
  mono: '"IBM Plex Mono", monospace, "SFMono-Regular", Menlo, Consolas',
  hero: `"Manrope", ${sans}`,
});

export const fontSizes = stylex.defineVars({
  h1: { default: "2.5rem", "@media (max-width: 768px)": "2rem" },
  h2: { default: "1.5rem", "@media (max-width: 768px)": "1.375rem" },
  h3: { default: "1.25rem", "@media (max-width: 768px)": "1.125rem" },
  h4: "1.125rem",
  h5: "1rem",
  h6: "0.875rem",
  body: "1rem",
  bodyLarge: "1.125rem",
  small: "0.875rem",
  // Fluid sizes for full-bleed marketing bands.
  bandBody: "clamp(1.125rem, 0.9vw + 0.75rem, 2rem)",
  bandTitle: "clamp(1.75rem, 1.2vw + 1.2rem, 3rem)",
});

export const lineHeights = stylex.defineVars({
  heading: "1.2",
  body: "1.5",
});

export const layout = stylex.defineVars({
  navHeight: "4.5rem",
  contentMax: "94.5rem",
  gutter: "clamp(1.25rem, 5vw, 6rem)",
  bandPaddingY: "clamp(3rem, 7vw, 7rem)",
});

export const radii = stylex.defineVars({
  xs: "0.25rem",
  sm: "0.5rem",
  md: "0.75rem",
  lg: "1rem",
  xl: "1.5rem",
  pill: "999px",
  photo: "clamp(1rem, 1.4vw, 1.5rem)",
});

export const easings = stylex.defineConsts({
  out: "cubic-bezier(0.22, 1, 0.36, 1)",
  outExpo: "cubic-bezier(0.16, 1, 0.3, 1)",
  in: "cubic-bezier(0.7, 0, 0.84, 0)",
  handoff: "cubic-bezier(0.33, 0, 0.1, 1)",
});

// Media queries, used as condition keys: `{ default: a, [media.max768]: b }`.
export const media = stylex.defineConsts({
  max1100: "@media (max-width: 1100px)",
  max900: "@media (max-width: 900px)",
  max768: "@media (max-width: 768px)",
  max760: "@media (max-width: 760px)",
  max720: "@media (max-width: 720px)",
  max600: "@media (max-width: 600px)",
  max380: "@media (max-width: 380px)",
  motionOK: "@media (prefers-reduced-motion: no-preference)",
  reducedMotion: "@media (prefers-reduced-motion: reduce)",
  hoverFine: "@media (hover: hover) and (pointer: fine)",
  hoverNone: "@media (hover: none)",
  pointerCoarse: "@media (pointer: coarse)",
});
