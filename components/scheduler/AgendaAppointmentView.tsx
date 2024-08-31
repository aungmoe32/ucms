import { SchedulerTypes } from "devextreme-react/cjs/scheduler";
import React from "react";

const AgendaAppointmentView = (
  e: SchedulerTypes.AppointmentRenderedEvent,
  query: any
) => {
  const appointment = e.appointmentData;

  const getSubjectName = (id) => {
    const name = query.data.find((cls) => cls.id == id)?.name;
    return name;
  };

  const getSubjectColor = (id) => {
    const name = query.data.find((cls) => cls.id == id)?.color;
    return name;
  };
  const color = getSubjectColor(
    appointment?.extendedProperties?.private?.classId
  );
  //   const bg = `bg-[${color}]`;
  //   console.log(bg);
  // console.log(appointment);
  return (
    <div className="flex space-x-5">
      <div
        className="flex items-center justify-center rounded-full aspect-square text-white"
        style={{
          backgroundColor: color,
        }}
      >
        {getSubjectName(appointment?.extendedProperties?.private?.classId)}
      </div>
      <div className="flex flex-col">
        <div className="font-bold ">{appointment?.summary}</div>
        <small className="text-gray-500">
          {new Date(appointment.start.dateTime).toLocaleString("en-US", {
            hour: "numeric",
            hour12: true,
          })}{" "}
          -{" "}
          {new Date(appointment.end.dateTime).toLocaleString("en-US", {
            hour: "numeric",
            hour12: true,
          })}
        </small>
        {/* <div>{appointment?.description}</div> */}
      </div>
    </div>
  );
};

export default AgendaAppointmentView;
