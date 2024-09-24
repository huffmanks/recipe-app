import { migrate } from "drizzle-orm/postgres-js/migrator";

import { connection, db } from "@/db";
import env from "@/env";

import config from "../../drizzle.config";

if (!env.DATABASE_MIGRATING) {
  throw new Error('You must set DATABASE_MIGRATING to "true" when running migrations');
}

async function run() {
  await migrate(db, { migrationsFolder: config.out! });

  await connection.end();
}

run();
