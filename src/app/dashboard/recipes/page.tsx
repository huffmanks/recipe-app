import db from "@/db";
import { recipes } from "@/db/schema";

export default async function RecipesPage() {
  const allRecipes = await db.select().from(recipes);
  return (
    <>
      <h1 className="mb-6 text-3xl font-medium tracking-wide">Recipes</h1>

      {allRecipes.map((item) => (
        <div>{item.title}</div>
      ))}
    </>
  );
}
