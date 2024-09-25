"use client";

import { formatWeekHeading } from "@/lib/format-week-heading";
import { useScheduler } from "@/providers/scheduler";

import { Separator } from "@/components/ui/separator";

import MealItem from "./meal-item";

export default function UpcomingItems() {
  const { currentWeekMeals, weekInfo } = useScheduler();

  const weekHeading = formatWeekHeading(weekInfo.startDay, weekInfo.endDay);

  return (
    <>
      <h2 className="mb-4 text-xl font-bold">{weekHeading}</h2>

      {currentWeekMeals?.map((item) => (
        <div key={item.dayOfWeek}>
          <h3 className="mb-2 text-lg text-primary">{item.dayOfWeek}</h3>
          <div className="mb-10 grid gap-8 lg:grid-cols-3">
            {item.meals.map((subItem) => (
              <MealItem
                key={`${subItem.dateTime}${subItem.meal}`}
                item={subItem}
              />
            ))}
          </div>
          <Separator className="mb-8" />
        </div>
      ))}
    </>
  );
}
