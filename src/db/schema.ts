import { SQL, relations, sql } from "drizzle-orm";
import { integer, pgEnum, pgTableCreator, text, timestamp, uuid } from "drizzle-orm/pg-core";

import { DATABASE_PREFIX } from "@/config/site";

export const pgTable = pgTableCreator((name) => `${DATABASE_PREFIX}_${name}`);

export const organizations = pgTable("organizations", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  title: text("title").notNull().unique(),
  slug: text("slug").notNull().unique(),
  image: text("image"),
});

export const families = pgTable("families", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  title: text("title").notNull().unique(),
  slug: text("slug").notNull().unique(),
  image: text("image"),
  organizationId: uuid("organization_id").references(() => organizations.id),
});

export const UserRole = pgEnum("role", ["admin", "member", "guest"]);

export const USER_ROLES = {
  ADMIN: "admin",
  MEMBER: "member",
  GUEST: "guest",
} as const;

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull().unique(),
  username: text("username")
    .generatedAlwaysAs((): SQL => sql`substring(${users.email} from '^[^@]+')`)
    .notNull(),
  hashedPassword: text("hashed_password").default("password").notNull(),
  image: text("image"),
  role: UserRole("role").default("member").notNull(),
  organizationId: uuid("organization_id").references(() => organizations.id),
  familyId: uuid("family_id").references(() => families.id),
});

export const sessions = pgTable("sessions", {
  id: text("id").primaryKey().notNull(),
  userId: uuid("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});

export const passwordResetTokens = pgTable("password_reset_tokens", {
  id: text("id").primaryKey().notNull(),
  userId: uuid("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});

export const Status = pgEnum("status", ["publish", "draft"]);
export const Visibility = pgEnum("visibility", ["public", "private"]);

export const recipes = pgTable("recipes", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  title: text("title").notNull().unique(),
  slug: text("slug").notNull().unique(),
  description: text("description").notNull(),
  image: text("image").notNull(),
  prepTime: text("prep_time"),
  cookTime: text("cook_time"),
  totalTime: text("total_time"),
  servingSize: integer("serving_size").notNull(),
  categories: text("categories").array().notNull(),
  cuisines: text("cuisines").array().notNull(),
  tags: text("tags").array(),
  ingredients: text("ingredients").array().notNull(),
  instructions: text("instructions").array().notNull(),
  status: Status("status").default("draft").notNull(),
  visibility: Visibility("visibility").default("public").notNull(),
  userId: uuid("user_id")
    .references(() => users.id)
    .notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const favorites = pgTable("favorites", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  userId: uuid("user_id")
    .references(() => users.id)
    .notNull(),
  recipeId: uuid("recipe_id")
    .references(() => recipes.id)
    .notNull(),
});

export const ScheduleMeal = pgEnum("meal", ["breakfast", "lunch", "dinner"]);
export const SCHEDULE_MEALS = {
  BREAKFAST: "breakfast",
  LUNCH: "lunch",
  DINNER: "dinner",
} as const;

export const schedules = pgTable("schedules", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  familyId: uuid("family_id")
    .references(() => families.id)
    .notNull(),
  recipeId: uuid("recipe_id")
    .references(() => recipes.id)
    .notNull(),
  dateTime: timestamp("date_time").notNull(),
  meal: ScheduleMeal("meal").notNull(),
});

export const userRelations = relations(users, ({ one, many }) => ({
  organization: one(organizations, {
    fields: [users.organizationId],
    references: [organizations.id],
  }),
  family: one(families, {
    fields: [users.familyId],
    references: [families.id],
  }),
  recipes: many(recipes),
  favorites: many(favorites),
}));

export const familyRelations = relations(families, ({ one, many }) => ({
  organization: one(organizations, {
    fields: [families.organizationId],
    references: [organizations.id],
  }),
  users: many(users),
  schedules: many(schedules),
}));

export const recipeRelations = relations(recipes, ({ one, many }) => ({
  user: one(users, {
    fields: [recipes.userId],
    references: [users.id],
  }),
  favorites: many(favorites),
  schedules: many(schedules),
}));

export const favoritesRelations = relations(favorites, ({ one }) => ({
  user: one(users, {
    fields: [favorites.userId],
    references: [users.id],
  }),
  recipe: one(recipes, {
    fields: [favorites.recipeId],
    references: [recipes.id],
  }),
}));

export const scheduleRelations = relations(schedules, ({ one }) => ({
  family: one(families, {
    fields: [schedules.familyId],
    references: [families.id],
  }),
  recipe: one(recipes, {
    fields: [schedules.recipeId],
    references: [recipes.id],
  }),
}));

export type SelectOrganization = typeof organizations.$inferSelect;
export type InsertOrganization = typeof organizations.$inferInsert;
export type SelectFamily = typeof families.$inferSelect;
export type InsertFamily = typeof families.$inferInsert;
export type SelectUser = Omit<typeof users.$inferSelect, "hashedPassword">;
export type InsertUser = Omit<typeof users.$inferInsert, "hashedPassword">;
export type SelectRecipe = typeof recipes.$inferSelect;
export type InsertRecipe = typeof recipes.$inferInsert;
export type SelectFavorite = typeof favorites.$inferSelect;
export type InsertFavorite = typeof favorites.$inferInsert;
export type SelectSchedule = typeof schedules.$inferSelect;
export type InsertSchedule = typeof schedules.$inferInsert;
