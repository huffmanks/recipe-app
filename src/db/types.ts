import {
  ACCOUNT_MEASUREMENT,
  ACCOUNT_PLANS,
  ACCOUNT_ROLES,
  ACCOUNT_THEME,
  RECIPE_STATUS,
  RECIPE_VISIBILITY,
  SCHEDULE_MEALS,
} from "./constants";
import {
  accounts,
  categories,
  cuisines,
  families,
  favorites,
  ingredientGroups,
  instructionGroups,
  memberships,
  recipeCuisines,
  recipeIngredients,
  recipeInstructions,
  recipeTags,
  recipes,
  schedules,
  tags,
  users,
} from "./schema";

export type SelectFamily = typeof families.$inferSelect;
export type InsertFamily = typeof families.$inferInsert;
export type SelectUser = Omit<typeof users.$inferSelect, "hashedPassword">;
export type InsertUser = typeof users.$inferInsert;
export type SelectMembership = typeof memberships.$inferSelect;
export type InsertMembership = typeof memberships.$inferInsert;
export type SelectAccount = typeof accounts.$inferSelect;
export type InsertAccount = typeof accounts.$inferInsert;
export type SelectCategory = typeof categories.$inferSelect;
export type InsertCategory = typeof categories.$inferInsert;
export type SelectRecipe = typeof recipes.$inferSelect;
export type InsertRecipe = typeof recipes.$inferInsert;
export type SelectCuisine = typeof cuisines.$inferSelect;
export type InsertCuisine = typeof cuisines.$inferInsert;
export type SelectRecipeCuisine = typeof recipeCuisines.$inferSelect;
export type InsertRecipeCuisine = typeof recipeCuisines.$inferInsert;
export type SelectTag = typeof tags.$inferSelect;
export type InsertTag = typeof tags.$inferInsert;
export type SelectRecipeTag = typeof recipeTags.$inferSelect;
export type InsertRecipeTag = typeof recipeTags.$inferInsert;
export type SelectIngredientGroup = typeof ingredientGroups.$inferSelect;
export type InsertIngredientGroup = typeof ingredientGroups.$inferInsert;
export type SelectRecipeIngredient = typeof recipeIngredients.$inferSelect;
export type InsertRecipeIngredient = typeof recipeIngredients.$inferInsert;
export type SelectInstructionGroup = typeof instructionGroups.$inferSelect;
export type InsertInstructionGroup = typeof instructionGroups.$inferInsert;
export type SelectRecipeInstruction = typeof recipeInstructions.$inferSelect;
export type InsertRecipeInstruction = typeof recipeInstructions.$inferInsert;
export type SelectFavorite = typeof favorites.$inferSelect;
export type InsertFavorite = typeof favorites.$inferInsert;
export type SelectSchedule = typeof schedules.$inferSelect;
export type InsertSchedule = typeof schedules.$inferInsert;

// Enum types
export type AccountRole = (typeof ACCOUNT_ROLES)[keyof typeof ACCOUNT_ROLES];
export type AccountPlan = (typeof ACCOUNT_PLANS)[keyof typeof ACCOUNT_PLANS];
export type AccountTheme = (typeof ACCOUNT_THEME)[keyof typeof ACCOUNT_THEME];
export type AccountMeasurement = (typeof ACCOUNT_MEASUREMENT)[keyof typeof ACCOUNT_MEASUREMENT];
export type RecipeStatus = (typeof RECIPE_STATUS)[keyof typeof RECIPE_STATUS];
export type RecipeVisibility = (typeof RECIPE_VISIBILITY)[keyof typeof RECIPE_VISIBILITY];
export type ScheduleMeal = (typeof SCHEDULE_MEALS)[keyof typeof SCHEDULE_MEALS];
