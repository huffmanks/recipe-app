"use server";

import { revalidatePath } from "next/cache";

import { count, eq } from "drizzle-orm";

import db from "@/db";
import { InsertFamily, families, users } from "@/db/schema";

export async function createFamily(family: InsertFamily) {
  try {
    const createdFamily = await db.insert(families).values(family).returning();
    revalidatePath("/admin/families");
    return { success: createdFamily, error: null };
  } catch (_error) {
    return { success: null, error: "An unexpected error occurred while creating the family." };
  }
}

export async function updateFamily(id: string, family: Partial<InsertFamily>) {
  try {
    const updatedFamily = await db
      .update(families)
      .set(family)
      .where(eq(families.id, id))
      .returning();
    revalidatePath("/admin/families");
    return { success: updatedFamily, error: null };
  } catch (_error) {
    return { success: null, error: "An unexpected error occurred while updating the family." };
  }
}

export async function deleteFamily(id: string) {
  try {
    const familyUsers = await db
      .select({ count: count() })
      .from(users)
      .where(eq(users.familyId, id));

    if (familyUsers[0].count === 0) {
      const deletedFamily = await db.delete(families).where(eq(families.id, id)).returning();
      revalidatePath("/admin/families");
      return { success: deletedFamily, error: null };
    } else {
      return { success: null, error: "Can't delete family. One or more users exist." };
    }
  } catch (_error) {
    return { success: null, error: "An unexpected error occurred while deleting the family." };
  }
}
