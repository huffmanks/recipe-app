import { eq } from "drizzle-orm";

import { UserForm } from "@/app/admin/users/form";
import db from "@/db";
import { families, organizations, users } from "@/db/schema";

export default async function AdminUpdateUserPage({ params }: { params: { slug: string } }) {
  const user = await db.select().from(users).where(eq(users.username, params.slug));

  const orgData = await db.select().from(organizations);
  const famData = await db.select().from(families);

  if (!user[0]) return null;
  return (
    <>
      <h1 className="mb-6 text-3xl font-medium tracking-wide">Update user</h1>

      <UserForm
        userData={user[0]}
        orgData={orgData}
        famData={famData}
      />
    </>
  );
}
