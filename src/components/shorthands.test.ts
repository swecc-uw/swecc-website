import { describe, expect, it } from "vitest";

// StyleX rejects these shorthands, but the Vite plugin drops them silently
// instead of failing the build. Use the longhands (e.g. `borderTopWidth`,
// `borderTopStyle`, `borderTopColor`, `backgroundColor`) instead.
const UNSUPPORTED =
  /^\s*(border|border(Top|Right|Bottom|Left|Block|Inline)(Start|End)?|background)\s*:/m;

// Token files are skipped: they define variables named after colors.
const sources = import.meta.glob<string>(
  ["../**/*.{ts,tsx}", "!../**/*.stylex.ts", "!../**/*.test.ts"],
  { query: "?raw", import: "default", eager: true },
);

describe("StyleX styles", () => {
  it("found source files to check", () => {
    expect(Object.keys(sources).length).toBeGreaterThan(20);
  });

  it.each(Object.entries(sources))(
    "%s avoids shorthands StyleX drops",
    (_, source) => {
      expect(source).not.toMatch(UNSUPPORTED);
    },
  );
});
