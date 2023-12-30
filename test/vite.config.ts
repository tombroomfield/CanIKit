import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vitest/config";
import { canIKitPlugin } from "../dist/can-i-kit.esm.js";

export default defineConfig({
  plugins: [
    sveltekit(),
    canIKitPlugin({
      lax: true,
    }),
  ],
  test: {
    include: ["src/**/*.{test,spec}.{js,ts}"],
  },
});
