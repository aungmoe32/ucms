"use client";
import React, { useState } from "react";
import TeacherTimelineTableRow from "./TeacherTimelineTableRow";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const data = [
  {
    major: "English",
    time: "9:00 AM - 10:00 AM",
    room: "313 (A)",
    year: "1 Year",
    status: "Present",
  },
  {
    major: "English",
    time: "11:00 AM - 12:00 AM",
    room: "313 (B)",
    year: "2 Year",
    status: "Absent",
  },
  {
    major: "English",
    time: "1:00 PM - 2:00 PM",
    room: "313 (C)",
    year: "3 Year",
    status: "Absent",
  },
  {
    major: "English",
    time: "2:00 PM - 3:00 PM",
    room: "313 (A)",
    year: "4 Year",
    status: "Present",
  },
  {
    major: "English",
    time: "3:00 PM - 4:00 PM",
    room: "313 (B)",
    year: "2 Year",
    status: "Present",
  },
];

const TeacherTimelineTable = () => {
  const [active, setActive] = useState<number>(0);
  const tableHeadStyle = "table-head text-base text-black font-semibold";

  return (
    <div className="mt-6">
      <Table className="w-full">
        <TableBody>
          <TableRow className="bg-blue-100 hover:bg-blue-100">
            <TableHead className={tableHeadStyle}>S/N</TableHead>
            <TableHead className={tableHeadStyle}>Major</TableHead>
            <TableHead className={tableHeadStyle}>Time</TableHead>
            <TableHead className={tableHeadStyle}>Room No</TableHead>
            <TableHead className={tableHeadStyle}>Year</TableHead>
            <TableHead className={tableHeadStyle}>Status</TableHead>
          </TableRow>
          {data.map((item, index) => (
            <TeacherTimelineTableRow
              key={index}
              num={index + 1}
              major={item.major}
              time={item.time}
              room={item.room}
              year={item.year}
              status={item.status}
              active={active}
              setActive={setActive}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TeacherTimelineTable;
