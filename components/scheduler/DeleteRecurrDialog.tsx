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

const DeleteRecurrDialog = ({
    e,
    scheduler,
    recurrDeleteDialogOpen,
    setRecurrDeleteDialogOpen,
    disableEditSeriesBtn,
}) => {
    return (
        <Dialog open={recurrDeleteDialogOpen} onOpenChange={setRecurrDeleteDialogOpen}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Delete only this event or series?</DialogTitle>
                    <DialogDescription className="py-3">
                        Series deletion can delete multiple events.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button
                        type="button"
                        onClick={() => {
                            //   if (!e) return;
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
                        Delete this event
                    </Button>
                    <Button
                        type="button"
                        disabled={disableEditSeriesBtn}
                        onClick={() => {
                            // const scheduler = schedulerRef.current?.instance();
                            //   scheduler?.showAppointmentPopup(
                            //     e.appointmentData,
                            //     false
                            //   );
                        }}
                    >
                        Delete series
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default DeleteRecurrDialog;
