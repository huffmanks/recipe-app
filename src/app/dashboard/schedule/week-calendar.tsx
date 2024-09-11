"use client";

import {
  addWeeks,
  eachDayOfInterval,
  endOfWeek,
  format,
  isPast,
  isSameDay,
  isToday,
  startOfToday,
  startOfWeek,
  subDays,
  subWeeks,
} from "date-fns";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Schedule {
  id: string;
  familyId: string;
  recipeId: string;
  dateTime: Date;
  meal: "breakfast" | "brunch" | "lunch" | "dinner";
  recipeTitle: string;
  recipeSlug: string;
  recipeDescription: string;
  recipeImage: string | null;
  recipeServingSize: number;
  recipeIngredients: any; // update
  recipeInstructions: any; // update
  recipeCreatedAt: Date;
  recipeUpdatedAt: Date;
}

interface WeekCalendarProps {
  schedules: Schedule[];
}

export default function WeekCalendar({ schedules }: WeekCalendarProps) {
  const today = startOfToday();
  const [weekInfo, setWeekInfo] = useState(() => {
    const startDay = startOfWeek(today);
    const endDay = endOfWeek(startDay);
    return {
      monthName: format(today, "MMMM"),
      year: format(today, "yyyy"),
      selectedDate: today,
      startDay,
      endDay,
      weekDays: eachDayOfInterval({ start: startDay, end: endDay }),
    };
  });
  const [currentDayMeals, setCurrentDayMeals] = useState<Schedule[] | undefined>();

  useEffect(() => {
    const meals = schedules.filter((item) => isSameDay(item.dateTime, weekInfo.selectedDate));

    setCurrentDayMeals(meals);
  }, [weekInfo.selectedDate]);

  const getFormattedDays = (weekDays: Date[]) => {
    return weekDays.map((date) => ({
      day: date.getDate(),
      isPastDay: !isToday(date) && isPast(date),
      isCurrentDay: isToday(date),
      date,
    }));
  };

  const [formattedDays, setFormattedDays] = useState(() => getFormattedDays(weekInfo.weekDays));

  const updateWeek = (newStartDay: Date) => {
    const newEndDay = endOfWeek(newStartDay);
    const newWeekDays = eachDayOfInterval({ start: newStartDay, end: newEndDay });
    setWeekInfo({
      monthName: format(newStartDay, "MMMM"),
      year: format(newStartDay, "yyyy"),
      selectedDate: isPast(newStartDay) ? today : newStartDay,
      startDay: newStartDay,
      endDay: newEndDay,
      weekDays: newWeekDays,
    });
    setFormattedDays(getFormattedDays(newWeekDays));
  };

  const handlePrevWeek = () => {
    if (!isPast(subDays(weekInfo.startDay, 1))) {
      updateWeek(startOfWeek(subWeeks(weekInfo.startDay, 1)));
    }
  };

  const handleNextWeek = () => {
    updateWeek(startOfWeek(addWeeks(weekInfo.startDay, 1)));
  };

  const dayLabels = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  return (
    <div className="max-w-sm">
      <div className="mb-4 grid grid-cols-7 place-items-center">
        <Button
          className="size-8"
          size="icon"
          variant="outline"
          disabled={isPast(subDays(weekInfo.startDay, 1))}
          onClick={handlePrevWeek}>
          <ChevronLeftIcon className="size-4" />
        </Button>
        <div className="col-span-5 text-center text-sm">
          {weekInfo.monthName} {weekInfo.year}
        </div>
        <Button
          className="size-8"
          size="icon"
          variant="outline"
          onClick={handleNextWeek}>
          <ChevronRightIcon className="size-4" />
        </Button>
      </div>
      <div className="mb-8 grid grid-cols-7 place-items-center">
        {dayLabels.map((item) => (
          <div
            key={item}
            className="flex size-10 items-center justify-center text-xs text-muted-foreground">
            {item}
          </div>
        ))}

        {formattedDays.map((item) => (
          <Button
            key={item.date.toString()}
            size="icon"
            variant="ghost"
            className={cn(
              "text-xs aria-selected:bg-accent",
              item.isCurrentDay && "bg-primary/50 aria-selected:bg-primary",
              item.isPastDay && "text-muted-foreground opacity-50"
            )}
            aria-selected={isSameDay(weekInfo.selectedDate, item.date)}
            disabled={item.isPastDay}
            tabIndex={item.isCurrentDay ? 0 : -1}
            type="button"
            onClick={() => setWeekInfo((prev) => ({ ...prev, selectedDate: item.date }))}>
            {item.day}
          </Button>
        ))}
      </div>

      <div>
        {currentDayMeals && currentDayMeals.length > 0 ? (
          currentDayMeals.map((item) => (
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
              <div className="mb-1 text-sm tracking-widest">{item.meal.toLocaleUpperCase()}</div>
              <div className="mb-2 text-lg font-bold">{item.recipeTitle}</div>
              <div>{item.recipeDescription}</div>
            </Link>
          ))
        ) : (
          <div className="text-center">No meals scheduled.</div>
        )}
      </div>
    </div>
  );
}
