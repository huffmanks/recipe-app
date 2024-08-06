import { relations, sql } from "drizzle-orm";
import {
  sqliteTable,
  integer,
  text,
  AnySQLiteColumn,
} from "drizzle-orm/sqlite-core";

import image from "./image";
import recipe from "./recipe";
import favorite from "./favorite";
import { groupUser } from "./group";

const user = sqliteTable("users", {
  id: integer("id").primaryKey(),
  username: text("username").unique(),
  password: text("password"),
  imageId: integer("image_id").references((): AnySQLiteColumn => image.id),
  createdAt: text("created_at")
    .notNull()
    .default(sql`(current_timestamp)`),
  updatedAt: text("updated_at").default(sql`(current_timestamp)`),
});

export const userRelations = relations(user, ({ one, many }) => ({
  image: one(image),
  recipes: many(recipe),
  favorites: many(favorite),
  groups: many(groupUser),
}));

export default user;
