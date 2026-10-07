import { describe, expect, it } from "vitest";
import globalCss from "./global.css?raw";
import tokens from "./tokens.stylex.ts?raw";

// Design-system rules that review alone won't hold. Each failure message says
// what to do instead; see src/components/README.md for the reasoning.

const sources = import.meta.glob<string>(
  ["../**/*.{ts,tsx}", "!../**/*.test.ts"],
  { query: "?raw", import: "default", eager: true },
);
const cssFiles = Object.keys(import.meta.glob("../**/*.css"));

const files = (filter: (path: string) => boolean = () => true) =>
  Object.entries(sources).filter(([path]) => filter(path));
const isTokens = (path: string) => path.endsWith("/tokens.stylex.ts");
const isApp = (path: string) => path.startsWith("../app/");

const HEX = /(?<![\w&])#(?:[0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})\b/gi;

describe("design system guards", () => {
  it("found source files to check", () => {
    expect(files().length).toBeGreaterThan(20);
  });

  it.each(files((path) => !path.endsWith(".stylex.ts")))(
    "%s avoids border/background shorthands, which StyleX silently drops",
    (_, source) => {
      expect(source).not.toMatch(
        /^\s*(border|border(Top|Right|Bottom|Left|Block|Inline)(Start|End)?|background)\s*:/m,
      );
    },
  );

  it("has no stylesheets besides components/global.css", () => {
    expect(cssFiles).toEqual(["./global.css"]);
  });

  it.each(files())(
    "%s imports no CSS other than global.css",
    (path, source) => {
      const imports = [
        ...source.matchAll(
          /from\s+["']([^"']+\.css)["']|import\s+["']([^"']+\.css)["']/g,
        ),
      ]
        .map((m) => m[1] ?? m[2])
        .filter((spec) => !spec.endsWith("?raw"));
      const allowed =
        path === "../index.tsx" ? ["./components/global.css"] : [];
      expect(imports).toEqual(allowed);
    },
  );

  it.each(files((path) => !isTokens(path)))(
    "%s takes colors from tokens.stylex.ts, not hex literals",
    (_, source) => {
      expect(source.match(HEX) ?? []).toEqual([]);
    },
  );

  it.each(files())(
    "%s has no inline style objects; use a dynamic StyleX style",
    (_, source) => {
      expect(source).not.toMatch(/style=\{\{/);
    },
  );

  it.each(files(isApp))(
    "%s spreads stylex.props instead of reading .className/.style off it",
    (_, source) => {
      expect(source).not.toMatch(/\)\s*\.(className|style)\b/);
    },
  );

  it("global.css only uses colors defined as tokens", () => {
    const start = tokens.indexOf("export const colors");
    const colorTokens = tokens.slice(start, tokens.indexOf("});", start));
    const tokenHexes = new Set(
      (colorTokens.match(HEX) ?? []).map((h) => h.toLowerCase()),
    );
    const used = (globalCss.match(HEX) ?? []).map((h) => h.toLowerCase());
    expect(used.length).toBeGreaterThan(0);
    expect(used.filter((hex) => !tokenHexes.has(hex))).toEqual([]);
  });
});
