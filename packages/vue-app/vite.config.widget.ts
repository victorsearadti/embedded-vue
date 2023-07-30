import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import { defineConfig } from "vite";
import vuetify from "vite-plugin-vuetify";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vuetify()],
  build: {
    emptyOutDir: false,
    lib: {
      entry: resolve(__dirname, "src/widget.ts"),
      name: "Widget",
      fileName: "widget/index",
    },
    rollupOptions: {
      output: {
        assetFileNames: () => "widget/[name][extname]",
      },
    },
  },
  define: {
    "process.env.NODE_ENV": '"production"',
  },
});
