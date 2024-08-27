import type db from "@/db";
import {
  categories,
  cuisines,
  families,
  favorites,
  organizations,
  recipeCuisines,
  recipeTags,
  recipes,
  schedules,
  tags,
  users,
} from "../schema";
import {
  categoryData,
  cuisineData,
  familyData,
  favoriteData,
  orgData,
  recipeCuisineData,
  recipeData,
  recipeTagData,
  scheduleData,
  tagData,
  userData,
} from "./data";

export async function seedOrganizations(db: db) {
  await db.insert(organizations).values(orgData);
}

export async function seedFamilies(db: db) {
  await db.insert(families).values(familyData);
}

export async function seedUsers(db: db) {
  await db.insert(users).values(userData);
}

export async function seedCategories(db: db) {
  await db.insert(categories).values(categoryData);
}

export async function seedCuisines(db: db) {
  await db.insert(cuisines).values(cuisineData);
}

export async function seedTags(db: db) {
  await db.insert(tags).values(tagData);
}

export async function seedRecipes(db: db) {
  await db.insert(recipes).values(recipeData);
}

export async function seedRecipeCuisines(db: db) {
  await db.insert(recipeCuisines).values(recipeCuisineData);
}

export async function seedRecipeTags(db: db) {
  await db.insert(recipeTags).values(recipeTagData);
}

export async function seedFavorites(db: db) {
  await db.insert(favorites).values(favoriteData);
}

export async function seedSchedules(db: db) {
  await db.insert(schedules).values(scheduleData);
}
