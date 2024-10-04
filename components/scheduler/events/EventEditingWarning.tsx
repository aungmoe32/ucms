import { TriangleAlert } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function EventEditingWarning() {
  return (
    <div className="flex justify-center text-yellow-400 py-2">
      <TriangleAlert />
      <div className="pl-2 text-sm ">
        Editing events only support in{" "}
        <Link href={"/teacher/timetable"} className=" underline">
          Timetable
        </Link>
        <span> Page!</span>
      </div>
    </div>
  );
}
