import TeacherTTPrefetch from "@/components/scheduler/Timetable/teacher/TeacherTTPrefetch";
import React, { Suspense } from "react";

export default function Timetable() {
  return (
    <Suspense fallback={<div>loading time table...</div>}>
      <TeacherTTPrefetch></TeacherTTPrefetch>
    </Suspense>
  );
}
