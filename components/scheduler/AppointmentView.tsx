import { getSubjectName } from "@/lib/subjects";
import { SchedulerTypes } from "devextreme-react/scheduler";

export function AppointmentView(e: SchedulerTypes.AppointmentRenderedEvent) {
  // console.log(e.appointmentData);
  const appointment = e.appointmentData;
  return (
    <div>
      <p>{getSubjectName(appointment?.extendedProperties?.private?.classId)}</p>
      <small>{appointment?.summary}</small>
    </div>
  );
}
