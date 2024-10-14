import { addDays, startOfToday } from "date-fns";
import { Scrypt } from "lucia";
import { v4 as uuidv4 } from "uuid";

import { ACCOUNT_ROLES, ACCOUNT_THEME, SCHEDULE_MEALS } from "@/db/constants";

const hashedPassword = await new Scrypt().hash("password");

const today = startOfToday();

const generateUUIDs = (count: number) => Array.from({ length: count }, () => uuidv4());

const [
  fam1,
  fam2,
  fam3,
  fam4,
  user1,
  user2,
  user3,
  user4,
  user5,
  user6,
  user7,
  user8,
  user9,
  user10,
  user11,
  cat1,
  cat2,
  cat3,
  cat4,
  cat5,
  cat6,
  cuisine1,
  cuisine2,
  cuisine3,
  cuisine4,
  cuisine5,
  cuisine6,
  cuisine7,
  cuisine8,
  cuisine9,
  cuisine11,
  tag1,
  tag2,
  tag3,
  tag4,
  tag5,
  tag6,
  tag7,
  tag8,
  tag9,
  recipe1,
  recipe2,
  recipe3,
  ingGroup1,
  ingGroup2,
  instGroup1,
  instGroup2,
  fav1,
  fav2,
  sched1,
  sched2,
  sched3,
  sched4,
  sched5,
  sched6,
] = generateUUIDs(55);

export const userData = [
  {
    id: user1,
    firstName: "Aquila",
    lastName: "Artemis",
    email: "aquilaartemis@example.com",
    hashedPassword,
  },
  {
    id: user2,
    firstName: "Lysander",
    lastName: "Artemis",
    email: "lysanderartemis@example.com",
    hashedPassword,
  },
  {
    id: user3,
    firstName: "Ceres",
    lastName: "Bellona",
    email: "ceresbellona@example.com",
    hashedPassword,
  },
  {
    id: user4,
    firstName: "Eris",
    lastName: "Bellona",
    email: "erisbellona@example.com",
    hashedPassword,
  },
  {
    id: user5,
    firstName: "Gaia",
    lastName: "Calliope",
    email: "gaiacalliope@example.com",
    hashedPassword,
  },
  {
    id: user6,
    firstName: "Hera",
    lastName: "Calliope",
    email: "heracalliope@example.com",
    hashedPassword,
  },
  {
    id: user7,
    firstName: "Aegis",
    lastName: "Nyx",
    email: "aegisnyx@example.com",
    hashedPassword,
  },
  {
    id: user8,
    firstName: "Echo",
    lastName: "Nyx",
    email: "echonyx@example.com",
    hashedPassword,
  },
  {
    id: user9,
    firstName: "Luka",
    lastName: "Admin",
    email: "luka@example.com",
    hashedPassword,
  },
  {
    id: user10,
    firstName: "Bentlee",
    lastName: "Member",
    email: "bentlee@example.com",
    hashedPassword,
  },
  {
    id: user11,
    firstName: "Hugo",
    lastName: "Guest",
    email: "hugo@example.com",
    hashedPassword,
  },
];

export const accountData = [
  {
    userId: user1,
    role: ACCOUNT_ROLES.MEMBER,
  },
  {
    userId: user2,
    role: ACCOUNT_ROLES.GUEST,
  },
  {
    userId: user3,
    role: ACCOUNT_ROLES.MEMBER,
  },
  {
    userId: user4,
    role: ACCOUNT_ROLES.GUEST,
  },
  {
    userId: user5,
    role: ACCOUNT_ROLES.MEMBER,
  },
  {
    userId: user6,
    role: ACCOUNT_ROLES.GUEST,
  },
  {
    userId: user7,
    role: ACCOUNT_ROLES.MEMBER,
  },
  {
    userId: user8,
    role: ACCOUNT_ROLES.GUEST,
  },
  {
    userId: user9,
    role: ACCOUNT_ROLES.ADMIN,
    theme: ACCOUNT_THEME.DARK,
  },
  {
    userId: user10,
    role: ACCOUNT_ROLES.MEMBER,
  },
  {
    userId: user11,
    role: ACCOUNT_ROLES.GUEST,
  },
];

export const familyData = [
  {
    id: fam1,
    title: "Artemis",
    slug: "artemis",
  },
  {
    id: fam2,
    title: "Bellona",
    slug: "bellona",
  },
  {
    id: fam3,
    title: "Nyx",
    slug: "nyx",
  },
  {
    id: fam4,
    title: "Oberon",
    slug: "oberon",
  },
];

export const membershipData = [
  {
    userId: user1,
    familyId: fam1,
  },
  {
    userId: user2,
    familyId: fam1,
  },
  {
    userId: user3,
    familyId: fam2,
  },
  {
    userId: user4,
    familyId: fam2,
  },
  {
    userId: user5,
    familyId: fam3,
  },
  {
    userId: user6,
    familyId: fam3,
  },
  {
    userId: user7,
    familyId: fam4,
  },
  {
    userId: user8,
    familyId: fam4,
  },
  {
    userId: user9,
    familyId: fam1,
  },
  {
    userId: user10,
    familyId: fam1,
  },
  {
    userId: user11,
    familyId: fam1,
  },
];

export const categoryData = [
  {
    id: cat1,
    title: "Breakfast",
    slug: "breakfast",
  },
  {
    id: cat2,
    title: "Brunch",
    slug: "brunch",
  },
  {
    id: cat3,
    title: "Lunch",
    slug: "lunch",
  },
  {
    id: cat4,
    title: "Dinner",
    slug: "dinner",
  },
  {
    id: cat5,
    title: "Snack",
    slug: "snack",
  },
  {
    id: cat6,
    title: "Dessert",
    slug: "dessert",
  },
];

export const recipeData = [
  {
    id: recipe1,
    userId: user9,
    title: "Blueberry Pancakes",
    slug: "blueberry-pancakes",
    description: "A decadent, fluffy cake.",
    image: "/recipes/pancakes.jpg",
    prepTime: "PT5M",
    cookTime: "PT10M",
    totalTime: "PT15M",
    servingSize: 4,
    categoryId: cat1,
  },
  {
    id: recipe2,
    userId: user9,
    title: "Tacos",
    slug: "tacos",
    description: "Delicious Mexican tacos.",
    image: "/recipes/tacos.jpg",
    prepTime: "PT5M",
    cookTime: "PT15M",
    totalTime: "PT20M",
    servingSize: 4,
    categoryId: cat3,
  },
  {
    id: recipe3,
    userId: user9,
    title: "Spaghetti Bolognese",
    slug: "spaghetti-bolognese",
    description: "A classic Italian pasta dish.",
    image: "/recipes/spaghetti.jpg",
    prepTime: "PT5M",
    cookTime: "PT20M",
    totalTime: "PT25M",
    servingSize: 4,
    categoryId: cat4,
  },
];

export const cuisineData = [
  {
    id: cuisine1,
    title: "American",
    slug: "american",
  },
  {
    id: cuisine2,
    title: "Chinese",
    slug: "chinese",
  },
  {
    id: cuisine3,
    title: "French",
    slug: "french",
  },
  {
    id: cuisine4,
    title: "Greek",
    slug: "greek",
  },
  {
    id: cuisine5,
    title: "Indian",
    slug: "indian",
  },
  {
    id: cuisine6,
    title: "Italian",
    slug: "italian",
  },
  {
    id: cuisine7,
    title: "Japanese",
    slug: "japanese",
  },
  {
    id: cuisine8,
    title: "Korean",
    slug: "korean",
  },
  {
    id: cuisine9,
    title: "Mexican",
    slug: "mexican",
  },
  {
    id: cuisine11,
    title: "Thai",
    slug: "thai",
  },
];

export const recipeCuisineData = [
  {
    recipeId: recipe1,
    cuisineId: cuisine1,
  },
  {
    recipeId: recipe2,
    cuisineId: cuisine9,
  },
  {
    recipeId: recipe3,
    cuisineId: cuisine6,
  },
];

export const tagData = [
  {
    id: tag1,
    title: "30 min",
    slug: "30-min",
  },
  {
    id: tag2,
    title: "Dairy free",
    slug: "dairy-free",
  },
  {
    id: tag3,
    title: "Gluten free",
    slug: "gluten-free",
  },
  {
    id: tag4,
    title: "Low carb",
    slug: "low-carb",
  },
  {
    id: tag5,
    title: "Nut free",
    slug: "nut-free",
  },
  {
    id: tag6,
    title: "Quick",
    slug: "quick",
  },
  {
    id: tag7,
    title: "Spicy",
    slug: "spicy",
  },
  {
    id: tag8,
    title: "Vegan",
    slug: "vegan",
  },
  {
    id: tag9,
    title: "Vegetarian",
    slug: "vegetarian",
  },
];

export const recipeTagData = [
  {
    recipeId: recipe1,
    tagId: tag1,
  },
  {
    recipeId: recipe1,
    tagId: tag6,
  },
  {
    recipeId: recipe2,
    tagId: tag1,
  },
  {
    recipeId: recipe2,
    tagId: tag3,
  },
  {
    recipeId: recipe2,
    tagId: tag6,
  },
  {
    recipeId: recipe3,
    tagId: tag1,
  },
  {
    recipeId: recipe3,
    tagId: tag2,
  },
];

export const ingredientGroupData = [
  {
    id: ingGroup1,
    recipeId: recipe3,
    title: "Pasta",
    step: 1,
  },
  {
    id: ingGroup2,
    recipeId: recipe3,
    title: "Sauce",
    step: 2,
  },
];

export const recipeIngredientData = [
  {
    recipeId: recipe1,
    amount: 1,
    unit: "cup",
    name: "flour",
  },
  {
    recipeId: recipe1,
    amount: 1,
    unit: "pack",
    name: "blueberries",
  },
  {
    recipeId: recipe2,
    amount: 1,
    unit: "lb",
    name: "ground beef",
  },
  {
    recipeId: recipe2,
    amount: 12,
    name: "taco shells",
  },
  {
    recipeId: recipe3,
    groupId: ingGroup1,
    amount: 1,
    unit: "lb",
    name: "spaghetti noodles",
  },
  {
    recipeId: recipe3,
    groupId: ingGroup1,
    amount: 8,
    unit: "cups",
    name: "water",
  },
  {
    recipeId: recipe3,
    groupId: ingGroup2,
    amount: 16,
    unit: "oz",
    name: "can tomatoes",
  },
  {
    recipeId: recipe3,
    groupId: ingGroup2,
    name: "seasonings",
  },
];

export const instructionGroupData = [
  {
    id: instGroup1,
    recipeId: recipe3,
    title: "Pasta",
    step: 1,
  },
  {
    id: instGroup2,
    recipeId: recipe3,
    title: "Sauce",
    step: 2,
  },
];

export const recipeInstructionData = [
  {
    recipeId: recipe1,
    step: 1,
    text: "Mix the flour.",
  },
  {
    recipeId: recipe1,
    step: 2,
    text: "Add the blueberries.",
  },
  {
    recipeId: recipe2,
    step: 1,
    text: "Brown the ground beef.",
  },
  {
    recipeId: recipe2,
    step: 2,
    text: "Prepare the taco shells to be stuffed.",
  },
  {
    recipeId: recipe3,
    groupId: instGroup1,
    step: 1,
    text: "Boil the water.",
  },
  {
    recipeId: recipe3,
    groupId: instGroup1,
    step: 2,
    text: "Add the spaghetti noodles.",
  },
  {
    recipeId: recipe3,
    groupId: instGroup2,
    step: 1,
    text: "Crush the tomatoes.",
  },
  {
    recipeId: recipe3,
    groupId: instGroup2,
    step: 2,
    text: "Add the seasoning.",
  },
];

export const favoriteData = [
  {
    id: fav1,
    userId: user9,
    recipeId: recipe1,
  },
  {
    id: fav2,
    userId: user9,
    recipeId: recipe2,
  },
];

export const scheduleData = [
  {
    id: sched1,
    familyId: fam1,
    recipeId: recipe1,
    dateTime: addDays(today, 2),
    meal: SCHEDULE_MEALS.BREAKFAST,
  },
  {
    id: sched2,
    familyId: fam1,
    recipeId: recipe2,
    dateTime: addDays(today, 2),
    meal: SCHEDULE_MEALS.LUNCH,
  },
  {
    id: sched3,
    familyId: fam1,
    recipeId: recipe3,
    dateTime: addDays(today, 2),
    meal: SCHEDULE_MEALS.DINNER,
  },
  {
    id: sched4,
    familyId: fam1,
    recipeId: recipe1,
    dateTime: addDays(today, 3),
    meal: SCHEDULE_MEALS.BREAKFAST,
  },
  {
    id: sched5,
    familyId: fam1,
    recipeId: recipe2,
    dateTime: addDays(today, 3),
    meal: SCHEDULE_MEALS.LUNCH,
  },
  {
    id: sched6,
    familyId: fam1,
    recipeId: recipe3,
    dateTime: addDays(today, 3),
    meal: SCHEDULE_MEALS.DINNER,
  },
];
