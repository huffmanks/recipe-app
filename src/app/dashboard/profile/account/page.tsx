import { redirect } from "next/navigation";

import { eq } from "drizzle-orm";

import { auth } from "@/auth/validate-request";
import db from "@/db";
import { users } from "@/db/schema";

import PasswordForm from "./password-form";
import PlanForm from "./plan-form";
import RoleForm from "./role-form";

export default async function ProfileAccountPage() {
  const { user } = await auth();

  if (!user) redirect("/login");

  const userData = await db.query.users.findFirst({
    where: eq(users.id, user.id),
    columns: {
      id: true,
      role: true,
      plan: true,
    },
  });

  if (!userData) return null;
  return (
    <div className="grid gap-8">
      <RoleForm
        isAdmin={userData.role === "admin"}
        userId={userData.id}
        userRole={userData.role}
      />
      <PlanForm
        userId={userData.id}
        userPlan={userData.plan}
      />
      <PasswordForm userId={userData.id} />
    </div>
  );
}
