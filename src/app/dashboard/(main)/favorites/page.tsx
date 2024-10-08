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

  const hasRecipes = favoriteRecipes && favoriteRecipes.length > 0;

  return (
    <>
      <h1 className="mb-6 text-3xl font-medium tracking-wide">Favorites</h1>

      <div className="grid grid-cols-[repeat(auto-fill,_minmax(min(250px,_100%),_1fr))] gap-8">
        {hasRecipes ? (
          favoriteRecipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              item={recipe}
              isFavorite
              userId={user.id}
            />
          ))
        ) : (
          <div>You have no favorited recipes.</div>
        )}
      </div>
    </>
  );
}
