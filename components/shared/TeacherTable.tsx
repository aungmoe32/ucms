"use client";
import React, { useContext } from "react";
import {
  Table,
  TableBody,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TeacherTableRow from "./TeacherTableRow";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { teacherList } from "@/lib/resources/teacher";
import { Button } from "../ui/button";
import { SearchContext } from "../context/SearchContext";

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
  const { search, setSearch } = useContext(SearchContext);
  const {
    isLoading,
    error,
    data,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    getNextPageParam: (prevData: any) => prevData.nextPage,
    initialPageParam: 1,
    queryKey: ["teachers", search],
    queryFn: (param) => teacherList(param, search),
  });

  if (isLoading) return <h1>Loading...</h1>;
  if (error) return <h1>{JSON.stringify(error)}</h1>;
  return (
    <div>
      <p className="font-semibold text-lg ml-1 pb-4">
        Total: {data?.pages[0].total}
      </p>
      <Table className="w-full">
        {/* <TableFooter>
          <Button type="button">Load More</Button>
        </TableFooter> */}

        <TableHeader>
          <TableRow className="bg-blue-100 hover:bg-blue-100">
            <TableHead className={tableHeadStyle}>S/N</TableHead>
            <TableHead className={tableHeadStyle}>Image</TableHead>
            <TableHead className={tableHeadStyle}>Name</TableHead>
            <TableHead className={tableHeadStyle}>Major</TableHead>
            <TableHead className={tableHeadStyle}>Subjects</TableHead>
            <TableHead className={tableHeadStyle}>Teach Year</TableHead>
            <TableHead className={tableHeadStyle}>Experience</TableHead>
            <TableHead className={tableHeadStyle}>Gender</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.pages
            .flatMap((data) => data.teachers)
            .map((item, index) => (
              <TeacherTableRow
                key={index}
                num={index + 1}
                image={item.image}
                name={item.name}
                major={item.major}
                teachYear={item.teacher.teacher_subject.map((ts) => {
                  return parseInt(ts.subject.semester.year, 10);
                })}
                subjects={item.teacher.teacher_subject.map((ts) => {
                  return ts.subject.name;
                })}
                experience={item.teacher.experience}
                gender={item.gender}
              />
            ))}
        </TableBody>
      </Table>
      <div className="flex justify-end my-5">
        {hasNextPage && (
          <Button type="button" onClick={() => fetchNextPage()}>
            {isFetchingNextPage ? "Loading..." : "Load More"}
          </Button>
        )}
      </div>
    </div>
  );
};

export default TeacherTable;
