import { PlusIcon } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import db from "@/db";
import CategoryRow from "./category-row";

export default async function AdminCategoriesPage() {
  const categoryData = await db.query.categories.findMany();

  return (
    <>
      <div className="mb-6 flex items-center justify-between gap-4">
        <h1 className="text-3xl font-medium tracking-wide">Categories</h1>
        <Button
          asChild
          size="icon"
          className="rounded-full">
          <Link href="/admin/categories/create">
            <PlusIcon />
          </Link>
        </Button>
      </div>

      {categoryData ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Id</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Slug</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categoryData.map((category) => (
              <CategoryRow
                key={category.id}
                category={category}
              />
            ))}
          </TableBody>
        </Table>
      ) : (
        <div>No categories found.</div>
      )}
    </>
  );
}
