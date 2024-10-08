"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { SiteLink } from "@/config/site";
import { cn } from "@/lib/utils";

export default function NavLinks({ link }: { link: SiteLink }) {
  const pathname = usePathname();

  return (
    <>
      <Link
        href={link.href}
        className={cn(pathname === link.href && "font-semibold text-primary")}>
        {link.label}
      </Link>
    </>
  );
}
