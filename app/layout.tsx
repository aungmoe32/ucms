import { ThemeProvider } from "@/components/ThemeProvider";
import { QueryProvider } from "@/components/scheduler/QueryProvider";
import type { Metadata } from "next";
import { Inter, Oswald, Source_Sans_3 } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import AuthProvider from "./auth/Provider";
import { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import SkeletonProvider from "@/components/providers/SkeletonProvider";

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
const oswald = Oswald({
  // weight: "500",
  subsets: ["latin"],
  variable: "--font-oswald",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
          integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
          crossOrigin=""
        />
      </head>

      <body
        className={`${inter.className} ${sourceSans.variable} ${oswald.variable} !font-source-sans`}
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <SkeletonProvider>
            <AuthProvider>
              <QueryProvider>{children}</QueryProvider>
            </AuthProvider>
            <Toaster></Toaster>
          </SkeletonProvider>
        </ThemeProvider>
        <script
          src="https://unpkg.com/leaflet@1.6.0/dist/leaflet.js"
          integrity="sha512-gZwIG9x3wUXg2hdXF6+rVkLF/0Vi9U8D2Ntg4Ga5I5BZpVkVxlJWbSQtXPSiUTtC0TjtGOmxa1AJPuV0CPthew=="
          crossOrigin=""
        ></script>
      </body>
    </html>
  );
}
