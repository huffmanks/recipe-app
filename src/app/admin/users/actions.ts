"use server";

import { revalidatePath } from "next/cache";

import { eq } from "drizzle-orm";

import db from "@/db";
import { InsertUser, users } from "@/db/schema";

export async function createUser(user: InsertUser) {
  try {
    const createdUser = await db.insert(users).values(user).returning();
    revalidatePath("/admin/users");
    return { success: createdUser, error: null };
  } catch (_error) {
    return { success: null, error: "An unexpected error occurred while creating the user." };
  }
}

export async function updateUser(id: string, user: Partial<InsertUser>) {
  try {
    const updatedUser = await db.update(users).set(user).where(eq(users.id, id)).returning();
    revalidatePath("/admin/users");
    return { success: updatedUser, error: null };
  } catch (_error) {
    return { success: null, error: "An unexpected error occurred while updating the user." };
  }
}

export async function deleteUser(id: string) {
  try {
    const deletedUser = await db.delete(users).where(eq(users.id, id)).returning();
    revalidatePath("/admin/users");
    return { success: deletedUser, error: null };
  } catch (_error) {
    return { success: null, error: "An unexpected error occurred while deleting the user." };
  }
}
