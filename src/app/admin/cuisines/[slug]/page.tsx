import { eq } from "drizzle-orm";

import { CuisineForm } from "@/app/admin/cuisines/form";
import db from "@/db";
import { cuisines } from "@/db/schema";

export default async function AdminUpdateCuisinePage({ params }: { params: { slug: string } }) {
  const cuisine = await db.select().from(cuisines).where(eq(cuisines.slug, params.slug));

  if (!cuisine[0]) return null;
  return (
    <>
      <h1 className="mb-6 text-3xl font-medium tracking-wide">Update cuisine</h1>

      <CuisineForm cuisineData={cuisine[0]} />
    </>
  );
}
