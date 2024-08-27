import { integer, jsonb, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const organizations = pgTable("organizations", {
  id: text("uuid").primaryKey(),
  title: text("title").notNull(),
  image: text("image"),
});

export const families = pgTable("families", {
  id: text("uuid").primaryKey(),
  title: text("title").notNull(),
  image: text("image"),
  organizationId: text("organization_id").references(() => organizations.id),
});

export const users = pgTable("users", {
  id: text("uuid").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  username: text("username").notNull().unique(),
  image: text("image"),
  organizationId: text("organization_id").references(() => organizations.id),
  familyId: text("family_id").references(() => families.id),
});

export const categories = pgTable("categories", {
  id: text("uuid").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
});

export const cuisines = pgTable("cuisines", {
  id: text("uuid").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
});

export const tags = pgTable("tags", {
  id: text("uuid").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
});

export const recipes = pgTable("recipes", {
  id: text("uuid").primaryKey(),
  userId: text("user_id").references(() => users.id),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  image: text("image"),
  categoryId: text("category_id").references(() => categories.id),
  servingSize: integer("serving_size"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  instructions: jsonb("instructions").notNull(), // Array of objects [{step, title, items: [{step, text}]}]
  ingredients: jsonb("ingredients").notNull(), // Array of objects [{count, unit, text}]
});

export const recipeCuisines = pgTable("recipe_cuisines", {
  recipeId: text("recipe_id").references(() => recipes.id),
  cuisineId: text("cuisine_id").references(() => cuisines.id),
});

export const recipeTags = pgTable("recipe_tags", {
  recipeId: text("recipe_id").references(() => recipes.id),
  tagId: text("tag_id").references(() => tags.id),
});

export const favorites = pgTable("favorites", {
  id: text("uuid").primaryKey(),
  userId: text("user_id").references(() => users.id),
  recipeId: text("recipe_id").references(() => recipes.id),
});

export const schedules = pgTable("schedules", {
  id: text("uuid").primaryKey(),
  familyId: text("family_id").references(() => families.id),
  recipeId: text("recipe_id").references(() => recipes.id),
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
