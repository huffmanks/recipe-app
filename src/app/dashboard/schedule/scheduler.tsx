"use client";

import { isPast, isSameDay, subDays } from "date-fns";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { useScheduler } from "@/providers/scheduler";

import { Button } from "@/components/ui/button";

export default function Scheduler() {
  const { weekInfo, dayLabels, formattedDays, handlePrevWeek, handleNextWeek, handleWeekInfo } =
    useScheduler();
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
            onClick={() => handleWeekInfo(item.date)}>
            {item.day}
          </Button>
        ))}
      </div>
    </div>
  );
}
