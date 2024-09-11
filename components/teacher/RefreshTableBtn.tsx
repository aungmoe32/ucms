"use client";
import React from "react";
import { Button } from "../ui/button";
import { useQueryClient } from "@tanstack/react-query";
import { RotateCcw } from "lucide-react";
import toast from "react-hot-toast";

const RefreshTableBtn = () => {
  const queryClient = useQueryClient();
  return (
    <Button
      size="icon"
      variant="outline"
      onClick={async () => {
        const id = toast.loading("refreshing...");
        await queryClient.invalidateQueries(["teachers"], { exact: true });
        toast.remove(id);
        toast.success("refreshed");
      }}
    >
      <RotateCcw />
    </Button>
  );
};

export default RefreshTableBtn;
