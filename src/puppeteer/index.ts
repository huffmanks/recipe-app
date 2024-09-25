"use server";

import puppeteer from "puppeteer";
import slugify from "slugify";

import { parseRecipeForTags } from "@/lib/parse-recipe-for-tags";

export interface ScrapedRecipe {
  title: string;
  slug: string;
  description: string;
  image: string;
  prepTime?: string;
  cookTime?: string;
  totalTime?: string;
  servingSize: number;
  categories: string[];
  cuisines: string[];
  tags?: string[];
  ingredients: string[];
  instructions: string[];
}

export async function getRecipeFromUrl(url: string): Promise<ScrapedRecipe | Error> {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle2" });

    const jsonLdData = await page.evaluate(() => {
      const script = document.querySelector("script[type='application/ld+json']");
      if (!script) return null;

      try {
        const json = JSON.parse(script.textContent || "{}");

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        function findRecipeSchema(data: any): any {
          if (!data) return null;
          if (
            data["@type"] === "Recipe" ||
            (Array.isArray(data["@type"]) && data["@type"].includes("Recipe"))
          ) {
            return data;
          }
          if (Array.isArray(data)) {
            for (const item of data) {
              const found = findRecipeSchema(item);
              if (found) return found;
            }
          }
          if (typeof data === "object") {
            for (const key in data) {
              const found = findRecipeSchema(data[key]);
              if (found) return found;
            }
          }
          return null;
        }

        return findRecipeSchema(json);
      } catch (_error) {
        return null;
      }
    });

    await browser.close();

    if (!jsonLdData) {
      throw new Error("No Recipe JSON-LD schema found on the page.");
    }

    const recipe: ScrapedRecipe = {
      title: jsonLdData.name,
      slug: slugify(jsonLdData.name, { lower: true }),
      description: jsonLdData.description,
      image: jsonLdData.image?.url || jsonLdData.image,
      cookTime: jsonLdData.cookTime || "",
      prepTime: jsonLdData.prepTime || "",
      totalTime: jsonLdData.totalTime || "",
      servingSize: Number(jsonLdData.recipeYield[0]),
      categories: jsonLdData.recipeCategory,
      cuisines: jsonLdData.recipeCuisine,
      ingredients: jsonLdData.recipeIngredient,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      instructions: jsonLdData.recipeInstructions?.map((instruction: any) =>
        typeof instruction === "string" ? instruction : instruction.text
      ),
    };

    const tags = parseRecipeForTags({ recipe, time: jsonLdData.totalTime });

    if (tags && tags.length > 0) {
      recipe.tags = tags;
    }

    return recipe;
  } catch (error) {
    return new Error(`Failed to retrieve recipe data: ${(error as Error).message}`);
  }
}
