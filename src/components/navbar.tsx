import LogoLink from "@/components/logo-link";
import ThemeToggle from "@/components/theme-toggle";
import UserToggle from "@/components/user-toggle";

interface NavbarProps {
  isLoggedIn: boolean;
}

export default function Navbar({ isLoggedIn }: NavbarProps) {
  return (
    <nav className="flex items-center justify-between bg-secondary px-4 py-3 shadow-md">
      <LogoLink />
      <div className="flex items-center gap-4">
        <UserToggle isLoggedIn={isLoggedIn} />
        <ThemeToggle />
      </div>
    </nav>
  );
}
