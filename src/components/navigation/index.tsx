"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import { MenuIcon, Package2Icon, SearchIcon, User2Icon } from "lucide-react";

import { handleLogout } from "@/auth/actions";
import { SiteLink } from "@/config/site";
import { cn } from "@/lib/utils";

import ThemeToggle from "@/components/navigation/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface NavigationProps {
  isAdmin?: boolean;
  isLoggedIn: boolean;
  navLinks: SiteLink[];
  children: React.ReactNode;
}

export function Navigation({
  isAdmin = false,
  isLoggedIn = false,
  navLinks,
  children,
}: NavigationProps) {
  const [search, setSearch] = useState("");

  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  const pathname = usePathname();

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    params.set("q", search);
    if (search === "") {
      params.delete("q");
    }
    router.push(`/dashboard/recipes?${params}`);
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 lg:px-6">
        <nav className="hidden items-center gap-6 text-lg font-medium lg:flex lg:text-sm">
          <Link
            href="/"
            className="flex items-center gap-2 text-lg font-semibold lg:text-base">
            <Package2Icon className="h-6 w-6" />
            <div className="w-max">Recipe Vault</div>
          </Link>

          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "transition-colors hover:text-foreground",
                pathname === link.href ? "text-foreground" : "text-muted-foreground"
              )}>
              {link.label}
            </Link>
          ))}
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 lg:hidden">
              <MenuIcon className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <Link
                href="/"
                className="flex items-center gap-3 text-lg font-semibold">
                <Package2Icon className="h-6 w-6" />
                <span className="">Recipe Vault</span>
              </Link>

              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "hover:text-foreground",
                    pathname !== link.href && "text-muted-foreground"
                  )}>
                  {link.label}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex w-full items-center gap-4 lg:ml-auto">
          {!pathname.startsWith("/admin") && pathname !== "/" && (
            <form
              className="ml-auto flex-1 sm:flex-initial"
              onSubmit={handleSubmit}>
              <div className="relative">
                <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  value={search}
                  placeholder="Search recipes..."
                  className="pl-8 sm:w-[300px]"
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </form>
          )}
          <div className="ml-auto flex items-center gap-4">
            <ThemeToggle />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="secondary"
                  size="icon"
                  className="rounded-full">
                  <User2Icon className="h-5 w-5" />
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                {isLoggedIn && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="cursor-pointer"
                      asChild>
                      <Link href="/dashboard">Dashboard</Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      className="cursor-pointer"
                      asChild>
                      <Link href="/profile">Profile</Link>
                    </DropdownMenuItem>
                  </>
                )}

                {isAdmin && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="cursor-pointer"
                      asChild>
                      <Link href="/admin">Admin</Link>
                    </DropdownMenuItem>
                  </>
                )}
                <DropdownMenuSeparator />
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
          </div>
        </div>
      </header>
      <main className="mx-auto w-full max-w-4xl p-4 md:p-8">{children}</main>
    </div>
  );
}
