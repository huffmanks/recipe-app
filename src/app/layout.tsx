import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";

import { SITE_DESCRIPTION, SITE_TITLE, SITE_TITLE_TEMPLATE } from "@/config/site";
import { ThemeProvider } from "@/providers/theme";

import { Toaster } from "@/components/ui/sonner";

import "./globals.css";

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
  applicationName: SITE_TITLE,
  title: {
    default: SITE_TITLE,
    template: SITE_TITLE_TEMPLATE,
  },
  description: SITE_DESCRIPTION,
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: SITE_TITLE,
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: SITE_TITLE,
    title: {
      default: SITE_TITLE,
      template: SITE_TITLE_TEMPLATE,
    },
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: {
      default: SITE_TITLE,
      template: SITE_TITLE_TEMPLATE,
    },
    description: SITE_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: "#e11d48",
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
