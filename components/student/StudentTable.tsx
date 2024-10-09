"use client";
import React, { useContext } from "react";
import RefreshTableBtn from "../teacher/RefreshTableBtn";
import CreateFormBtn from "../teacher/CreateFormBtn";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { SearchContext } from "../context/SearchContext";
import { useInfiniteQuery } from "@tanstack/react-query";
import { studentList } from "@/lib/api/student";
import StudentTableRow from "./StudentTableRow";
import { Button } from "../ui/button";
import CreateStudentBtn from "./CreateStudentBtn";

export default function StudentTable() {
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
    queryKey: ["students", search, major, year, term],
    queryFn: (param) => studentList(param, search, major, year, term),
  });
  if (error) return null;
  // console.log(data);
  return (
    <div className="grid grid-cols-1">
      <div className="flex items-center justify-between">
        <p className="font-semibold text-lg ml-1 my-3">
          Total Found : {data?.pages[0].total}
        </p>
        <div className="flex items-center space-x-2">
          <RefreshTableBtn resource={"students"}></RefreshTableBtn>
          <CreateStudentBtn></CreateStudentBtn>
        </div>
      </div>
      <div className="">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>S/N</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Major</TableHead>
              <TableHead>Year</TableHead>
              <TableHead>Term</TableHead>
              <TableHead>Gender</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.pages
              .flatMap((data) => data.users)
              .map((item, index) => (
                <StudentTableRow user={item} key={index} num={index + 1} />
              ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-end my-5">
        {hasNextPage && (
          <Button type="button" onClick={() => fetchNextPage()}>
            {isFetchingNextPage ? "Loading..." : "Load More"}
          </Button>
        )}
      </div>
    </div>
  );
}
