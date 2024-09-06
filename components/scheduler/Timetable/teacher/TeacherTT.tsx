"use client";
import React from "react";
import { IoIosRefresh } from "react-icons/io";
import Notification from "@/components/scheduler/Notification";
import {
  createEvent,
  deleteEvent,
  events,
  getEvents,
  updateEvent,
} from "@/lib/event";
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
import "../../css/dx.generic.custom-scheme.css";
import { calendar_v3 } from "googleapis";
import { useCallback, useEffect, useRef, useState } from "react";
import { getSubjects } from "@/lib/subjects";
import toast from "react-hot-toast";
import TimetableSwitch from "../../TimetableSwitch";
import Timetable from "../Timetable";

const TeacherTT = ({
  teacher_subjects,
  sem,
  eventTypes,
}: {
  teacher_subjects: any;
  sem: any;
  eventTypes: any;
}) => {
  const queryClient = useQueryClient();
  const [semester, setSemester] = useState(sem);
  const { data, error, isLoading, isFetching } = useQuery({
    queryKey: ["events", semester.id],
    queryFn: () => getEvents(semester.id),
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
  }, [semester.id, queryClient]);

  const refreshSubjects = useCallback(async () => {
    await queryClient.invalidateQueries(["subjects", semester.id], {
      exact: true,
    });
  }, [semester.id, queryClient]);

  useEffect(() => {
    // if (isLoading) toast("loading...");
    if (error) toast.error("An error occurred while fetching");
  }, [error]);

  // window.refr = () =>
  //   queryClient.invalidateQueries(["subjects", semester.id], {
  //     exact: true,
  //   });
  return (
    <div>
      <div className="flex py-2 items-center justify-end w-full">
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
        eventTypes={eventTypes}
        refreshEvents={refreshEvents}
        refreshSubjects={refreshSubjects}
        disableCreateSubject={false}
      // allowAdd={true}
      ></Timetable>
    </div>
  );
};

export default TeacherTT;
