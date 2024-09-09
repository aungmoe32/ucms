import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import EditTimetableRow from "./EditTimetableRow";

type Props = {
  time: string;
  year: number;
  term: string;
  majors: string[];
  day: number;
  show: "Day" | "Week";
  role: "teacher" | "student" | "admin";
  data: any;
};

const majorColor = {
  English: "bg-blue-100",
  Math: "bg-red-200",
  Web: "bg-yellow-100",
  "C++": "bg-green-100",
  Dld: "bg-orange-100",
  Dc: "bg-violet-200",
  Be: "bg-pink-100",
  Library: "bg-lime-100",
};

const StudentTimetableRow = ({
  time,
  year,
  term,
  majors,
  day,
  show,
  role,
  data,
}: Props) => {
  day = day === 6 || day === 0 ? 1 : day;

  return (
    <TableRow className="mt-1 hover:bg-white">
      <Sheet>
        <TableCell className="table-des w-[89px]">{time}</TableCell>
        {show === "Week" ? (
          <>
            {majors.map((major, index) => (
              <TableCell
                key={index}
                className={`table-des p-0 text-center min-w-[105px] hover:bg-gray-100 ${role === "teacher" ? "cursor-pointer" : ""}`}
              >
                {role === "teacher" ? (
                  <SheetTrigger>
                    <div className={` p-4 rounded-md m-[6px]`}>
                      <p className="font-[700] text-base">{major}</p>
                      <p className="text-xs mt-[2px]">IT-11011</p>
                    </div>
                  </SheetTrigger>
                ) : (
                  <div className={` p-4 rounded-md m-[6px]`}>
                    <p className="font-[700] text-base">{major}</p>
                    <p className="text-xs mt-[2px]">IT-11011</p>
                  </div>
                )}
              </TableCell>
            ))}
          </>
        ) : (
          <TableCell colSpan={6} className={`table-des-nb text-start `}>
            <div
              className={`${majorColor[majors[day - 1] as keyof typeof majorColor]} shadow-gray-400 shadow-sm p-4 rounded-md `}
            >
              <p className="font-[700] text-base">{majors[day - 1]}</p>
              <p className="text-xs mt-[2px]">IT-11011</p>
            </div>
          </TableCell>
        )}
        <EditTimetableRow
          major={data}
          majorCode={"IT-11011"}
          time={time}
          day={day}
        />
      </Sheet>
    </TableRow>
  );
};

export default StudentTimetableRow;
