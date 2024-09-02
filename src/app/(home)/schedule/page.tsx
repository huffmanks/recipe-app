import { auth } from "@/auth";
import db from "@/db";
import { recipes, schedules, users } from "@/db/schema";
import { eq } from "drizzle-orm";

export default async function SchedulesPage() {
  const session = await auth();
  const userFamilySchedules = await db
    .select({
      id: schedules.id,
      familyId: schedules.familyId,
      recipeId: schedules.recipeId,
      dateTime: schedules.dateTime,
      meal: schedules.meal,
      recipeTitle: recipes.title,
      recipeSlug: recipes.slug,
      recipeDescription: recipes.description,
      recipeImage: recipes.image,
      recipeServingSize: recipes.servingSize,
      recipeInstructions: recipes.instructions,
      recipeIngredients: recipes.ingredients,
      recipeCreatedAt: recipes.createdAt,
      recipeUpdatedAt: recipes.updatedAt,
    })
    .from(schedules)
    .innerJoin(users, eq(schedules.familyId, users.familyId))
    .innerJoin(recipes, eq(schedules.recipeId, recipes.id))
    .where(eq(users.id, session?.user.id));

  return (
    <>
      <h1 className="mb-6 text-3xl font-medium tracking-wide">Schedules</h1>

      {userFamilySchedules &&
        userFamilySchedules.map((item) => (
          <div key={item.id}>
            <div>{item.recipeTitle}</div>
            <div>
              {item.dateTime.toLocaleDateString()}, {item.meal}
            </div>
          </div>
        ))}
    </>
  );
}
