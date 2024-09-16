import { db } from "@/lib/drizzle/db";
import React from "react";
import EventTT from "./EventTT";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { eventList } from "@/lib/resources/events";
import { subjectsListQuery } from "@/app/api/subjects/[semester_id]/route";

const EventTTPrefetch = async () => {
  const semesters = await db.query.semesters.findMany({
    // where: (tb, funcs) => funcs.eq(tb.id, process.env.NEXT_PUBLIC_SEM_ID!),
    // with: {
    //     // eventType : true
    //     events: {
    //         with: {
    //             eventType: true,
    //             subject: true
    //         }
    //     }
    // }
  });
  const semester = semesters[0];
  const eventTypes = await db.query.eventTypes.findMany({});
  // const subjects = await db.query.subjects.findMany({
  //     where: (tb, funcs) => funcs.eq(tb.semesterId, sem?.id!)
  // });

  const queryClient = new QueryClient();
  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ["events", semester.id, "0"],
      queryFn: async () => {
        const events = await eventList(semester.id, "0");
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
        <EventTT semesters={semesters} eventTypes={eventTypes}></EventTT>
      </HydrationBoundary>
    </div>
  );
};

export default EventTTPrefetch;
