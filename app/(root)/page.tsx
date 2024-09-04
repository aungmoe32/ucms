import SubjectColorPicker from "@/components/scheduler/SubjectColorPicker";
import dynamic from "next/dynamic";
import TT from "@/components/scheduler/Timetable/TT";
import Link from "next/link";
import TeacherTTPrefetch from "@/components/scheduler/Timetable/teacher/TeacherTTPrefetch";
import { Suspense } from "react";

// const TT = dynamic(() => import("@/components/scheduler/TT"), {
//   ssr: false,
//   loading: () => <div>loading...</div>,
// });
export default async function Home() {
  return (
    <main className="p-8">
      <p>Home Page</p>
      <div className="mt-4 flex flex-row gap-4">
        <Link
          href="/teacher"
          className="bg-green-500 text-white p-3 rounded-lg text-lg"
        >
          <p>Teacher</p>
        </Link>
        <Link
          href="/student"
          className="bg-green-500 text-white p-3 rounded-lg text-lg"
        >
          <p>Student</p>
        </Link>
      </div>
      {/* <SubjectColorPicker></SubjectColorPicker> */}
    </main>
  );
}
