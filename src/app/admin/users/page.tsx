import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import db from "@/db";
import UserRow from "./user-row";

export default async function AdminUsersPage() {
  const userData = await db.query.users.findMany({
    with: {
      organization: true,
      family: true,
    },
  });

  return (
    <>
      <h1 className="mb-6 text-3xl font-medium tracking-wide">Users</h1>

      {userData ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>First name</TableHead>
              <TableHead>Last name</TableHead>
              <TableHead>Username</TableHead>
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
