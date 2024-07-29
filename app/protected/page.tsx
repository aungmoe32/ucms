"use client";
import { getServerSession } from "next-auth";
import { getSession, useSession } from "next-auth/react";
import React from "react";

const page = () => {
  //   const session = await getServerSession();
  const session = useSession();
  console.log(session);
  return <div>protected</div>;
};

export default page;
