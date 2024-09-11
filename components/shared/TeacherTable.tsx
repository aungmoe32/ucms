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
import { getSubjects } from "@/lib/subject";

const tableHeadStyle = "table-head text-base text-black font-semibold";

const TeacherTable = () => {
  const { search, major, year, term } = useContext(SearchContext);
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
    queryKey: ["teachers", search, major, year, term],
    queryFn: (param) => teacherList(param, search, major, year, term),
  });

  // const { data: subjects } = useQuery({
  //   queryKey: ["subjects"],
  //   queryFn: getSubjects,
  //   placeholderData: [],
  // });

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
          <TableRow>
            <TableHead>S/N</TableHead>
            <TableHead>Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Major</TableHead>
            <TableHead>Subjects</TableHead>
            {/* <TableHead>Teach Year</TableHead> */}
            <TableHead>Experience</TableHead>
            <TableHead>Gender</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.pages
            .flatMap((data) => data.teachers)
            .map((item, index) => (
              <TeacherTableRow
                user={item}
                key={index}
                num={index + 1}
                image={""}
                name={item.name}
                major={item.major}
                teachYear={item.subjects.map((ts) => {
                  return parseInt(ts.semester.year, 10);
                })}
                subjects={item.subjects.map((ts) => {
                  return ts.name;
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
