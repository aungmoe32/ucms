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
import { eventTypes } from "@/lib/drizzle/schema";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOption";

const TeacherTTPrefetch = async () => {
  let teacher_subjects: any = [];

  const session = await getServerSession(authOptions);
  const userId = session.user.user_id;
  const user = await db.query.users.findFirst({
    where: (table, { and, eq }) => eq(table.id, userId!),
    columns: {
      password: false,
    },
    with: {
      teacher: {
        with: {
          teacher_subject: {
            with: {
              subject: {
                with: {
                  semester: true,
                },
              },
            },
          },
        },
      },
    },
  });
  if (!user?.teacher?.teacher_subject.length)
    return <div>You teach no semesters</div>;
  const semester = user?.teacher?.teacher_subject[0].subject.semester!;
  teacher_subjects = user?.teacher?.teacher_subject;

  const queryClient = new QueryClient();
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
  const eventTypes = await db.query.eventTypes.findMany({});

  return (
    <div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <TeacherTT
          teacher_subjects={teacher_subjects}
          sem={semester}
          eventTypes={eventTypes}
        ></TeacherTT>
      </HydrationBoundary>
    </div>
  );
};

export default TeacherTTPrefetch;
