import { relations, sql } from "drizzle-orm";
import {
  sqliteTable,
  integer,
  text,
  primaryKey,
} from "drizzle-orm/sqlite-core";

import user from "./user";

const group = sqliteTable("groups", {
  id: integer("id").primaryKey(),
  name: text("name").unique(),
  createdAt: text("created_at")
    .notNull()
    .default(sql`(current_timestamp)`),
  updatedAt: text("updated_at").default(sql`(current_timestamp)`),
});

const groupUser = sqliteTable(
  "group_users",
  {
    userId: integer("user_id").references(() => user.id),
    groupId: integer("group_id").references(() => group.id),
  },
  (table) => {
    return {
      primaryKey: primaryKey({ columns: [table.userId, table.groupId] }),
    };
  },
);

const groupUserRelations = relations(groupUser, ({ one }) => ({
  user: one(user),
  group: one(group),
}));

export { group, groupUser, groupUserRelations };
