import React, { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { randomInt, randomUUID } from "crypto";

const RecurrenceDialog = ({
  e,
  scheduler,
  recurrDialogOpen,
  setRecurrDialogOpen,
  disableEditSeriesBtn,
}) => {
  return (
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
              if (!e) return;
              // const scheduler = schedulerRef.current?.instance();
              // window.scheduler = scheduler;
              // const { start, end, summary, extendedProperties } =
              //   recurrEditEvent.targetedAppointmentData;
              // const appointment = {
              //   // id: Math.random(),
              //   calendarId: recurrEditEvent.appointmentData.calendarId,
              //   start,
              //   end,
              //   summary,
              //   extendedProperties,
              //   excep: {
              //     parent: recurrEditEvent.appointmentData,
              //     target: recurrEditEvent.targetedAppointmentData,
              //   },
              // };
              // // appointment.recurrence = undefined;
              // console.log(recurrEditEvent);
              // scheduler?.showAppointmentPopup(e.targetedAppointmentData, true, appointment);
            }}
          >
            Edit this event
          </Button>
          <Button
            type="button"
            disabled={disableEditSeriesBtn}
            onClick={() => {
              // const scheduler = schedulerRef.current?.instance();
              scheduler?.showAppointmentPopup(
                e.appointmentData,
                false
              );
            }}
          >
            Edit series
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RecurrenceDialog;
