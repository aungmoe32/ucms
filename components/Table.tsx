"use client";
// import "devextreme/dist/css/dx.common.css";
import "devextreme/dist/css/dx.light.css";
import { calendar_v3 } from "googleapis";
import {
  Scheduler,
  View,
  Editing,
  SchedulerTypes,
} from "devextreme-react/scheduler";
import { appointments } from "../lib/data";
import { useCallback, useState } from "react";
import { formatDateTime, getEvents } from "@/lib/calendar";
import CustomStore from "devextreme/data/custom_store";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
  useMutation,
  useQuery,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { createEvent, deleteEvent, posts, updateEvent } from "@/lib/event";
import toast from "react-hot-toast";
const TimeZone = "Asia/Yangon";

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

function Table() {
  const queryClient = useQueryClient();
  const { data, error, isLoading } = useSuspenseQuery({
    queryKey: ["events"],
    queryFn: posts,
  });

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
    // console.log(e);
  }

  const [currentDate, setCurrentDate] = useState(Date.now());
  // const router = useRouter();
  if (error) return <div>{error.message}</div>;
  if (isLoading) return <div>loading...</div>;

  // console.log("table render", data);

  // const dataSource = new CustomStore({
  //   load: async (options) => {
  //     // console.log("load ", options);
  //     const mEvents = events.map((event: calendar_v3.Schema$Event) => {
  //       fixRruleStr(event, true);
  //       return event;
  //     });
  //     console.log(mEvents);
  //     return mEvents;
  //   },

  //   remove: async (key) => {
  //     console.log(key);

  //     const event = await axios.post(`/api/events/delete/${key.id}`);
  //     router.refresh();
  //   },
  //   update: async (key, values) => {
  //     console.log(key, values);
  //     //   console.log(values.recurrence);
  //     // single edit
  //     //   if (key.exDate && values.exDate && key.exDate != values.exDate) {
  //     //     values.recurrence = undefined;
  //     //     values.recurringEventId = values.id;
  //     //     values.originalStartTime = {
  //     //       dateTime: "key.exDate",
  //     //       timeZone: TimeZone,
  //     //     };
  //     //     return;
  //     //   }

  //     fixRruleStr(values, false);
  //     const event = await axios.post(`/api/events/patch/${key.id}`, values);
  //     router.refresh();
  //   },
  //   insert: async (values) => {
  //     fixRruleStr(values, false);
  //     console.log(values);
  //     values.start.timeZone = TimeZone;
  //     values.end.timeZone = TimeZone;
  //     const event = await axios.post("/api/events/insert", values);
  //     router.refresh();
  //   },
  // });

  return (
    <div className="App">
      {/* <RefreshBtn></RefreshBtn> */}
      <Scheduler
        id="scheduler"
        dataSource={fixEvents(data)}
        // startDateExpr="startDate"
        // endDateExpr="endDate"
        startDateExpr="start.dateTime"
        endDateExpr="end.dateTime"
        // startDateTimeZoneExpr="start.timeZone"
        // endDateTimeZoneExpr="end.timeZone"
        textExpr="summary"
        // textExpr="title"
        recurrenceRuleExpr="recurrence[0]"
        recurrenceExceptionExpr="exDate"
        defaultCurrentDate={currentDate}
        // currentDate={currentDate}
        // onOptionChanged={handlePropertyChange}
        // remoteFiltering={true}
        defaultCurrentView="week"
        timeZone={TimeZone}
        // adaptivityEnabled={true}
        recurrenceEditMode="series"
        onAppointmentAdding={onAppointmentAdding}
        onAppointmentDeleting={onAppointmentDeleting}
        onAppointmentUpdating={onAppointmentUpdating}
        // onAppointmentAdding={(d) => {
        //   console.log("adding", d);
        // }}
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

const RefreshBtn = () => {
  const router = useRouter();
  return (
    <div>
      <button
        className=" hover:text-blue-400 "
        onClick={() => {
          router.refresh();
          // toast.success("refreshed");
        }}
      >
        Refresh
      </button>
    </div>
  );
};
