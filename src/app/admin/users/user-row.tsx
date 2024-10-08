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

import { deleteUser } from "./actions";

type ExtendedSelectUser = SelectUser & {
  family: SelectFamily | null;
};

interface UserRowProps {
  user: ExtendedSelectUser;
}

export default function UserRow({ user }: UserRowProps) {
  return (
    <>
      <TableRow>
        <TableCell>{user.firstName}</TableCell>
        <TableCell>{user.lastName}</TableCell>
        <TableCell>{user.email}</TableCell>
        <TableCell>{user.role}</TableCell>
        <TableCell>{user.family?.title}</TableCell>
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
                  href={`/admin/users/${user.username}`}>
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
                    const result = await deleteUser(user.id);
                    if (result?.error) {
                      toast.error(result.error);
                    } else {
                      toast.success(
                        `${result!.success![0].username} has been deleted successfully.`
                      );
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
