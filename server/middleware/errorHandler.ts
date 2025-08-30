import { defineEventHandler } from "h3";

export default defineEventHandler((event) => {
  event.node.res.on("error", (err) => {
    console.error("DeccanVault error: ", err);
  });
});
