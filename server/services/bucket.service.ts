import fs from "node:fs/promises";
import path from "node:path";

import { HTTPError } from "h3";
import { useRuntimeConfig } from "nitro/runtime-config";

import dvError from "../utils/errors";

import {
  bucketNameSchema,
  bucketsSchema,
  Bucket,
  Buckets,
} from "../schemas/bucket";

const runtimeConfig = useRuntimeConfig();

async function checkAccess(filePath: string) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function readBuckets(filePath: string) {
  const fileRawContent = await fs.readFile(filePath, "utf8");
  const fileContent = bucketsSchema.parse(JSON.parse(fileRawContent));
  return fileContent;
}

// Load Buckets (or create one if root folder is not there)

export async function loadBuckets(): Promise<Buckets> {
  const bucketsRoot = runtimeConfig.storageRoot;
  try {
    // 1. Create the folder (safely does nothing if it already exists)
    await fs.mkdir(bucketsRoot, { recursive: true });
    console.log(`Directory verified/created at: ${bucketsRoot}`);
    const fullFilePath = path.join(bucketsRoot, "buckets.json");

    // 2. read if the file exists or not (reads permissions)
    const fileExists = await checkAccess(fullFilePath);

    if (!fileExists) {
      await fs.writeFile(fullFilePath, JSON.stringify([]), "utf8");
    }

    const fileContent = await readBuckets(fullFilePath);
    return fileContent;
  } catch (err) {
    throw dvError("Buckets not loaded", "loadBucketsError", 500);
  }
}

// Save Buckets

export async function saveBuckets(buckets: Buckets): Promise<void> {
  const bucketsRoot = runtimeConfig.storageRoot;

  try {
    await fs.mkdir(bucketsRoot, { recursive: true });
    console.log(`Directory verified/created at: ${bucketsRoot}`);
    const fullFilePath = path.join(bucketsRoot, "buckets.json");

    const bucketsBuffer = bucketsSchema.parse(buckets);

    await fs.writeFile(
      fullFilePath,
      JSON.stringify(bucketsBuffer, null, 2),
      "utf8",
    );
  } catch (err) {
    throw dvError("Buckets not saved", "saveBucketsError", 500);
  }
}

// Create Bucket

export async function createBucket(
  bucketName: Bucket["name"],
): Promise<Bucket> {
  const bucketsRoot = runtimeConfig.storageRoot;
  try {
    const validatedBucketName = bucketNameSchema.parse(bucketName);
    const loadedBuckets = await loadBuckets();

    const bucketExists = loadedBuckets.some((bucket) => {
      return bucket.name === validatedBucketName;
    });

    if (bucketExists) {
      throw dvError("Bucket name already exists", "bucketNameExists", 409);
    }

    await fs.mkdir(path.join(bucketsRoot, "buckets", validatedBucketName), {
      recursive: true,
    });
    const bucket = { name: validatedBucketName, createdAt: Date.now() };
    const newBuckets = [...loadedBuckets, bucket];

    await saveBuckets(newBuckets);

    return bucket;
  } catch (err) {
    if (err instanceof HTTPError) {
      throw err;
    }
    throw dvError("Failed to create a new Bucket", "createBucketError", 500);
  }
}
