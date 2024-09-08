import { PlusIcon } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import db from "@/db";
import UserRow from "./user-row";

export default async function AdminUsersPage() {
  const userData = await db.query.users.findMany({
    columns: {
      hashedPassword: false,
    },
    with: {
      organization: true,
      family: true,
    },
  });

  return (
    <>
      <div className="mb-6 flex items-center justify-between gap-4">
        <h1 className="text-3xl font-medium tracking-wide">Users</h1>
        <Button
          asChild
          size="icon"
          className="rounded-full">
          <Link href="/admin/users/create">
            <PlusIcon />
          </Link>
        </Button>
      </div>

      {userData ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>First name</TableHead>
              <TableHead>Last name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Organization</TableHead>
              <TableHead>Family</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {userData.map((user) => (
              <UserRow
                key={user.id}
                user={user}
              />
            ))}
          </TableBody>
        </Table>
      ) : (
        <div>No users found.</div>
      )}
    </>
  );
}
