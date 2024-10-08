import { format } from "date-fns";
import { CalendarDays } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ScheduleWithRecipe {
  id: string;
  familyId: string;
  recipeId: string;
  dateTime: Date;
  meal: "breakfast" | "lunch" | "dinner";
  title: string;
  slug: string;
  description: string;
  image: string;
}

interface UpcomingMealsProps {
  scheduledMeals: ScheduleWithRecipe[];
}

export default function UpcomingMeals({ scheduledMeals }: UpcomingMealsProps) {
  const hasMeals = scheduledMeals && scheduledMeals.length > 0;

  const colors = [
    "bg-primary",
    "bg-orange-600",
    "bg-yellow-600",
    "bg-green-600",
    "bg-blue-600",
    "bg-purple-600",
  ];

  return (
    <section className="mb-10">
      <h2 className="mb-4 text-2xl font-semibold">Upcoming meals</h2>
      {hasMeals ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {scheduledMeals.map((schedule, index) => (
            <Card
              key={schedule.id}
              className={colors[index]}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {schedule.meal.charAt(0).toUpperCase() + schedule.meal.slice(1)}
                </CardTitle>
                <CalendarDays className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="flex flex-col space-y-1">
                  <p className="text-xl font-bold">{schedule.title}</p>
                  <p className="text-xs text-muted">
                    {format(schedule.dateTime, "EEEE, MMMM d, yyyy")}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground">No upcoming meals scheduled.</p>
      )}
    </section>
  );
}
