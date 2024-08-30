import db from "@/db";
import { families, organizations } from "@/db/schema";

import { CreateUserForm } from "./form";

export default async function AdminCreateUsersPage() {
  const orgData = await db.select().from(organizations)
  const famData = await db.select().from(families)

  return (
    <>
      <h1 className="mb-6 text-3xl font-medium tracking-wide">
        AdminCreateUsersPage
      </h1>

      <CreateUserForm orgData={orgData} famData={famData} />
    </>
  );
}
