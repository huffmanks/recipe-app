import { eq } from "drizzle-orm";

import db from "@/db";
import { recipes } from "@/db/schema";

export default async function RecipePage({ params }: { params: { slug: string } }) {
  const recipe = await db.query.recipes.findFirst({
    where: eq(recipes.slug, params.slug),
    with: {
      category: true,
    },
  });

  if (!recipe) return null;

  const { title, description, image, category } = recipe;
  return (
    <>
      <h1 className="mb-6 text-3xl font-medium tracking-wide">{title}</h1>
      {image && (
        <div className="mb-3">
          <img
            className="rounded-md"
            src={image}
            alt={title}
          />
        </div>
      )}
      <div className="mb-1 text-sm uppercase tracking-widest">{category.title}</div>
      <div>{description}</div>
    </>
  );
}
