import Link from "next/link";

import { ScheduleItem } from "@/app/dashboard/schedule/week-calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function RecipeItem({
  item,
  className,
}: {
  item: ScheduleItem;
  className?: string;
}) {
  return (
    <>
      <Link
        className="mb-8 block"
        key={item.id}
        href={`/dashboard/recipes/${item.recipeSlug}`}>
        <Card className={cn("max-w-sm", className)}>
          {item.recipeImage && (
            <CardHeader className="p-0">
              <img
                className="rounded-t-lg"
                src={item.recipeImage}
                alt={item.recipeTitle}
              />
            </CardHeader>
          )}
          <CardContent className="p-4 pt-4">
            <div className="mb-1 text-sm uppercase tracking-widest">{item.meal}</div>
            <CardTitle className="text-lg">{item.recipeTitle}</CardTitle>
            <CardDescription>{item.recipeDescription}</CardDescription>
          </CardContent>
        </Card>
      </Link>
    </>
  );
}
