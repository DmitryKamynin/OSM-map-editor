import { defineConfig } from "vite";
import preact from "@preact/preset-vite";

// https://vitejs.dev/config/
export default defineConfig({
  preview: {
    host: "0.0.0.0",
    port: 5123,
  },
  server: {
    port: 80,
  },
  plugins: [preact()],
});
