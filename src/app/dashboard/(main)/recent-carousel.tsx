"use client";

import { SelectRecipe } from "@/db/schema";

import RecipeCard from "@/components/custom/recipe-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface RecentCarouselProps {
  recentRecipes: SelectRecipe[];
}

export default function RecentCarousel({ recentRecipes }: RecentCarouselProps) {
  return (
    <section className="mb-10">
      <h2 className="mb-4 text-2xl font-semibold">Recently added</h2>
      <div className="md:px-12 lg:px-0">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}>
          <CarouselContent className="-ml-4">
            {recentRecipes.map((item) => (
              <CarouselItem
                key={item.id}
                className="basis-1/2 pl-4 sm:basis-1/3">
                <RecipeCard
                  item={item}
                  isCarousel
                />
              </CarouselItem>
            ))}
          </CarouselContent>

          <div className="hidden md:block">
            <CarouselPrevious />
            <CarouselNext />
          </div>
        </Carousel>
      </div>
    </section>
  );
}
