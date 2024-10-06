import { eq } from "drizzle-orm";

import { UserForm } from "@/app/admin/users/form";
import { auth } from "@/auth/validate-request";
import db from "@/db";
import { families, users } from "@/db/schema";

export default async function AdminUpdateUserPage({ params }: { params: { slug: string } }) {
  const { user } = await auth();

  const userData = await db.select().from(users).where(eq(users.username, params.slug));

  const famData = await db.select().from(families);

  if (!user || !userData[0]) return null;

  const isAdmin = user.role === "admin" ? true : false;
  return (
    <>
      <h1 className="mb-6 text-3xl font-medium tracking-wide">Update user</h1>

      <UserForm
        isAdmin={isAdmin}
        userData={userData[0]}
        famData={famData}
      />
    </>
  );
}
