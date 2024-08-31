import { integer, jsonb, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const organizations = pgTable("organizations", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  title: text("title").notNull(),
  image: text("image"),
});

export const families = pgTable("families", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  title: text("title").notNull(),
  image: text("image"),
  organizationId: uuid("organization_id").references(() => organizations.id),
});

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  username: text("username").unique().notNull(),
  image: text("image"),
  organizationId: uuid("organization_id").references(() => organizations.id),
  familyId: uuid("family_id").references(() => families.id),
});

export const categories = pgTable("categories", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
});

export const cuisines = pgTable("cuisines", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
});

export const tags = pgTable("tags", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
});

export const recipes = pgTable("recipes", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  userId: uuid("user_id").references(() => users.id),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  image: text("image"),
  categoryId: uuid("category_id").references(() => categories.id),
  servingSize: integer("serving_size"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  instructions: jsonb("instructions").notNull(), // Array of objects [{step, title, items: [{step, text}]}]
  ingredients: jsonb("ingredients").notNull(), // Array of objects [{count, unit, text}]
});

export const recipeCuisines = pgTable("recipe_cuisines", {
  recipeId: uuid("recipe_id").references(() => recipes.id),
  cuisineId: uuid("cuisine_id").references(() => cuisines.id),
});

export const recipeTags = pgTable("recipe_tags", {
  recipeId: uuid("recipe_id").references(() => recipes.id),
  tagId: uuid("tag_id").references(() => tags.id),
});

export const favorites = pgTable("favorites", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  userId: uuid("user_id").references(() => users.id),
  recipeId: uuid("recipe_id").references(() => recipes.id),
});

export const schedules = pgTable("schedules", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  familyId: uuid("family_id").references(() => families.id),
  recipeId: uuid("recipe_id").references(() => recipes.id),
  dateTime: timestamp("date_time").notNull(),
  meal: text("meal").notNull(), // breakfast, lunch, dinner
});

// export const userRelations = relations(users, ({ one, many }) => ({
//   organization: one(organizations, {
//     fields: [users.organizationId],
//     references: [organizations.id],
//   }),
//   family: one(families, {
//     fields: [users.familyId],
//     references: [families.id],
//   }),
//   recipes: many(recipes),
//   favorites: many(favorites),
// }));

// export const familyRelations = relations(families, ({ one, many }) => ({
//   organization: one(organizations, {
//     fields: [families.organizationId],
//     references: [organizations.id],
//   }),
//   users: many(users),
//   schedules: many(schedules),
// }));

// export const recipeRelations = relations(recipes, ({ one, many }) => ({
//   user: one(users, {
//     fields: [recipes.userId],
//     references: [users.id],
//   }),
//   category: one(categories, {
//     fields: [recipes.categoryId],
//     references: [categories.id],
//   }),
//   cuisines: many(recipeCuisines),
//   tags: many(recipeTags),
//   favorites: many(favorites),
//   schedules: many(schedules),
// }));

export type SelectOrganization = typeof organizations.$inferSelect;
export type InsertOrganization = typeof organizations.$inferInsert;
export type SelectFamily = typeof families.$inferSelect;
export type InsertFamily = typeof families.$inferInsert;
export type SelectUser = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
