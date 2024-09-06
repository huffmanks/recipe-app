import { relations } from "drizzle-orm";
import { integer, jsonb, pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const organizations = pgTable("organizations", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  title: text("title").notNull().unique(),
  slug: text("slug").notNull().unique(),
  image: text("image").notNull(),
});

export const families = pgTable("families", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  title: text("title").notNull().unique(),
  slug: text("slug").notNull().unique(),
  image: text("image").notNull(),
  organizationId: uuid("organization_id").references(() => organizations.id),
});

export const UserRole = pgEnum("role", ["admin", "member", "guest"]);

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  username: text("username").notNull().unique(),
  image: text("image").notNull(),
  role: UserRole("role").default("member").notNull(),
  organizationId: uuid("organization_id").references(() => organizations.id),
  familyId: uuid("family_id").references(() => families.id),
});

export const categories = pgTable("categories", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  title: text("title").notNull().unique(),
  slug: text("slug").notNull().unique(),
});

export const cuisines = pgTable("cuisines", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  title: text("title").notNull().unique(),
  slug: text("slug").notNull().unique(),
});

export const tags = pgTable("tags", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  title: text("title").notNull().unique(),
  slug: text("slug").notNull().unique(),
});

export const Status = pgEnum("status", ["publish", "draft"]);
export const Visibility = pgEnum("visibility", ["public", "private"]);

export const recipes = pgTable("recipes", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  title: text("title").notNull().unique(),
  slug: text("slug").notNull().unique(),
  description: text("description").notNull(),
  image: text("image").notNull(),
  servingSize: integer("serving_size").notNull(),
  status: Status("status").default("draft").notNull(),
  visibility: Visibility("visibility").default("public").notNull(),
  userId: uuid("user_id")
    .references(() => users.id)
    .notNull(),
  categoryId: uuid("category_id")
    .references(() => categories.id)
    .notNull(),
  instructions: jsonb("instructions").notNull(), // Array of objects [{step, title, items: [{step, text}]}]
  ingredients: jsonb("ingredients").notNull(), // Array of objects [{count, unit, text}]
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const recipeCuisines = pgTable("recipe_cuisines", {
  recipeId: uuid("recipe_id")
    .references(() => recipes.id)
    .notNull(),
  cuisineId: uuid("cuisine_id")
    .references(() => cuisines.id)
    .notNull(),
});

export const recipeTags = pgTable("recipe_tags", {
  recipeId: uuid("recipe_id")
    .references(() => recipes.id)
    .notNull(),
  tagId: uuid("tag_id")
    .references(() => tags.id)
    .notNull(),
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

export const ScheduleMeal = pgEnum("meal", ["breakfast", "brunch", "lunch", "dinner"]);

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
  category: one(categories, {
    fields: [recipes.categoryId],
    references: [categories.id],
  }),
  cuisines: many(recipeCuisines),
  tags: many(recipeTags),
  favorites: many(favorites),
  schedules: many(schedules),
}));

export const recipeCuisinesRelations = relations(recipeCuisines, ({ one }) => ({
  recipe: one(recipes, {
    fields: [recipeCuisines.recipeId],
    references: [recipes.id],
  }),
  cuisine: one(cuisines, {
    fields: [recipeCuisines.cuisineId],
    references: [cuisines.id],
  }),
}));

export const recipeTagsRelations = relations(recipeTags, ({ one }) => ({
  recipe: one(recipes, {
    fields: [recipeTags.recipeId],
    references: [recipes.id],
  }),
  tag: one(tags, {
    fields: [recipeTags.tagId],
    references: [tags.id],
  }),
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
export type SelectUser = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
export type SelectCategory = typeof categories.$inferSelect;
export type InsertCategory = typeof categories.$inferInsert;
export type SelectCuisine = typeof cuisines.$inferSelect;
export type InsertCuisine = typeof cuisines.$inferInsert;
export type SelectTag = typeof tags.$inferSelect;
export type InsertTag = typeof tags.$inferInsert;
export type SelectRecipe = typeof recipes.$inferSelect;
export type InsertRecipe = typeof recipes.$inferInsert;
export type SelectRecipeCuisine = typeof recipeCuisines.$inferSelect;
export type InsertRecipeCuisine = typeof recipeCuisines.$inferInsert;
export type SelectRecipeTag = typeof recipeTags.$inferSelect;
export type InsertRecipeTag = typeof recipeTags.$inferInsert;
export type SelectFavorite = typeof favorites.$inferSelect;
export type InsertFavorite = typeof favorites.$inferInsert;
export type SelectSchedule = typeof schedules.$inferSelect;
export type InsertSchedule = typeof schedules.$inferInsert;
