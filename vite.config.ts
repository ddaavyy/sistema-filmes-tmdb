import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: "@src", replacement: path.resolve(__dirname, "src") },
      { find: "@modules", replacement: path.resolve(__dirname, "src/modules") },
      { find: "@shared", replacement: path.resolve(__dirname, "src/shared") },
    ],
  },
});
