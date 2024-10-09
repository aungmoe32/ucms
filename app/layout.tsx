import { ThemeProvider } from "@/components/ThemeProvider";
import { QueryProvider } from "@/components/scheduler/QueryProvider";
import type { Metadata } from "next";
import { Inter, Source_Sans_3 } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import AuthProvider from "./auth/Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "UCMS",
  description: "UCMS",
};
const sourceSans = Source_Sans_3({
  // weight: "500",
  subsets: ["latin"],
  variable: "--font-source-sans",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} ${sourceSans.variable} font-source-sans`}
      >
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
