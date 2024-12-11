import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// Use import.meta.url to resolve __dirname in ES modules
const __dirname = path.dirname(new URL(import.meta.url).pathname);

export default defineConfig(({ mode }) => {
  const buildPath = process.env.BUILD_PATH || "dist"; // Default to 'dist' if BUILD_PATH is not set
  return {
    plugins: [react()],
    resolve: {
      alias: {
        "@components": path.resolve(__dirname, "src/components"),
      },
    },
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
