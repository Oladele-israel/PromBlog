import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const buildPath = process.env.BUILD_PATH || "dist"; // Default to 'dist' if BUILD_PATH is not set
  return {
    plugins: [react()],
    build: {
      outDir: buildPath,
    },
    css: {
      modules: {
        scopeBehaviour: "local", // Use CSS modules by default
        localsConvention: "camelCase", // Camel case class names
        generateScopedName: "[name]__[local]___[hash:base64:5]", // Scoped naming
      },
    },
  };
});
