import { defineHandler } from "nitro";
import { readBody } from "h3";
import { createBucket } from "../services/bucket.service";

export default defineHandler(async (event) => {
  const body = await readBody(event);
  const bucketRes = await createBucket(body.name);
  return bucketRes;
});
