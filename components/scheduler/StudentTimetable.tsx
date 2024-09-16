"use client";
import { getEvents } from "@/lib/api/event";
import { getSubjects } from "@/lib/api/subject";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useCallback } from "react";
import Timetable from "./Timetable";

const StudentTimetable = ({ semester }) => {
  const queryClient = useQueryClient();
  const {
    data: events,
    error,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["events", semester.id],
    queryFn: () => getEvents(semester.calendar_id),
    placeholderData: [],
  });
  const { data: subjects } = useQuery({
    queryKey: ["subjects", semester.id],
    queryFn: () => getSubjects(semester.id),
    placeholderData: [],
  });

  const refreshEvents = useCallback(async () => {
    await queryClient.invalidateQueries(["events", semester.id], {
      exact: true,
    });
  }, [semester.id]);

  const refreshSubjects = useCallback(async () => {
    await queryClient.invalidateQueries(["subjects", semester.id], {
      exact: true,
    });
  }, [semester.id]);

  return (
    <Timetable
      semester={semester}
      events={events}
      subjects={subjects}
      refreshEvents={refreshEvents}
      refreshSubjects={refreshSubjects}
      disableCreateSubject={true}
      disabled={true}
      // allowAdd={false}
    ></Timetable>
  );
};

export default StudentTimetable;
