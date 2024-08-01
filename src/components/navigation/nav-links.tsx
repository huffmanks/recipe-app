import { headerLinks } from "@/config/site";
import Link from "next/link";

export default function NavLinks() {
  return (
    <>
      <nav className="flex items-center space-x-4 lg:space-x-6">
        {headerLinks.map((link) => (
          <Link
            key={link.label}
            className="text-sm font-medium transition-colors hover:text-primary"
            href={link.href}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </>
  );
}
