/// <reference types="node" />
import { existsSync, readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

// Link preview tags in index.html. The prerender copies them onto every page,
// and a broken og:image fails silently: shared links just show an empty card.

const root = new URL("../", import.meta.url);
const html = readFileSync(new URL("index.html", root), "utf8");

const meta = (key: string) => {
  const tags = html.match(/<meta\s[^>]*>/g) ?? [];
  const tag = tags.find((t) =>
    new RegExp(`(?:property|name)="${key}"`).test(t),
  );
  return tag?.match(/content="([^"]*)"/)?.[1];
};

describe("link preview tags", () => {
  it.each([
    "og:title",
    "og:description",
    "og:url",
    "og:type",
    "og:image",
    "og:image:alt",
  ])("has a non-empty %s", (key) => {
    expect(meta(key)?.trim()).toBeTruthy();
  });

  it("uses the full-width twitter card", () => {
    expect(meta("twitter:card")).toBe("summary_large_image");
  });

  it("serves og:image from swecc.org, not an outside host", () => {
    expect(meta("og:image")).toMatch(/^https:\/\/swecc\.org\/[^/]+\.png$/);
  });

  it("points og:image at a file in public/", () => {
    const { pathname } = new URL(meta("og:image")!);
    expect(existsSync(new URL(`public${pathname}`, root))).toBe(true);
  });

  it("states the og:image size it really has", () => {
    const { pathname } = new URL(meta("og:image")!);
    const png = readFileSync(new URL(`public${pathname}`, root));
    // A PNG's width and height sit in its IHDR chunk, at bytes 16 and 20.
    expect(png.readUInt32BE(16)).toBe(Number(meta("og:image:width")));
    expect(png.readUInt32BE(20)).toBe(Number(meta("og:image:height")));
  });
});
