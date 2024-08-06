import type { Config } from "drizzle-kit";

export default {
  dialect: "sqlite",
  schema: "./db/schema/index.ts",
  out: "./db/drizzle",
  dbCredentials: {
    url: "sqlite.db",
  },
} satisfies Config;
