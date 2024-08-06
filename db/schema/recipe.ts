import { relations, sql } from "drizzle-orm";
import {
  sqliteTable,
  integer,
  text,
  AnySQLiteColumn,
} from "drizzle-orm/sqlite-core";

import user from "./user";
import image from "./image";
import { recipeCategory } from "./category";
import { recipeTag } from "./tag";

export const recipe = sqliteTable("recipes", {
  id: integer("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  userId: integer("user_id").references(() => user.id),
  imageId: integer("image_id").references((): AnySQLiteColumn => image.id),
  instructions: text("instructions"),
  ingredients: text("ingredients"),
  servings: integer("servings"),
  createdAt: text("created_at")
    .notNull()
    .default(sql`(current_timestamp)`),
  updatedAt: text("updated_at").default(sql`(current_timestamp)`),
});

export const recipeRelations = relations(recipe, ({ one, many }) => ({
  user: one(user),
  image: one(image),
  categories: many(recipeCategory),
  tags: many(recipeTag),
}));

export default recipe;
