import db from "@/db";
import { users } from "@/db/schema";
import { count, eq } from "drizzle-orm";
import { UserPieChart } from "./pie-chart";

export default async function AdminPage() {
  const adminCount = await db.select({ count: count() }).from(users).where(eq(users.role, "admin"));
  const userCount = await db.select({ count: count() }).from(users).where(eq(users.role, "user"));

  return (
    <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
      <UserPieChart
        adminCount={adminCount[0].count}
        userCount={userCount[0].count}
      />
    </div>
  );
}
