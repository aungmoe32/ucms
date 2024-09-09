"use client";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Props = {
  num: number;
  major: string;
  time: string;
  room: string;
  year: string;
  status: string;
  active: number;
  setActive: React.Dispatch<React.SetStateAction<number>>;
};

const TeacherTimelineTableRow = ({
  num,
  major,
  time,
  room,
  year,
  status,
  active,
  setActive,
}: Props) => {
  const [currentStatus, setCurrentStatus] = useState(status);

  const handleValueChange = (value: string) => {
    setCurrentStatus(value);
    setActive(0);
  };

  return (
    <tr
      onClick={() => {
        active === num ? setActive(0) : setActive(num);
      }}
      className={`cursor-pointer transition-all ${active === num ? "bg-white shadow-custom shadow-gray-200 " : ""}`}
    >
      <td className="table-des">{num}.</td>
      <td className="table-des p-7">{major}</td>
      <td className="table-des min-w-[190px]">{time}</td>
      <td className="table-des min-w-[100px]">{room}</td>
      <td className="table-des min-w-[100px]">{year}</td>
      <td className="table-des min-w-[153px]">
        {active === num ? (
          <Select onValueChange={handleValueChange}>
            <SelectTrigger className="w-[120px] focus:ring-0 text-black ring-0  ">
              <SelectValue placeholder={currentStatus} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Present">Present</SelectItem>
              <SelectItem value="Absent">Absent</SelectItem>
            </SelectContent>
          </Select>
        ) : (
          <p>{currentStatus}</p>
        )}
      </td>
    </tr>
  );
};

export default TeacherTimelineTableRow;
