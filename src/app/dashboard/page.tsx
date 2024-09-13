import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

// Grid, box, dashboard thing
// 1. featured recipe (random meal)
// 2. upcoming scheduled meal (first day today or upcoming and show multiple meals if more than one for that day)
// 3. recent (show last 5 created recipes)
export default async function DashboardPage() {
  return (
    <>
      <h1 className="mb-6 text-3xl font-medium tracking-wide">Dashboard</h1>
      <p>Welcome aboard!</p>

      <Carousel>
        <CarouselContent className="-ml-4">
          <CarouselItem className="basis-1/2 pl-4 md:basis-1/3">...</CarouselItem>
        </CarouselContent>
      </Carousel>
    </>
  );
}
