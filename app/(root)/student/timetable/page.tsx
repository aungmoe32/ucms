import StudentTTPrefetch from "@/components/scheduler/Timetable/student/StudentTTPrefetch";
import React, { Suspense } from "react";

export default function Timetable() {
  return (
    <Suspense fallback={<div>loading time table...</div>}>
      <StudentTTPrefetch></StudentTTPrefetch>
    </Suspense>
  );
}
