"use server";

import db from "@/db";
import { InsertCuisine, cuisines } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function createCuisine(cuisine: InsertCuisine) {
  try {
    return db.insert(cuisines).values(cuisine).returning();
  } catch (error) {
    console.log(error);
  }
}

export async function updateCuisine(id: string, cuisine: Partial<InsertCuisine>) {
  try {
    return db.update(cuisines).set(cuisine).where(eq(cuisines.id, id)).returning();
  } catch (error) {
    console.log(error);
  }
}

export async function deleteCuisine(id: string) {
  try {
    return db.delete(cuisines).where(eq(cuisines.id, id)).returning();
  } catch (error) {
    console.log(error);
  }
}
