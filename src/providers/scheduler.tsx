"use client";

import { createContext, useContext, useEffect, useState } from "react";

import {
  addWeeks,
  eachDayOfInterval,
  endOfWeek,
  format,
  isPast,
  isSameDay,
  isSameWeek,
  isToday,
  startOfToday,
  startOfWeek,
  subDays,
  subWeeks,
} from "date-fns";

export interface ScheduleItem {
  id?: string;
  familyId?: string;
  recipeId?: string;
  dateTime: Date;
  meal: "breakfast" | "lunch" | "dinner";
  title?: string;
  slug?: string;
  description?: string;
  image?: string;
}

interface DayMeals {
  dayOfWeek: string;
  meals: ScheduleItem[];
}

interface WeekInfo {
  monthName: string;
  year: string;
  selectedDate: Date;
  startDay: Date;
  endDay: Date;
  weekDays: Date[];
}

interface FormattedDay {
  day: number;
  isPastDay: boolean;
  isCurrentDay: boolean;
  date: Date;
}

interface SchedulerContextType {
  weekInfo: WeekInfo;
  currentWeekMeals: DayMeals[] | undefined;
  formattedDays: FormattedDay[];
  dayLabels: string[];
  handlePrevWeek: () => void;
  handleNextWeek: () => void;
  handleWeekInfo: (date: Date) => void;
}

const SchedulerContext = createContext<SchedulerContextType | undefined>(undefined);

interface SchedulerProviderProps {
  schedules: ScheduleItem[];
  children: React.ReactNode;
}

export const SchedulerProvider = ({ children, schedules }: SchedulerProviderProps) => {
  const today = startOfToday();

  const [weekInfo, setWeekInfo] = useState<WeekInfo>(() => {
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

  const [currentWeekMeals, setCurrentWeekMeals] = useState<DayMeals[] | undefined>();

  useEffect(() => {
    const filteredItems = schedules.filter(
      (item) => isSameWeek(item.dateTime, weekInfo.selectedDate) && !isPast(item.dateTime)
    );

    const meals = generateMealsForWeek(filteredItems);

    setCurrentWeekMeals(meals);
  }, [weekInfo.selectedDate, schedules]);

  function generateMealsForWeek(items: ScheduleItem[]): DayMeals[] {
    const mealsMap = new Map<string, DayMeals>();
    const mealTypes: ("breakfast" | "lunch" | "dinner")[] = ["breakfast", "lunch", "dinner"];

    const weekDays = eachDayOfInterval({ start: weekInfo.selectedDate, end: weekInfo.endDay });

    weekDays.forEach((day) => {
      if (!isToday(day) && isPast(day)) return;

      mealTypes.forEach((mealType) => {
        const existingMeal = items.find(
          (item) => isSameDay(item.dateTime, day) && item.meal === mealType
        );

        const dateKey = isToday(day) ? "Today" : format(day, "EEEE");

        if (!mealsMap.has(dateKey)) {
          mealsMap.set(dateKey, {
            dayOfWeek: dateKey,
            meals: [],
          });
        }

        mealsMap.get(dateKey)?.meals.push(
          existingMeal
            ? existingMeal
            : {
                id: "",
                familyId: "",
                recipeId: "",
                dateTime: day,
                meal: mealType,
                title: "",
                slug: "",
                description: "",
                image: undefined,
              }
        );
      });
    });

    return Array.from(mealsMap.values());
  }

  function getFormattedDays(weekDays: Date[]): FormattedDay[] {
    return weekDays.map((date) => ({
      day: date.getDate(),
      isPastDay: !isToday(date) && isPast(date),
      isCurrentDay: isToday(date),
      date,
    }));
  }

  const [formattedDays, setFormattedDays] = useState<FormattedDay[]>(() =>
    getFormattedDays(weekInfo.weekDays)
  );

  function updateSchedulerWeek(newStartDay: Date) {
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
  }

  function handlePrevWeek() {
    if (!isPast(subDays(weekInfo.startDay, 1))) {
      updateSchedulerWeek(startOfWeek(subWeeks(weekInfo.startDay, 1)));
    }
  }

  function handleNextWeek() {
    updateSchedulerWeek(startOfWeek(addWeeks(weekInfo.startDay, 1)));
  }

  function handleWeekInfo(date: Date) {
    setWeekInfo((prev) => ({
      ...prev,
      selectedDate: date,
      monthName: format(date, "MMMM"),
      year: format(date, "yyyy"),
    }));
  }

  const dayLabels = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  return (
    <SchedulerContext.Provider
      value={{
        weekInfo,
        currentWeekMeals,
        formattedDays,
        dayLabels,
        handlePrevWeek,
        handleNextWeek,
        handleWeekInfo,
      }}>
      {children}
    </SchedulerContext.Provider>
  );
};

export const useScheduler = (): SchedulerContextType => {
  const context = useContext(SchedulerContext);
  if (!context) {
    throw new Error("useScheduler must be used within a SchedulerProvider");
  }
  return context;
};
