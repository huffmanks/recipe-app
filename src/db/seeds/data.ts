import { addDays, set } from "date-fns";
import { v4 as uuidv4 } from "uuid";

const todayNoon = set(new Date(), {
  hours: 12,
  minutes: 0,
  seconds: 0,
  milliseconds: 0,
});

const org1 = uuidv4();
const org2 = uuidv4();
const fam1 = uuidv4();
const fam2 = uuidv4();
const fam3 = uuidv4();
const fam4 = uuidv4();
const fam5 = uuidv4();
const fam6 = uuidv4();
const user1 = uuidv4();
const user2 = uuidv4();
const user3 = uuidv4();
const user4 = uuidv4();
const user5 = uuidv4();
const user6 = uuidv4();
const user7 = uuidv4();
const user8 = uuidv4();
const user9 = uuidv4();
const user10 = uuidv4();
const user11 = uuidv4();
const user12 = uuidv4();
const user13 = uuidv4();
const user14 = uuidv4();
const user15 = uuidv4();
const user16 = uuidv4();
const user17 = uuidv4();
const user18 = uuidv4();
const cat1 = uuidv4();
const cat2 = uuidv4();
const cat3 = uuidv4();
const cat4 = uuidv4();
const cat5 = uuidv4();
const cuisine1 = uuidv4();
const cuisine2 = uuidv4();
const cuisine3 = uuidv4();
const cuisine4 = uuidv4();
const cuisine5 = uuidv4();
const cuisine6 = uuidv4();
const cuisine7 = uuidv4();
const cuisine8 = uuidv4();
const cuisine9 = uuidv4();
const cuisine11 = uuidv4();
const tag1 = uuidv4();
const tag2 = uuidv4();
const tag3 = uuidv4();
const tag4 = uuidv4();
const tag5 = uuidv4();
const tag6 = uuidv4();
const tag7 = uuidv4();
const tag8 = uuidv4();
const tag9 = uuidv4();
const recipe1 = uuidv4();
const recipe2 = uuidv4();
const fav1 = uuidv4();
const fav2 = uuidv4();
const sched1 = uuidv4();
const sched2 = uuidv4();

export const orgData = [
  {
    id: org1,
    title: "Aurelia",
    image: "https://placehold.co/600x600/purple/white.png?text=A",
  },
  {
    id: org2,
    title: "Nebulon",
    image: "https://placehold.co/600x600/orange/white.png?text=N",
  },
];

export const familyData = [
  {
    id: fam1,
    title: "Artemis",
    image: "https://placehold.co/600x600/purple/white.png?text=A",
    organizationId: org1,
  },
  {
    id: fam2,
    title: "Bellona",
    image: "https://placehold.co/600x600/purple/white.png?text=B",
    organizationId: org1,
  },
  {
    id: fam3,
    title: "Calliope",
    image: "https://placehold.co/600x600/purple/white.png?text=C",
    organizationId: org1,
  },
  {
    id: fam4,
    title: "Nyx",
    image: "https://placehold.co/600x600/orange/white.png?text=N",
    organizationId: org2,
  },
  {
    id: fam5,
    title: "Oberon",
    image: "https://placehold.co/600x600/orange/white.png?text=O",
    organizationId: org2,
  },
  {
    id: fam6,
    title: "Pyxis",
    image: "https://placehold.co/600x600/orange/white.png?text=P",
    organizationId: org2,
  },
];

export const userData = [
  {
    id: user1,
    firstName: "Aquila",
    lastName: "Artemis",
    username: "aquilaartemis",
    image: "https://placehold.co/600x600/purple/white.png?text=A",
    organizationId: org1,
    familyId: fam1,
  },
  {
    id: user2,
    firstName: "Lysander",
    lastName: "Artemis",
    username: "lysanderartemis",
    image: "https://placehold.co/600x600/purple/white.png?text=L",
    organizationId: org1,
    familyId: fam1,
  },
  {
    id: user3,
    firstName: "Mira",
    lastName: "Artemis",
    username: "miraartemis",
    image: "https://placehold.co/600x600/purple/white.png?text=M",
    organizationId: org1,
    familyId: fam1,
  },
  {
    id: user4,
    firstName: "Ceres",
    lastName: "Bellona",
    username: "ceresbellona",
    image: "https://placehold.co/600x600/purple/white.png?text=C",
    organizationId: org1,
    familyId: fam2,
  },
  {
    id: user5,
    firstName: "Eris",
    lastName: "Bellona",
    username: "erisbellona",
    image: "https://placehold.co/600x600/purple/white.png?text=E",
    organizationId: org1,
    familyId: fam2,
  },
  {
    id: user6,
    firstName: "Fides",
    lastName: "Bellona",
    username: "fidesbellona",
    image: "https://placehold.co/600x600/purple/white.png?text=F",
    organizationId: org1,
    familyId: fam2,
  },
  {
    id: user7,
    firstName: "Gaia",
    lastName: "Calliope",
    username: "gaiacalliope",
    image: "https://placehold.co/600x600/purple/white.png?text=G",
    organizationId: org1,
    familyId: fam3,
  },
  {
    id: user8,
    firstName: "Hera",
    lastName: "Calliope",
    username: "heracalliope",
    image: "https://placehold.co/600x600/purple/white.png?text=H",
    organizationId: org1,
    familyId: fam3,
  },
  {
    id: user9,
    firstName: "Juno",
    lastName: "Calliope",
    username: "junocalliope",
    image: "https://placehold.co/600x600/purple/white.png?text=J",
    organizationId: org1,
    familyId: fam3,
  },
  {
    id: user10,
    firstName: "Aegis",
    lastName: "Nyx",
    username: "aegisnyx",
    image: "https://placehold.co/600x600/blue/white.png?text=A",
    organizationId: org2,
    familyId: fam4,
  },
  {
    id: user11,
    firstName: "Echo",
    lastName: "Nyx",
    username: "echonyx",
    image: "https://placehold.co/600x600/blue/white.png?text=E",
    organizationId: org2,
    familyId: fam4,
  },
  {
    id: user12,
    firstName: "Zephyr",
    lastName: "Nyx",
    username: "zephyrnyx",
    image: "https://placehold.co/600x600/blue/white.png?text=Z",
    organizationId: org2,
    familyId: fam4,
  },
  {
    id: user13,
    firstName: "Hades",
    lastName: "Oberon",
    username: "hadesoberon",
    image: "https://placehold.co/600x600/blue/white.png?text=H",
    organizationId: org2,
    familyId: fam5,
  },
  {
    id: user14,
    firstName: "Luna",
    lastName: "Oberon",
    username: "lunaoberon",
    image: "https://placehold.co/600x600/blue/white.png?text=L",
    organizationId: org2,
    familyId: fam5,
  },
  {
    id: user15,
    firstName: "Triton",
    lastName: "Oberon",
    username: "tritonoberon",
    image: "https://placehold.co/600x600/blue/white.png?text=T",
    organizationId: org2,
    familyId: fam5,
  },
  {
    id: user16,
    firstName: "Astrid",
    lastName: "Pyxis",
    username: "astridpyxis",
    image: "https://placehold.co/600x600/blue/white.png?text=A",
    organizationId: org2,
    familyId: fam6,
  },
  {
    id: user17,
    firstName: "Nova",
    lastName: "Pyxis",
    username: "novapyxis",
    image: "https://placehold.co/600x600/blue/white.png?text=N",
    organizationId: org2,
    familyId: fam6,
  },
  {
    id: user18,
    firstName: "Orion",
    lastName: "Pyxis",
    username: "orionpyxis",
    image: "https://placehold.co/600x600/blue/white.png?text=O",
    organizationId: org2,
    familyId: fam6,
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
    title: "Lunch",
    slug: "lunch",
  },
  {
    id: cat3,
    title: "Dinner",
    slug: "dinner",
  },
  {
    id: cat4,
    title: "Snack",
    slug: "snack",
  },
  {
    id: cat5,
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
    userId: user1,
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
    userId: user2,
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
    userId: user1,
    recipeId: recipe1,
  },
  {
    id: fav2,
    userId: user2,
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
    familyId: fam2,
    recipeId: recipe2,
    dateTime: addDays(todayNoon, 3),
    meal: "lunch",
  },
];
