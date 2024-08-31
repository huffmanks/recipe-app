"use server";

import db from "@/db";
import { InsertUser, users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function createUser(user: InsertUser) {
  try {
    return db.insert(users).values(user).returning();
  } catch (error) {
    console.log(error);
  }
}

export async function updateUser(id: string, user: Partial<InsertUser>) {
  try {
    return db.update(users).set(user).where(eq(users.id, id)).returning();
  } catch (error) {
    console.log(error);
  }
}
