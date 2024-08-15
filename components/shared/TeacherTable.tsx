"use client";
import React from "react";
import { Table, TableBody, TableHead, TableRow } from "@/components/ui/table";
import TeacherTableRow from "./TeacherTableRow";
import { useQuery } from "@tanstack/react-query";
import { teacherList } from "@/lib/resources/teacher";

const data = [
  {
    image: "",
    name: "Daw Mya",
    major: "It",
    teachYear: [4, 3, 2],
    subjects: ["C++", "Web", "English", "Math", "Be"],
    gender: "Female",
  },
  {
    image: "",
    name: "Daw Hla",
    major: "Ec",
    teachYear: [1, 2],
    subjects: ["C++", "Web"],
    gender: "Female",
  },
  {
    image: "",
    name: "Daw Su",
    major: "Ep",
    teachYear: [1],
    subjects: ["C++", "Web"],
    gender: "Female",
  },
  {
    image: "",
    name: "U Kyaw",
    major: "Mc",
    teachYear: [5, 6],
    subjects: ["C++", "Web"],
    gender: "Male",
  },
];
const tableHeadStyle = "table-head text-base text-black font-semibold";

const TeacherTable = () => {
  const {
    data: teachers,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["teachers"],
    queryFn: teacherList,
    placeholderData: [],
  });

  if (isLoading) return <h1>Loading...</h1>;
  if (error) {
    return <h1>Error fetching</h1>;
  }
  return (
    <div>
      <p className="font-semibold text-lg ml-1 pb-4">
        Total: {teachers?.length}
      </p>
      <Table className="w-full">
        <TableBody>
          <TableRow className="bg-blue-100 hover:bg-blue-100">
            <TableHead className={tableHeadStyle}>S/N</TableHead>
            <TableHead className={tableHeadStyle}>Image</TableHead>
            <TableHead className={tableHeadStyle}>Name</TableHead>
            <TableHead className={tableHeadStyle}>Major</TableHead>
            <TableHead className={tableHeadStyle}>Subjects</TableHead>
            <TableHead className={tableHeadStyle}>Teach Year</TableHead>
            <TableHead className={tableHeadStyle}>Gender</TableHead>
          </TableRow>
          {teachers?.map((item, index) => (
            <TeacherTableRow
              key={index}
              num={index + 1}
              image={item.user.image}
              name={item.user.name}
              major={item.user.major}
              teachYear={item.teacher_subject.map((ts) => {
                return parseInt(ts.subject.semester.year, 10);
              })}
              subjects={item.teacher_subject.map((ts) => {
                return ts.subject.name;
              })}
              gender={item.user.gender}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TeacherTable;
