import { PlusIcon } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import db from "@/db";
import CuisineRow from "./cuisine-row";

export default async function AdminCuisinesPage() {
  const cuisineData = await db.query.cuisines.findMany();

  return (
    <>
      <div className="mb-6 flex items-center justify-between gap-4">
        <h1 className="text-3xl font-medium tracking-wide">Cuisines</h1>
        <Button
          asChild
          size="icon"
          className="rounded-full">
          <Link href="/admin/cuisines/create">
            <PlusIcon />
          </Link>
        </Button>
      </div>

      {cuisineData ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Id</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Slug</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cuisineData.map((cuisine) => (
              <CuisineRow
                key={cuisine.id}
                cuisine={cuisine}
              />
            ))}
          </TableBody>
        </Table>
      ) : (
        <div>No cuisines found.</div>
      )}
    </>
  );
}
