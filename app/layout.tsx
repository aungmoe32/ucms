import { ThemeProvider } from "@/components/ThemeProvider";
import { QueryProvider } from "@/components/scheduler/QueryProvider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import AuthProvider from "./auth/Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "UCMS",
  description: "UCMS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} `}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <AuthProvider>
            <QueryProvider>{children}</QueryProvider>
          </AuthProvider>
          <Toaster></Toaster>
        </ThemeProvider>
      </body>
    </html>
  );
}
