import type { Metadata } from "next";
import "../globals.css";
import { Inter } from "next/font/google";
import Menu from "@/components/shared/Menu";
import Navbar from "@/components/shared/Navbar";
import { QueryProvider } from "@/components/scheduler/QueryProvider";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "School Management System",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-row`}>{children}</body>
    </html>
  );
}
