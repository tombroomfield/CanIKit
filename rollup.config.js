import typescript from "@rollup/plugin-typescript";

export default {
  input: "src/index.ts", // Your entry point file
  output: [
    {
      file: "dist/can-i-kit.cjs.js", // CommonJS output
      format: "cjs",
      sourcemap: true,
    },
    {
      file: "dist/can-i-kit.esm.js", // ES module output
      format: "es",
      sourcemap: true,
    },
  ],
  external: [], // List of dependencies to leave as external
  plugins: [
    typescript(), // TypeScript plugin to transpile TS to JS
  ],
};
