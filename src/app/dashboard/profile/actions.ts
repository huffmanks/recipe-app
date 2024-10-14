"use server";

import { revalidatePath } from "next/cache";

import { eq } from "drizzle-orm";
import { Scrypt } from "lucia";

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

export async function updatePassword(id: string, data: { password: string }) {
  try {
    const hashedPassword = await new Scrypt().hash(data.password);

    const updatedUser = await db
      .update(users)
      .set({ hashedPassword })
      .where(eq(users.id, id))
      .returning();
    revalidatePath("/dashboard/profile");
    return { success: updatedUser, error: null };
  } catch (_error) {
    return { success: null, error: "An unexpected error occurred while changing your password." };
  }
}
