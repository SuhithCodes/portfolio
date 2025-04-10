import type React from "react";
import "@/app/globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { LoadingProvider } from "@/components/providers/LoadingProvider";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Suhith Ghanathay - Full Stack Developer",
  description:
    "Portfolio website of Suhith Ghanathay, a Full Stack Developer with expertise in React, Next.js, and Tailwind CSS",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          inter.className,
          "min-h-screen bg-background antialiased"
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <LoadingProvider>{children}</LoadingProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

import "./globals.css";
