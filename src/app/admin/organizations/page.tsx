import Link from "next/link";

import { PlusIcon } from "lucide-react";

import db from "@/db";

import { Button } from "@/components/ui/button";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import OrganizationRow from "./organization-row";

export default async function AdminOrganizationsPage() {
  const organizationData = await db.query.organizations.findMany();

  return (
    <>
      <div className="mb-6 flex items-center justify-between gap-4">
        <h1 className="text-3xl font-medium tracking-wide">Organizations</h1>
        <Button
          asChild
          size="icon"
          className="rounded-full">
          <Link href="/admin/organizations/create">
            <PlusIcon />
          </Link>
        </Button>
      </div>

      {organizationData ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Id</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Slug</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {organizationData.map((organization) => (
              <OrganizationRow
                key={organization.id}
                organization={organization}
              />
            ))}
          </TableBody>
        </Table>
      ) : (
        <div>No organizations found.</div>
      )}
    </>
  );
}
