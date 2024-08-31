import { eq } from "drizzle-orm";

import { auth } from "@/auth";
import db from "@/db";
import { families, organizations, users } from "@/db/schema";

import { UserForm } from "@/app/admin/users/form";

export default async function ProfilePage() {
  const session = await auth();

  const userData = await db.query.users.findFirst({
    where: eq(users.id, session?.user?.id!),
    columns: {
      image: false,
    },
  });

  console.log("session", session);
  console.log("user", userData);
  const orgData = await db.select().from(organizations);
  const famData = await db.select().from(families);
  return (
    <>
      <h1 className="mb-6 text-3xl font-medium tracking-wide">Profile</h1>
      <UserForm
        userData={userData}
        orgData={orgData}
        famData={famData}
      />
    </>
  );
}
