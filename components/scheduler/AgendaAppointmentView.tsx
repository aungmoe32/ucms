import { SchedulerTypes } from "devextreme-react/cjs/scheduler";
import React from "react";

const AgendaAppointmentView = (
  e: SchedulerTypes.AppointmentRenderedEvent,
  subjects: any
) => {
  const appointment = e.appointmentData;

  const subject = e.appointmentData.subject;
  const color = subject?.color;
  const name = subject?.name;

  return (
    <div className="flex space-x-5">
      <div
        className="flex items-center justify-center rounded-full aspect-square text-white"
        style={{
          backgroundColor: color ? color : "#2C80FF",
        }}
      >
        {name}
      </div>
      <div className="flex flex-col">
        <div className="font-bold ">{appointment.title}</div>
        <small className="text-gray-500">
          {new Date(appointment.startDate).toLocaleString("en-US", {
            hour: "numeric",
            hour12: true,
          })}{" "}
          -{" "}
          {new Date(appointment.endDate).toLocaleString("en-US", {
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
