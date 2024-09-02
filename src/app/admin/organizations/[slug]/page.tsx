import { eq } from "drizzle-orm";

import { OrganizationForm } from "@/app/admin/organizations/form";
import db from "@/db";
import { organizations } from "@/db/schema";

export default async function AdminUpdateOrganizationPage({
  params,
}: {
  params: { slug: string };
}) {
  const organization = await db
    .select()
    .from(organizations)
    .where(eq(organizations.slug, params.slug));

  if (!organization[0]) return null;
  return (
    <>
      <h1 className="mb-6 text-3xl font-medium tracking-wide">Update organization</h1>

      <OrganizationForm organizationData={organization[0]} />
    </>
  );
}
