"use client";
import React from "react";
import { IoIosRefresh } from "react-icons/io";
import Notification from "@/components/scheduler/Notification";
import { createEvent, deleteEvent, events, updateEvent } from "@/lib/event";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import {
  Editing,
  Resource,
  Scheduler,
  SchedulerTypes,
  View,
} from "devextreme-react/scheduler";
// import "devextreme/dist/css/dx.fluent.blue.light.css";
import "../scheduler/css/dx.generic.custom-scheme.css";
import { calendar_v3 } from "googleapis";
import { useCallback, useEffect, useRef, useState } from "react";
import { getSubjects } from "@/lib/subjects";
import TimetableSwitch from "./TimetableSwitch";
import Timetable from "./Timetable";
import toast from "react-hot-toast";

const TeacherTimetable = ({ teacher_subjects }: { teacher_subjects: any }) => {
  const queryClient = useQueryClient();
  const [semester, setSemester] = useState(
    teacher_subjects[0].subject.semester
  );
  const { data, error, isLoading, isFetching } = useQuery({
    queryKey: ["events", semester.id],
    queryFn: () => events(semester.calendar_id),
    placeholderData: [],
  });
  const { data: subjects } = useQuery({
    queryKey: ["subjects", semester.id],
    queryFn: () => getSubjects(semester.id),
    placeholderData: [],
  });

  //   console.log("hi ", subjects);

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

  useEffect(() => {
    // if (isLoading) toast("loading...");
    if (error) toast.error("An error occurred while fetching");
  }, [error]);

  return (
    <div>
      <div className="flex py-2 ">
        <div>
          <TimetableSwitch
            semester={semester}
            setSemester={setSemester}
            teacher_subjects={teacher_subjects}
          ></TimetableSwitch>
        </div>
      </div>
      <Timetable
        semester={semester}
        events={data}
        subjects={subjects}
        refreshEvents={refreshEvents}
        refreshSubjects={refreshSubjects}
        disableCreateSubject={false}
        disabled={false}
        allowAdd={true}
      ></Timetable>
    </div>
  );
};

export default TeacherTimetable;
