import Notification from "@/components/scheduler/Notification";
import StudentTTPrefetch from "@/components/scheduler/Timetable/student/StudentTTPrefetch";
import TeacherTTPrefetch from "@/components/scheduler/Timetable/teacher/TeacherTTPrefetch";
import TeacherTimelinePrefetch from "@/components/scheduler/Timetable/teacher/TeacherTimelinePrefetch";
import EventTTPrefetch from "@/components/scheduler/events/EventTTPrefetch";
import { Suspense } from "react";

// const TT = dynamic(() => import("@/components/scheduler/TT"), {
//   ssr: false,
//   loading: () => <div>loading...</div>,
// });
export default async function Home() {
  return (
    <main className="p-8">
      <Notification></Notification>

      <Suspense fallback={<div>loading time table...</div>}>
        <TeacherTTPrefetch></TeacherTTPrefetch>
      </Suspense>

      {/* <Suspense fallback={<div>loading...</div>}>
        <TeacherTimelinePrefetch></TeacherTimelinePrefetch>
      </Suspense>

      <Suspense fallback={<div>loading...</div>}>
        <EventTTPrefetch></EventTTPrefetch>
      </Suspense>

      <Suspense fallback={<div>loading time table...</div>}>
        <StudentTTPrefetch></StudentTTPrefetch>
      </Suspense> */}
    </main>
  );
}
