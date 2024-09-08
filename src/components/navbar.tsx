import LogoLink from "@/components/logo-link";
import NavbarThemeToggle from "@/components/theme-toggle";
import { Separator } from "@/components/ui/separator";
import UserToggle from "@/components/user-toggle";

interface NavbarProps {
  isLoggedIn: boolean;
}

export default function Navbar({ isLoggedIn }: NavbarProps) {
  return (
    <>
      <nav className="flex items-center justify-between p-4 sm:px-8">
        <LogoLink />
        <div className="flex items-center gap-4">
          <NavbarThemeToggle />
          <UserToggle isLoggedIn={isLoggedIn} />
        </div>
      </nav>
      <Separator />
    </>
  );
}
