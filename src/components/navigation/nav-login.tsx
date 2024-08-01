"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { LogInIcon, LogOutIcon, UserRoundIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function NavLogin() {
  const { data: session } = useSession();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="size-8 px-1 py-2 focus-visible:bg-accent focus-visible:ring-0 focus-visible:ring-offset-0"
        >
          <UserRoundIcon className="size-5" />
          <span className="sr-only">Login</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {!session && (
          <>
            <DropdownMenuItem
              className="flex cursor-pointer items-center gap-2"
              onClick={() => signIn()}
            >
              <LogInIcon className="size-4" />
              <span>Sign in</span>
            </DropdownMenuItem>
          </>
        )}

        {session && (
          <>
            <DropdownMenuLabel>{session.user?.email}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="flex cursor-pointer items-center gap-2"
              onClick={() => signOut()}
            >
              <LogOutIcon className="size-4" />
              <span>Sign out</span>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
