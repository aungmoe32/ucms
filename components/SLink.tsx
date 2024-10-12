"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SLink({ tl, index }) {
  const pathname = usePathname();
  return (
    <Link
      href={tl.path}
      key={index}
      className={`${
        pathname == tl.path ? "bg-blue-400" : ""
      } flex items-center gap-3 rounded-lg px-3 py-2  transition-all text-white hover:bg-blue-400`}
    >
      {tl.icon}
      {tl.text}
    </Link>
  );
}
