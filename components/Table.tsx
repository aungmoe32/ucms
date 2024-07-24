"use client";
// import "devextreme/dist/css/dx.common.css";
import { createEvent, deleteEvent, events, updateEvent } from "@/lib/event";
import {
  useMutation,
  useQuery,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import {
  Editing,
  Scheduler,
  SchedulerTypes,
  View,
} from "devextreme-react/scheduler";
// import "devextreme/dist/css/dx.light.css";
import "devextreme/dist/css/dx.fluent.blue.dark.compact.css";
import { calendar_v3 } from "googleapis";
import { useState } from "react";
import toast from "react-hot-toast";
const TimeZone = "Asia/Yangon";

function Table() {
  const queryClient = useQueryClient();
  const { data, error, isLoading } = useSuspenseQuery({
    queryKey: ["events"],
    queryFn: events,
  });

  const [currentDate, setCurrentDate] = useState(Date.now());

  const createEventMutation = useMutation({
    mutationFn: createEvent,
    onSuccess: (data, v, toastId) => {
      // queryClient.setQueryData(["Events", data.id], data)
      toast.dismiss(toastId);
      toast.success("added");

      queryClient.invalidateQueries(["events"], { exact: true });
    },
    onMutate: () => {
      return toast.loading("adding...");
    },
  });
  const deleteEventMutation = useMutation({
    mutationFn: deleteEvent,
    onSuccess: (data, v, toastId) => {
      toast.dismiss(toastId);
      toast.success("deleted");
      queryClient.invalidateQueries(["events"], { exact: true });
    },

    onMutate: () => {
      return toast.loading("deleting...");
    },
  });
  const updateEventMutation = useMutation({
    mutationFn: updateEvent,
    onSuccess: (data, v, toastId) => {
      toast.dismiss(toastId);
      toast.success("updated");
      queryClient.invalidateQueries(["events"], { exact: true });
    },

    onMutate: () => {
      return toast.loading("updating...");
    },
  });

  function onAppointmentAdding(e: SchedulerTypes.AppointmentAddingEvent) {
    fixRruleStr(e.appointmentData, false);
    // console.log(e.appointmentData);
    e.appointmentData.start.timeZone = TimeZone;
    e.appointmentData.end.timeZone = TimeZone;
    createEventMutation.mutate(e.appointmentData);
    data.push(e.appointmentData);
    e.cancel = false;
  }
  function onAppointmentDeleting(e: SchedulerTypes.AppointmentAddingEvent) {
    deleteEventMutation.mutate(e.appointmentData);
    // removing appointment
    for (let i = 0; i < data.length; i++) {
      if (data[i].id == e.appointmentData.id) {
        data.splice(i, 1);
        break;
      }
    }
  }
  function onAppointmentUpdating(e: SchedulerTypes.AppointmentUpdatingEvent) {
    fixRruleStr(e.newData, false);
    updateEventMutation.mutate(e.newData);
  }

  if (error) return <div>{error.message}</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <div className="App">
      <Scheduler
        id="scheduler"
        dataSource={fixEvents(data)}
        startDateExpr="start.dateTime"
        endDateExpr="end.dateTime"
        textExpr="summary"
        recurrenceRuleExpr="recurrence[0]"
        recurrenceExceptionExpr="exDate"
        defaultCurrentDate={currentDate}
        defaultCurrentView="week"
        timeZone={TimeZone}
        // adaptivityEnabled={true}
        recurrenceEditMode="series"
        onAppointmentAdding={onAppointmentAdding}
        onAppointmentDeleting={onAppointmentDeleting}
        onAppointmentUpdating={onAppointmentUpdating}
      >
        <View type="day" startDayHour={10} endDayHour={22} />
        <View type="week" startDayHour={6} endDayHour={22} />
        <View type="month" />
        <Editing allowDragging={true} />
      </Scheduler>
    </div>
  );
}

export default Table;

function fixRruleStr(event: any, remove: boolean) {
  let recurr = event.recurrence;
  //   console.log(recurr);
  if (!recurr) return;
  if (!Array.isArray(recurr)) {
    recurr = Object.values(recurr);
  }
  if (recurr[0] == "") {
    event.recurrence = [];
    return;
  }
  if (recurr?.length) {
    event.recurrence = [
      remove ? recurr[0].replace("RRULE:", "") : `RRULE:${recurr[0]}`,
    ];
  }
}

function fixEvents(events) {
  return events.map((event: calendar_v3.Schema$Event) => {
    fixRruleStr(event, true);
    return event;
  });
}
