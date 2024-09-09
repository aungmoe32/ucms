"use client";
import React from "react";
import { Calendar } from "@/components/ui/calendar";

const EventCalander = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      className="rounded-lg w-full  flex justify-center  bg-white  shadow-gray-500 shadow-sm"
    />
  );
};

export default EventCalander;
