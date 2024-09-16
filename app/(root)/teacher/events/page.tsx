import Skeleton from "@/components/Skeleton";
import EventTTPrefetch from "@/components/scheduler/events/EventTTPrefetch";
import React, { Suspense } from "react";

export default function Events() {
  return (
    <Suspense fallback={<Skeleton height={"20rem"} />}>
      <EventTTPrefetch></EventTTPrefetch>
    </Suspense>
  );
}
