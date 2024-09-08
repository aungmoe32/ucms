"use client";
import React, { use, useCallback } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const TimetableSwitch = ({ semester, setSemester, teacher_subjects }) => {
  const sems = useCallback(() => {
    return [
      ...new Map(
        teacher_subjects.map((ts) => [
          ts.subject.semester.id,
          ts.subject.semester,
        ])
      ).values(),
    ];
  }, [teacher_subjects]);
  // console.log(sems());
  return (
    <Select
      defaultValue={semester.id}
      onValueChange={(id) => {
        // console.log(
        //   id,
        //   teacher_subjects.find((ts: any) => ts.subject.semester.id == id)
        //     .subject.semester
        // );
        setSemester(sems().find((sem) => sem.id == id));
      }}
    >
      <SelectTrigger className="">
        <SelectValue placeholder="Select a semester" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Select Semester</SelectLabel>
          {sems().map((sem: any) => (
            <SelectItem key={sem.id} value={sem.id}>
              {selectName(sem)}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

function selectName(sem) {
  return sem.major + ", " + sem.year + " year, " + sem.term + " Sem";
}

export default TimetableSwitch;
