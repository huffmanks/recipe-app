import { addDays, startOfToday } from "date-fns";
import { Scrypt } from "lucia";
import { v4 as uuidv4 } from "uuid";

import { SCHEDULE_MEALS, USER_ROLES } from "@/db/schema";

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
  recipe1,
  recipe2,
  recipe3,
  fav1,
  fav2,
  sched1,
  sched2,
  sched3,
  sched4,
  sched5,
  sched6,
] = generateUUIDs(52);

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

export const userData = [
  {
    id: user1,
    firstName: "Aquila",
    lastName: "Artemis",
    email: "aquilaartemis@example.com",
    hashedPassword,
    role: USER_ROLES.MEMBER,
    familyId: fam1,
  },
  {
    id: user2,
    firstName: "Lysander",
    lastName: "Artemis",
    email: "lysanderartemis@example.com",
    hashedPassword,
    role: USER_ROLES.GUEST,
    familyId: fam1,
  },
  {
    id: user3,
    firstName: "Ceres",
    lastName: "Bellona",
    email: "ceresbellona@example.com",
    hashedPassword,
    role: USER_ROLES.MEMBER,
    familyId: fam2,
  },
  {
    id: user4,
    firstName: "Eris",
    lastName: "Bellona",
    email: "erisbellona@example.com",
    hashedPassword,
    role: USER_ROLES.GUEST,
    familyId: fam2,
  },
  {
    id: user5,
    firstName: "Gaia",
    lastName: "Calliope",
    email: "gaiacalliope@example.com",
    hashedPassword,
    role: USER_ROLES.MEMBER,
    familyId: fam3,
  },
  {
    id: user6,
    firstName: "Hera",
    lastName: "Calliope",
    email: "heracalliope@example.com",
    hashedPassword,
    role: USER_ROLES.GUEST,
    familyId: fam3,
  },
  {
    id: user7,
    firstName: "Aegis",
    lastName: "Nyx",
    email: "aegisnyx@example.com",
    hashedPassword,
    role: USER_ROLES.MEMBER,
    familyId: fam4,
  },
  {
    id: user8,
    firstName: "Echo",
    lastName: "Nyx",
    email: "echonyx@example.com",
    hashedPassword,
    role: USER_ROLES.GUEST,
    familyId: fam4,
  },
  {
    id: user9,
    firstName: "Admin",
    lastName: "Account",
    email: "admin@example.com",
    hashedPassword,
    role: USER_ROLES.ADMIN,
    familyId: fam1,
  },
  {
    id: user10,
    firstName: "Member",
    lastName: "Account",
    email: "member@example.com",
    hashedPassword,
    role: USER_ROLES.MEMBER,
    familyId: fam1,
  },
  {
    id: user11,
    firstName: "Guest",
    lastName: "Account",
    email: "guest@example.com",
    hashedPassword,
    role: USER_ROLES.GUEST,
    familyId: fam1,
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
    categories: ["Breakfast", "Brunch"],
    cuisines: ["American"],
    tags: ["blueberries"],
    ingredients: ["1 cup of blueberries", "1 cup of flour"],
    instructions: ["Mix flour with water", "Add blueberries"],
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
    categories: ["Lunch", "Dinner"],
    cuisines: ["Mexican"],
    tags: ["beef"],
    ingredients: ["1 lb. ground beef", "12 taco shells"],
    instructions: ["Cook ground beef", "Add seasonings"],
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
    categories: ["Dinner"],
    cuisines: ["Italian"],
    tags: ["pasta", "beef"],
    ingredients: ["1 lb ground beef", "1 lb. spaghetti"],
    instructions: ["Boil water", "Cook ground beef"],
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
