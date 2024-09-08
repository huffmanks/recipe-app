import { User } from "lucia";

import LogoLink from "@/components/logo-link";
import SidebarAccount from "@/components/sidebar/sidebar-account";
import SidebarAvatar from "@/components/sidebar/sidebar-avatar";
import SidebarItems from "@/components/sidebar/sidebar-items";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";

interface SidebarDesktopProps {
  isAdmin: boolean;
  user: User;
}

export default function SidebarDesktop({ user, isAdmin }: SidebarDesktopProps) {
  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-[270px] max-w-xs border-r">
      <div className="h-full px-3 py-4">
        <LogoLink />
        <div className="mt-5">
          <SidebarItems isAdmin={isAdmin} />

          <div className="absolute bottom-3 left-0 w-full px-3">
            <Separator className="absolute -top-3 left-0 w-full" />
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  className="w-full justify-start">
                  <SidebarAvatar user={user} />
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
