"use client";
import "devextreme/dist/css/dx.common.css";
import "devextreme/dist/css/dx.light.css";

import { Scheduler, View, Editing } from "devextreme-react/scheduler";
import { appointments } from "../lib/data";
import { useCallback, useState } from "react";
import { getEvents } from "@/lib/calendar";
import CustomStore from "devextreme/data/custom_store";
import axios from "axios";
import { useRouter } from "next/navigation";

function Table({ events }) {
  const router = useRouter();
  const dataSource = new CustomStore({
    load: async (options) => {
      //   console.log("load ", options);
      const mEvents = events.map((event) => {
        if (event.recurrence?.length) {
          event.recurrenceRule = event.recurrence[0].replace("RRULE:", "");
        }
        return event;
      });
      //   console.log(mEvents);
      return mEvents;
    },

    remove: async (key) => {
      console.log(key);

      const event = await axios.post(`/api/events/delete/${key.id}`);
      router.refresh();
    },
    update: async (key, values) => {
      console.log(key, values);

      const event = await axios.post(`/api/events/patch/${key.id}`, values);
      router.refresh();
    },
    insert: async (values) => {
      console.log(values);
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
      <Scheduler
        id="scheduler"
        dataSource={dataSource}
        startDateExpr="start.dateTime"
        endDateExpr="end.dateTime"
        textExpr="summary"
        // textExpr="title"
        // recurrenceRuleExpr="recurrence"

        defaultCurrentDate={currentDate}
        // currentDate={currentDate}
        onOptionChanged={handlePropertyChange}
        // remoteFiltering={true}
        defaultCurrentView="week"
        timeZone="Asia/Yangon"
        adaptivityEnabled={true}
      >
        <View type="day" startDayHour={10} endDayHour={22} />
        <View type="week" startDayHour={10} endDayHour={22} />
        <View type="month" />
        <Editing allowTimeZoneEditing={true} allowDragging={false} />
      </Scheduler>
    </div>
  );
}

export default Table;
