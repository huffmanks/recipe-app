import { relations } from "drizzle-orm";
import {
  sqliteTable,
  integer,
  text,
  primaryKey,
} from "drizzle-orm/sqlite-core";

import { recipe } from "./recipe";

const tag = sqliteTable("tags", {
  id: integer("id").primaryKey(),
  name: text("name").unique(),
});

const recipeTag = sqliteTable(
  "recipe_tags",
  {
    recipeId: integer("recipe_id").references(() => recipe.id),
    tagId: integer("tag_id").references(() => tag.id),
  },
  (table) => {
    return {
      primaryKey: primaryKey({ columns: [table.recipeId, table.tagId] }),
    };
  },
);

const recipeTagRelations = relations(recipeTag, ({ one }) => ({
  recipe: one(recipe),
  tag: one(tag),
}));

export { tag, recipeTag, recipeTagRelations };
