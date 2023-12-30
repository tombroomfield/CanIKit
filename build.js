// // build.js
// import esbuild from "esbuild";

// // Determine the Node.js version you are targeting
// const nodeVersion = "14"; // Example: Node.js 14.x
// const watch = process.argv.includes("--watch");
// esbuild
//   .build({
//     entryPoints: ["src/index.ts"], // Your main TypeScript entry file
//     bundle: true, // Bundle all dependencies into one file
//     minify: false, // Minify the output
//     sourcemap: true, // Include a source map
//     platform: "node", // Specify the platform
//     target: `node${nodeVersion}`, // Target a specific version of Node.js
//     outdir: "dist", // Specify the output directory
//     external: ["fs"], // List any peer dependencies or modules you don't want to bundle
//     format: "esm", // Specify the output format
//     tsconfig: "tsconfig.json", // Use your TypeScript config
//   })
//   .catch((e) => {
//     console.error(e);
//     process.exit(1);
//   });
