"use client";

import { useRouter } from "next/navigation";

import { SelectFamily } from "@/db/schema";

import { TableCell, TableRow } from "@/components/ui/table";

interface FamilyRowProps {
  family: SelectFamily;
}

export default function FamilyRow({ family }: FamilyRowProps) {
  const router = useRouter();
  function handleClick(slug: string) {
    router.push(`/admin/families/${slug}`);
  }

  return (
    <>
      <TableRow
        className="cursor-pointer"
        onClick={() => handleClick(family.slug)}>
        <TableCell>{family.id}</TableCell>
        <TableCell>{family.title}</TableCell>
        <TableCell>{family.slug}</TableCell>
      </TableRow>
    </>
  );
}
