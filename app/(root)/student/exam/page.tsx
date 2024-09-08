import EventTTPrefetch from "@/components/scheduler/events/EventTTPrefetch";
import ExamCard from "@/components/shared/ExamCard";
import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const page = () => {
  return (
    <main className="p-4 bg-gray-100 min-h-screen">
      <Card>
        <CardHeader>
          <CardTitle>Events</CardTitle>
          {/* <CardDescription></CardDescription> */}
        </CardHeader>
        <CardContent>
          <EventTTPrefetch></EventTTPrefetch>
        </CardContent>
        {/* <CardFooter>
          <p>Card Footer</p>
        </CardFooter> */}
      </Card>
    </main>
  );
};

export default page;
