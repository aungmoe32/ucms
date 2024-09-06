import {
  createEvent,
  deleteEvent,
  formatDateTime,
  updateEvent,
} from "@/lib/event";
import { useMutation } from "@tanstack/react-query";
import { SchedulerTypes } from "devextreme-react/cjs/scheduler";
import { calendar_v3 } from "googleapis";
import { useCallback } from "react";
import toast from "react-hot-toast";
import Tooltip from "./Tooltip";
export const TimeZone = "Asia/Yangon";

export const fixEvents = (events) => {
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
};

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

export const useMutations = (semesterId, refreshEvents) => {
  const createEventMutation = useMutation({
    mutationFn: ({ event }) => createEvent(semesterId, event),
    onSuccess: (data, variables, toastId) => {
      // queryClient.setQueryData(["Events", data.id], data)
      toast.dismiss(toastId);
      toast.success("added");
      if (refreshEvents) refreshEvents();
    },
    onError: (error, variables, context) => {
      toast.dismiss(context);
      toast.error("error");
      if (refreshEvents) refreshEvents();
    },
    onMutate: () => {
      return toast.loading("adding...");
    },
  });
  const deleteEventMutation = useMutation({
    mutationFn: ({ event }) => deleteEvent(event),
    onSuccess: (data, variables, toastId) => {
      toast.dismiss(toastId);
      toast.success("deleted");
      if (refreshEvents) refreshEvents();
    },
    onError: (error, variables, context) => {
      toast.dismiss(context);
      toast.error("error");
      if (refreshEvents) refreshEvents();
    },
    onMutate: () => {
      return toast.loading("deleting...");
    },
  });
  const updateEventMutation = useMutation({
    mutationFn: ({ event }) => updateEvent(event),
    onSuccess: (data, v, toastId) => {
      if (toastId) {
        toast.dismiss(toastId);
        toast.success("updated");
      }
      if (refreshEvents) refreshEvents();
    },
    onError: (error, variables, context) => {
      toast.dismiss(context);
      toast.error("error");
      if (refreshEvents) refreshEvents();
    },

    onMutate: (variables) => {
      // console.log(variables);
      return toast.loading("updating...");
    },
  });

  return {
    createEventMutation,
    deleteEventMutation,
    updateEventMutation,
  };
};

export async function onAppointmentAdding(
  e: SchedulerTypes.AppointmentAddingEvent,
  events,
  createEventMutation,
  subjects
) {
  if (!e.appointmentData.subjectId) {
    // const defaultSubject = subjects.find((sub) => sub.name == ".");
    // if (!defaultSubject) {
    toast.error("Subject is required");
    e.cancel = true;
    return;
    // }
    // e.appointmentData.subjectId = defaultSubject.id;
  }
  if (!e.appointmentData.eventTypeId) {
    toast.error("Event type is required");
    e.cancel = true;
    return;
  }
  // console.log('adding', e)
  createEventMutation.mutate({
    event: e.appointmentData,
  });
  // e.cancel = false;
}
export function onAppointmentDeleting(
  e: SchedulerTypes.AppointmentAddingEvent,
  events,
  deleteEventMutation
) {
  deleteEventMutation.mutate({
    event: e.appointmentData,
  });
}
export function onAppointmentUpdating(
  e: SchedulerTypes.AppointmentUpdatingEvent,
  updateEventMutation
) {
  // fixRruleStr(e.newData, false);
  // console.log("update ", e);
  updateEventMutation.mutate({
    event: e.newData,
  });
}

// for appointment cell full width
export function onAppointmentRendered(e) {
  const el = e.element.querySelector(".dx-scheduler-date-table-cell");
  if (!el) return;
  // console.log(el);
  const width = el.clientWidth; // get a cell's width
  e.appointmentElement.style.width = `${width}px`;
  // console.log(e.appointmentElement);
}

export const useAppointmentTooltip = (schedulerRef, subjects) => {
  const tooltip = useCallback(
    (props) => {
      const scheduler: any = schedulerRef.current?.instance();

      // NOTE: You can use props.appointmentData.resouceId to obtain resource color

      const getSubjectColor = (id) => {
        const name = subjects.find((cls) => cls.id == id)?.color;
        return name;
      };

      const getSubjectName = (id) => {
        const name = subjects.find((cls) => cls.id == id)?.name;
        return name;
      };
      const color = getSubjectColor(
        props.appointmentData?.extendedProperties?.private?.classId
      );

      const subjectName = getSubjectName(
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
          subjectName={subjectName}
          isDeleteButtonExist={isDeleteButtonExist}
          onDeleteButtonClick={onDeleteButtonClick}
          color={color}
        />
      );
    },
    [subjects, schedulerRef]
  );
  return tooltip;
};

// function onAppointmentFormOpening(
//   e: SchedulerTypes.AppointmentFormOpeningEvent
// ) {
//   e.cancel = false;
//   const appo = e.appointmentData;
//   const classId = appo?.extendedProperties?.private?.classId;
//   if (appo && !classId) {
//     e.appointmentData.summary = "hacker";
//     // e.appointmentData = { summary: "hacke" };
//     // console.log(appo);
//     appo.extendedProperties = {
//       private: {
//         classId: "1",
//       },
//     };
//   }
// }
