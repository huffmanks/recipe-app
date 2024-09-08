import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import { SITE_DESCRIPTION, SITE_TITLE } from "@/config/site";

import { ThemeProvider } from "@/components/providers";
import { Toaster } from "@/components/ui/sonner";

const inter = localFont({
  src: [
    {
      path: "./fonts/inter.ttf",
      style: "normal",
    },
    {
      path: "./fonts/inter-italic.ttf",
      style: "italic",
    },
  ],
  display: "swap",
});

export const metadata: Metadata = {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  manifest: "/manifest.json",
  icons: [
    { rel: "apple-touch-icon", url: "/icons/icon-192x192.png" },
    { rel: "icon", url: "/icons/icon-192x192.png" },
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
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange>
          {children}
          <Toaster richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
