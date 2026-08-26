import { defineConfig } from "@lovable.dev/vite-tanstack-config";

const basePath = process.env.VITE_BASE_PATH || "/";

export default defineConfig({
  base: basePath,
  tanstackStart: {
    server: {
      entry: "server",
      preset: "static",
    },
    prerender: {
      routes: ["/"],
      crawlLinks: true,
    },
  },
});