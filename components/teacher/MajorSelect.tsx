"use client";
import React, { useContext } from "react";
import SelectBox from "./SelectBox";
import { SearchContext } from "@/components/context/SearchContext";
import { Majors, Years } from "@/lib/constants";

const MajorSelect = () => {
  const { setMajor, major } = useContext(SearchContext);
  return (
    <SelectBox
      value={major}
      setValue={setMajor}
      label={"Major"}
      items={Majors}
    ></SelectBox>
  );
};

export default MajorSelect;
