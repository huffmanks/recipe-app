import { redirect } from "next/navigation";

import { auth } from "@/auth/validate-request";
import { profileLinks, siteLinks } from "@/config/site";

import Navigation from "@/components/navigation";

import NavLinks from "./nav-links";

export default async function ProfileLayout({ children }: { children: React.ReactNode }) {
  const { user } = await auth();

  if (!user) {
    redirect("/login");
  }
  return (
    <>
      <Navigation
        isAdmin={user.role === "admin"}
        isLoggedIn={!!user}
        userName={user.name}
        navLinks={siteLinks}>
        <main className="min-h-[calc(100vh_-_theme(spacing.16))] bg-muted/40 p-4 md:p-8">
          <div className="grid gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
            <div>
              <h1 className="mb-8 text-3xl font-semibold">Profile</h1>
              <nav className="grid gap-4 text-sm text-muted-foreground">
                {profileLinks.map((link) => (
                  <NavLinks
                    key={link.href}
                    link={link}
                  />
                ))}
              </nav>
            </div>
            <div className="max-w-2xl">{children}</div>
          </div>
        </main>
      </Navigation>
    </>
  );
}
