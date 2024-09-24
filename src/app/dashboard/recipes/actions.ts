"use server";

import { eq } from "drizzle-orm";

import db from "@/db";
import { InsertRecipe, recipes } from "@/db/schema";

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

export async function deleteRecipe(id: string) {
  try {
    return db.delete(recipes).where(eq(recipes.id, id)).returning();
  } catch (error) {
    console.log(error);
  }
}
