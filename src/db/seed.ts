import { connection, db } from "@/db";
import * as schema from "@/db/schema";
import env from "@/env";
import { Table, getTableName, sql } from "drizzle-orm";
import {
  seedCategories,
  seedCuisines,
  seedFamilies,
  seedFavorites,
  seedOrganizations,
  seedRecipeCuisines,
  seedRecipeTags,
  seedRecipes,
  seedSchedules,
  seedTags,
  seedUsers,
} from "./seeds";

if (!env.DATABASE_SEEDING) {
  throw new Error('You must set DATABASE_SEEDING to "true" when running seeds');
}

async function resetTable(db: db, table: Table) {
  return db.execute(sql.raw(`TRUNCATE TABLE ${getTableName(table)} RESTART IDENTITY CASCADE`));
}

async function run() {
  for (const table of [
    schema.organizations,
    schema.families,
    schema.users,
    schema.categories,
    schema.cuisines,
    schema.tags,
    schema.recipes,
    schema.recipeCuisines,
    schema.recipeTags,
    schema.favorites,
    schema.schedules,
  ]) {
    await resetTable(db, table);
  }

  await seedOrganizations(db);
  await seedFamilies(db);
  await seedUsers(db);
  await seedCategories(db);
  await seedCuisines(db);
  await seedTags(db);
  await seedRecipes(db);
  await seedRecipeCuisines(db);
  await seedRecipeTags(db);
  await seedFavorites(db);
  await seedSchedules(db);

  await connection.end();
}

run()
  .then(() => console.log("Seeding completed!"))
  .catch(console.error);
