import type db from "@/db";
import {
  accounts,
  categories,
  cuisines,
  families,
  favorites,
  ingredientGroups,
  instructionGroups,
  memberships,
  recipeCuisines,
  recipeIngredients,
  recipeInstructions,
  recipeTags,
  recipes,
  schedules,
  tags,
  users,
} from "@/db/schema";
import {
  accountData,
  categoryData,
  cuisineData,
  familyData,
  favoriteData,
  ingredientGroupData,
  instructionGroupData,
  membershipData,
  recipeCuisineData,
  recipeData,
  recipeIngredientData,
  recipeInstructionData,
  recipeTagData,
  scheduleData,
  tagData,
  userData,
} from "@/db/seeds/data";

export async function seedFamilies(db: db) {
  await db.insert(families).values(familyData);
}

export async function seedUsers(db: db) {
  await db.insert(users).values(userData);
}

export async function seedMemberships(db: db) {
  await db.insert(memberships).values(membershipData);
}

export async function seedAccounts(db: db) {
  await db.insert(accounts).values(accountData);
}

export async function seedCategories(db: db) {
  await db.insert(categories).values(categoryData);
}

export async function seedRecipes(db: db) {
  await db.insert(recipes).values(recipeData);
}

export async function seedCuisines(db: db) {
  await db.insert(cuisines).values(cuisineData);
}

export async function seedRecipeCuisines(db: db) {
  await db.insert(recipeCuisines).values(recipeCuisineData);
}

export async function seedTags(db: db) {
  await db.insert(tags).values(tagData);
}

export async function seedRecipeTags(db: db) {
  await db.insert(recipeTags).values(recipeTagData);
}

export async function seedIngredientGroups(db: db) {
  await db.insert(ingredientGroups).values(ingredientGroupData);
}

export async function seedRecipeIngredients(db: db) {
  await db.insert(recipeIngredients).values(recipeIngredientData);
}

export async function seedInstructionGroups(db: db) {
  await db.insert(instructionGroups).values(instructionGroupData);
}

export async function seedRecipeInstructions(db: db) {
  await db.insert(recipeInstructions).values(recipeInstructionData);
}

export async function seedFavorites(db: db) {
  await db.insert(favorites).values(favoriteData);
}

export async function seedSchedules(db: db) {
  await db.insert(schedules).values(scheduleData);
}
