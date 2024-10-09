import EventTTPrefetch from "@/components/scheduler/events/EventTTPrefetch";
import React, { Suspense } from "react";

export default function Events() {
  return <EventTTPrefetch></EventTTPrefetch>;
}

export const dynamic = "force-dynamic";
