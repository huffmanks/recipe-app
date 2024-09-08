"use server";

import db from "@/db";
import { InsertTag, tags } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function createTag(tag: InsertTag) {
  try {
    return db.insert(tags).values(tag).returning();
  } catch (error) {
    console.log(error);
  }
}

export async function updateTag(id: string, tag: Partial<InsertTag>) {
  try {
    return db.update(tags).set(tag).where(eq(tags.id, id)).returning();
  } catch (error) {
    console.log(error);
  }
}

export async function deleteTag(id: string) {
  try {
    return db.delete(tags).where(eq(tags.id, id)).returning();
  } catch (error) {
    console.log(error);
  }
}
