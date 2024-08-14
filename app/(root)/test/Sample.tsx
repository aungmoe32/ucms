"use client";
import { getSubjects } from "@/lib/subject";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const Sample = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["subjects"],
    queryFn: getSubjects,
    placeholderData: [],
  });
  console.log(data, isLoading);
  return <div>Sample</div>;
};

export default Sample;
