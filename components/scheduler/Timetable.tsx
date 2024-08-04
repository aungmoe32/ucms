import Notification from "@/components/scheduler/Notification";
import Table from "@/components/scheduler/Table";
import { events } from "@/lib/event";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
export default async function Timetable() {
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
