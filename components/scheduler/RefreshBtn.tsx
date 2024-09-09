"use client";
import { useState } from "react";
import { Button } from "../ui/button";
import toast from "react-hot-toast";
import { IoIosRefresh } from "react-icons/io";

export default function RefreshBtn({ refreshEvents, refreshSubjects }) {
  const [btnDisabled, setBtnDisabled] = useState(false);
  const refresh = async () => {
    setBtnDisabled(true);
    const id = toast.loading("refreshing...");
    if (refreshEvents) await refreshEvents();
    // await Promise.all([refreshEvents(), refreshSubjects && refreshSubjects()]);
    toast.dismiss(id);
    toast.success("refreshed");
    setBtnDisabled(false);
  };
  return (
    <Button
      type="button"
      variant="ghost"
      disabled={btnDisabled}
      onClick={refresh}
    >
      <IoIosRefresh />
    </Button>
  );
}
