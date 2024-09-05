"use client";
import { subjectEvents } from "@/lib/event";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useCallback } from "react";
import Timetable from "../Timetable";
import { useRouter } from "next/navigation";

const TeacherTimeline = ({
  subjects,
  events,
}: {
  subjects: [];
  events: any;
}) => {
  const router = useRouter();
  //   const queryClient = useQueryClient();
  //   const { data, error, isLoading, isFetching } = useQuery({
  //     queryKey: ["events"],
  //     queryFn: () => subjectEvents(),
  //     placeholderData: [],
  //   });

  const refreshEvents = useCallback(async () => {
    router.refresh();
  }, [router]);
  // return <div>{JSON.stringify(data)}</div>;
  return (
    <div>
      <Timetable
        // disableEditSeriesBtn={true}
        semester={{}}
        events={events}
        subjects={subjects}
        refreshEvents={refreshEvents}
        refreshSubjects={undefined}
        disableCreateSubject={true}
        disabled={false}
        // allowAdd={false}
        isAgenda={true}
        // allowDelete={false}
      ></Timetable>
    </div>
    // <div></div>
  );
};

export default TeacherTimeline;
