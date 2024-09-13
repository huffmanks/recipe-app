import RecipeCard from "@/components/custom/recipe-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import db from "@/db";
import { recipes } from "@/db/schema";
import { desc, sql } from "drizzle-orm";

// Grid, box, dashboard thing
// 1. featured recipe (random meal)
// 2. upcoming scheduled meal (first day today or upcoming and show multiple meals if more than one for that day)
// 3. recent (show last 5 created recipes)
export default async function DashboardPage() {
  const recentRecipes = await db.select().from(recipes).orderBy(desc(recipes.createdAt)).limit(5);

  const featuredRecipe = await db
    .select()
    .from(recipes)
    .orderBy(sql`RANDOM()`)
    .limit(1);

  return (
    <>
      <h1 className="mb-6 text-3xl font-medium tracking-wide">Dashboard</h1>
      <p className="mb-8">Welcome aboard!</p>

      <div>{featuredRecipe[0].title}</div>

      <Carousel
        opts={{
          loop: true,
        }}>
        <CarouselContent className="-ml-4">
          {recentRecipes.map((item) => (
            <CarouselItem
              key={item.id}
              className="basis-1/2 pl-4 md:basis-1/3">
              <RecipeCard item={item} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </>
  );
}
