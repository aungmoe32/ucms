"use client";
import {
  Editing,
  Resource,
  Scheduler,
  SchedulerTypes,
  View,
} from "devextreme-react/scheduler";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  TimeZone,
  onAppointmentAdding,
  onAppointmentDeleting,
  onAppointmentRendered,
  onAppointmentUpdating,
  useMutations,
} from "../utils";
import { TimeCell } from "../TimeCell";
import "../../../public/dx.generic.custom-scheme.css";
import { useQuery } from "@tanstack/react-query";
import { getEvents } from "@/lib/event";
import { Button } from "@/components/ui/button";
import RefreshBtn from "../RefreshBtn";
import CreateSubjectBtn from "../CreateSubjectBtn";
import Notification from "../Notification";
import { AppointmentView } from "../AppointmentView";
import AgendaAppointmentView from "../AgendaAppointmentView";
import Tooltip from "../Tooltip";
import themes from "devextreme/ui/themes";
import { useTheme } from "next-themes";
const TT = ({
  semester,
  events,
  subjects,
  refreshEvents,
  refreshSubjects,
  disableCreateSubject,
  disabled,
  isAgenda,
  eventTypes,
  recurrEditMode = "dialog",
  timelineMode,
}) => {
  // console.log("render TT");

  const { setTheme, theme } = useTheme();

  const [currentDate, setCurrentDate] = useState(Date.now());
  const [openTooltip, setOpenTooltip] = useState(false);
  const [clickedEvent, setClickedEvent] = useState(null);
  const schedulerRef = useRef(null);

  const { createEventMutation, updateEventMutation, deleteEventMutation } =
    useMutations(semester.id, refreshEvents);

  const handlePropertyChange = useCallback((e) => {
    if (e.name === "currentDate") {
      setCurrentDate(e.value);
    }
  }, []);

  // useEffect(() => {
  //   window.schedulerRef = schedulerRef;
  //   themes.ready(() => {
  //     // console.log("ready", schedulerRef);
  //     schedulerRef.current.instance().repaint();
  //     // button.current.instance().repaint();
  //   });
  //   // setTheme(theme);
  //   themes.current(`fluent.blue.${theme}`);
  // }, []);

  //   const changeTheme = useCallback(() => {
  //     themes.ready(() => {
  //         schedulerRef.current.instance().repaint();
  //         // button.current.instance().repaint();
  //     });
  //     // themes.current('generic.light');
  //     // themes.current('generic.dark');
  // }, []);

  return (
    <div className=" rounded-md">
      {/* <div className="flex justify-between"> */}
      <div className="flex space-x-2 items-center justify-between my-2">
        <RefreshBtn
          refreshEvents={refreshEvents}
          refreshSubjects={refreshSubjects}
        ></RefreshBtn>
        <Button
          variant="outline"
          type="button"
          onClick={() => setCurrentDate(Date.now())}
        >
          Today
        </Button>
        {/* <Button
            variant="outline"
            type="button"
            className=""
            onClick={() => {
              setGroupBySubject(!groupBySubject);
            }}
          >
            Group By Subject
          </Button> */}
        {!disableCreateSubject && (
          <CreateSubjectBtn
            refreshSubjects={refreshSubjects}
          ></CreateSubjectBtn>
        )}
      </div>
      {/* </div> */}
      <Scheduler
        id="scheduler"
        dataSource={events}
        ref={schedulerRef}
        // startDateExpr="start.dateTime"
        // endDateExpr="end.dateTime"
        textExpr="title"
        recurrenceEditMode={recurrEditMode}
        // descriptionExpr="description"
        // recurrenceRuleExpr="recurrence[0]"
        // recurrenceExceptionExpr="extendedProperties.private.exDate"
        // recurrenceExceptionExpr="exDate"
        // defaultCurrentDate={currentDate}
        currentDate={currentDate}
        defaultCurrentView={isAgenda ? "agenda" : "workWeek"}
        timeZone={TimeZone}
        // adaptivityEnabled={true}
        // recurrenceEditMode="series"
        onAppointmentAdding={(e) =>
          onAppointmentAdding(e, events, createEventMutation, subjects)
        }
        onAppointmentDeleting={(e) =>
          onAppointmentDeleting(e, events, deleteEventMutation)
        }
        onAppointmentUpdating={(e) =>
          onAppointmentUpdating(e, updateEventMutation)
        }
        onAppointmentFormOpening={(
          e: SchedulerTypes.AppointmentFormOpeningEvent
        ) => {
          // console.log(e.form.items);
          const form = e.form;
          let mainGroupItems = form.itemOption("mainGroup").items;
          // console.log(mainGroupItems)
          const titleInput = mainGroupItems.find(
            (i) => i.dataField === "title"
          );
          titleInput.label.text = "Title";

          if (timelineMode) {
            const subjectSelect = mainGroupItems.find(
              (i) => i.dataField === "subjectId"
            );
            subjectSelect.editorOptions.disabled = true;
            mainGroupItems.splice(2, 1);
            // mainGroupItems.push({
            //   label: {
            //     text: "Event Type",
            //   },
            //   editorType: "dxSelectBox",
            //   dataField: "eventTypeId",
            //   editorOptions: {
            //     items: eventTypes,
            //     displayExpr: "name",
            //     valueExpr: "id",
            //   },
            // });
          }
          form.itemOption("mainGroup", "items", mainGroupItems);
        }}
        cellDuration={60}
        timeCellComponent={TimeCell}
        onOptionChanged={handlePropertyChange}
        // dataCellComponent={DataCell}
        onAppointmentRendered={(e) => onAppointmentRendered(e)}
        onAppointmentClick={(e) => {
          e.cancel = true;
          // console.log(e)
          setClickedEvent(e);
          setOpenTooltip(true);
        }}
        // appointmentTooltipRender={Tooltip}
        startDayHour={9}
        endDayHour={16}
        // height={500}
        allDayPanelMode="hidden"
        maxAppointmentsPerCell={1}
        editing={!disabled}
        // editing={{
        //   allowAdding: !disabled,
        //   allowDeleting: !disabled,
        //   allowUpdating: !disabled,
        //   allowTimeZoneEditing: false,
        // }}
      >
        <Resource
          dataSource={subjects}
          fieldExpr="subjectId"
          label="Subject"
          useColorAsDefault={true}
          valueExpr={"id"}
          displayExpr={"name"}
          // colorExpr="color"
        />
        <Resource
          dataSource={eventTypes}
          fieldExpr="eventTypeId"
          label="Event Type"
          useColorAsDefault={false}
          valueExpr={"id"}
          displayExpr={"name"}
          // colorExpr="color"
        />
        {/* <View
          type="day"
          // appointmentRender={AgendaAppointmentView}
          // startDayHour={6}
          // endDayHour={22}
          // cellDuration={60}
          //   groupOrientation="horizontal"
          //   groups={
          //     groupBySubject ? ["extendedProperties.private.classId"] : undefined
          //   }
        /> */}
        <View
          type="agenda"
          appointmentRender={(e) => AgendaAppointmentView(e, subjects)}
          //   // groupOrientation="vertical"
          // groups={
          //   groupBySubject ? ["extendedProperties.private.classId"] : undefined
          // }
        />
        <View
          type="workWeek"
          appointmentRender={(e) => AppointmentView(e, subjects)}
          //   // startDayHour={6}
          //   // endDayHour={22}
          cellDuration={60}
          //   // offset={0}
        />
      </Scheduler>
      <Tooltip
        openDialog={openTooltip}
        setOpenDialog={setOpenTooltip}
        props={clickedEvent}
        enableEdit={!disabled}
      ></Tooltip>
    </div>
  );
};

export default TT;
