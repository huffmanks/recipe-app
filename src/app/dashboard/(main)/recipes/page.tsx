import Link from "next/link";

import { and, eq, like, or, sql } from "drizzle-orm";
import { FilePlus2Icon } from "lucide-react";

import { auth } from "@/auth/validate-request";
import db from "@/db";
import { favorites, recipes } from "@/db/schema";

import RecipeCard from "@/components/custom/recipe-card";
import SearchFilter from "@/components/navigation/search-filter";
import { Button } from "@/components/ui/button";

interface RecipesPageProps {
  searchParams: {
    q?: string;
    categories?: string;
    cuisines?: string;
    tags?: string;
    [key: string]: string | undefined;
  };
}

export default async function RecipesPage({ searchParams }: RecipesPageProps) {
  const { user } = await auth();

  const searchPattern = searchParams?.q ? `%${searchParams.q}%` : null;

  const categoryFilter = searchParams.categories ? searchParams.categories.split(",") : [];
  const cuisineFilter = searchParams.cuisines ? searchParams.cuisines.split(",") : [];
  const tagFilter = searchParams.tags ? searchParams.tags.split(",") : [];

  const allRecipes = await db
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
      isFavorite: sql<boolean>`CASE WHEN ${favorites.id} IS NOT NULL THEN true ELSE false END`.as(
        "isFavorite"
      ),
    })
    .from(recipes)
    .leftJoin(favorites, and(eq(favorites.recipeId, recipes.id), eq(favorites.userId, user!.id)))
    .where(
      and(
        searchPattern
          ? or(
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
          : sql`true`,

        categoryFilter.length > 0
          ? sql`
          EXISTS (
            SELECT 1
            FROM unnest(${recipes.categories}) AS category
            WHERE ${sql.join(
              categoryFilter.map((cat) => sql`category ILIKE ${`%${cat}%`}`),
              sql` OR `
            )}
          )
        `
          : sql`true`,

        cuisineFilter.length > 0
          ? sql`
          EXISTS (
            SELECT 1
            FROM unnest(${recipes.cuisines}) AS cuisine
            WHERE ${sql.join(
              cuisineFilter.map((cuisine) => sql`cuisine ILIKE ${`%${cuisine}%`}`),
              sql` OR `
            )}
          )
        `
          : sql`true`,

        tagFilter.length > 0
          ? sql`
          EXISTS (
            SELECT 1
            FROM unnest(${recipes.tags}) AS tag
            WHERE ${sql.join(
              tagFilter.map((tag) => sql`tag ILIKE ${`%${tag}%`}`),
              sql` OR `
            )}
          )
        `
          : sql`true`
      )
    );

  async function getFilterValues() {
    const categoriesResult = await db.execute(
      sql`SELECT DISTINCT unnest(categories) AS value FROM ${recipes} ORDER BY value ASC`
    );

    const cuisinesResult = await db.execute(
      sql`SELECT DISTINCT unnest(cuisines) AS value FROM ${recipes} ORDER BY value ASC`
    );

    const tagsResult = await db.execute(
      sql`SELECT DISTINCT unnest(tags) AS value FROM ${recipes} ORDER BY value ASC`
    );

    const result = {
      categories: categoriesResult.map((row) => ({ value: row.value as string })),
      cuisines: cuisinesResult.map((row) => ({ value: row.value as string })),
      tags: tagsResult.map((row) => ({ value: row.value as string })),
    };

    return result;
  }

  const result = await getFilterValues();

  return (
    <>
      <div className="mb-6 flex items-center justify-between gap-8">
        <h1 className="text-3xl font-medium tracking-wide">Recipes</h1>
        <div className="flex items-center gap-2">
          <SearchFilter
            categories={result.categories}
            cuisines={result.cuisines}
            tags={result.tags}
          />
          <Button
            asChild
            className="flex h-10 w-10 items-center gap-2 p-0 sm:w-auto sm:px-4 sm:py-2">
            <Link href="/admin/users/create">
              <FilePlus2Icon className="size-5" />
              <span className="hidden sm:block">Create</span>
            </Link>
          </Button>
        </div>
      </div>

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
