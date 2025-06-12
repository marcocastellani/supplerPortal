import federation from "@originjs/vite-plugin-federation";
import react from "@vitejs/plugin-react";
import { cpus } from "os";
import * as path from "path";
import copy from "rollup-plugin-copy";
import { defineConfig } from "vite";
import topLevelAwait from "vite-plugin-top-level-await";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  server: {
    port: 4280,
  },
  build: {
    minify: "esbuild",
    target: "esnext",
    chunkSizeWarningLimit: 1500,
    commonjsOptions: {
      esmExternals: true,
    },
    rollupOptions: {
      maxParallelFileOps: Math.max(1, cpus().length - 1),
      output: {
        sourcemapIgnoreList: (relativeSourcePath) => {
          const normalizedPath = path.normalize(relativeSourcePath);
          return normalizedPath.includes("node_modules");
        },
      },
      cache: false,
      onwarn(warning, warn) {
        if (warning.code === "MODULE_LEVEL_DIRECTIVE") {
          return;
        }
        warn(warning);
      },
    },
    sourcemap: false,
  },
  plugins: [
    {
      // Removes pure annotations from SignalR: https://github.com/dotnet/aspnetcore/issues/55286
      name: "remove-pure-annotations",
      enforce: "pre",
      transform(code, id) {
        if (id.includes("node_modules/@microsoft/signalr")) {
          return code.replace(/\/\*#__PURE__\*\//g, "");
        }
        return null;
      },
    },
    copy({
      targets: [
        {
          src: [
            "!node_modules/@remira/unifiedui/dist/assets/shared/flags",
            "node_modules/@remira/unifiedui/dist/assets",
          ],
          dest: "src",
        },
        {
          src: "node_modules/@remira/unifiedui/dist/assets/shared/flags",
          dest: "public",
        },
        {
          src: "node_modules/@remira/unifiedui/dist/fonts",
          dest: "public",
        },
      ],
    }),
    react(),
    federation({
      name: "microfrontend-app",
      filename: "remoteEntry.js",
      exposes: {
        "./Microfrontend": "./src/Microfrontend.tsx",
        "./MyWidget": "./src/widgets/MyWidget.tsx",
      },
      shared: [
        "react",
        "react-dom",
        "@tanstack/react-query",
        "@reduxjs/toolkit",
        "redux",
        "react-redux",
      ],
    }),
    tsconfigPaths(),
    topLevelAwait({
      promiseExportName: "__tla",
      promiseImportName: (i) => `__tla_${i}`,
    }),
  ],
  resolve: {
    alias: [
      { find: "@", replacement: path.resolve(__dirname, "src/") },
      { find: /^~(.*)$/, replacement: "$1" },
    ],
  },
});
