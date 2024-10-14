import { SQL, relations, sql } from "drizzle-orm";
import {
  integer,
  pgEnum,
  pgTableCreator,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";

import { DATABASE_PREFIX } from "@/config/site";

export const pgTable = pgTableCreator((name) => `${DATABASE_PREFIX}_${name}`);

export const AccountRole = pgEnum("role", ["admin", "member", "guest"]);
export const AccountPlan = pgEnum("plan", ["free", "premium", "custom"]);
export const AccountTheme = pgEnum("theme", ["light", "dark", "system"]);
export const AccountMeasurement = pgEnum("measurement", ["imperial", "metric"]);
export const RecipeStatus = pgEnum("status", ["publish", "draft"]);
export const RecipeVisibility = pgEnum("visibility", ["public", "private"]);
export const ScheduleMeal = pgEnum("meal", ["breakfast", "lunch", "dinner"]);

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull().unique(),
  username: text("username")
    .generatedAlwaysAs((): SQL => sql`substring(${users.email} from '^[^@]+')`)
    .notNull(),
  hashedPassword: text("hashed_password").default("password").notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const accounts = pgTable("accounts", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  userId: uuid("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  role: AccountRole("role").default("member").notNull(),
  plan: AccountPlan("plan").default("free").notNull(),
  theme: AccountTheme("theme").default("system").notNull(),
  measurement: AccountMeasurement("measurement").default("imperial").notNull(),
  defaultServingSize: integer("default_serving_size").default(4).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const sessions = pgTable("sessions", {
  id: text("id").primaryKey().notNull(),
  userId: uuid("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});

export const passwordResetTokens = pgTable("password_reset_tokens", {
  id: text("id").primaryKey().notNull(),
  userId: uuid("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});

export const families = pgTable("families", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  title: text("title").notNull().unique(),
  slug: text("slug").notNull().unique(),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const memberships = pgTable(
  "memberships",
  {
    id: uuid("id").primaryKey().defaultRandom().notNull(),
    userId: uuid("user_id")
      .references(() => users.id, { onDelete: "cascade" })
      .notNull(),
    familyId: uuid("family_id")
      .references(() => families.id, { onDelete: "cascade" })
      .notNull(),
  },
  (table) => {
    return {
      uniqueUserFamily: uniqueIndex("uniqueUserFamily").on(table.userId, table.familyId),
    };
  }
);

export const categories = pgTable("categories", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  title: text("title").notNull().unique(),
  slug: text("slug").notNull().unique(),
});

export const recipes = pgTable("recipes", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  title: text("title").notNull().unique(),
  slug: text("slug").notNull().unique(),
  description: text("description").notNull(),
  image: text("image").notNull(),
  prepTime: text("prep_time"),
  cookTime: text("cook_time"),
  totalTime: text("total_time"),
  servingSize: integer("serving_size").notNull(),
  status: RecipeStatus("status").default("draft").notNull(),
  visibility: RecipeVisibility("visibility").default("public").notNull(),
  userId: uuid("user_id").references(() => users.id, { onDelete: "set null" }),
  categoryId: uuid("category_id")
    .references(() => categories.id)
    .notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const cuisines = pgTable("cuisines", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  title: text("title").notNull().unique(),
  slug: text("slug").notNull().unique(),
});

export const recipeCuisines = pgTable("recipe_cuisines", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  recipeId: uuid("recipe_id")
    .references(() => recipes.id, { onDelete: "cascade" })
    .notNull(),
  cuisineId: uuid("cuisine_id")
    .references(() => cuisines.id, { onDelete: "cascade" })
    .notNull(),
});

export const tags = pgTable("tags", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  title: text("title").notNull().unique(),
  slug: text("slug").notNull().unique(),
});

export const recipeTags = pgTable("recipe_tags", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  recipeId: uuid("recipe_id")
    .references(() => recipes.id, { onDelete: "cascade" })
    .notNull(),
  tagId: uuid("tag_id")
    .references(() => tags.id, { onDelete: "cascade" })
    .notNull(),
});

export const ingredientGroups = pgTable("ingredient_groups", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  recipeId: uuid("recipe_id")
    .references(() => recipes.id, { onDelete: "cascade" })
    .notNull(),
  title: text("title").notNull(),
  step: integer("step").notNull(),
});

export const recipeIngredients = pgTable("recipe_ingredients", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  recipeId: uuid("recipe_id")
    .references(() => recipes.id, { onDelete: "cascade" })
    .notNull(),
  groupId: uuid("group_id").references(() => ingredientGroups.id, { onDelete: "cascade" }),
  amount: integer("amount"),
  unit: text("unit"),
  name: text("name").notNull(),
});

export const instructionGroups = pgTable("instruction_groups", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  recipeId: uuid("recipe_id")
    .references(() => recipes.id, { onDelete: "cascade" })
    .notNull(),
  title: text("title").notNull(),
  step: integer("step").notNull(),
});

export const recipeInstructions = pgTable("recipe_instructions", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  recipeId: uuid("recipe_id")
    .references(() => recipes.id, { onDelete: "cascade" })
    .notNull(),
  groupId: uuid("group_id").references(() => instructionGroups.id, { onDelete: "cascade" }),
  step: integer("step").notNull(),
  text: text("description").notNull(),
});

export const favorites = pgTable(
  "favorites",
  {
    id: uuid("id").primaryKey().defaultRandom().notNull(),
    userId: uuid("user_id")
      .references(() => users.id, { onDelete: "cascade" })
      .notNull(),
    recipeId: uuid("recipe_id")
      .references(() => recipes.id, { onDelete: "cascade" })
      .notNull(),
  },
  (table) => {
    return {
      uniqueUserRecipe: uniqueIndex("unique_user_recipe").on(table.userId, table.recipeId),
    };
  }
);

export const schedules = pgTable(
  "schedules",
  {
    id: uuid("id").primaryKey().defaultRandom().notNull(),
    familyId: uuid("family_id")
      .references(() => families.id, { onDelete: "cascade" })
      .notNull(),
    recipeId: uuid("recipe_id")
      .references(() => recipes.id, { onDelete: "cascade" })
      .notNull(),
    dateTime: timestamp("date_time").notNull(),
    meal: ScheduleMeal("meal").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => {
    return {
      uniqueSchedule: uniqueIndex("unique_schedule").on(
        table.familyId,
        table.recipeId,
        table.dateTime
      ),
    };
  }
);

export const userRelations = relations(users, ({ many }) => ({
  memberships: many(memberships),
  accounts: many(accounts),
  sessions: many(sessions),
  passwordResetTokens: many(passwordResetTokens),
  recipes: many(recipes),
  favorites: many(favorites),
}));

export const membershipRelations = relations(memberships, ({ one }) => ({
  user: one(users, {
    fields: [memberships.userId],
    references: [users.id],
  }),
  family: one(families, {
    fields: [memberships.familyId],
    references: [families.id],
  }),
}));

export const accountRelations = relations(accounts, ({ one }) => ({
  user: one(users, {
    fields: [accounts.userId],
    references: [users.id],
  }),
}));

export const sessionRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
}));

export const passwordResetTokenRelations = relations(passwordResetTokens, ({ one }) => ({
  user: one(users, {
    fields: [passwordResetTokens.userId],
    references: [users.id],
  }),
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
  ingredients: many(recipeIngredients),
  instructions: many(recipeInstructions),
  schedules: many(schedules),
  favorites: many(favorites),
}));

export const categoryRelations = relations(categories, ({ many }) => ({
  recipes: many(recipes),
}));

export const cuisineRelations = relations(cuisines, ({ many }) => ({
  recipes: many(recipeCuisines),
}));

export const recipeCuisineRelations = relations(recipeCuisines, ({ one }) => ({
  recipe: one(recipes, {
    fields: [recipeCuisines.recipeId],
    references: [recipes.id],
  }),
  cuisine: one(cuisines, {
    fields: [recipeCuisines.recipeId],
    references: [cuisines.id],
  }),
}));

export const tagRelations = relations(tags, ({ many }) => ({
  recipes: many(recipeTags),
}));

export const recipeTagRelations = relations(recipeTags, ({ one }) => ({
  recipe: one(recipes, {
    fields: [recipeTags.recipeId],
    references: [recipes.id],
  }),
  tag: one(tags, {
    fields: [recipeTags.tagId],
    references: [tags.id],
  }),
}));

export const ingredientGroupRelations = relations(ingredientGroups, ({ one, many }) => ({
  recipe: one(recipes, {
    fields: [ingredientGroups.recipeId],
    references: [recipes.id],
  }),
  ingredients: many(recipeIngredients),
}));

export const recipeIngredientRelations = relations(recipeIngredients, ({ one }) => ({
  recipe: one(recipes, {
    fields: [recipeIngredients.recipeId],
    references: [recipes.id],
  }),
  group: one(ingredientGroups, {
    fields: [recipeIngredients.groupId],
    references: [ingredientGroups.id],
  }),
}));

export const instructionGroupRelations = relations(instructionGroups, ({ one, many }) => ({
  recipe: one(recipes, {
    fields: [instructionGroups.recipeId],
    references: [recipes.id],
  }),
  instructions: many(recipeInstructions),
}));

export const recipeInstructionRelations = relations(recipeInstructions, ({ one }) => ({
  recipe: one(recipes, {
    fields: [recipeInstructions.recipeId],
    references: [recipes.id],
  }),
  group: one(instructionGroups, {
    fields: [recipeInstructions.groupId],
    references: [instructionGroups.id],
  }),
}));

export const favoriteRelations = relations(favorites, ({ one }) => ({
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
