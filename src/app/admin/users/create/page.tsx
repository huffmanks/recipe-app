import db from "@/db";
import { families, organizations } from "@/db/schema";

import { UserForm } from "@/app/admin/users/form";

export default async function AdminCreateUserPage() {
  const orgData = await db.select().from(organizations);
  const famData = await db.select().from(families);

  return (
    <>
      <h1 className="mb-6 text-3xl font-medium tracking-wide">Create user</h1>

      <UserForm
        orgData={orgData}
        famData={famData}
      />
    </>
  );
}
