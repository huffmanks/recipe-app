import { relations } from "drizzle-orm";
import {
  sqliteTable,
  integer,
  text,
  AnySQLiteColumn,
} from "drizzle-orm/sqlite-core";

import user from "./user";
import { recipe } from "./recipe";

const image = sqliteTable("images", {
  id: integer("id").primaryKey(),
  url: text("url"),
  userId: integer("user_id").references((): AnySQLiteColumn => user.id),
  recipeId: integer("recipe_id").references((): AnySQLiteColumn => recipe.id),
});

export const imageRelations = relations(image, ({ one }) => ({
  user: one(user),
  recipe: one(recipe),
}));

export default image;
