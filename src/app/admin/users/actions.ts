"use server";

import { eq } from "drizzle-orm";

import db from "@/db";
import { InsertUser, users } from "@/db/schema";

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

export async function deleteUser(id: string) {
  try {
    return db.delete(users).where(eq(users.id, id)).returning();
  } catch (error) {
    console.log(error);
  }
}
