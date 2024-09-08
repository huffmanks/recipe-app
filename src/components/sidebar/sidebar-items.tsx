"use client";

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

interface SidebarItemsProps {
  isAdmin: boolean;
}

export default function SidebarItems({ isAdmin }: SidebarItemsProps) {
  const pathname = usePathname();

  return (
    <Accordion
      type="single"
      className="w-full"
      defaultValue={pathname.startsWith("/admin") ? "admin" : "dashboard"}>
      <AccordionItem
        value="dashboard"
        hideToggle={!isAdmin}>
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
