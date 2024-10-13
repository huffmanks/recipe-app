import Link from "next/link";

import { startOfToday } from "date-fns";
import { and, desc, eq, gte, sql } from "drizzle-orm";

import { auth } from "@/auth/validate-request";
import db from "@/db";
import { recipes, schedules, users } from "@/db/schema";

import { Button } from "@/components/ui/button";

import RecentCarousel from "./recent-carousel";
import UpcomingMeals from "./upcoming-meals";

export default async function DashboardPage() {
  const { user } = await auth();
  if (!user) return null;
  const featuredRecipe = await db
    .select()
    .from(recipes)
    .orderBy(sql`RANDOM()`)
    .limit(1);

  const recentRecipes = await db.select().from(recipes).orderBy(desc(recipes.createdAt)).limit(10);

  const today = startOfToday();
  const scheduledMeals = await db
    .select({
      id: schedules.id,
      familyId: schedules.familyId,
      recipeId: schedules.recipeId,
      dateTime: schedules.dateTime,
      meal: schedules.meal,
      title: recipes.title,
      slug: recipes.slug,
      description: recipes.description,
      image: recipes.image,
    })
    .from(schedules)
    .innerJoin(users, eq(schedules.familyId, users.familyId))
    .innerJoin(recipes, eq(schedules.recipeId, recipes.id))
    .where(and(eq(users.id, user.id), gte(schedules.dateTime, today)))
    .orderBy(schedules.dateTime, schedules.meal);

  return (
    <>
      <h1 className="mb-6 text-3xl font-medium tracking-wide">Dashboard</h1>

      <section className="relative mb-10 h-48 overflow-hidden rounded-lg lg:h-64">
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
      </section>

      <UpcomingMeals scheduledMeals={scheduledMeals} />

      <RecentCarousel recentRecipes={recentRecipes} />
    </>
  );
}
