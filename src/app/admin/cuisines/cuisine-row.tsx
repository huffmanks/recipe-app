"use client";

import { useRouter } from "next/navigation";

import { SelectCuisine } from "@/db/schema";

import { TableCell, TableRow } from "@/components/ui/table";

interface CuisineRowProps {
  cuisine: SelectCuisine;
}

export default function CuisineRow({ cuisine }: CuisineRowProps) {
  const router = useRouter();
  function handleClick(slug: string) {
    router.push(`/admin/cuisines/${slug}`);
  }

  return (
    <>
      <TableRow
        className="cursor-pointer"
        onClick={() => handleClick(cuisine.slug)}>
        <TableCell>{cuisine.id}</TableCell>
        <TableCell>{cuisine.title}</TableCell>
        <TableCell>{cuisine.slug}</TableCell>
      </TableRow>
    </>
  );
}
