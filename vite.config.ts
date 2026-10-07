import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { unplugin as stylex } from "@stylexjs/unplugin";

export default defineConfig({
  plugins: [
    // Vitest has no dev server to serve StyleX's hot-reload CSS, and the dev
    // hooks otherwise keep its workers alive past the run.
    stylex.vite({ devMode: process.env.VITEST ? "off" : "full" }),
    react(),
  ],
  build: { outDir: "build" },
  server: {
    port: 3000,
    proxy: {
      "/api/google-calendar.ics": {
        target: "https://calendar.google.com",
        changeOrigin: true,
        rewrite: () => "/calendar/ical/swecc%40uw.edu/public/basic.ics",
      },
    },
  },
});
