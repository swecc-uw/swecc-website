import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { build } from "vite";

const root = path.join(import.meta.dirname, "..");
const outDir = path.join(root, "node_modules", ".prerender");
const buildDir = path.join(root, "build");

await build({
  root,
  logLevel: "warn",
  build: {
    ssr: "src/entry-server.tsx",
    outDir,
    emptyOutDir: true,
  },
});

const { render, PAGE_TITLES, REDIRECTS } = (await import(
  pathToFileURL(path.join(outDir, "entry-server.js")).href
)) as {
  render: (url: string) => string;
  PAGE_TITLES: Record<string, string>;
  REDIRECTS: Record<string, string>;
};

const template = fs.readFileSync(path.join(buildDir, "index.html"), "utf8");
const TITLE = "<title>SWECC</title>";
const ROOT = '<div id="root"></div>';
for (const marker of [TITLE, ROOT]) {
  if (!template.includes(marker)) {
    throw new Error(`build/index.html is missing ${marker}`);
  }
}

const pages: Record<string, string> = { "/": "SWECC", ...PAGE_TITLES };
for (const [route, title] of Object.entries(pages)) {
  const html = template
    .replace(TITLE, () => `<title>${title}</title>`)
    .replace(ROOT, () => `<div id="root">${render(route)}</div>`);
  // Cloudflare serves X.html at /X; X/index.html would redirect to /X/.
  const file = route === "/" ? "index.html" : `${route.slice(1)}.html`;
  fs.writeFileSync(path.join(buildDir, file), html);
}

const redirects = Object.entries(REDIRECTS).map(([from, to]) => {
  // Cloudflare rejects the whole deploy if a _redirects target isn't HTTPS.
  if (!to.startsWith("https://")) {
    throw new Error(`Redirect ${from} must target an https:// URL, got ${to}`);
  }
  return `${from} ${to} 302`;
});
for (const route of Object.keys(pages)) {
  if (route !== route.toLowerCase()) {
    redirects.push(`${route.toLowerCase()} ${route} 301`);
  }
  // Direct /X.html hits bypass the route table and hydrate the wrong page.
  redirects.push(`${route === "/" ? "/index" : route}.html ${route} 301`);
}
fs.writeFileSync(
  path.join(buildDir, "_redirects"),
  `${redirects.join("\n")}\n`,
);

console.log(`Prerendered ${Object.keys(pages).join(", ")}`);
