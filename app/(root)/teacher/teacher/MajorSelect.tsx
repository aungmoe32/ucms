"use client";
import { SearchContext } from "@/components/context/SearchContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Majors } from "@/lib/constants";
import React, { useContext } from "react";

const MajorSelect = () => {
  const { setMajor, major } = useContext(SearchContext);
  return (
    <div className="flex">
      <div className="px-5">Teaching Majors : </div>
      <Select
        //   value={major}
        defaultValue="all"
        onValueChange={(value) => {
          let v = value;
          if (value == "all") v = "";
          setMajor(v);
        }}
      >
        <SelectTrigger className=" h-[50px] focus:ring-0 ring-0 shadow-sm shadow-gray-400 ">
          <SelectValue placeholder="Major" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          {Majors.map((major) => (
            <SelectItem value={major}>{major}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default MajorSelect;
