import { ScrapedRecipe } from "@/puppeteer";

function parseTime(time: string): number | null {
  const timePattern = /P(T(\d+H)?(\d+M)?)/;
  const match = timePattern.exec(time);
  if (!match) return null;

  const hours = match[2] ? parseInt(match[2].replace("H", "")) : 0;
  const minutes = match[3] ? parseInt(match[3].replace("M", "")) : 0;
  return hours * 60 + minutes;
}

interface ParseRecipeForTagsProps {
  recipe: ScrapedRecipe;
  time: string;
}

export function parseRecipeForTags({ recipe, time }: ParseRecipeForTagsProps) {
  const tags = [];
  const meatKeywords = [
    "chicken",
    "beef",
    "pork",
    "lamb",
    "fish",
    "shrimp",
    "scallop",
    "crab",
    "lobster",
    "turkey",
    "bacon",
    "ham",
  ];
  const pastaKeywords = ["pasta", "spaghetti", "penne", "macaroni", "lasagna", "noodle"];

  const lowerCaseIngredients = recipe.ingredients.map((ingredient) => ingredient.toLowerCase());

  const hasMeat = lowerCaseIngredients.some((ingredient) =>
    meatKeywords.some((meat) => ingredient.includes(meat))
  );

  const hasPasta = lowerCaseIngredients.some((ingredient) =>
    pastaKeywords.some((pasta) => ingredient.includes(pasta))
  );

  if (hasMeat) {
    const foundMeats = meatKeywords.filter((meat) =>
      lowerCaseIngredients.some((ingredient) => ingredient.includes(meat))
    );
    tags.push(...foundMeats);
  } else {
    tags.push("vegetarian");
  }

  if (hasPasta) {
    tags.push("pasta");
  }

  const totalTime = parseTime(time || "");
  if (totalTime && totalTime <= 30) {
    tags.push("under 30 mins");
  }

  return tags;
}
