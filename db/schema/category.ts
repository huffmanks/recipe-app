import { relations } from "drizzle-orm";
import {
  sqliteTable,
  integer,
  text,
  primaryKey,
} from "drizzle-orm/sqlite-core";

import { recipe } from "./recipe";

const category = sqliteTable("categories", {
  id: integer("id").primaryKey(),
  name: text("name").unique(),
});

const recipeCategory = sqliteTable(
  "recipe_categories",
  {
    recipeId: integer("recipe_id").references(() => recipe.id),
    categoryId: integer("category_id").references(() => category.id),
  },
  (table) => {
    return {
      primaryKey: primaryKey({ columns: [table.recipeId, table.categoryId] }),
    };
  },
);

const recipeCategoryRelations = relations(recipeCategory, ({ one }) => ({
  recipe: one(recipe),
  category: one(category),
}));

export { category, recipeCategory, recipeCategoryRelations };
