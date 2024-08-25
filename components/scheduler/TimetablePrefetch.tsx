import Notification from "@/components/scheduler/Notification";
import Timetable from "@/components/scheduler/Timetable";
import { events } from "@/lib/event";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
export default async function TimetablePrefetch() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["events"],
    queryFn: events,
  });

  return (
    <div className="mt-5">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Timetable></Timetable>
      </HydrationBoundary>
    </div>
  );
}
