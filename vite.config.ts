import path from "node:path";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: "@src",
        replacement: path.resolve(import.meta.dirname, "src"),
      },
      {
        find: "@modules",
        replacement: path.resolve(import.meta.dirname, "src/modules"),
      },
      {
        find: "@shared",
        replacement: path.resolve(import.meta.dirname, "src/shared"),
      },
    ],
  },
});
