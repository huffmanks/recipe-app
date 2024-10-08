"use client";

import Link from "next/link";

import { EllipsisVerticalIcon, PencilIcon, TrashIcon } from "lucide-react";
import { toast } from "sonner";

import { SelectFamily, SelectUser } from "@/db/schema";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TableCell, TableRow } from "@/components/ui/table";

import { deleteFamily } from "./actions";

interface FamilyRowProps {
  family: SelectFamily & { users: SelectUser[] };
}

export default function FamilyRow({ family }: FamilyRowProps) {
  const usersCount = family?.users ? family.users.length : 0;
  return (
    <>
      <TableRow>
        <TableCell>{family.id}</TableCell>
        <TableCell>{family.title}</TableCell>
        <TableCell>{family.slug}</TableCell>
        <TableCell>{usersCount}</TableCell>
        <TableCell>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                className="-mr-2 p-1"
                variant="ghost"
                size="unset">
                <EllipsisVerticalIcon className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem asChild>
                <Link
                  className="cursor-pointer"
                  href={`/admin/families/${family.slug}`}>
                  <PencilIcon className="mr-2 size-4" />
                  <span>Edit</span>
                </Link>
              </DropdownMenuItem>

              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer"
                asChild>
                <form
                  action={async () => {
                    const result = await deleteFamily(family.id);
                    if (result?.error) {
                      toast.error(result.error);
                    } else {
                      toast.success(`${result!.success![0].title} family deleted successfully.`);
                    }
                  }}>
                  <Button
                    variant="ghost"
                    size="unset"
                    type="submit">
                    <TrashIcon className="mr-2 size-4" />
                    <span>Delete</span>
                  </Button>
                </form>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      </TableRow>
    </>
  );
}
