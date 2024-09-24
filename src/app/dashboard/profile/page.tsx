import { eq } from "drizzle-orm";

import { UserForm } from "@/app/admin/users/form";
import { auth } from "@/auth/validate-request";
import db from "@/db";
import { families, organizations, users } from "@/db/schema";

export default async function ProfilePage() {
  const { user } = await auth();

  const userData = await db.query.users.findFirst({
    where: eq(users.id, user?.id!),
    columns: {
      hashedPassword: false,
    },
  });

  const orgData = await db.select().from(organizations);
  const famData = await db.select().from(families);

  const isAdmin = user?.role === "admin" ? true : false;

  return (
    <>
      <h1 className="mb-6 text-3xl font-medium tracking-wide">Profile</h1>
      <UserForm
        isAdmin={isAdmin}
        userData={userData}
        orgData={orgData}
        famData={famData}
      />
    </>
  );
}
