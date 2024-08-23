"use client";
import { IoIosRefresh } from "react-icons/io";
import Notification from "@/components/scheduler/Notification";
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
import "../scheduler/css/dx.generic.custom-scheme.css";
import { calendar_v3 } from "googleapis";
import { useCallback, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { formatDateTime } from "@/lib/event";
import { AppointmentView } from "./AppointmentView";
import { TimeCell } from "./TimeCell";
import { subjects, getSubjectColor } from "@/lib/subjects";
import { Button } from "../ui/button";
import AgendaAppointmentView from "./AgendaAppointmentView";
import Tooltip from "./Tooltip";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
const TimeZone = "Asia/Yangon";

function Table() {
  const queryClient = useQueryClient();
  const { data, error, isLoading } = useQuery({
    queryKey: ["events"],
    queryFn: events,
    placeholderData: [],
  });

  // console.log(data, error, isLoading);

  const [currentDate, setCurrentDate] = useState(Date.now());
  const [isRecurrenceEdit, setIsRecurrenceEdit] = useState(false);
  const [groupBySubject, setGroupBySubject] = useState(false);
  const [recurrDialogOpen, setRecurrDialogOpen] = useState(false);
  const [recurrEditEvent, setRecurrEditEvent] = useState<any>(null);
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

  function onAppointmentFormOpening(
    e: SchedulerTypes.AppointmentFormOpeningEvent
  ) {
    e.cancel = false;
    const appo = e.appointmentData;
    const classId = appo?.extendedProperties?.private?.classId;
    if (appo && !classId) {
      e.appointmentData.summary = "hacker";
      // e.appointmentData = { summary: "hacke" };
      // console.log(appo);
      appo.extendedProperties = {
        private: {
          classId: "1",
        },
      };
    }
  }
  function onAppointmentAdding(e: SchedulerTypes.AppointmentAddingEvent) {
    fixRruleStr(e.appointmentData, false);

    // console.log("add ", e.appointmentData);

    const excep = e.appointmentData.excep;
    if (excep) {
      const parent = excep.parent;
      const target = excep.target;
      const event = e.appointmentData;
      event.recurrence = [];
      event.recurringEventId = parent.id;
      event.originalStartTime = {
        dateTime: target.start.dateTime,
        timeZone: TimeZone,
      };
      createEventMutation.mutate(event);
      data.push(event);
      return;
      // const scheduler = schedulerRef.current?.instance();
      // excep.exDate = formatDateTime(
      //   new Date(e.appointmentData.start.dateTime)
      // );
      // const exDate = parent.extendedProperties?.private?.exDate;

      // let newExDate = exDate
      //   ? exDate + "," + formatDateTime(new Date(event.start.dateTime))
      //   : formatDateTime(new Date(event.start.dateTime));
      // const found = data.find((e) => e.id == parent.id);
      // found.exDate = newExDate;

      // fixRruleStr(parent, false);
      // parent.extendedProperties = {
      //   private: {
      //     exDate: newExDate,
      //   },
      // };
      // updateEventMutation.mutate(parent);

      // console.log(found);
      // scheduler.updateAppointment(excep, { ...excep });
    }

    const appo = e.appointmentData;
    const classId = appo?.extendedProperties?.private?.classId;
    if (appo && !classId) {
      // e.appointmentData.summary = "hacker";
      // e.appointmentData = { summary: "hacke" };
      // console.log(appo);
      appo.extendedProperties = {
        private: {
          classId: "0",
        },
      };
    }

    e.appointmentData.start.timeZone = TimeZone;
    e.appointmentData.end.timeZone = TimeZone;
    data.push(e.appointmentData);
    createEventMutation.mutate(e.appointmentData);
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
    // console.log("update ", e.newData);
    updateEventMutation.mutate(e.newData);
  }

  const appointmentTooltip = useCallback((props) => {
    const scheduler: any = schedulerRef.current?.instance();

    // NOTE: You can use props.appointmentData.resouceId to obtain resource color
    const color = getSubjectColor(
      props.appointmentData?.extendedProperties?.private?.classId
    );

    // const isAppointmentDisabled = data.appointmentData.disabled;
    const isDeleteAllowed =
      (scheduler?.option("editing") &&
        scheduler.option("editing.allowDeleting") === true) ||
      scheduler.option("editing") === true;
    // const isDeleteButtonExist = !isAppointmentDisabled && isDeleteAllowed;
    const isDeleteButtonExist = isDeleteAllowed;

    const onDeleteButtonClick = (e) => {
      scheduler.deleteAppointment(props.appointmentData);
      e.stopPropagation();
      // console.log(e);
      scheduler.hideAppointmentTooltip();
    };

    return (
      <Tooltip
        {...props}
        isDeleteButtonExist={isDeleteButtonExist}
        onDeleteButtonClick={onDeleteButtonClick}
        color={color}
      />
    );
  }, []);

  useEffect(() => {
    if (isLoading) toast("loading...");
    if (error) toast.error("An error occurred while fetching");
  }, [isLoading, error]);

  // if (error) return <div>{error.message}</div>;
  // if (isLoading) return <div>loading...</div>;
  const handlePropertyChange = useCallback((e) => {
    if (e.name === "currentDate") {
      setCurrentDate(e.value);
    }
  }, []);
  console.log("render");
  return (
    <div className="mt-5">
      <div className="flex justify-between">
        <Notification></Notification>
        <div className="flex ">
          <RefreshBtn queryClient={queryClient}></RefreshBtn>
          <Button
            variant="outline"
            type="button"
            onClick={() => setCurrentDate(Date.now())}
          >
            Today
          </Button>
          <Button
            variant="outline"
            type="button"
            className="ml-2"
            onClick={() => {
              setGroupBySubject(!groupBySubject);
            }}
          >
            Group By Subject
          </Button>
        </div>
      </div>
      <Scheduler
        id="scheduler"
        dataSource={fixEvents(data)}
        ref={schedulerRef}
        startDateExpr="start.dateTime"
        endDateExpr="end.dateTime"
        textExpr="summary"
        descriptionExpr="description"
        recurrenceRuleExpr="recurrence[0]"
        // recurrenceExceptionExpr="extendedProperties.private.exDate"
        recurrenceExceptionExpr="exDate"
        // defaultCurrentDate={currentDate}
        currentDate={currentDate}
        defaultCurrentView="workWeek"
        timeZone={TimeZone}
        // adaptivityEnabled={true}
        recurrenceEditMode="series"
        onAppointmentAdding={onAppointmentAdding}
        onAppointmentDeleting={onAppointmentDeleting}
        onAppointmentUpdating={onAppointmentUpdating}
        // onAppointmentFormOpening={onAppointmentFormOpening}
        onAppointmentDblClick={(e) => {
          // onAppointmentDblClick(e, schedulerRef, setRecurrDialogOpen)
          if (!e.targetedAppointmentData?.recurrence) {
            return;
          }
          e.cancel = true;
          setRecurrEditEvent(e);
          setRecurrDialogOpen(true);
        }}
        // appointmentRender={AppointmentView}
        cellDuration={60}
        timeCellComponent={TimeCell}
        onOptionChanged={handlePropertyChange}
        // dataCellComponent={DataCell}
        onAppointmentRendered={(e) => onAppointmentRendered(e)}
        appointmentTooltipRender={appointmentTooltip}
        startDayHour={9}
        endDayHour={16}
        // height={500}
        allDayPanelMode="hidden"
        maxAppointmentsPerCell={1}
        editing={true}
      >
        <Resource
          dataSource={subjects}
          fieldExpr="extendedProperties.private.classId"
          label="Class"
          useColorAsDefault={true}
        />
        <View
          type="day"
          // appointmentRender={AgendaAppointmentView}
          // startDayHour={6}
          // endDayHour={22}
          // cellDuration={60}
          groupOrientation="horizontal"
          groups={
            groupBySubject ? ["extendedProperties.private.classId"] : undefined
          }
        />
        <View
          type="agenda"
          appointmentRender={AgendaAppointmentView}
          // groupOrientation="vertical"
          groups={
            groupBySubject ? ["extendedProperties.private.classId"] : undefined
          }
        />
        <View
          type="workWeek"
          appointmentRender={AppointmentView}
          // startDayHour={6}
          // endDayHour={22}
          cellDuration={60}
          // offset={0}
        />
        {/* <View type="month" /> */}
        <Editing allowDragging />
      </Scheduler>
      <Dialog open={recurrDialogOpen} onOpenChange={setRecurrDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit only this event or series?</DialogTitle>
            <DialogDescription className="py-3">
              Series edit can update multiple events.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              type="button"
              onClick={() => {
                if (!recurrEditEvent) return;
                const scheduler = schedulerRef.current?.instance();
                // window.scheduler = scheduler;
                const { start, end, summary, extendedProperties } =
                  recurrEditEvent.targetedAppointmentData;
                const appointment = {
                  start,
                  end,
                  summary,
                  extendedProperties,
                  excep: {
                    parent: recurrEditEvent.appointmentData,
                    target: recurrEditEvent.targetedAppointmentData,
                  },
                };
                // appointment.recurrence = undefined;
                // console.log(appointment);
                scheduler?.showAppointmentPopup(appointment, true);
              }}
            >
              Edit this event
            </Button>
            <Button
              type="button"
              onClick={() => {
                const scheduler = schedulerRef.current?.instance();
                scheduler?.showAppointmentPopup(
                  recurrEditEvent.appointmentData,
                  false
                );
              }}
            >
              Edit series
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
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
  // console.log(events[0]?.exDate);
  if (!events) return [];
  const fixExDateEvents = events.map((event): calendar_v3.Schema$Event => {
    const recurrId = event.recurringEventId;
    // if exception instance
    if (recurrId) {
      // parent event
      const parent = events.find((e) => e.id == recurrId);
      // console.log(events.length);
      if (!parent) return event;
      const exDate = parent.exDate;
      const orgDate = formatDateTime(
        new Date(event.originalStartTime!.dateTime!)
      );
      if (exDate && exDate.includes(orgDate)) return event;
      parent.exDate = exDate ? exDate + "," + orgDate : orgDate;
    }
    return event;
  });
  return fixExDateEvents.map((event: calendar_v3.Schema$Event) => {
    fixRruleStr(event, true);
    return event;
  });
}

function RefreshBtn({ queryClient }) {
  return (
    <Button
      type="button"
      variant="ghost"
      onClick={() => {
        queryClient.invalidateQueries(["events"], { exact: true });
        toast.success("Refreshed");
      }}
    >
      <IoIosRefresh />
    </Button>
  );
}
// for appointment cell full width
function onAppointmentRendered(e) {
  const el = e.element.querySelector(".dx-scheduler-date-table-cell");
  if (!el) return;
  // console.log(el);
  const width = el.clientWidth; // get a cell's width
  e.appointmentElement.style.width = `${width}px`;
  // console.log(e.appointmentElement);
}

function onAppointmentDblClick(e, schedulerRef, setRecurrDialogOpen) {
  // console.log(e.targetedAppointmentData);
  if (!e.targetedAppointmentData.recurrence) {
    return;
  }
  e.cancel = true;
  setRecurrDialogOpen(true);
  toast((t) => (
    <span>
      <button
        className="bg-green-300"
        onClick={() => {
          toast.dismiss(t.id);
          const scheduler = schedulerRef.current?.instance();
          // window.scheduler = scheduler;
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
}
