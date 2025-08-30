import { defineNitroConfig } from "nitropack/config";

// https://nitro.build/config
export default defineNitroConfig({
  preset: "node-server",
  compatibilityDate: "latest",
  srcDir: "server",
  imports: false,
  runtimeConfig: {
    storageRoot: "data",
  },
});
