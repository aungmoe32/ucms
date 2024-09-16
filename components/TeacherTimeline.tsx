"use client";
import { subjectEvents } from "@/lib/api/event";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useCallback } from "react";
import Timetable from "./scheduler/Timetable";

const TeacherTimeline = ({ subjects }: { subjects: [] }) => {
  const queryClient = useQueryClient();
  const { data, error, isLoading, isFetching } = useQuery({
    queryKey: ["events"],
    queryFn: () => subjectEvents(),
    placeholderData: [],
  });

  const refreshEvents = useCallback(async () => {
    await queryClient.invalidateQueries(["events"], {
      exact: true,
    });
  }, [queryClient]);
  // return <div>{JSON.stringify(data)}</div>;
  return (
    <div>
      <Timetable
        disableEditSeriesBtn={true}
        semester={{}}
        events={data}
        subjects={subjects}
        refreshEvents={refreshEvents}
        refreshSubjects={undefined}
        disableCreateSubject={true}
        disabled={false}
        timelineMode={true}
        // allowAdd={false}
        isAgenda={true}
        // allowDelete={false}
      ></Timetable>
    </div>
    // <div></div>
  );
};

export default TeacherTimeline;
