import { PlusIcon } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import db from "@/db";
import TagRow from "./tag-row";

export default async function AdminTagsPage() {
  const tagData = await db.query.tags.findMany();

  return (
    <>
      <div className="mb-6 flex items-center justify-between gap-4">
        <h1 className="text-3xl font-medium tracking-wide">Tags</h1>
        <Button
          asChild
          size="icon"
          className="rounded-full">
          <Link href="/admin/tags/create">
            <PlusIcon />
          </Link>
        </Button>
      </div>

      {tagData ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Id</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Slug</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tagData.map((tag) => (
              <TagRow
                key={tag.id}
                tag={tag}
              />
            ))}
          </TableBody>
        </Table>
      ) : (
        <div>No tags found.</div>
      )}
    </>
  );
}
