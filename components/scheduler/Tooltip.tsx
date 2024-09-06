"use client";
import React, { useCallback, useState } from "react";
import { Button } from "../ui/button";
import moment from "moment";
import { MdDelete, MdEdit } from "react-icons/md";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { CiTextAlignLeft } from "react-icons/ci";
import { AppointmentClickEvent } from "devextreme/ui/scheduler_types";
import RecurrenceDialog from "./RecurrenceDialog";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FaBook } from "react-icons/fa6";
const Tooltip = ({ openDialog, setOpenDialog, props, enableEdit }: { props: AppointmentClickEvent }) => {
  //   console.log(props);
  //   const onDeleteButtonClick = useCallback(
  //     (e) => {
  //       props.onDeleteButtonClick(e);
  //     },
  //     [props.onDeleteButtonClick]
  //   );
  const rootEvent = props?.appointmentData
  const event = props?.targetedAppointmentData
  const title = event?.title
  const description = event?.description
  const startDate = event?.startDate
  const endDate = event?.endDate
  const eventType = event?.eventType
  const subject = event?.subject
  const isRecurrence = event?.recurrenceRule;
  const [openDelDialog, setOpenDelDialog] = useState(false);
  // const [recurrDialogOpen, setRecurrDialogOpen] = useState(false);

  return (
    <>
      {/* <div className=" flex  flex-col space-y-2 items-start">

        <span className=" font-normal ">{props.appointmentData.title}</span>

        <div className={" text-gray-500"}>
          start date :{" "}
          <span>
            {moment(props.appointmentData.startDate).format("llll")}
          </span>
        </div>
        <div className={" text-gray-500"}>
          end date :{" "}
          <span>
            {moment(props.appointmentData.endDate).format("llll")}
          </span>
        </div>
      </div> */}

      {/* {props.isDeleteButtonExist ? (
        <div className=" absolute right-0 top-0">
          <Button
            className={" hover:bg-gray-200"}
            // icon="trash"
            // stylingMode="text"
            type="button"
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              setOpenDelDialog(true);
            }}
          >
            <MdDelete size={20} />
          </Button>
        </div>
      ) : (
        <></>
      )} */}
      <AlertDialog open={openDelDialog} onOpenChange={setOpenDelDialog}>
        <AlertDialogContent className="z-[1600]">
          <AlertDialogHeader>
            <AlertDialogTitle>
              Do you want to delete{" "}
              {isRecurrence ? `the whole event series?` : `this event?`}
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
              {isRecurrence &&
                ` This is an event series that means this action can delete multiple events.`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                // props.onDeleteButtonClick(e);

                props.component.deleteAppointment(props.appointmentData);
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              <div className="flex items-center space-x-4 mb-5">
                <div className={`rounded-full p-2`} style={{ backgroundColor: subject?.color }}>
                </div>
                <span>
                  {title}
                </span>


              </div>
            </DialogTitle>
            <DialogDescription>
              <div className=" flex  flex-col space-y-5 items-start">
                {/* <span className=" text-lg font-bold">{props.subjectName}</span> */}
                {
                  enableEdit &&
                  <div className=" absolute top-1 right-10 flex justify-center items-center">
                    <Button variant="ghost" onClick={() => {
                      // if (event?.recurrenceRule) {
                      //   setRecurrDialogOpen(true)
                      //   return
                      // }
                      props.component.showAppointmentPopup(rootEvent, false, event)
                    }}>
                      <MdEdit />
                    </Button>
                    <Button variant="ghost" onClick={() => {
                      setOpenDialog(false)
                      setOpenDelDialog(true)
                    }}>
                      <MdDelete />
                    </Button>
                  </div>
                }

                {eventType && eventType.name != "None" && <div className=" flex space-x-2 items-center">
                  <FaRegCalendarAlt color="black" />

                  <p className="">{eventType.name}</p>
                </div>}
                {subject?.name && <div className=" flex space-x-2 items-center">
                  <FaBook color="black" />
                  <p className=" ">{subject?.name}</p>
                </div>}


                {description && <div className=" flex space-x-2 items-center">
                  <CiTextAlignLeft color="black" />

                  <p className=" ">{description}</p>
                </div>}


                <div className="flex items-start flex-col space-y-2 font-normal">

                  <div>
                    From :{" "}
                    <span>
                      {moment(startDate).format("llll")}
                    </span>
                  </div>
                  <div >
                    To :{" "}
                    <span>
                      {moment(endDate).format("llll")}
                    </span>
                  </div>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      {/* <RecurrenceDialog e={props} scheduler={props.component} recurrDialogOpen={recurrDialogOpen} setRecurrDialogOpen={setRecurrDialogOpen} disableEditSeriesBtn={undefined}></RecurrenceDialog> */}
    </>
  );
};

export default Tooltip;
