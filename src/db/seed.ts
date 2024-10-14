import { Table, getTableName, sql } from "drizzle-orm";

import { connection, db } from "@/db";
import * as schema from "@/db/schema";
import {
  seedAccounts,
  seedCategories,
  seedCuisines,
  seedFamilies,
  seedFavorites,
  seedIngredientGroups,
  seedInstructionGroups,
  seedMemberships,
  seedRecipeCuisines,
  seedRecipeIngredients,
  seedRecipeInstructions,
  seedRecipeTags,
  seedRecipes,
  seedSchedules,
  seedTags,
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
    schema.families,
    schema.users,
    schema.memberships,
    schema.accounts,
    schema.categories,
    schema.recipes,
    schema.cuisines,
    schema.recipeCuisines,
    schema.tags,
    schema.recipeTags,
    schema.ingredientGroups,
    schema.recipeIngredients,
    schema.instructionGroups,
    schema.recipeInstructions,
    schema.favorites,
    schema.schedules,
  ]) {
    await resetTable(db, table);
  }

  if (env.DATABASE_DROP) {
    await connection.end();
    return;
  }

  await seedFamilies(db);
  await seedUsers(db);
  await seedMemberships(db);
  await seedAccounts(db);
  await seedCategories(db);
  await seedRecipes(db);
  await seedCuisines(db);
  await seedRecipeCuisines(db);
  await seedTags(db);
  await seedRecipeTags(db);
  await seedIngredientGroups(db);
  await seedRecipeIngredients(db);
  await seedInstructionGroups(db);
  await seedRecipeInstructions(db);
  await seedFavorites(db);
  await seedSchedules(db);

  await connection.end();
}

run()
  .then(() => console.log(`${env.DATABASE_DROP ? "Dropping" : "Seeding"} completed!`))
  .catch(console.error);
