import { defineConfig } from "vite";
import preact from "@preact/preset-vite";

// https://vitejs.dev/config/
export default defineConfig({
  preview: {
    port: 3000,
  },
  server: {
    port: 80,
  },
  plugins: [preact()],
});
