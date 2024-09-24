import { defineConfig } from "drizzle-kit";

import { DATABASE_PREFIX } from "@/config/site";
import env from "@/env";

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./src/db/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  tablesFilter: [`${DATABASE_PREFIX}_*`],
  verbose: true,
  strict: true,
});
