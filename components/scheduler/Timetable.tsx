"use client";
import Notification from "@/components/scheduler/Notification";
import { useQueryClient } from "@tanstack/react-query";
import { Editing, Resource, Scheduler, View } from "devextreme-react/scheduler";
// import "devextreme/dist/css/dx.fluent.blue.light.css";
import { useCallback, useRef, useState } from "react";
import "../scheduler/css/dx.generic.custom-scheme.css";
import { Button } from "../ui/button";
import AgendaAppointmentView from "./AgendaAppointmentView";
import { AppointmentView } from "./AppointmentView";
import { TimeCell } from "./TimeCell";
import ArrayStore from "devextreme/data/array_store";
import CreateSubjectBtn from "./CreateSubjectBtn";
import RecurrenceDialog from "./RecurrenceDialog";
import RefreshBtn from "./RefreshBtn";
import {
  fixEvents,
  onAppointmentAdding,
  onAppointmentDeleting,
  onAppointmentRendered,
  onAppointmentUpdating,
  TimeZone,
  useAppointmentTooltip,
  useMutations,
} from "./utils";

function Timetable({
  semester,
  events,
  subjects,
  refreshEvents,
  refreshSubjects,
  disableCreateSubject,
  disabled,
  allowAdd,
  allowDelete,
  isAgenda,
  disableEditSeriesBtn,
}: {
  semester: any;
  events: any;
  subjects: any;
  refreshEvents: any;
  refreshSubjects: any;
  disableCreateSubject: any;
  disabled: any;
  allowAdd: any;
  allowDelete: any;
  isAgenda: any;
  disableEditSeriesBtn: any;
}) {
  const queryClient = useQueryClient();

  // console.log(data, error, isLoading);

  const [currentDate, setCurrentDate] = useState(Date.now());
  const [isRecurrenceEdit, setIsRecurrenceEdit] = useState(false);
  const [groupBySubject, setGroupBySubject] = useState(false);
  const [recurrEditEvent, setRecurrEditEvent] = useState<any>(null);
  const schedulerRef = useRef(null);
  const tooltip = useAppointmentTooltip(schedulerRef, subjects);

  const [recurrDialogOpen, setRecurrDialogOpen] = useState(false);

  const { createEventMutation, updateEventMutation, deleteEventMutation } =
    useMutations(semester.calendar_id, refreshEvents);

  // if (error) return <div>{error.message}</div>;
  // if (isLoading) return <div>loading...</div>;
  const handlePropertyChange = useCallback((e) => {
    if (e.name === "currentDate") {
      setCurrentDate(e.value);
    }
  }, []);
  console.log("render timetable");
  return (
    <div className="mt-5">
      <div className="flex justify-between">
        <Notification></Notification>
        <div className="flex space-x-2">
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
      </div>
      <Scheduler
        id="scheduler"
        // currentView={isAgenda ? "agenda" : "workWeek"}
        dataSource={fixEvents(events)}
        // dataSource={
        //   new ArrayStore({
        //     key: "id",
        //     data: fixEvents(events),
        //     onInserting: (value) => {
        //       value.id = events.length + 1;
        //     },
        //   })
        // }
        // disabled={disabled}
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
        onAppointmentAdding={(e) =>
          onAppointmentAdding(e, events, createEventMutation)
        }
        onAppointmentDeleting={(e) =>
          onAppointmentDeleting(e, events, deleteEventMutation)
        }
        onAppointmentUpdating={(e) =>
          onAppointmentUpdating(e, updateEventMutation)
        }
        // onAppointmentFormOpening={onAppointmentFormOpening}
        onAppointmentDblClick={(e) => {
          // onAppointmentDblClick(e, schedulerRef, setRecurrDialogOpen)
          const scheduler = schedulerRef.current?.instance();
          // console.log(scheduler);
          if (scheduler && !scheduler?.option("editing")) {
            e.cancel = true;
            return;
          }
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
        appointmentTooltipRender={tooltip}
        startDayHour={9}
        endDayHour={16}
        // height={500}
        allDayPanelMode="hidden"
        maxAppointmentsPerCell={1}
        editing={{
          allowAdding: !disabled,
          allowDeleting: !disabled && allowDelete,
          allowUpdating: !disabled,
          allowTimeZoneEditing: false,
        }}
      >
        <Resource
          dataSource={subjects}
          fieldExpr="extendedProperties.private.classId"
          label="Subject"
          useColorAsDefault={true}
          valueExpr={"id"}
          displayExpr={"name"}
          // colorExpr="color"
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
          appointmentRender={(e) => AgendaAppointmentView(e, subjects)}
          // groupOrientation="vertical"
          groups={
            groupBySubject ? ["extendedProperties.private.classId"] : undefined
          }
        />
        <View
          type="workWeek"
          appointmentRender={(e) => AppointmentView(e, subjects)}
          // startDayHour={6}
          // endDayHour={22}
          cellDuration={60}
          // offset={0}
        />
        {/* <View type="month" /> */}
        {/* <Editing
          allowResizing={false}
          allowTimeZoneEditing={false}
          allowAdding={allowAdd}
          allowDeleting={!disabled}
          allowUpdating={!disabled}
        /> */}
      </Scheduler>
      <RecurrenceDialog
        disableEditSeriesBtn={disableEditSeriesBtn}
        recurrEditEvent={recurrEditEvent}
        schedulerRef={schedulerRef}
        recurrDialogOpen={recurrDialogOpen}
        setRecurrDialogOpen={setRecurrDialogOpen}
      ></RecurrenceDialog>
    </div>
  );
}

export default Timetable;
