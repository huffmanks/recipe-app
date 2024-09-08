import { auth } from "@/auth/validate-request";
import Navbar from "@/components/navbar";

export default async function LandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { session } = await auth();

  return (
    <>
      <Navbar isLoggedIn={!!session} />
      <main className="p-8">{children}</main>
    </>
  );
}
