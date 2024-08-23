import React, { useCallback } from "react";
import { Button } from "../ui/button";
import moment from "moment";
import { MdDelete } from "react-icons/md";

import { getClassName } from "@/lib/classes";
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
              {getClassName(
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
          <button
            className={
              "dx-tooltip-appointment-item-delete-button bg-transparent p-1 hover:bg-gray-300 rounded-lg"
            }
            // icon="trash"
            // stylingMode="text"
            type="button"
            onClick={onDeleteButtonClick}
          >
            <MdDelete color="gray" size={25} />
          </button>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Tooltip;
