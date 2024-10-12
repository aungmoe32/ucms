"use client";
import { useTheme } from "next-themes";
import React from "react";
import { SkeletonTheme } from "react-loading-skeleton";

export default function SkeletonProvider({ children }) {
  const { theme, setTheme } = useTheme();
  return (
    <SkeletonTheme baseColor={theme == "dark" ? "#202020" : "#ebebeb"}>
      {children}
    </SkeletonTheme>
  );
}
