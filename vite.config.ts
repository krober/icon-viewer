import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";

// https://vite.dev/config/
export default defineConfig({
  envDir: ".env",
  plugins: [svelte()],
  build: {
    outDir: "./build",
    sourcemap: true,
  },
  server: {
    port: 5173,
    open: true,
  },
  base: "https://krober.github.io/icon-viewer/",
});
