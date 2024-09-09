"use client";

// import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { eachDayOfInterval, endOfWeek, isFuture, isPast, isToday, startOfWeek } from "date-fns";
import { useState } from "react";

export default function WeekCalendar() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const today = new Date();

  const start = startOfWeek(today);
  const end = endOfWeek(today);

  const weekDays = eachDayOfInterval({ start, end });

  const formattedDays = weekDays.map((date) => {
    const day = date.getDate();
    return {
      day,
      isPastDay: isPast(date),
      isCurrentDay: isToday(date),
      isFutureDay: isFuture(date),
      date,
    };
  });

  function handleMonthChange() {}

  return (
    <>
      {/* <Calendar
        mode="single"
        fromDate={today}
        selected={date}
        onSelect={setDate}
        className="rounded-md border"
      /> */}
      <table
        className="w-full border-collapse space-y-1"
        role="grid"
        aria-labelledby="react-day-picker-2">
        <thead className="rdp-head">
          <tr className="flex">
            <th
              scope="col"
              className="w-9 rounded-md text-[0.8rem] font-normal text-muted-foreground"
              aria-label="Sunday">
              Su
            </th>
            <th
              scope="col"
              className="w-9 rounded-md text-[0.8rem] font-normal text-muted-foreground"
              aria-label="Monday">
              Mo
            </th>
            <th
              scope="col"
              className="w-9 rounded-md text-[0.8rem] font-normal text-muted-foreground"
              aria-label="Tuesday">
              Tu
            </th>
            <th
              scope="col"
              className="w-9 rounded-md text-[0.8rem] font-normal text-muted-foreground"
              aria-label="Wednesday">
              We
            </th>
            <th
              scope="col"
              className="w-9 rounded-md text-[0.8rem] font-normal text-muted-foreground"
              aria-label="Thursday">
              Th
            </th>
            <th
              scope="col"
              className="w-9 rounded-md text-[0.8rem] font-normal text-muted-foreground"
              aria-label="Friday">
              Fr
            </th>
            <th
              scope="col"
              className="w-9 rounded-md text-[0.8rem] font-normal text-muted-foreground"
              aria-label="Saturday">
              Sa
            </th>
          </tr>
        </thead>
        <tbody className="rdp-tbody">
          <tr className="mt-2 flex w-full">
            {formattedDays.map((item) => (
              <td
                key={item.date.toString()}
                className="[&amp;:has([aria-selected].day-range-end)]:rounded-r-md [&amp;:has([aria-selected].day-outside)]:bg-accent/50 [&amp;:has([aria-selected])]:bg-accent first:[&amp;:has([aria-selected])]:rounded-l-md last:[&amp;:has([aria-selected])]:rounded-r-md relative h-9 w-9 p-0 text-center text-sm focus-within:relative focus-within:z-20"
                role="presentation">
                <button
                  name="day"
                  className={cn(
                    "rdp-button_reset rdp-button inline-flex h-9 w-9 items-center justify-center whitespace-nowrap rounded-md p-0 text-sm font-normal ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 aria-selected:opacity-100",
                    item.isPastDay && "text-muted-foreground opacity-50",
                    item.isCurrentDay
                      ? "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground"
                      : "hover:bg-accent hover:text-accent-foreground"
                  )}
                  role="gridcell"
                  aria-selected={item.isCurrentDay}
                  disabled={item.isPastDay}
                  tabIndex={item.isCurrentDay ? 0 : -1}
                  type="button">
                  {item.day}
                </button>
              </td>
            ))}
          </tr>

          {/* gray day */}
          {/* <td
              class="[&amp;:has([aria-selected].day-range-end)]:rounded-r-md [&amp;:has([aria-selected].day-outside)]:bg-accent/50 [&amp;:has([aria-selected])]:bg-accent first:[&amp;:has([aria-selected])]:rounded-l-md last:[&amp;:has([aria-selected])]:rounded-r-md relative h-9 w-9 p-0 text-center text-sm focus-within:relative focus-within:z-20"
              role="presentation">
              <button
                name="day"
                class="rdp-button_reset rdp-button inline-flex h-9 w-9 items-center justify-center whitespace-nowrap rounded-md p-0 text-sm font-normal text-muted-foreground opacity-50 ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 aria-selected:opacity-100"
                role="gridcell"
                disabled=""
                tabindex="-1"
                type="button">
                8
              </button>
            </td> */}

          {/* CURRENT DAY */}
          {/* <td
              class="[&amp;:has([aria-selected].day-range-end)]:rounded-r-md [&amp;:has([aria-selected].day-outside)]:bg-accent/50 [&amp;:has([aria-selected])]:bg-accent first:[&amp;:has([aria-selected])]:rounded-l-md last:[&amp;:has([aria-selected])]:rounded-r-md relative h-9 w-9 p-0 text-center text-sm focus-within:relative focus-within:z-20"
              role="presentation">
              <button
                name="day"
                class="rdp-button_reset rdp-button inline-flex h-9 w-9 items-center justify-center whitespace-nowrap rounded-md bg-accent bg-primary p-0 text-sm font-normal text-accent-foreground text-primary-foreground ring-offset-background transition-colors hover:bg-accent hover:bg-primary hover:text-accent-foreground hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 aria-selected:opacity-100"
                role="gridcell"
                aria-selected="true"
                tabindex="0"
                type="button">
                9
              </button>
            </td> */}

          {/* FUTURE DAY */}
          {/* <td
              class="[&amp;:has([aria-selected].day-range-end)]:rounded-r-md [&amp;:has([aria-selected].day-outside)]:bg-accent/50 [&amp;:has([aria-selected])]:bg-accent first:[&amp;:has([aria-selected])]:rounded-l-md last:[&amp;:has([aria-selected])]:rounded-r-md relative h-9 w-9 p-0 text-center text-sm focus-within:relative focus-within:z-20"
              role="presentation">
              <button
                name="day"
                class="rdp-button_reset rdp-button inline-flex h-9 w-9 items-center justify-center whitespace-nowrap rounded-md p-0 text-sm font-normal ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 aria-selected:opacity-100"
                role="gridcell"
                tabindex="-1"
                type="button">
                10
              </button>
            </td> */}
        </tbody>
      </table>
    </>
  );
}
