import { eq } from "drizzle-orm";

import FamilyForm from "@/app/admin/families/form";
import db from "@/db";
import { families } from "@/db/schema";

export default async function AdminUpdateFamilyPage({ params }: { params: { slug: string } }) {
  const family = await db.select().from(families).where(eq(families.slug, params.slug));

  if (!family[0]) return null;
  return (
    <>
      <h1 className="mb-6 text-3xl font-medium tracking-wide">Update family</h1>

      <FamilyForm familyData={family[0]} />
    </>
  );
}
