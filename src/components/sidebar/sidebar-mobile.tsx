"use client";

import { MenuIcon, XIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import SidebarAccount from "@/components/sidebar/sidebar-account";
import SidebarAvatar from "@/components/sidebar/sidebar-avatar";
import { SidebarButtonSheet as SidebarButton } from "@/components/sidebar/sidebar-button";
import SidebarLogo from "@/components/sidebar/sidebar-logo";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTrigger } from "@/components/ui/sheet";
import { adminLinks, siteLinks } from "@/config/site";

export default function SidebarMobile() {
  const pathname = usePathname();
  const session = useSession();

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
          <div className="mt-5 flex w-full flex-col gap-1">
            {siteLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}>
                <SidebarButton
                  className="w-full"
                  variant={pathname === link.href ? "secondary" : "ghost"}>
                  {link.label}
                </SidebarButton>
              </Link>
            ))}

            {session && (
              <>
                <Separator className="mb-4 mt-2" />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      className="w-full justify-start gap-2"
                      variant={pathname.startsWith("/admin") ? "default" : "ghost"}>
                      <span>Admin</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-[354px]">
                    {adminLinks.map((link) => (
                      <DropdownMenuItem
                        key={link.href}
                        asChild>
                        <Link href={link.href}>
                          <SidebarButton
                            className="w-full"
                            variant={pathname === link.href ? "secondary" : "ghost"}>
                            {link.label}
                          </SidebarButton>
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            )}
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
