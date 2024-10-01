import { like, or, sql } from "drizzle-orm";

import db from "@/db";
import { recipes } from "@/db/schema";

import { SearchForm } from "@/components/search";

interface RecipesPageProps {
  searchParams: { [key: string]: string | undefined };
}

export default async function RecipesPage({ searchParams }: RecipesPageProps) {
  const searchPattern = searchParams?.q ? `%${searchParams.q}%` : null;
  const allRecipes = searchPattern
    ? await db
        .select()
        .from(recipes)
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
    : await db.select().from(recipes);

  return (
    <>
      <h1 className="mb-6 text-3xl font-medium tracking-wide">Recipes</h1>

      <SearchForm searchTerm={searchParams?.q} />
      {allRecipes && allRecipes.length > 0 ? (
        allRecipes.map((item) => <div key={item.id}>{item.title}</div>)
      ) : (
        <>
          <div>No results.</div>
        </>
      )}
    </>
  );
}
