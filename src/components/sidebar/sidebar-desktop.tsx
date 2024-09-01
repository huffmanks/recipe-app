"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { adminLinks, siteLinks } from "@/config/site";

import SidebarAccount from "@/components/sidebar/sidebar-account";
import SidebarAvatar from "@/components/sidebar/sidebar-avatar";
import SidebarButton from "@/components/sidebar/sidebar-button";
import SidebarLogo from "@/components/sidebar/sidebar-logo";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";

export default function SidebarDesktop() {
  const pathname = usePathname();
  const session = useSession();

  const isAdmin = session?.data?.user?.role === "admin" ? true : false;

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-[270px] max-w-xs border-r">
      <div className="h-full px-3 py-4">
        <SidebarLogo />
        <div className="mt-5">
          <Accordion
            type="single"
            className="w-full"
            defaultValue={pathname.startsWith("/admin") ? "admin" : "dashboard"}>
            <AccordionItem value="dashboard">
              <AccordionTrigger className="px-2.5 hover:no-underline">Dashboard</AccordionTrigger>
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
                        variant={pathname === link.href ? "default" : "ghost"}>
                        {link.label}
                      </SidebarButton>
                    </Link>
                  ))}
                </AccordionContent>
              </AccordionItem>
            )}
          </Accordion>

          <div className="absolute bottom-3 left-0 w-full px-3">
            <Separator className="absolute -top-3 left-0 w-full" />
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  className="w-full justify-start">
                  <SidebarAvatar />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="mb-2 w-56 rounded-[1rem] p-3">
                <SidebarAccount className="space-y-1" />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
    </aside>
  );
}
