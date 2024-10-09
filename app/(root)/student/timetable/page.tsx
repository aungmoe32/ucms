import StudentTTPrefetch from "@/components/scheduler/Timetable/student/StudentTTPrefetch";
import React, { Suspense } from "react";

export default function Timetable() {
  return <StudentTTPrefetch></StudentTTPrefetch>;
}

export const dynamic = "force-dynamic";
