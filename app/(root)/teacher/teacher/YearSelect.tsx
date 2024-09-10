"use client";
import React, { useContext } from "react";
import SelectBox from "./SelectBox";
import { SearchContext } from "@/components/context/SearchContext";
import { Years } from "@/lib/constants";

const YearSelect = () => {
  const { setYear, year } = useContext(SearchContext);
  return (
    <SelectBox
      value={year}
      setValue={setYear}
      label={"Year"}
      items={Years}
    ></SelectBox>
  );
};

export default YearSelect;
