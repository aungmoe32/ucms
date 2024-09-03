"use client";
import React, { useCallback, useState } from "react";
import { Button } from "../ui/button";
import moment from "moment";
import { MdDelete } from "react-icons/md";

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
const Tooltip = (props) => {
  //   console.log(props);
  //   const onDeleteButtonClick = useCallback(
  //     (e) => {
  //       props.onDeleteButtonClick(e);
  //     },
  //     [props.onDeleteButtonClick]
  //   );
  const isRecurrence = props.appointmentData.recurrence;
  const [openDelDialog, setOpenDelDialog] = useState(false);

  return (
    <div className="relative p-3" onClick={(e) => e.stopPropagation()}>
      <div className=" flex  flex-col space-y-2 items-start">
        <span className=" text-lg font-bold">{props.subjectName}</span>

        <span className=" font-normal ">{props.appointmentData.summary}</span>

        <div className={" text-gray-500"}>
          start date :{" "}
          <span>
            {moment(props.appointmentData.start.dateTime).format("llll")}
          </span>
        </div>
        <div className={" text-gray-500"}>
          end date :{" "}
          <span>
            {moment(props.appointmentData.end.dateTime).format("llll")}
          </span>
        </div>
      </div>

      {props.isDeleteButtonExist ? (
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
      )}
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
                props.onDeleteButtonClick(e);
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      {/* <div className={"dx-tooltip-appointment-item"}>
        <div className={"dx-tooltip-appointment-item-marker"}>
          <div
            className={"dx-tooltip-appointment-item-marker-body"}
            style={{ backgroundColor: props.color }}
          ></div>
        </div>
        <div className={"dx-tooltip-appointment-item-content"}>
          <div className={"dx-tooltip-appointment-item-content"}>
            <div className={"dx-tooltip-appointment-item-content-subject "}>
              <span className=" text-lg">{props.subjectName}</span>
            </div>
            <div
              className={
                "dx-tooltip-appointment-item-content-subject text-gray-600 my-5"
              }
            >
              <span className=" font-normal ">
                {props.appointmentData.summary}
              </span>
            </div>
            <div
              className={
                "dx-tooltip-appointment-item-content-date text-gray-500"
              }
            >
              start date :{" "}
              <p>
                {moment(props.appointmentData.start.dateTime).format("llll")}
              </p>
            </div>
            <div
              className={
                "dx-tooltip-appointment-item-content-date text-gray-500"
              }
            >
              end date :{" "}
              <p>{moment(props.appointmentData.end.dateTime).format("llll")}</p>
            </div>

      {props.isDeleteButtonExist ? (
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
      )}
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
                props.onDeleteButtonClick(e);
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
          </div>
        </div>

      </div> */}
    </div>
  );
};

export default Tooltip;
