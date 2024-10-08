import { eq } from "drizzle-orm";

import { UserForm } from "@/app/admin/users/form";
import { auth } from "@/auth/validate-request";
import db from "@/db";
import { families, users } from "@/db/schema";

export default async function ProfilePage() {
  const { user } = await auth();

  if (!user) return null;

  const userData = await db.query.users.findFirst({
    where: eq(users.id, user.id),
    columns: {
      hashedPassword: false,
    },
  });

  const famData = await db.select().from(families);

  const isAdmin = user?.role === "admin" ? true : false;

  return (
    <>
      <UserForm
        isAdmin={isAdmin}
        userData={userData}
        famData={famData}
      />
    </>
  );
}
