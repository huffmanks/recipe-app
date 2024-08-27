import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { NextAuthProvider, ThemeProvider } from "@/components/provider";
import Sidebar from "@/components/sidebar";
import { Toaster } from "@/components/ui/sonner";

import { SITE_DESCRIPTION, SITE_TITLE } from "@/config/site";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  manifest: "/manifest.json",
  icons: [
    { rel: "apple-touch-icon", url: "icons/icon-192x192.png" },
    { rel: "icon", url: "icons/icon-192x192.png" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning>
      <body className={inter.className}>
        <NextAuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange>
            <Sidebar />
            <main className="px-5 pt-20 sm:pl-[300px] sm:pt-5">{children}</main>
            <Toaster richColors />
          </ThemeProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
