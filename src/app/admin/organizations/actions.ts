"use server";

import { eq } from "drizzle-orm";

import db from "@/db";
import { InsertOrganization, organizations } from "@/db/schema";

export async function createOrganization(organization: InsertOrganization) {
  try {
    return db.insert(organizations).values(organization).returning();
  } catch (error) {
    console.log(error);
  }
}

export async function updateOrganization(id: string, organization: Partial<InsertOrganization>) {
  try {
    return db.update(organizations).set(organization).where(eq(organizations.id, id)).returning();
  } catch (error) {
    console.log(error);
  }
}

export async function deleteOrganization(id: string) {
  try {
    return db.delete(organizations).where(eq(organizations.id, id)).returning();
  } catch (error) {
    console.log(error);
  }
}
