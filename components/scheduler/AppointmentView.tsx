import { getClassName } from "@/lib/classes";
import { SchedulerTypes } from "devextreme-react/scheduler";

export function AppointmentView(e: SchedulerTypes.AppointmentRenderedEvent) {
  // console.log(e.appointmentData);
  const appointment = e.appointmentData;
  return (
    <div>
      <div>
        {getClassName(appointment?.extendedProperties?.private?.classId)}
      </div>
      <small>{appointment?.summary}</small>
    </div>
  );
}
