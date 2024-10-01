import Link from "next/link";

import { desc, sql } from "drizzle-orm";

import db from "@/db";
import { recipes } from "@/db/schema";

import { SearchForm } from "@/components/search";
import { Button } from "@/components/ui/button";

import RecentCarousel from "./recent-carousel";

// Grid, box, dashboard thing
// 1. featured recipe (random meal)
// 2. upcoming scheduled meal (first day today or upcoming and show multiple meals if more than one for that day)
// 3. recent (show last 5 created recipes)
export default async function DashboardPage() {
  const featuredRecipe = await db
    .select()
    .from(recipes)
    .orderBy(sql`RANDOM()`)
    .limit(1);

  const recentRecipes = await db.select().from(recipes).orderBy(desc(recipes.createdAt)).limit(5);

  return (
    <>
      <h1 className="mb-6 text-3xl font-medium tracking-wide">Dashboard</h1>

      <SearchForm />

      <div className="relative mb-10 h-48 overflow-hidden rounded-lg lg:h-64">
        <img
          className="absolute right-0 h-full w-5/6 object-cover"
          src={featuredRecipe[0].image}
          alt={featuredRecipe[0].title}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black from-20%"></div>
        <div className="absolute bottom-8 left-0 right-0 flex flex-col justify-center pl-8">
          <div className="max-w-[25ch]">
            <div className="truncate text-xl font-semibold lg:text-2xl">
              {featuredRecipe[0].title}
            </div>
            <div className="mb-5 truncate text-white/80">{featuredRecipe[0].description}</div>
          </div>

          <Button
            className="w-fit"
            asChild
            aria-label={`View the ${featuredRecipe[0].title} recipe`}>
            <Link href={`/recipes/${featuredRecipe[0].slug}`}>View</Link>
          </Button>
        </div>
      </div>

      <h3 className="text-bold mb-4 text-xl">Upcoming</h3>
      <div className="mb-10">TODO: scheduled meals</div>

      <h3 className="text-bold mb-4 text-xl">Recently added</h3>
      <RecentCarousel recentRecipes={recentRecipes} />
    </>
  );
}
