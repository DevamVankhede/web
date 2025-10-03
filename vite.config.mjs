import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  server: {
    open: false,
  },
  build: {
    outDir: "../dist",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        membership: resolve(__dirname, "src/membership.html"),
        aboutus: resolve(__dirname, "src/aboutus.html"),
      },
    },
  },
  root: "src",
  publicDir: ".",
});
