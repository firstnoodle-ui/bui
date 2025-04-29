import { resolve } from "node:path";
import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";
import Dts from "vite-plugin-dts";

import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    vue(),
    Dts({
      tsconfigPath: resolve(__dirname, "tsconfig.app.json"),
    }),
    tailwindcss(),
  ],
  build: {
    lib: {
      formats: ["es"],
      name: "bui",
      fileName: (_, name) => `${name}.mjs`,
      entry: {
        index: resolve(__dirname, "src/index.ts"),
      },
    },
    rollupOptions: {
      external: ["vue", "tailwindcss"],
    },
  },
});
