"use server";

import db from "@/db";
import { InsertCategory, categories } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function createCategory(category: InsertCategory) {
  try {
    return db.insert(categories).values(category).returning();
  } catch (error) {
    console.log(error);
  }
}

export async function updateCategory(id: string, category: Partial<InsertCategory>) {
  try {
    return db.update(categories).set(category).where(eq(categories.id, id)).returning();
  } catch (error) {
    console.log(error);
  }
}

export async function deleteCategory(id: string) {
  try {
    return db.delete(categories).where(eq(categories.id, id)).returning();
  } catch (error) {
    console.log(error);
  }
}
