import { count, eq } from "drizzle-orm";

import db from "@/db";
import { users } from "@/db/schema";

import UserPieChart from "./pie-chart";

export default async function AdminPage() {
  const adminCount = await db.select({ count: count() }).from(users).where(eq(users.role, "admin"));
  const memberCount = await db
    .select({ count: count() })
    .from(users)
    .where(eq(users.role, "member"));
  const guestCount = await db.select({ count: count() }).from(users).where(eq(users.role, "guest"));

  return (
    <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
      <UserPieChart
        adminCount={adminCount[0].count}
        memberCount={memberCount[0].count}
        guestCount={guestCount[0].count}
      />
    </div>
  );
}
