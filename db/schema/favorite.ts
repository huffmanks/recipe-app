import { relations } from "drizzle-orm";
import { sqliteTable, integer, primaryKey } from "drizzle-orm/sqlite-core";

import user from "./user";
import { recipe } from "./recipe";

const favorite = sqliteTable(
  "favorites",
  {
    userId: integer("user_id").references(() => user.id),
    recipeId: integer("recipe_id").references(() => recipe.id),
  },
  (table) => {
    return {
      primaryKey: primaryKey({ columns: [table.userId, table.recipeId] }),
    };
  },
);

export const favoriteRelations = relations(favorite, ({ one }) => ({
  user: one(user),
  recipe: one(recipe),
}));

export default favorite;
