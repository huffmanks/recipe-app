import { eq } from "drizzle-orm";

import { TagForm } from "@/app/admin/tags/form";
import db from "@/db";
import { tags } from "@/db/schema";

export default async function AdminUpdateTagPage({ params }: { params: { slug: string } }) {
  const tag = await db.select().from(tags).where(eq(tags.slug, params.slug));

  if (!tag[0]) return null;
  return (
    <>
      <h1 className="mb-6 text-3xl font-medium tracking-wide">Update tag</h1>

      <TagForm tagData={tag[0]} />
    </>
  );
}
