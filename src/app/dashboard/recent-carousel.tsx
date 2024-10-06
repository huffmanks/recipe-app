"use client";

import { useMediaQuery } from "usehooks-ts";

import { SelectRecipe } from "@/db/schema";

import RecipeCard from "@/components/custom/recipe-card";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

interface RecentCarouselProps {
  recentRecipes: SelectRecipe[];
}

export default function RecentCarousel({ recentRecipes }: RecentCarouselProps) {
  const _isDesktop = useMediaQuery("(min-width: 1024px)", {
    initializeWithValue: false,
  });

  const plugins = undefined; //[...(isDesktop ? [Autoplay({ delay: 5000 })] : [])];

  return (
    <Carousel
      plugins={plugins}
      opts={{
        align: "start",
        loop: true,
      }}>
      <CarouselContent className="-ml-4">
        {recentRecipes.map((item) => (
          <CarouselItem
            key={item.id}
            className="basis-48 pl-4">
            <RecipeCard
              item={item}
              isCarousel
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
