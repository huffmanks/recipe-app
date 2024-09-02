import { eq } from "drizzle-orm";

import { CategoryForm } from "@/app/admin/categories/form";
import db from "@/db";
import { categories } from "@/db/schema";

export default async function AdminUpdateCategoryPage({ params }: { params: { slug: string } }) {
  const category = await db.select().from(categories).where(eq(categories.slug, params.slug));

  if (!category[0]) return null;
  return (
    <>
      <h1 className="mb-6 text-3xl font-medium tracking-wide">Update category</h1>

      <CategoryForm categoryData={category[0]} />
    </>
  );
}
