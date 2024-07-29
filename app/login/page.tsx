import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";
import LoginForm from "./LoginForm";

const page = async () => {
  const session = await getServerSession();
  console.log({ session });

  if (session) {
    redirect("/");
  }

  return <LoginForm></LoginForm>;
};

export default page;
