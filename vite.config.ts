import { defineConfig, loadEnv } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";

const envDir = ".env";

// https://vite.dev/config/
export default defineConfig(({ mode }: { mode: string }) => {
  const env = loadEnv(mode, `${process.cwd()}/${envDir}`);

  return {
    envDir,
    plugins: [svelte()],
    build: {
      outDir: "./build",
      sourcemap: true,
    },
    server: {
      port: 5173,
      open: true,
    },
    base: env.VITE_BASE,
  };
});
