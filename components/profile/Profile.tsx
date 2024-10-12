"use client";
import { signOut, useSession } from "next-auth/react";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { CircleUser } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Profile() {
  const router = useRouter();
  const { status, data: session } = useSession();
  if (status == "loading") return null;
  if (status == "unauthenticated")
    return (
      // <Link href="/login">
      <Button variant={"outline"} onClick={() => router.push("/login")}>
        Login
      </Button>
      // </Link>
    );
  // console.log(session);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="icon" className="rounded-full">
          <CircleUser className="h-5 w-5" />
          <span className="sr-only">Toggle user menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>{session?.user?.name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link className="w-full" href={`/${session?.user?.role}/dashboard`}>
            Dashboard
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link className="w-full" href={`/${session?.user?.role}/profile`}>
            Account
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <button
            className="w-full text-left"
            onClick={async () => {
              const notiBtn = document.getElementById("noti_btn");
              notiBtn?.click();
              const data = await signOut({
                redirect: false,
                callbackUrl: "/login",
              });
              router.push(data.url);
            }}
          >
            Logout
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
