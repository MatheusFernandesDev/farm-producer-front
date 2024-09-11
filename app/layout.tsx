import type { Metadata } from "next";

import { Inter as Plus_Jakarta_Sans } from "next/font/google";

import "./globals.css";

import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from '@/components/ui/toaster'



const FontPlusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
});

export const metadata: Metadata = {
  title: "Dashboard Produtor Rural",
  description: "Metricas de todo gerenciamento Agrícula do Produtor",
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
          "min-h-screen bg-background text-black dark:text-white font-plus-jakarta-sans ",
          FontPlusJakartaSans.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
        <Toaster />
         
          {children}
        </ThemeProvider>        
      </body>
    </html>
  );
}
