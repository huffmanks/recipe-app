import { sql, InferSelectModel } from "drizzle-orm";
import {
  sqliteTable,
  integer,
  text,
  primaryKey,
  foreignKey,
  unique,
  AnySQLiteColumn,
} from "drizzle-orm/sqlite-core";

export type User = InferSelectModel<typeof users>;
export type Recipe = InferSelectModel<typeof recipes>;
export type Image = InferSelectModel<typeof images>;

export const users = sqliteTable("users", {
  id: integer("id").primaryKey(),
  username: text("username").unique(),
  password: text("password"),
  createdAt: text("created_at")
    .notNull()
    .default(sql`(current_timestamp)`),
  updatedAt: text("updated_at").default(sql`(current_timestamp)`),
});

export const recipes = sqliteTable("recipes", {
  id: integer("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  title: text("title"),
  imageId: integer("image_id").references((): AnySQLiteColumn => images.id),
  instructions: text("instructions"),
  ingredients: text("ingredients"),
  servings: integer("servings"),
  createdAt: text("created_at")
    .notNull()
    .default(sql`(current_timestamp)`),
  updatedAt: text("updated_at").default(sql`(current_timestamp)`),
});

export const categories = sqliteTable("categories", {
  id: integer("id").primaryKey(),
  name: text("name").unique(),
});

export const recipeCategories = sqliteTable(
  "recipe_categories",
  {
    recipeId: integer("recipe_id").references(() => recipes.id),
    categoryId: integer("category_id").references(() => categories.id),
  },
  (table) => {
    return {
      primaryKey: primaryKey({ columns: [table.recipeId, table.categoryId] }),
    };
  },
);

export const tags = sqliteTable("tags", {
  id: integer("id").primaryKey(),
  name: text("name").unique(),
});

export const recipeTags = sqliteTable(
  "recipe_tags",
  {
    recipeId: integer("recipe_id").references(() => recipes.id),
    tagId: integer("tag_id").references(() => tags.id),
  },
  (table) => {
    return {
      primaryKey: primaryKey({ columns: [table.recipeId, table.tagId] }),
    };
  },
);

export const images = sqliteTable("images", {
  id: integer("id").primaryKey(),
  url: text("url"),
  recipeId: integer("recipe_id").references((): AnySQLiteColumn => recipes.id),
  userId: integer("user_id").references((): AnySQLiteColumn => users.id),
});

export const favorites = sqliteTable(
  "favorites",
  {
    userId: integer("user_id").references(() => users.id),
    recipeId: integer("recipe_id").references(() => recipes.id),
  },
  (table) => {
    return {
      primaryKey: primaryKey({ columns: [table.userId, table.recipeId] }),
    };
  },
);

export const families = sqliteTable("families", {
  id: integer("id").primaryKey(),
  name: text("name").unique(),
  createdAt: text("created_at")
    .notNull()
    .default(sql`(current_timestamp)`),
  updatedAt: text("updated_at").default(sql`(current_timestamp)`),
});

export const familyUsers = sqliteTable(
  "family_users",
  {
    familyId: integer("family_id").references(() => families.id),
    userId: integer("user_id").references(() => users.id),
  },
  (table) => {
    return {
      primaryKey: primaryKey({ columns: [table.familyId, table.userId] }),
    };
  },
);
