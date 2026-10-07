import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { unplugin as stylex } from "@stylexjs/unplugin";

export default defineConfig({
  plugins: [
    process.env.VITEST
      ? // The plugin's dev-server hook starts an interval it only clears when
        // an HTTP server closes. Vitest runs without one, so the interval
        // would keep the test run alive; tests don't need hot-reload CSS.
        { ...stylex.vite(), configureServer: undefined }
      : stylex.vite(),
    react(),
  ],
  build: { outDir: "build" },
  // Vitest stubs CSS by default; the design-system guards read global.css.
  test: { css: { include: [/global\.css/] } },
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
