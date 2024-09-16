import Link from "next/link";

import { SelectRecipe } from "@/db/schema";
import { cn } from "@/lib/utils";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface RecipeCardProps {
  item: SelectRecipe;
  className?: string;
}

export default function RecipeCard({ item, className }: RecipeCardProps) {
  return (
    <>
      <Link
        className="block"
        key={item.id}
        href={`/dashboard/recipes/${item.slug}`}>
        <Card className={cn("max-w-sm", className)}>
          {item.image && (
            <CardHeader className="p-0">
              <img
                className="rounded-t-lg"
                src={item.image}
                alt={item.title}
              />
            </CardHeader>
          )}
          <CardContent className="p-4 pt-4">
            <CardTitle className="line-clamp-1 text-sm lg:text-lg">{item.title}</CardTitle>
            <CardDescription className="line-clamp-1 text-xs lg:text-sm">
              {item.description}
            </CardDescription>
          </CardContent>
        </Card>
      </Link>
    </>
  );
}
