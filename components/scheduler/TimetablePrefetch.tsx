import Notification from "@/components/scheduler/Notification";
import Timetable from "@/components/scheduler/Timetable";
import { getEvents } from "@/lib/calendar";
import { db } from "@/lib/drizzle/db";
import { semesters, teacher_subject } from "@/lib/drizzle/schema";
import { events } from "@/lib/event";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { InferSelectModel } from "drizzle-orm";
import { z } from "zod";
export default async function TimetablePrefetch({
  searchParams,
}: {
  searchParams?: {
    semester_id?: string;
    // calendar_id?: string;
  };
}) {
  const semester_id = searchParams?.semester_id;
  // let calendar_id = searchParams?.calendar_id
  // let semester: InferSelectModel<typeof semesters>;
  let teacher_subjects: any = [];
  // console.log("hi ", semester_id);
  // if (semester_id) {
  //   const sem = await db.query.semesters.findFirst({
  //     where: (table, funcs) => funcs.eq(table.id, semester_id),
  //   });
  //   if (!sem) return <div>Invalid semester!</div>;
  //   semester = sem;
  //   teacher_subjects.push(sem);
  // }

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
  if (user?.teacher?.teacher_subject.length == 0)
    return <div>You teach no semesters</div>;
  const semester = user?.teacher?.teacher_subject[0].subject.semester!;
  teacher_subjects = user?.teacher?.teacher_subject;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["events", semester.id],
    queryFn: async () => {
      const events = await getEvents(semester.calendar_id);
      return events;
    },
  });

  return (
    <div className="mt-5">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Timetable teacher_subjects={teacher_subjects}></Timetable>
      </HydrationBoundary>
    </div>
  );
}
