import { PlusIcon } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import db from "@/db";
import FamilyRow from "./family-row";

export default async function AdminFamiliesPage() {
  const familyData = await db.query.families.findMany();

  return (
    <>
      <div className="mb-6 flex items-center justify-between gap-4">
        <h1 className="text-3xl font-medium tracking-wide">Families</h1>
        <Button
          asChild
          size="icon"
          className="rounded-full">
          <Link href="/admin/families/create">
            <PlusIcon />
          </Link>
        </Button>
      </div>

      {familyData ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Id</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Slug</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {familyData.map((family) => (
              <FamilyRow
                key={family.id}
                family={family}
              />
            ))}
          </TableBody>
        </Table>
      ) : (
        <div>No families found.</div>
      )}
    </>
  );
}
