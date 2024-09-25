import { eq } from "drizzle-orm";

import { auth } from "@/auth/validate-request";
import db from "@/db";
import { favorites, recipes } from "@/db/schema";

import RecipeCard from "@/components/custom/recipe-card";

export default async function FavoritesPage() {
  const { user } = await auth();

  if (!user) return null;

  const result = await db
    .select()
    .from(recipes)
    .innerJoin(favorites, eq(favorites.recipeId, recipes.id))
    .where(eq(favorites.userId, user.id));

  const favoriteRecipes = result.map(({ recipes }) => recipes);

  return (
    <>
      <h1 className="mb-6 text-3xl font-medium tracking-wide">Favorites</h1>

      <div className="grid gap-8">
        {favoriteRecipes &&
          favoriteRecipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              item={recipe}
            />
          ))}
      </div>
    </>
  );
}
