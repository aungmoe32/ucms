import { getClassName } from "@/lib/classes";

export function AppointmentView(e) {
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
