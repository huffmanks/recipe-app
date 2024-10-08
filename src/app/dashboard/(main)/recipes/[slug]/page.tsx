import { eq } from "drizzle-orm";

import db from "@/db";
import { recipes } from "@/db/schema";

export default async function RecipePage({ params }: { params: { slug: string } }) {
  const recipe = await db.query.recipes.findFirst({
    where: eq(recipes.slug, params.slug),
  });

  if (!recipe) return null;

  const { title, description, image, categories } = recipe;
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
      <div className="mb-1 text-sm uppercase tracking-widest">
        {categories.map((cat) => (
          <div key={cat}>{cat}</div>
        ))}
      </div>
      <div>{description}</div>
    </>
  );
}
