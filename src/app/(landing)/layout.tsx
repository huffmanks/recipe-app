import { auth } from "@/auth/validate-request";
import { landingLinks } from "@/config/site";

import { Navigation } from "@/components/navigation";

export default async function LandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { session } = await auth();

  return (
    <>
      <Navigation
        isLoggedIn={!!session}
        navLinks={landingLinks}>
        {children}
      </Navigation>
    </>
  );
}
