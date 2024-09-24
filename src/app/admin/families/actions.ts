"use server";

import { eq } from "drizzle-orm";

import db from "@/db";
import { InsertFamily, families } from "@/db/schema";

export async function createFamily(family: InsertFamily) {
  try {
    return db.insert(families).values(family).returning();
  } catch (error) {
    console.log(error);
  }
}

export async function updateFamily(id: string, family: Partial<InsertFamily>) {
  try {
    return db.update(families).set(family).where(eq(families.id, id)).returning();
  } catch (error) {
    console.log(error);
  }
}

export async function deleteFamily(id: string) {
  try {
    return db.delete(families).where(eq(families.id, id)).returning();
  } catch (error) {
    console.log(error);
  }
}
