import db from "@/db";
import { recipes } from "@/db/schema";

// all recipes
// 1. category section
// 2. cuisine section
export default async function RecipesPage() {
  const allRecipes = await db.select().from(recipes);
  return (
    <>
      <h1 className="mb-6 text-3xl font-medium tracking-wide">Recipes</h1>

      {allRecipes.map((item) => (
        <div key={item.id}>{item.title}</div>
      ))}
    </>
  );
}
