import React, { useCallback } from "react";
import { Button } from "../ui/button";
import moment from "moment";
import { MdDelete } from "react-icons/md";

import { getSubjectName } from "@/lib/subjects";
const Tooltip = (props) => {
  const onDeleteButtonClick = useCallback(
    (e) => {
      props.onDeleteButtonClick(e);
    },
    [props.onDeleteButtonClick]
  );

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
            onClick={onDeleteButtonClick}
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
