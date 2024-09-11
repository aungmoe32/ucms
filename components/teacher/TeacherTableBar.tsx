import React from "react";
import MajorSelect from "./MajorSelect";
import YearSelect from "./YearSelect";
import TermSelect from "./TermSelect";
import SearchBox from "./SearchBox";

export default function TeacherTableBar() {
  return (
    <div className="flex items-center justify-between">
      <div className=" flex items-center space-x-2">
        <MajorSelect></MajorSelect>
        <YearSelect></YearSelect>
        <TermSelect></TermSelect>
      </div>

      <div>
        <SearchBox></SearchBox>
      </div>
    </div>
  );
}
