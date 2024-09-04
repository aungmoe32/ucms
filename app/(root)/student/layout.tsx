import { QueryProvider } from "@/components/scheduler/QueryProvider";
import Menu from "@/components/shared/Menu";
import Navbar from "@/components/shared/Navbar";
import { Toaster } from "react-hot-toast";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Menu role="student" />
      <div className="h-full ml-[300px]">
        <Navbar />
        {children}
      </div>
    </>
  );
}
