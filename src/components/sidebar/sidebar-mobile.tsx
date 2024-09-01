"use client";

import { MenuIcon, XIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { adminLinks, siteLinks } from "@/config/site";

import SidebarAccount from "@/components/sidebar/sidebar-account";
import SidebarAvatar from "@/components/sidebar/sidebar-avatar";
import { SidebarButtonSheet as SidebarButton } from "@/components/sidebar/sidebar-button";
import SidebarLogo from "@/components/sidebar/sidebar-logo";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTrigger } from "@/components/ui/sheet";

export default function SidebarMobile() {
  const pathname = usePathname();
  const session = useSession();

  const isAdmin = session?.data?.user?.role === "admin" ? true : false;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          className="fixed left-3 top-3">
          <MenuIcon size={20} />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="px-3 py-4"
        hideClose>
        <SheetHeader className="flex flex-row items-center justify-between space-y-0">
          <SidebarLogo />
          <SheetClose asChild>
            <Button
              className="h-7 w-7 p-0"
              variant="ghost">
              <XIcon size={15} />
            </Button>
          </SheetClose>
        </SheetHeader>
        <div className="h-full">
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
          </div>

          <div className="absolute bottom-4 left-0 w-full px-1">
            <Separator className="absolute -top-3 left-0 w-full" />
            <Drawer>
              <DrawerTrigger asChild>
                <Button
                  variant="ghost"
                  className="w-full justify-start">
                  <SidebarAvatar />
                </Button>
              </DrawerTrigger>
              <DrawerContent className="mb-2 p-2">
                <SidebarAccount className="mt-2 flex flex-col space-y-2" />
              </DrawerContent>
            </Drawer>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
