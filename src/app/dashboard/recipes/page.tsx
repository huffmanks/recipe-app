import { and, eq, like, or, sql } from "drizzle-orm";

import { auth } from "@/auth/validate-request";
import db from "@/db";
import { favorites, recipes } from "@/db/schema";

import RecipeCard from "@/components/custom/recipe-card";

interface RecipesPageProps {
  searchParams: { [key: string]: string | undefined };
}

export default async function RecipesPage({ searchParams }: RecipesPageProps) {
  const searchPattern = searchParams?.q ? `%${searchParams.q}%` : null;

  const { user } = await auth();

  const allRecipes = searchPattern
    ? await db
        .select({
          id: recipes.id,
          title: recipes.title,
          slug: recipes.slug,
          description: recipes.description,
          image: recipes.image,
          prepTime: recipes.prepTime,
          cookTime: recipes.cookTime,
          totalTime: recipes.totalTime,
          servingSize: recipes.servingSize,
          categories: recipes.categories,
          cuisines: recipes.cuisines,
          tags: recipes.tags,
          ingredients: recipes.ingredients,
          instructions: recipes.instructions,
          status: recipes.status,
          visibility: recipes.visibility,
          userId: recipes.userId,
          createdAt: recipes.createdAt,
          updatedAt: recipes.updatedAt,
          isFavorite:
            sql<boolean>`CASE WHEN ${favorites.id} IS NOT NULL THEN true ELSE false END`.as(
              "isFavorite"
            ),
        })
        .from(recipes)
        .leftJoin(
          favorites,
          and(eq(favorites.recipeId, recipes.id), eq(favorites.userId, user!.id))
        )
        .where(
          or(
            like(recipes.title, searchPattern),
            like(recipes.description, searchPattern),
            sql`
              EXISTS (
                SELECT 1
                FROM unnest(${recipes.categories}) AS category
                WHERE category ILIKE ${searchPattern}
              )
            `,
            sql`
              EXISTS (
                SELECT 1
                FROM unnest(${recipes.cuisines}) AS cuisine
                WHERE cuisine ILIKE ${searchPattern}
              )
            `,
            sql`
              EXISTS (
                SELECT 1
                FROM unnest(${recipes.ingredients}) AS ingredient
                WHERE ingredient ILIKE ${searchPattern}
              )
            `
          )
        )
    : await db
        .select({
          id: recipes.id,
          title: recipes.title,
          slug: recipes.slug,
          description: recipes.description,
          image: recipes.image,
          prepTime: recipes.prepTime,
          cookTime: recipes.cookTime,
          totalTime: recipes.totalTime,
          servingSize: recipes.servingSize,
          categories: recipes.categories,
          cuisines: recipes.cuisines,
          tags: recipes.tags,
          ingredients: recipes.ingredients,
          instructions: recipes.instructions,
          status: recipes.status,
          visibility: recipes.visibility,
          userId: recipes.userId,
          createdAt: recipes.createdAt,
          updatedAt: recipes.updatedAt,
          isFavorite:
            sql<boolean>`CASE WHEN ${favorites.id} IS NOT NULL THEN true ELSE false END`.as(
              "isFavorite"
            ),
        })
        .from(recipes)
        .leftJoin(
          favorites,
          and(eq(favorites.recipeId, recipes.id), eq(favorites.userId, user!.id))
        );

  return (
    <>
      <h1 className="mb-6 text-3xl font-medium tracking-wide">Recipes</h1>

      {allRecipes && allRecipes.length > 0 ? (
        <div className="grid grid-cols-[repeat(auto-fill,_minmax(min(250px,_100%),_1fr))] gap-8">
          {allRecipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              item={recipe}
              isFavorite={recipe.isFavorite}
              userId={user!.id}
            />
          ))}
        </div>
      ) : (
        <>
          <div>No results.</div>
        </>
      )}
    </>
  );
}
