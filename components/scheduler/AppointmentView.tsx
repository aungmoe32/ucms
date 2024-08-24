import { getSubjectName } from "@/lib/subjects";
import { SchedulerTypes } from "devextreme-react/scheduler";
import { FaRepeat } from "react-icons/fa6";

export function AppointmentView(e: SchedulerTypes.AppointmentRenderedEvent) {
  // console.log(e.appointmentData);
  const appointment = e.appointmentData;
  return (
    <div className="">
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
