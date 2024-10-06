"use server";

import { and, eq } from "drizzle-orm";

import db from "@/db";
import { InsertRecipe, favorites, recipes } from "@/db/schema";

export async function createRecipe(recipe: InsertRecipe) {
  try {
    return db.insert(recipes).values(recipe).returning();
  } catch (error) {
    console.log(error);
  }
}

export async function updateRecipe(id: string, recipe: Partial<InsertRecipe>) {
  try {
    return db.update(recipes).set(recipe).where(eq(recipes.id, id)).returning();
  } catch (error) {
    console.log(error);
  }
}

export async function toggleFavorite(userId: string, recipeId: string) {
  const existingFavorite = await db
    .select()
    .from(favorites)
    .where(and(eq(favorites.recipeId, recipeId), eq(favorites.userId, userId)))
    .limit(1);

  if (existingFavorite.length === 0) {
    await db.insert(favorites).values({
      userId: userId,
      recipeId: recipeId,
    });
  } else {
    await db
      .delete(favorites)
      .where(and(eq(favorites.recipeId, recipeId), eq(favorites.userId, userId)));
  }
}

export async function deleteRecipe(id: string) {
  try {
    return db.delete(recipes).where(eq(recipes.id, id)).returning();
  } catch (error) {
    console.log(error);
  }
}
