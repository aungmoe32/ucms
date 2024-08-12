import Menu from "@/components/shared/Menu";
import Navbar from "@/components/shared/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Menu role="teacher" />
      <div className="h-full w-full ml-[300px]">
        <Navbar />
        {children}
      </div>
    </>
  );
}
