import Link from "next/link";

import { User } from "lucia";
import { LogOutIcon, MoonIcon, SettingsIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";

import { handleLogout } from "@/auth/actions";

import LogoLink from "@/components/logo-link";
import SidebarAvatar from "@/components/sidebar/sidebar-avatar";
import SidebarButton from "@/components/sidebar/sidebar-button";
import SidebarItems from "@/components/sidebar/sidebar-items";
import { Button } from "@/components/ui/button";
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";

interface SidebarDesktopProps {
  isAdmin: boolean;
  user: User;
}

export default function SidebarDesktop({ user, isAdmin }: SidebarDesktopProps) {
  const { setTheme, theme } = useTheme();

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-[270px] max-w-xs border-r">
      <div className="h-full px-3 py-4">
        <div className="pl-2">
          <LogoLink />
        </div>
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
                <PopoverClose className="space-y-1">
                  <Link href="/dashboard/profile">
                    <SidebarButton
                      className="w-full"
                      size="sm"
                      icon={SettingsIcon}>
                      Profile
                    </SidebarButton>
                  </Link>
                  <SidebarButton
                    className="w-full"
                    size="sm"
                    icon={theme === "dark" ? SunIcon : MoonIcon}
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                    Toggle theme
                  </SidebarButton>
                  <form action={handleLogout}>
                    <SidebarButton
                      className="w-full"
                      type="submit"
                      size="sm"
                      icon={LogOutIcon}>
                      Sign out
                    </SidebarButton>
                  </form>
                </PopoverClose>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
    </aside>
  );
}
