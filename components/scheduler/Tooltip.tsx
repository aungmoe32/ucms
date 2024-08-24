"use client";
import React, { useCallback, useState } from "react";
import { Button } from "../ui/button";
import moment from "moment";
import { MdDelete } from "react-icons/md";

import { getSubjectName } from "@/lib/subjects";
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
  //   const onDeleteButtonClick = useCallback(
  //     (e) => {
  //       props.onDeleteButtonClick(e);
  //     },
  //     [props.onDeleteButtonClick]
  //   );
  const [openDelDialog, setOpenDelDialog] = useState(false);

  return (
    <div className={"dx-tooltip-appointment-item"}>
      <div className={"dx-tooltip-appointment-item-marker"}>
        <div
          className={"dx-tooltip-appointment-item-marker-body"}
          style={{ backgroundColor: props.color }}
        ></div>
      </div>
      <div className={"dx-tooltip-appointment-item-content"}>
        <div className={"dx-tooltip-appointment-item-content"}>
          <div className={"dx-tooltip-appointment-item-content-subject "}>
            <span className=" text-lg">
              {getSubjectName(
                props.appointmentData?.extendedProperties?.private?.classId
              )}
            </span>
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
            className={"dx-tooltip-appointment-item-content-date text-gray-500"}
          >
            start date :{" "}
            <p>{moment(props.appointmentData.start.dateTime).format("llll")}</p>
          </div>
          <div
            className={"dx-tooltip-appointment-item-content-date text-gray-500"}
          >
            end date :{" "}
            <p>{moment(props.appointmentData.end.dateTime).format("llll")}</p>
          </div>
        </div>
      </div>
      <AlertDialog open={openDelDialog} onOpenChange={setOpenDelDialog}>
        <AlertDialogContent className="z-[1600]">
          <AlertDialogHeader>
            <AlertDialogTitle>
              Do you want to delete this event?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
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
      {/* <Dialog open={openDelDialog} onOpenChange={setOpenDelDialog}>
        <DialogContent className="sm:max-w-[425px] z-[1600]">
          <DialogHeader>
            <DialogTitle>Do you want to delete this event?</DialogTitle>
            <DialogDescription className="py-3">
              You can't undo after deletion
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              type="button"
              color="black"
              onClick={(e) => {
                props.onDeleteButtonClick(e);
              }}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog> */}

      {props.isDeleteButtonExist ? (
        <div className={"dx-tooltip-appointment-item-delete-button-container"}>
          <Button
            className={
              "dx-tooltip-appointment-item-delete-button hover:bg-gray-200"
            }
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
    </div>
  );
};

export default Tooltip;
