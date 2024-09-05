import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FutureTech - Your Journey to Tomorrow Begins Here",
  description: "Blog website template",
};

import React from "react";
import { ThemeProvider } from "@/components/common/theme-provider";
import ProgressbarProvider from "@/components/common/progressbar-provider";
import SessionProvider from "@/components/common/session-provider";
import { Toaster } from "@/components/ui/sonner";
import QueryProvider from "@/components/common/query-provider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png"/>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png"/>
      </head>
      <body className={inter.className}>
        <SessionProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
            >
            <ProgressbarProvider>
              <QueryProvider>
                {children}
              </QueryProvider>
              <Toaster />
            </ProgressbarProvider>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
