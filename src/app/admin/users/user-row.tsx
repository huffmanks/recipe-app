"use client";

import { useRouter } from "next/navigation";

import { SelectFamily, SelectOrganization, SelectUser } from "@/db/schema";

import { TableCell, TableRow } from "@/components/ui/table";

type ExtendedSelectUser = SelectUser & {
  family: SelectFamily | null;
  organization: SelectOrganization | null;
};

interface UserRowProps {
  user: ExtendedSelectUser;
}

export default function UserRow({ user }: UserRowProps) {
  const router = useRouter();
  function handleClick(id: string) {
    router.push(`/admin/users/${id}`);
  }

  return (
    <>
      <TableRow
        className="cursor-pointer"
        onClick={() => handleClick(user.id)}>
        <TableCell>{user.firstName}</TableCell>
        <TableCell>{user.lastName}</TableCell>
        <TableCell>{user.username}</TableCell>
        <TableCell>{user.role}</TableCell>
        <TableCell>{user.organization?.title}</TableCell>
        <TableCell>{user.family?.title}</TableCell>
      </TableRow>
    </>
  );
}
