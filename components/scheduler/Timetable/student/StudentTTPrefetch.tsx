import { subjectsListQuery } from "@/app/api/subjects/[semester_id]/route";
import { db } from "@/lib/drizzle/db";
import { eventList } from "@/lib/resources/events";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import React from "react";
import TeacherTimetable from "../../TeacherTimetable";
import TeacherTT from "./TeacherTT";
import StudentTT from "./StudentTT";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOption";

const StudentTTPrefetch = async () => {
  const queryClient = new QueryClient();
  const session = await getServerSession(authOptions);
  const userId = session.user.user_id;
  const user = await db.query.users.findFirst({
    where: (table, { and, eq }) => eq(table.id, userId!),
    columns: {
      password: false,
    },
    with: {
      student: {
        with: {
          semester: true,
        },
      },
    },
  });
  if (!user?.student) return <div>Not a student!</div>;

  const semester = user.student.semester;

  // console.log(semester)
  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ["events", semester.id],
      queryFn: async () => {
        const events = await eventList(semester.id);
        return events;
      },
    }),

    queryClient.prefetchQuery({
      queryKey: ["subjects", semester.id],
      queryFn: async () => {
        const data = await subjectsListQuery(semester.id);
        return data;
      },
    }),
  ]);

  return (
    <div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <StudentTT semester={semester}></StudentTT>
      </HydrationBoundary>
    </div>
  );
};

export default StudentTTPrefetch;
