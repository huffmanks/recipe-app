export const ACCOUNT_ROLES = {
  ADMIN: "admin",
  MEMBER: "member",
  GUEST: "guest",
} as const;

export const ACCOUNT_PLANS = {
  FREE: "free",
  PREMIUM: "premium",
  CUSTOM: "custom",
} as const;

export const ACCOUNT_THEME = {
  LIGHT: "light",
  DARK: "dark",
  SYSTEM: "system",
} as const;

export const ACCOUNT_MEASUREMENT = {
  IMPERIAL: "metric",
  METRIC: "metric",
} as const;

export const RECIPE_STATUS = {
  PUBLISH: "publish",
  DRAFT: "draft",
} as const;

export const RECIPE_VISIBILITY = {
  PRIVATE: "private",
  PUBLIC: "public",
} as const;

export const SCHEDULE_MEALS = {
  BREAKFAST: "breakfast",
  LUNCH: "lunch",
  DINNER: "dinner",
} as const;
