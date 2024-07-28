import Notification from "@/components/Notification";
import Table from "@/components/Table";
import { formatDateTime, getEvents, wachEvent } from "@/lib/calendar";
import { events } from "@/lib/event";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import axios from "axios";
import { calendar_v3 } from "googleapis";
export default async function Home() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["events"],
    queryFn: events,
  });

  return (
    <div>
      <Notification></Notification>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Table></Table>
      </HydrationBoundary>
    </div>
  );
}
