"use client";
// import "devextreme/dist/css/dx.common.css";
import "devextreme/dist/css/dx.light.css";
import { calendar_v3 } from "googleapis";
import { Scheduler, View, Editing } from "devextreme-react/scheduler";
import { appointments } from "../lib/data";
import { useCallback, useState } from "react";
import { formatDateTime, getEvents } from "@/lib/calendar";
import CustomStore from "devextreme/data/custom_store";
import axios from "axios";
import { useRouter } from "next/navigation";
const TimeZone = "Asia/Yangon";

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

function Table({ events }: { events: calendar_v3.Schema$Event[] }) {
  const router = useRouter();
  const dataSource = new CustomStore({
    load: async (options) => {
      // console.log("load ", options);
      const mEvents = events.map((event: calendar_v3.Schema$Event) => {
        fixRruleStr(event, true);
        return event;
      });
      console.log(mEvents);
      return mEvents;
    },

    remove: async (key) => {
      console.log(key);

      const event = await axios.post(`/api/events/delete/${key.id}`);
      router.refresh();
    },
    update: async (key, values) => {
      console.log(key, values);
      //   console.log(values.recurrence);
      // single edit
      //   if (key.exDate && values.exDate && key.exDate != values.exDate) {
      //     values.recurrence = undefined;
      //     values.recurringEventId = values.id;
      //     values.originalStartTime = {
      //       dateTime: "key.exDate",
      //       timeZone: TimeZone,
      //     };
      //     return;
      //   }

      fixRruleStr(values, false);
      const event = await axios.post(`/api/events/patch/${key.id}`, values);
      router.refresh();
    },
    insert: async (values) => {
      fixRruleStr(values, false);
      console.log(values);
      values.start.timeZone = TimeZone;
      values.end.timeZone = TimeZone;
      const event = await axios.post("/api/events/insert", values);
      router.refresh();
    },
  });
  const [currentDate, setCurrentDate] = useState(Date.now());
  const handlePropertyChange = useCallback((e) => {
    // console.log(e.name);
    //   if (e.name === "currentDate") {
    // setCurrentDate(e.value);
    //   }
  }, []);

  return (
    <div className="App">
      <RefreshBtn></RefreshBtn>
      <Scheduler
        id="scheduler"
        dataSource={dataSource}
        // startDateExpr="startDate"
        // endDateExpr="endDate"
        startDateExpr="start.dateTime"
        endDateExpr="end.dateTime"
        // startDateTimeZoneExpr="start.timeZone"
        // endDateTimeZoneExpr="end.timeZone"
        textExpr="summary"
        // textExpr="title"
        recurrenceRuleExpr="recurrence[0]"
        recurrenceExceptionExpr="exDate"
        defaultCurrentDate={currentDate}
        // currentDate={currentDate}
        // onOptionChanged={handlePropertyChange}
        // remoteFiltering={true}
        defaultCurrentView="week"
        timeZone={TimeZone}
        adaptivityEnabled={true}
        recurrenceEditMode="series"
        // onAppointmentAdding={(d) => {
        //   console.log("adding", d);
        // }}
      >
        <View type="day" startDayHour={10} endDayHour={22} />
        <View type="week" startDayHour={6} endDayHour={22} />
        <View type="month" />
        <Editing allowDragging={true} />
      </Scheduler>
    </div>
  );
}

export default Table;

const RefreshBtn = () => {
  const router = useRouter();
  return (
    <div>
      <button
        className=" hover:text-blue-400 "
        onClick={() => {
          router.refresh();
          // toast.success("refreshed");
        }}
      >
        Refresh
      </button>
    </div>
  );
};
