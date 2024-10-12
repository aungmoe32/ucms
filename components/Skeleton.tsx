"use client";
import SK from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import React from "react";
import { useTheme } from "next-themes";

export default function Skeleton() {
  const { theme } = useTheme();
  return <SK highlightColor={theme == "dark" ? "#444" : "#f5f5f5"}></SK>;
}
