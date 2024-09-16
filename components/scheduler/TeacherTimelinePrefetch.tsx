import { getSubjectEvents } from "@/lib/resources/calendars";
import { db } from "@/lib/drizzle/db";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import React from "react";
import TeacherTimeline from "../TeacherTimeline";

export default async function TeacherTimelinePrefetch() {
  const userId = process.env.USER_ID;
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

  const queryClient = new QueryClient();
  const subjects = user.teacher.teacher_subject.map((ts) => ts.subject);
  await queryClient.prefetchQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const events = await getSubjectEvents(subjects);
      return events;
    },
  });

  console.log(subjects);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TeacherTimeline subjects={subjects}></TeacherTimeline>
    </HydrationBoundary>
  );
}
