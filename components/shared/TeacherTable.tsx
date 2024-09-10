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
