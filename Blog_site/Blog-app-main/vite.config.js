import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const buildPath = process.env.BUILD_PATH || "dist"; // Default to 'dist' if BUILD_PATH is not set
  return {
    plugins: [react()],
    build: {
      outDir: buildPath,
    },
  };
});
