"use server";

import { revalidatePath } from "next/cache";

import { eq } from "drizzle-orm";

import db from "@/db";
import { InsertUser, users } from "@/db/schema";

export async function updateUser(id: string, user: Partial<InsertUser>) {
  try {
    const updatedUser = await db.update(users).set(user).where(eq(users.id, id)).returning();
    revalidatePath("/dashboard/profile");
    return { success: updatedUser, error: null };
  } catch (_error) {
    return { success: null, error: "An unexpected error occurred while updating the user." };
  }
}
