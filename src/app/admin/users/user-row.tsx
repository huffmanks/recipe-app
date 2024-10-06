"use client";

import { useRouter } from "next/navigation";

import { SelectFamily, SelectUser } from "@/db/schema";

import { TableCell, TableRow } from "@/components/ui/table";

type ExtendedSelectUser = SelectUser & {
  family: SelectFamily | null;
};

interface UserRowProps {
  user: ExtendedSelectUser;
}

export default function UserRow({ user }: UserRowProps) {
  const router = useRouter();
  function handleClick(slug: string) {
    router.push(`/admin/users/${slug}`);
  }

  return (
    <>
      <TableRow
        className="cursor-pointer"
        onClick={() => handleClick(user.username)}>
        <TableCell>{user.firstName}</TableCell>
        <TableCell>{user.lastName}</TableCell>
        <TableCell>{user.email}</TableCell>
        <TableCell>{user.role}</TableCell>
        <TableCell>{user.family?.title}</TableCell>
      </TableRow>
    </>
  );
}
