import { describe, expect, it } from "vitest";

// Styling rules that review alone won't hold. Each failure message says what
// to do instead; see the @swecc/ui README for the reasoning.

const sources = import.meta.glob<string>(
  ["./**/*.{ts,tsx}", "!./**/*.test.ts"],
  { query: "?raw", import: "default", eager: true },
);
const cssFiles = Object.keys(import.meta.glob("./**/*.css"));

const files = (filter: (path: string) => boolean = () => true) =>
  Object.entries(sources).filter(([path]) => filter(path));
const isApp = (path: string) => path.startsWith("./app/");

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

  it("has no stylesheets besides app/intro.css", () => {
    expect(cssFiles).toEqual(["./app/intro.css"]);
  });

  it.each(files())(
    "%s imports no CSS; only index.tsx loads the global styles",
    (path, source) => {
      const imports = [
        ...source.matchAll(
          /from\s+["']([^"']+\.css)["']|import\s+["']([^"']+\.css)["']/g,
        ),
      ].map((m) => m[1] ?? m[2]);
      const allowed =
        path === "./index.tsx"
          ? ["@swecc/ui/global.css", "./app/intro.css"]
          : [];
      expect(imports).toEqual(allowed);
    },
  );

  it.each(files())(
    "%s takes colors from @swecc/ui/tokens.stylex, not hex literals",
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
});
