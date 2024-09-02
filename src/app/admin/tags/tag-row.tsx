"use client";

import { useRouter } from "next/navigation";

import { SelectTag } from "@/db/schema";

import { TableCell, TableRow } from "@/components/ui/table";

interface TagRowProps {
  tag: SelectTag;
}

export default function TagRow({ tag }: TagRowProps) {
  const router = useRouter();
  function handleClick(slug: string) {
    router.push(`/admin/tags/${slug}`);
  }

  return (
    <>
      <TableRow
        className="cursor-pointer"
        onClick={() => handleClick(tag.slug)}>
        <TableCell>{tag.id}</TableCell>
        <TableCell>{tag.title}</TableCell>
        <TableCell>{tag.slug}</TableCell>
      </TableRow>
    </>
  );
}
