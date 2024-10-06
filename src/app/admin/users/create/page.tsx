import { UserForm } from "@/app/admin/users/form";
import { auth } from "@/auth/validate-request";
import db from "@/db";
import { families } from "@/db/schema";

export default async function AdminCreateUserPage() {
  const { user } = await auth();
  const famData = await db.select().from(families);

  const isAdmin = user?.role === "admin" ? true : false;

  return (
    <>
      <h1 className="mb-6 text-3xl font-medium tracking-wide">Create user</h1>

      <UserForm
        isAdmin={isAdmin}
        famData={famData}
      />
    </>
  );
}
