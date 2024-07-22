import Table from "@/components/Table";
import { formatDateTime, getEvents } from "@/lib/calendar";
import { calendar_v3 } from "googleapis";

export default async function Home() {
  // const items = await getEvents();
  // console.log(items);

  // const filteredEvents = items.map((event): calendar_v3.Schema$Event => {
  //   const recurrId = event.recurringEventId;
  //   // if exception instance
  //   if (recurrId) {
  //     const recurrEvent = items.find((e) => e.id == recurrId);
  //     const exDate = recurrEvent!.exDate;
  //     recurrEvent!.exDate = exDate
  //       ? exDate +
  //         "," +
  //         formatDateTime(new Date(event.originalStartTime!.dateTime!))
  //       : formatDateTime(new Date(event.originalStartTime!.dateTime!));
  //   }
  //   return event;
  // });

  // console.log(formatDateTime(new Date("2024-07-16T10:15:00+06:30")));
  return <Table></Table>;
}
