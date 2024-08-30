"use client";
import React from "react";
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
  return (
    <Select
      defaultValue={semester.id}
      onValueChange={(id) => {
        // console.log(
        //   id,
        //   teacher_subjects.find((ts: any) => ts.subject.semester.id == id)
        //     .subject.semester
        // );
        setSemester(
          teacher_subjects.find((ts: any) => ts.subject.semester.id == id)
            .subject.semester
        );
      }}
    >
      <SelectTrigger className="">
        <SelectValue placeholder="Select a semester" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {/* <SelectLabel>Fruits</SelectLabel> */}
          {teacher_subjects.map((teacher_subject: any) => (
            <SelectItem
              key={teacher_subject.id}
              value={teacher_subject.subject.semester.id}
            >
              {selectName(teacher_subject.subject.semester)}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

function selectName(sem) {
  return sem.major + ", " + sem.year + " year, " + sem.term + " sem";
}

export default TimetableSwitch;
