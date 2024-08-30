"use server";

import db from "@/db";
import { InsertUser, users } from "@/db/schema";

export async function createUser(user: InsertUser) {
  try {
    return db.insert(users).values(user).returning();
  } catch (error) {
    console.log(error);
  }
}
