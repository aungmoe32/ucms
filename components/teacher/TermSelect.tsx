"use client";
import React, { useContext } from "react";
import SelectBox from "./SelectBox";
import { SearchContext } from "@/components/context/SearchContext";
import { Majors, SemesterTerms, Years } from "@/lib/constant/constants";

const TermSelect = () => {
  const { setTerm, term } = useContext(SearchContext);
  return (
    <SelectBox
      value={term}
      setValue={setTerm}
      label={"Semester Term"}
      items={SemesterTerms}
    ></SelectBox>
  );
};

export default TermSelect;
