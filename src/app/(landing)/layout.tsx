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
        {children}
      </Navigation>
    </>
  );
}
