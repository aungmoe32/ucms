"use client";
import Skeleton from "@/components/Skeleton";
import { Button } from "@/components/ui/button";
import { CircleUser, User } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

export default function Profile() {
  const router = useRouter();
  const { status, data: session } = useSession();
  if (status == "loading") return <Skeleton className="h-screen" />;
  return (
    <div className=" w-full flex flex-col justify-center items-center my-5 space-y-3">
      <div className="bg-neutral-100 dark:bg-gray-400 rounded-full w-28 h-28 flex justify-center items-center">
        <User className="h-10 w-10 text-primary-background" />
      </div>
      <div className="text-lg font-bold text-primary">
        {session?.user?.name}
      </div>
      <div>
        <Button variant={"outline"}>Edit Profile</Button>
      </div>
      <div className="flex flex-col space-y-5">
        <div className="flex flex-col justify-center ">
          <span className="font-bold">Email</span>
          <div className="text-gray-400 text-sm">{session?.user?.email}</div>
        </div>
        <div className="flex flex-col justify-center ">
          <span className="font-bold">Gender</span>
          <div className="text-gray-400 text-sm">{session?.user?.gender}</div>
        </div>
        <div className="flex flex-col justify-center ">
          <span className="font-bold">Current Year</span>
          <div className="text-gray-400 text-sm">
            {session?.user?.semester.year} Year, {session?.user?.semester.major}
            , {session?.user?.semester.term} Semester
          </div>
        </div>
      </div>
    </div>
  );
}
