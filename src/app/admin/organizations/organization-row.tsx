"use client";

import { useRouter } from "next/navigation";

import { SelectOrganization } from "@/db/schema";

import { TableCell, TableRow } from "@/components/ui/table";

interface OrganizationRowProps {
  organization: SelectOrganization;
}

export default function OrganizationRow({ organization }: OrganizationRowProps) {
  const router = useRouter();
  function handleClick(slug: string) {
    router.push(`/admin/organizations/${slug}`);
  }

  return (
    <>
      <TableRow
        className="cursor-pointer"
        onClick={() => handleClick(organization.slug)}>
        <TableCell>{organization.id}</TableCell>
        <TableCell>{organization.title}</TableCell>
        <TableCell>{organization.slug}</TableCell>
      </TableRow>
    </>
  );
}
