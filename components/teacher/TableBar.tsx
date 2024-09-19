import React from "react";
import MajorSelect from "./MajorSelect";
import YearSelect from "./YearSelect";
import TermSelect from "./TermSelect";
import SearchBox from "./SearchBox";

export default function TableBar({ SBoxPlaceholder }) {
  return (
    <div className="flex items-center justify-between space-x-2">
      <div className=" flex items-center space-x-2">
        <MajorSelect></MajorSelect>
        <YearSelect></YearSelect>
        <TermSelect></TermSelect>
      </div>

      <div>
        <SearchBox placeholder={SBoxPlaceholder}></SearchBox>
      </div>
    </div>
  );
}
