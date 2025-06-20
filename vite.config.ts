import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "./src"),
      "~components": path.resolve(__dirname, "./src/components"),
      "~features": path.resolve(__dirname, "./src/features"),
      "~hooks": path.resolve(__dirname, "./src/hooks"),
      "~pages": path.resolve(__dirname, "./src/pages"),
      "~routes": path.resolve(__dirname, "./src/routes"),
      "~services": path.resolve(__dirname, "./src/services"),
      "~styles": path.resolve(__dirname, "./src/styles"),
      "~utils": path.resolve(__dirname, "./src/utils"),
      "~types": path.resolve(__dirname, "./src/types"),
      "~themes": path.resolve(__dirname, "./src/themes"),
      "~shared": path.resolve(__dirname, "./src/shared"),
    },
  },
});
