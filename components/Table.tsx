"use client";
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
// import "devextreme/dist/css/dx.fluent.blue.light.css";
import "../app/dx.generic.custom-scheme.css";
import { calendar_v3 } from "googleapis";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
const TimeZone = "Asia/Yangon";

type TimeCellProps = {
  data: { date: Date; text: string };
};

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
    <>
      <RefreshBtn queryClient={queryClient}></RefreshBtn>
      <Scheduler
        id="scheduler"
        dataSource={fixEvents(data)}
        startDateExpr="start.dateTime"
        endDateExpr="end.dateTime"
        textExpr="summary"
        recurrenceRuleExpr="recurrence[0]"
        recurrenceExceptionExpr="exDate"
        defaultCurrentDate={currentDate}
        defaultCurrentView="workWeek"
        timeZone={TimeZone}
        // adaptivityEnabled={true}
        recurrenceEditMode="series"
        onAppointmentAdding={onAppointmentAdding}
        onAppointmentDeleting={onAppointmentDeleting}
        onAppointmentUpdating={onAppointmentUpdating}
        // appointmentRender={AppointmentView}
        cellDuration={60}
        timeCellComponent={TimeCell}
        // dataCellComponent={DataCell}
        onAppointmentRendered={(e) => {
          const width = e.element.querySelector(
            ".dx-scheduler-date-table-cell"
          ).clientWidth; // get a cell's width
          e.appointmentElement.style.width = `${width}px`;
          // console.log(e.appointmentElement);
        }}
        startDayHour={6}
        endDayHour={22}
        height={500}
        allDayPanelMode="hidden"
        maxAppointmentsPerCell={1}
      >
        <View type="day" startDayHour={6} endDayHour={22} cellDuration={60} />
        <View
          type="workWeek"
          startDayHour={6}
          endDayHour={22}
          cellDuration={60}
          // offset={0}
        />
        <View type="month" />
        <Editing allowDragging={true} />
      </Scheduler>
    </>
  );
}

export default Table;

function AppointmentView(e) {
  // console.log(e.appointmentData);
  const appointment = e.appointmentData;
  return (
    <div>
      <div>{appointment.summary}</div>
    </div>
  );
}
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

function RefreshBtn({ queryClient }) {
  return (
    <button
      onClick={() => {
        queryClient.invalidateQueries(["events"], { exact: true });
        toast.success("Refreshed");
      }}
    >
      Refresh
    </button>
  );
}

// type DataCellProps = {
//   className: string;
//   data: {
//     startDate: Date;
//   };
// };

// const DataCell = (props: React.PropsWithChildren<DataCellProps>) => {
//   const { startDate } = props.data;
//   const container = useRef(null);

//   useEffect(() => {
//     const width = container.current.offsetWidth;
//     // container.current.style.height = width + "px";
//     // console.log(container.current.offsetWidth);
//     if (width < 100) return;
//     const sheet = new CSSStyleSheet();
//     sheet.replaceSync(
//       `.timecell-box { height : ${width}px } .datacell-box { height : ${width}px }`
//     );
//     document.adoptedStyleSheets = [sheet];
//   }, []);

//   return (
//     <div className="datacell-box h-full" ref={container}>
//       {startDate.getDate()}
//       {props.children}
//     </div>
//   );
// };

const TimeCell = (props: TimeCellProps) => {
  const { date, text } = props.data;

  return (
    <div className="timecell-box">
      {date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      })}
    </div>
  );
};
