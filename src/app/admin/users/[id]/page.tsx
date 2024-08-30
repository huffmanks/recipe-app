import { eq, getTableColumns } from "drizzle-orm";

import db from "@/db";
import { families, organizations, users } from "@/db/schema";
import { UpdateUserForm } from "./form";

export default async function AdminUpdateUsersPage({ params }: { params: { id: string } }) {
  const { image, ...rest } = getTableColumns(users);
  const user = await db
    .select({ ...rest })
    .from(users)
    .where(eq(users.id, params.id));

  const orgData = await db.select().from(organizations);
  const famData = await db.select().from(families);

  if (!user[0]) return null;
  return (
    <>
      <h1 className="mb-6 text-3xl font-medium tracking-wide">AdminUpdateUsersPage</h1>

      <UpdateUserForm
        userData={user[0]}
        orgData={orgData}
        famData={famData}
      />
    </>
  );
}
