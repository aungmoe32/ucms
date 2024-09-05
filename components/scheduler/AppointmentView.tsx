"use client";
import { SchedulerTypes } from "devextreme-react/scheduler";
import { useEffect, useRef } from "react";
import { FaRepeat } from "react-icons/fa6";

export function AppointmentView(
  e: SchedulerTypes.AppointmentRenderedEvent,
  subjects: any
) {
  // console.log(e.appointmentData);
  const containerRef = useRef<any>(null);
  const appointment = e.appointmentData;

  const subject = e.appointmentData.subject;
  const color = e.appointmentData.subject?.color;

  useEffect(() => {
    containerRef.current.parentElement.parentElement.style.background = color;
    containerRef.current.parentElement.parentElement.style.borderBottom =
      "1px solid white";
  }, [color]);
  // console.log(e);
  return (
    <div className="" ref={containerRef}>
      <p className="font-bold text-md">{subject?.name}</p>
      <p>{appointment?.title}</p>
      {appointment.recurrenceRule && (
        <div className="absolute top-0 right-0 p-1">
          <FaRepeat />
        </div>
      )}
    </div>
  );
}
