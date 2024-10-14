import { redirect } from "next/navigation";

import { eq } from "drizzle-orm";

import { auth } from "@/auth/validate-request";
import db from "@/db";
import { users } from "@/db/schema";

import ProfileForm from "./form";

export default async function ProfilePage() {
  const { user } = await auth();

  if (!user) redirect("/login");

  const userData = await db.query.users.findFirst({
    where: eq(users.id, user.id),
    columns: {
      hashedPassword: false,
    },
  });

  if (!userData) return null;

  return (
    <>
      <ProfileForm userData={userData} />
    </>
  );
}
