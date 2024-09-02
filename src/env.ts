import { config } from "dotenv";
import { expand } from "dotenv-expand";

import { ZodError, z } from "zod";

expand(config({ path: ".env.local" }));

const stringBoolean = z.coerce
  .string()
  .transform((val) => {
    return val === "true";
  })
  .default("false");

const EnvSchema = z.object({
  NODE_ENV: z.string().default("development"),
  DATABASE_HOST: z.string(),
  DATABASE_USER: z.string(),
  DATABASE_PASSWORD: z.string(),
  DATABASE_NAME: z.string(),
  DATABASE_PORT: z.coerce.number(),
  DATABASE_URL: z.string(),
  DATABASE_MIGRATING: stringBoolean,
  DATABASE_SEEDING: stringBoolean,
  DATABASE_DROP: stringBoolean,
  AUTH_SECRET: z.string(),
});

export type EnvSchema = z.infer<typeof EnvSchema>;

try {
  EnvSchema.parse(process.env);
} catch (error) {
  if (error instanceof ZodError) {
    let message = "Missing required values in .env:\n";
    error.issues.forEach((issue) => {
      message += issue.path[0] + "\n";
    });
    const e = new Error(message);
    e.stack = "";
    throw e;
  } else {
    console.error(error);
  }
}

export default EnvSchema.parse(process.env);
