import Link from "next/link";

import { UserIcon } from "lucide-react";

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
          <DropdownMenuItem
            className="cursor-pointer"
            asChild>
            <Link href="/dashboard">Dashboard</Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem
          className="cursor-pointer"
          asChild>
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
            <Link href="/login">Login</Link>
          )}
        </DropdownMenuItem>
        {!isLoggedIn && (
          <DropdownMenuItem
            className="cursor-pointer"
            asChild>
            <Link href="/register">Register</Link>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
