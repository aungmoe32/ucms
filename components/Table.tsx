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
  Resource,
  Scheduler,
  SchedulerTypes,
  View,
} from "devextreme-react/scheduler";
// import "devextreme/dist/css/dx.fluent.blue.light.css";
import "../app/dx.generic.custom-scheme.css";
import { calendar_v3 } from "googleapis";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { formatDateTime } from "@/lib/event";
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
  const [isRecurrenceEdit, setIsRecurrenceEdit] = useState(false);
  const schedulerRef = useRef(null);

  const createEventMutation = useMutation({
    mutationFn: createEvent,
    onSuccess: (data, variables, toastId) => {
      // queryClient.setQueryData(["Events", data.id], data)
      toast.dismiss(toastId);
      toast.success("added");
      queryClient.invalidateQueries(["events"], { exact: true });
    },
    onError: (error, variables, context) => {
      toast.dismiss(context);
      toast.error("error");
      queryClient.invalidateQueries(["events"], { exact: true });
    },
    onMutate: () => {
      return toast.loading("adding...");
    },
  });
  const deleteEventMutation = useMutation({
    mutationFn: deleteEvent,
    onSuccess: (data, variables, toastId) => {
      toast.dismiss(toastId);
      toast.success("deleted");
      queryClient.invalidateQueries(["events"], { exact: true });
    },
    onError: (error, variables, context) => {
      toast.dismiss(context);
      toast.error("error");
      queryClient.invalidateQueries(["events"], { exact: true });
    },
    onMutate: () => {
      return toast.loading("deleting...");
    },
  });
  const updateEventMutation = useMutation({
    mutationFn: updateEvent,
    onSuccess: (data, v, toastId) => {
      if (toastId) {
        toast.dismiss(toastId);
        toast.success("updated");
      }
      queryClient.invalidateQueries(["events"], { exact: true });
    },
    onError: (error, variables, context) => {
      toast.dismiss(context);
      toast.error("error");
      queryClient.invalidateQueries(["events"], { exact: true });
    },

    onMutate: (variables) => {
      // console.log(variables);
      return toast.loading("updating...");
    },
  });

  function onAppointmentAdding(e: SchedulerTypes.AppointmentAddingEvent) {
    fixRruleStr(e.appointmentData, false);

    console.log("add ", e.appointmentData);

    e.appointmentData.start.timeZone = TimeZone;
    e.appointmentData.end.timeZone = TimeZone;
    createEventMutation.mutate(e.appointmentData);
    data.push(e.appointmentData);

    const excep = e.appointmentData.excep;
    const event = e.appointmentData;
    if (excep) {
      const parent = excep.parent;
      // const target = excep.target;
      // const scheduler = schedulerRef.current?.instance();
      // excep.exDate = formatDateTime(
      //   new Date(e.appointmentData.start.dateTime)
      // );
      const exDate = parent.extendedProperties?.private?.exDate;

      let newExDate = exDate
        ? exDate + "," + formatDateTime(new Date(event.start.dateTime))
        : formatDateTime(new Date(event.start.dateTime));
      // const found = data.find((e) => e.id == parent.id);
      // found.exDate = newExDate;

      fixRruleStr(parent, false);
      parent.extendedProperties = {
        private: {
          exDate: newExDate,
        },
      };
      updateEventMutation.mutate(parent);

      // console.log(found);
      // scheduler.updateAppointment(excep, { ...excep });
    }
    // e.cancel = false;
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
    // console.log("update", e.newData);
    updateEventMutation.mutate(e.newData);
  }

  const handlePropertyChange = (e) => {
    // console.log(e.name);
  };

  if (error) return <div>{error.message}</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <>
      <RefreshBtn queryClient={queryClient}></RefreshBtn>
      <Scheduler
        id="scheduler"
        dataSource={fixEvents(data)}
        ref={schedulerRef}
        startDateExpr="start.dateTime"
        endDateExpr="end.dateTime"
        textExpr="summary"
        recurrenceRuleExpr="recurrence[0]"
        recurrenceExceptionExpr="extendedProperties.private.exDate"
        defaultCurrentDate={currentDate}
        defaultCurrentView="workWeek"
        timeZone={TimeZone}
        // adaptivityEnabled={true}
        recurrenceEditMode="series"
        onAppointmentAdding={onAppointmentAdding}
        onAppointmentDeleting={onAppointmentDeleting}
        onAppointmentUpdating={onAppointmentUpdating}
        onAppointmentDblClick={(e) => {
          // console.log(e.targetedAppointmentData);
          if (!e.targetedAppointmentData.recurrence) {
            return;
          }
          e.cancel = true;
          toast((t) => (
            <span>
              <button
                className="bg-green-300"
                onClick={() => {
                  toast.dismiss(t.id);
                  const scheduler = schedulerRef.current?.instance();
                  window.scheduler = scheduler;
                  const { start, end, summary, extendedProperties } =
                    e.targetedAppointmentData;
                  const appointment = {
                    start,
                    end,
                    summary,
                    extendedProperties,
                    excep: {
                      parent: e.appointmentData,
                      target: e.targetedAppointmentData,
                    },
                  };
                  // appointment.recurrence = undefined;
                  // console.log(appointment);
                  scheduler?.showAppointmentPopup(appointment, true);
                }}
              >
                Take this event
              </button>

              <button
                className="ml-4 bg-red-400"
                onClick={() => {
                  toast.dismiss(t.id);
                  const scheduler = schedulerRef.current?.instance();
                  scheduler?.showAppointmentPopup(e.appointmentData, false);
                }}
              >
                Edit series
              </button>
            </span>
          ));
        }}
        appointmentRender={AppointmentView}
        cellDuration={60}
        timeCellComponent={TimeCell}
        // onOptionChanged={handlePropertyChange}
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
        <Resource
          dataSource={classes}
          fieldExpr="extendedProperties.private.classId"
          label="Class"
          useColorAsDefault={true}
        />
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

export const classes = [
  {
    text: "Math",
    id: "1",
    color: "#00af2c",
  },
  {
    text: "Eng",
    id: "2",
    color: "#56ca85",
  },
  {
    text: "DLD",
    id: "3",
    color: "#8ecd3c",
  },
];

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
  // console.log(events);
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
