import { redirect } from "next/navigation";

import { auth } from "@/auth/validate-request";
import Sidebar from "@/components/sidebar";

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
      <Sidebar
        user={user}
        isAdmin={user.role === "admin"}
      />
      <main className="px-5 pb-8 pt-20 sm:pl-[300px] sm:pt-5">{children}</main>
    </>
  );
}
