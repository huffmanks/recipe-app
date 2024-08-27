"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import SidebarAccount from "@/components/sidebar/sidebar-account";
import SidebarAvatar from "@/components/sidebar/sidebar-avatar";
import SidebarButton from "@/components/sidebar/sidebar-button";
import SidebarLogo from "@/components/sidebar/sidebar-logo";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { adminLinks, siteLinks } from "@/config/site";

export default function SidebarDesktop() {
  const pathname = usePathname();
  const session = useSession();

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-[270px] max-w-xs border-r">
      <div className="h-full px-3 py-4">
        <SidebarLogo />
        <div className="mt-5">
          <div className="flex w-full flex-col gap-1">
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
                  <DropdownMenuContent className="w-60">
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
