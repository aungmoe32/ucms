"use client";
import Link from "next/link";
import {
  Bell,
  CircleUser,
  Home,
  LineChart,
  Menu,
  Package,
  Package2,
  Search,
  ShoppingCart,
  Users,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Notification from "@/components/scheduler/Notification";
import { ModeToggle } from "@/components/ModeToggle";
import { useState } from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Profile from "./profile/Profile";

export const description =
  "A products dashboard with a sidebar navigation and a main content area. The dashboard has a header with a search input and a user menu. The sidebar has a logo, navigation links, and a card with a call to action. The main content area shows an empty state with a call to action.";

export default function Nav({ children, links }) {
  const [openDrawer, setOpenDrawer] = useState(false);
  const router = useRouter();
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full  flex-col gap-2 bg-primary">
          <div className="flex h-14 items-center  px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              {/* <Package2 className="h-6 w-6" /> */}
              <span className="text-white text-2xl font-bold">UCMS</span>
            </Link>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4 gap-3">
              {links.map((tl, index) => (
                <Link
                  href={tl.path}
                  key={index}
                  className="flex items-center gap-3 rounded-lg px-3 py-2  transition-all text-white hover:bg-blue-400"
                >
                  {tl.icon}
                  {tl.text}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet open={openDrawer} onOpenChange={setOpenDrawer}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col bg-primary">
              <nav className="grid gap-2 text-lg font-medium">
                <Link
                  href="#"
                  className="flex items-center  text-lg font-semibold"
                >
                  {/* <Package2 className="h-6 w-6 text-background" /> */}
                  <span className="text-white">UCMS</span>
                </Link>
                {links.map((tl, index) => (
                  <Link
                    key={index}
                    onClick={() => setOpenDrawer(false)}
                    href={tl.path}
                    className="flex items-center gap-3 rounded-lg px-3 py-2  transition-all text-white hover:bg-blue-400"
                  >
                    {tl.icon}
                    {tl.text}
                  </Link>
                ))}
              </nav>
              <div className="mt-auto"></div>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1"></div>
          <Notification></Notification>
          <ModeToggle></ModeToggle>
          <Profile></Profile>
        </header>
        <main className="p-3">{children}</main>
      </div>
    </div>
  );
}
