"use client";
import { getEvents } from "@/lib/api/event";
import { getSubjects } from "@/lib/api/subject";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Timetable from "../Timetable/Timetable";
import EventTypeSwitcher from "./EventTypeSwitcher";
import SemesterSwitcher from "./SemesterSwitcher";
import { TriangleAlert } from "lucide-react";
import Link from "next/link";
import EventEditingWarning from "./EventEditingWarning";

const EventTT = ({ semesters, eventTypes }) => {
  const [eventType, setEventType] = useState({ name: "All", id: "0" });
  const [currSemester, setCurrSemester] = useState(semesters[0]);
  const {
    data: events,
    error,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["events", currSemester.id, eventType.id],
    queryFn: () => getEvents(currSemester.id, eventType.id),
    placeholderData: [],
  });
  const { data: subjects } = useQuery({
    queryKey: ["subjects", currSemester.id],
    queryFn: () => getSubjects(currSemester.id),
    placeholderData: [],
  });
  return (
    <div>
      <div className="flex justify-between items-center w-full">
        <SemesterSwitcher
          currSemester={currSemester}
          setCurrSemester={setCurrSemester}
          semesters={semesters}
        ></SemesterSwitcher>
        <EventTypeSwitcher
          eventTypes={eventTypes}
          eventType={eventType}
          setEventType={setEventType}
        ></EventTypeSwitcher>
      </div>
      <Timetable
        semester={{}}
        events={events}
        subjects={subjects}
        refreshEvents={undefined}
        refreshSubjects={undefined}
        disableCreateSubject={true}
        disabled={true}
        isAgenda={true}
        eventTypes={eventTypes}
      ></Timetable>

      <EventEditingWarning></EventEditingWarning>
    </div>
  );
};

export default EventTT;
