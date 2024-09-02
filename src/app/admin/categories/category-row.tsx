"use client";

import { useRouter } from "next/navigation";

import { SelectCategory } from "@/db/schema";

import { TableCell, TableRow } from "@/components/ui/table";

interface CategoryRowProps {
  category: SelectCategory;
}

export default function CategoryRow({ category }: CategoryRowProps) {
  const router = useRouter();
  function handleClick(slug: string) {
    router.push(`/admin/categories/${slug}`);
  }

  return (
    <>
      <TableRow
        className="cursor-pointer"
        onClick={() => handleClick(category.slug)}>
        <TableCell>{category.id}</TableCell>
        <TableCell>{category.title}</TableCell>
        <TableCell>{category.slug}</TableCell>
      </TableRow>
    </>
  );
}
