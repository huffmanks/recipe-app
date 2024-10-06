import type db from "@/db";
import { families, favorites, recipes, schedules, users } from "@/db/schema";
import { familyData, favoriteData, recipeData, scheduleData, userData } from "@/db/seeds/data";

export async function seedFamilies(db: db) {
  await db.insert(families).values(familyData);
}

export async function seedUsers(db: db) {
  await db.insert(users).values(userData);
}

export async function seedRecipes(db: db) {
  await db.insert(recipes).values(recipeData);
}

export async function seedFavorites(db: db) {
  await db.insert(favorites).values(favoriteData);
}

export async function seedSchedules(db: db) {
  await db.insert(schedules).values(scheduleData);
}
