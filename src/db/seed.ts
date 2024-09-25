import { Table, getTableName, sql } from "drizzle-orm";

import { connection, db } from "@/db";
import * as schema from "@/db/schema";
import {
  seedFamilies,
  seedFavorites,
  seedOrganizations,
  seedRecipes,
  seedSchedules,
  seedUsers,
} from "@/db/seeds";
import { env } from "@/env";

if (!env.DATABASE_DROP && !env.DATABASE_SEEDING) {
  throw new Error("You must set DATABASE_SEEDING or DATABASE_DROP to 'true' run this!");
}

async function resetTable(db: db, table: Table) {
  return db.execute(sql.raw(`TRUNCATE TABLE ${getTableName(table)} RESTART IDENTITY CASCADE`));
}

async function run() {
  for (const table of [
    schema.organizations,
    schema.families,
    schema.users,
    schema.recipes,
    schema.favorites,
    schema.schedules,
  ]) {
    await resetTable(db, table);
  }

  if (env.DATABASE_DROP) {
    await connection.end();
    return;
  }

  await seedOrganizations(db);
  await seedFamilies(db);
  await seedUsers(db);
  await seedRecipes(db);
  await seedFavorites(db);
  await seedSchedules(db);

  await connection.end();
}

run()
  .then(() => console.log("Seeding completed!"))
  .catch(console.error);
