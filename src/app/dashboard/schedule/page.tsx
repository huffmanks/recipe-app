import { eq } from "drizzle-orm";

import { auth } from "@/auth/validate-request";
import db from "@/db";
import { recipes, schedules, users } from "@/db/schema";
import { SchedulerProvider } from "@/providers/scheduler";

import Scheduler from "./scheduler";
import UpcomingItems from "./upcoming-items";

export default async function SchedulesPage() {
  const { user } = await auth();

  if (!user) return null;

  const userFamilySchedules = await db
    .select({
      id: schedules.id,
      familyId: schedules.familyId,
      recipeId: schedules.recipeId,
      dateTime: schedules.dateTime,
      meal: schedules.meal,
      title: recipes.title,
      slug: recipes.slug,
      description: recipes.description,
      image: recipes.image,
    })
    .from(schedules)
    .innerJoin(users, eq(schedules.familyId, users.familyId))
    .innerJoin(recipes, eq(schedules.recipeId, recipes.id))
    .where(eq(users.id, user.id))
    .orderBy(schedules.dateTime, schedules.meal);

  return (
    <SchedulerProvider schedules={userFamilySchedules}>
      <h1 className="mb-6 text-3xl font-medium tracking-wide">Schedule</h1>
      <Scheduler />
      <UpcomingItems />
    </SchedulerProvider>
  );
}
