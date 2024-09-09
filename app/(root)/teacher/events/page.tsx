import EventTTPrefetch from "@/components/scheduler/events/EventTTPrefetch";
import React, { Suspense } from "react";

export default function Events() {
  return (
    <Suspense fallback={<div>loading...</div>}>
      <EventTTPrefetch></EventTTPrefetch>
    </Suspense>
  );
}
