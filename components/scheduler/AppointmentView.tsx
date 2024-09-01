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

  const getSubjectName = (id) => {
    const name = subjects.find((cls) => cls.id == id)?.name;
    return name;
  };
  const getSubjectColor = (id) => {
    const name = subjects.find((cls) => cls.id == id)?.color;
    return name;
  };
  const color = getSubjectColor(
    appointment?.extendedProperties?.private?.classId
  );

  useEffect(() => {
    containerRef.current.parentElement.parentElement.style.background = color;
    containerRef.current.parentElement.parentElement.style.borderBottom =
      "1px solid white";
  }, [color]);
  return (
    <div className="" ref={containerRef}>
      <p className="font-bold">
        {getSubjectName(appointment?.extendedProperties?.private?.classId)}
      </p>
      <small>{appointment?.summary}</small>
      {appointment.recurrence && (
        <div className="absolute top-0 right-0 p-1">
          <FaRepeat />
        </div>
      )}
    </div>
  );
}
