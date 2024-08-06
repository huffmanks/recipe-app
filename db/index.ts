import { drizzle, BetterSQLite3Database } from "drizzle-orm/better-sqlite3";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import Database from "better-sqlite3";
import * as schema from "./schema";

const sqlite = new Database("sqlite.db");
export const db: BetterSQLite3Database = drizzle(sqlite, {
  schema,
  logger: true,
});

migrate(db, { migrationsFolder: "drizzle" });
