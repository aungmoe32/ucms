import NavBar from "@/components/NavBar";
import { db } from "@/lib/drizzle/db";
import { users } from "@/lib/drizzle/schema";
import { signIn, signOut } from "next-auth/react";
import Link from "next/link";
import React from "react";

const page = async () => {
  // await db.insert(users).values({
  //   name : "hacker",
  //   email : "pogoka9717@maxturns.com",
  // })
  return (
    <div>
      <NavBar></NavBar>
    </div>
  );
};

export default page;
