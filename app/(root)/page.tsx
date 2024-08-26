"use client";
import SubjectColorPicker from "@/components/scheduler/SubjectColorPicker";
import Link from "next/link";

export default function Home() {
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
      <SubjectColorPicker></SubjectColorPicker>
    </main>
  );
}
