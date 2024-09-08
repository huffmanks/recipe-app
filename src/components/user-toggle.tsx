import { UserIcon } from "lucide-react";
import Link from "next/link";

import { handleLogout } from "@/auth/actions";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface UserToggleProps {
  isLoggedIn: boolean;
}

export default function UserToggle({ isLoggedIn }: UserToggleProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="size-8 px-1 py-2 focus-visible:bg-accent focus-visible:ring-0 focus-visible:ring-offset-0">
          <UserIcon className="size-5" />
          <span className="sr-only">Toggle user</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {isLoggedIn && (
          <DropdownMenuItem asChild>
            <Link
              href="/dashboard"
              className="flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground">
              Dashboard
            </Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem
          asChild
          className="cursor-pointer">
          {isLoggedIn ? (
            <form action={handleLogout}>
              <Button
                variant="ghost"
                size="unset"
                type="submit">
                Logout
              </Button>
            </form>
          ) : (
            <Link
              href="/login"
              className="flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground">
              Login
            </Link>
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
