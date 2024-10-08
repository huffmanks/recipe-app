import { auth } from "@/auth/validate-request";
import { landingLinks } from "@/config/site";

import { Navigation } from "@/components/navigation";

export default async function LandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { session, user } = await auth();

  return (
    <>
      <Navigation
        isLoggedIn={!!session}
        userName={user?.name}
        navLinks={landingLinks}>
        <main className="mx-auto w-full max-w-4xl p-4 md:p-8">{children}</main>
      </Navigation>
    </>
  );
}
