import { auth } from "@/auth";
import db from "@/db";
import { favorites, recipes } from "@/db/schema";
import { eq } from "drizzle-orm";

export default async function FavoritesPage() {
  const session = await auth();
  const result = await db
    .select()
    .from(recipes)
    .innerJoin(favorites, eq(favorites.recipeId, recipes.id))
    .where(eq(favorites.userId, session?.user.id));

  const favoriteRecipes = result.map(({ recipes }) => recipes);

  return (
    <>
      <h1 className="mb-6 text-3xl font-medium tracking-wide">Favorites</h1>

      {favoriteRecipes &&
        favoriteRecipes.map((recipe) => (
          <div key={recipe.id}>
            <div>{recipe.title}</div>
            <div>{recipe.description}</div>
          </div>
        ))}
    </>
  );
}
