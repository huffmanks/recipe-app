import { User } from "lucia";
import { MenuIcon, XIcon } from "lucide-react";

import LogoLink from "@/components/logo-link";
import SidebarAccount from "@/components/sidebar/sidebar-account";
import SidebarAvatar from "@/components/sidebar/sidebar-avatar";
import SidebarItems from "@/components/sidebar/sidebar-items";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTrigger } from "@/components/ui/sheet";

interface SidebarMobileProps {
  isAdmin: boolean;
  user: User;
}

export default function SidebarMobile({ user, isAdmin }: SidebarMobileProps) {
  return (
    <Sheet>
      <header className="fixed left-0 right-0 top-0 z-20 bg-secondary pb-2 pt-1.5">
        <SheetTrigger asChild>
          <Button
            size="icon"
            variant="ghost"
            className="absolute left-3 top-3">
            <MenuIcon size={20} />
          </Button>
        </SheetTrigger>
        <div className="flex items-center justify-center px-3">
          <LogoLink />
        </div>
      </header>
      <SheetContent
        side="left"
        className="px-3 py-4"
        hideClose>
        <SheetHeader className="flex flex-row items-center justify-between space-y-0">
          <LogoLink />
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
            <SidebarItems isAdmin={isAdmin} />
          </div>

          <div className="absolute bottom-4 left-0 w-full px-1">
            <Separator className="absolute -top-3 left-0 w-full" />
            <Drawer>
              <DrawerTrigger asChild>
                <Button
                  variant="ghost"
                  className="w-full justify-start">
                  <SidebarAvatar user={user} />
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
