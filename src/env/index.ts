import { createEnv } from "@t3-oss/env-nextjs";
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

export const env = createEnv({
  server: {
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
  },
  client: {
    NEXT_PUBLIC_APP_URL: z.string(),
  },
  onValidationError: (error: ZodError) => {
    console.error("❌ Invalid environment variables:", error.flatten().fieldErrors);
    process.exit(1);
  },
  emptyStringAsUndefined: true,
  experimental__runtimeEnv: {
    // eslint-disable-next-line n/no-process-env
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  },
});
