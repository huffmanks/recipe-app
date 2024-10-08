import { redirect } from "next/navigation";

import { auth } from "@/auth/validate-request";
import { adminLinks } from "@/config/site";

import { Navigation } from "@/components/navigation";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = await auth();

  if (!user) {
    redirect("/login");
  }

  if (user.role !== "admin") {
    redirect("/dashboard");
  }

  return (
    <>
      <Navigation
        isAdmin={user.role === "admin"}
        isLoggedIn={!!user}
        userName={user.name}
        navLinks={adminLinks}>
        <main className="mx-auto w-full max-w-4xl p-4 md:p-8">{children}</main>
      </Navigation>
    </>
  );
}
