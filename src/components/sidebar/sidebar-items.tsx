"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { adminLinks, siteLinks } from "@/config/site";

import SidebarButton from "@/components/sidebar/sidebar-button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function SidebarItems() {
  const pathname = usePathname();
  const session = useSession();

  const isAdmin = session?.data?.user?.role === "admin" ? true : false;

  return (
    <Accordion
      type="single"
      className="w-full"
      defaultValue={pathname.startsWith("/admin") ? "admin" : "dashboard"}>
      <AccordionItem value="dashboard">
        <AccordionTrigger
          className="px-2.5 hover:no-underline"
          hideToggle={!isAdmin}>
          Dashboard
        </AccordionTrigger>
        <AccordionContent className="flex w-full flex-col gap-1">
          {siteLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}>
              <SidebarButton
                className="w-full"
                variant={pathname === link.href ? "default" : "ghost"}>
                {link.label}
              </SidebarButton>
            </Link>
          ))}
        </AccordionContent>
      </AccordionItem>

      {isAdmin && (
        <AccordionItem value="admin">
          <AccordionTrigger className="px-2.5 hover:no-underline">Admin</AccordionTrigger>
          <AccordionContent className="flex w-full flex-col gap-1">
            {adminLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}>
                <SidebarButton
                  className="w-full"
                  variant={pathname.startsWith(link.href) ? "default" : "ghost"}>
                  {link.label}
                </SidebarButton>
              </Link>
            ))}
          </AccordionContent>
        </AccordionItem>
      )}
    </Accordion>
  );
}
