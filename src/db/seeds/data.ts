import { addDays, set } from "date-fns";
import { Scrypt } from "lucia";
import { v4 as uuidv4 } from "uuid";

const hashedPassword = await new Scrypt().hash("password");

const todayNoon = set(new Date(), {
  hours: 12,
  minutes: 0,
  seconds: 0,
  milliseconds: 0,
});

const generateUUIDs = (count: number) => Array.from({ length: count }, () => uuidv4());

const [
  org1,
  org2,
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
  fav1,
  fav2,
  sched1,
  sched2,
] = generateUUIDs(52);

export const orgData = [
  {
    id: org1,
    title: "Aurelia",
    slug: "aurelia",
  },
  {
    id: org2,
    title: "Nebulon",
    slug: "nebulon",
  },
];

export const familyData = [
  {
    id: fam1,
    title: "Artemis",
    slug: "artemis",
    organizationId: org1,
  },
  {
    id: fam2,
    title: "Bellona",
    slug: "bellona",
    organizationId: org1,
  },
  {
    id: fam3,
    title: "Nyx",
    slug: "nyx",
    organizationId: org2,
  },
  {
    id: fam4,
    title: "Oberon",
    slug: "oberon",
    organizationId: org2,
  },
];

export const userData = [
  {
    id: user1,
    firstName: "Aquila",
    lastName: "Artemis",
    email: "aquilaartemis@example.com",
    hashedPassword,
    role: "member",
    organizationId: org1,
    familyId: fam1,
  },
  {
    id: user2,
    firstName: "Lysander",
    lastName: "Artemis",
    email: "lysanderartemis@example.com",
    hashedPassword,
    role: "guest",
    organizationId: org1,
    familyId: fam1,
  },
  {
    id: user3,
    firstName: "Ceres",
    lastName: "Bellona",
    email: "ceresbellona@example.com",
    hashedPassword,
    role: "member",
    organizationId: org1,
    familyId: fam2,
  },
  {
    id: user4,
    firstName: "Eris",
    lastName: "Bellona",
    email: "erisbellona@example.com",
    hashedPassword,
    role: "guest",
    organizationId: org1,
    familyId: fam2,
  },
  {
    id: user5,
    firstName: "Gaia",
    lastName: "Calliope",
    email: "gaiacalliope@example.com",
    hashedPassword,
    role: "member",
    organizationId: org1,
    familyId: fam3,
  },
  {
    id: user6,
    firstName: "Hera",
    lastName: "Calliope",
    email: "heracalliope@example.com",
    hashedPassword,
    role: "guest",
    organizationId: org1,
    familyId: fam3,
  },
  {
    id: user7,
    firstName: "Aegis",
    lastName: "Nyx",
    email: "aegisnyx@example.com",
    hashedPassword,
    role: "member",
    organizationId: org2,
    familyId: fam4,
  },
  {
    id: user8,
    firstName: "Echo",
    lastName: "Nyx",
    email: "echonyx@example.com",
    hashedPassword,
    role: "guest",
    organizationId: org2,
    familyId: fam4,
  },
  {
    id: user9,
    firstName: "Admin",
    lastName: "Account",
    email: "admin@example.com",
    hashedPassword,
    role: "admin",
    organizationId: org1,
    familyId: fam1,
  },
  {
    id: user10,
    firstName: "Member",
    lastName: "Account",
    email: "member@example.com",
    hashedPassword,
    role: "member",
    organizationId: org1,
    familyId: fam1,
  },
  {
    id: user11,
    firstName: "Guest",
    lastName: "Account",
    email: "guest@example.com",
    hashedPassword,
    role: "guest",
    organizationId: org1,
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

export const recipeData = [
  {
    id: recipe1,
    userId: user9,
    title: "Spaghetti Bolognese",
    slug: "spaghetti-bolognese",
    description: "A classic Italian pasta dish.",
    image: "spaghetti.png",
    categoryId: cat1,
    servingSize: 4,
    instructions: [
      {
        step: 1,
        title: "Prepare Ingredients",
        items: [{ step: 1, text: "Chop onions" }],
      },
    ],
    ingredients: [{ count: 1, unit: "cup", text: "Tomato Sauce" }],
  },
  {
    id: recipe2,
    userId: user9,
    title: "Tacos",
    slug: "tacos",
    description: "Delicious Mexican tacos.",
    image: "tacos.png",
    categoryId: cat2,
    servingSize: 2,
    instructions: [
      {
        step: 1,
        title: "Cook Meat",
        items: [{ step: 1, text: "Season beef" }],
      },
    ],
    ingredients: [{ count: 1, unit: "lb", text: "Ground Beef" }],
  },
];

export const recipeCuisineData = [
  {
    recipeId: recipe1,
    cuisineId: cuisine1,
  },
  {
    recipeId: recipe2,
    cuisineId: cuisine2,
  },
];

export const recipeTagData = [
  {
    recipeId: recipe1,
    tagId: tag1,
  },
  {
    recipeId: recipe2,
    tagId: tag2,
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
    dateTime: addDays(todayNoon, 2),
    meal: "lunch",
  },
  {
    id: sched2,
    familyId: fam1,
    recipeId: recipe2,
    dateTime: addDays(todayNoon, 3),
    meal: "lunch",
  },
];
