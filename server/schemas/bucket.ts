import * as z from "zod";

export const bucketNameSchema = z
  .string()
  .min(3)
  .max(63)
  .regex(/^[a-z0-9]+$/);

export const bucketSchema = z.object({
  name: bucketNameSchema,
  createdAt: z.number(),
});

export type Bucket = z.infer<typeof bucketSchema>;
export const bucketsSchema = z.array(bucketSchema);
export type Buckets = z.infer<typeof bucketsSchema>;
