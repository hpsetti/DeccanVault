import { defineConfig } from "nitro";

// https://nitro.build/config
export default defineConfig({
  preset: "node-server",
  compatibilityDate: "latest",
  serverDir: "server",
  imports: false,
  runtimeConfig: {
    storageRoot: "./data",
  },
});
