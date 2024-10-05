import { redirect } from "next/navigation";

import { auth } from "@/auth/validate-request";
import { siteLinks } from "@/config/site";

import { Navigation } from "@/components/navigation";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = await auth();

  if (!user) {
    redirect("/login");
  }

  return (
    <>
      <Navigation
        isAdmin={user.role === "admin"}
        isLoggedIn={!!user}
        navLinks={siteLinks}>
        {children}
      </Navigation>
    </>
  );
}
