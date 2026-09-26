import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
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
