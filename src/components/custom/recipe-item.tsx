import Link from "next/link";

import { ScheduleItem } from "@/app/dashboard/schedule/week-calendar";

export default function RecipeItem({ item }: { item: ScheduleItem }) {
  return (
    <>
      <Link
        className="mb-8 block"
        key={item.id}
        href={`/dashboard/recipes/${item.recipeSlug}`}>
        {item.recipeImage && (
          <div className="mb-3">
            <img
              className="rounded-md"
              src={item.recipeImage}
              alt={item.recipeTitle}
            />
          </div>
        )}
        <div className="mb-1 text-sm uppercase tracking-widest">{item.meal}</div>
        <div className="mb-2 text-lg font-bold">{item.recipeTitle}</div>
        <div>{item.recipeDescription}</div>
      </Link>
    </>
  );
}
