"use client";
import React, { useState } from "react";
import StudentTimetableRow from "./StudentTimetableRow";
import { Table, TableBody, TableHead, TableRow } from "@/components/ui/table";

const data = [
  {
    time: "9:00",
    year: 2,
    term: "Second",
    majors: ["English", "Math", "Web", "C++", "Web"],
  },
  {
    time: "10:00",
    year: 2,
    term: "Second",
    majors: ["English", "Math", "Web", "C++", "Web"],
  },
  {
    time: "11:00",
    year: 2,
    term: "Second",
    majors: ["Dld", "Dc", "Math", "Be", "Library"],
  },
  {
    time: "1:00",
    year: 2,
    term: "Second",
    majors: ["Dld", "Dc", "English", "Be", "Library"],
  },
  {
    time: "2:00",
    year: 2,
    term: "Second",
    majors: ["Dc", "C++", "Dld", "Math", "Be"],
  },
  {
    time: "3:00",
    year: 2,
    term: "Second",
    majors: ["Dc", "C++", "Dld", "Math", "Be"],
  },
];

const StudentTimetable = ({
  role,
}: {
  role: "teacher" | "student" | "admin";
}) => {
  const [show, setShow] = useState<"Week" | "Day">("Week");

  const activeStyle = "font-semibold text-lg border-b-2 border-black";

  const date = new Date();
  const [day, setDay] = useState<number>(date.getDay());

  const handleDay = (day: number) => {
    if (show === "Day") {
      setDay(day);
    }
  };

  const majorTableRowStyle = (input: number) =>
    `table-head rounded-md text-black text-center  text-lg ${day !== input ? "font-[500]" : "font-[900]"} ${show === "Day" && "cursor-pointer"}`;

  return (
    <div className="mt-4">
      <div className="flex flex-row gap-4 items-center">
        <button
          onClick={() => {
            setShow("Week");
            setDay(date.getDay());
          }}
          className={show === "Week" ? activeStyle : ""}
        >
          <p className="">Week</p>
        </button>
        <button
          onClick={() => setShow("Day")}
          className={show === "Day" ? activeStyle : ""}
        >
          <p>Day</p>
        </button>
      </div>

      {/* Timetable */}
      <Table className="w-full mt-6">
        <TableBody>
          <TableRow className="bg-blue-100 hover:bg-blue-100">
            <TableHead className="table-head"></TableHead>
            <TableHead
              onClick={() => handleDay(1)}
              className={majorTableRowStyle(1)}
            >
              <p>Mon</p>
            </TableHead>
            <TableHead
              onClick={() => handleDay(2)}
              className={majorTableRowStyle(2)}
            >
              <p>Tue</p>
            </TableHead>
            <TableHead
              onClick={() => handleDay(3)}
              className={majorTableRowStyle(3)}
            >
              <p>Wed</p>
            </TableHead>
            <TableHead
              onClick={() => handleDay(4)}
              className={majorTableRowStyle(4)}
            >
              <p>Thu</p>
            </TableHead>
            <TableHead
              onClick={() => handleDay(5)}
              className={majorTableRowStyle(5)}
            >
              <p>Fri</p>
            </TableHead>
          </TableRow>
          {data.map((item, index) => (
            <StudentTimetableRow
              key={index}
              time={item.time}
              term={item.term}
              year={item.year}
              majors={item.majors}
              day={day}
              show={show}
              role={role}
              data={data}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default StudentTimetable;
