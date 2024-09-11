import { studentList } from "@/lib/resources/student";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import React, { useContext } from "react";
import { teacherList } from "@/lib/resources/teacher";
import TeacherTable from "../teacher/TeacherTable";
import { SearchContext } from "../context/SearchContext";
import { getSubjects } from "@/lib/subject";
import { db } from "@/lib/drizzle/db";
import { subjectListQuery } from "@/app/api/subjects/route";
import TeacherTableBar from "../teacher/TeacherTableBar";

const TeacherTablePrefetch = async () => {
  const queryClient = new QueryClient();

  const { search, major, year, term } = {
    search: "",
    major: "",
    year: "",
    term: "",
  };

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ["subjects"],
      queryFn: subjectListQuery,
    }),
    queryClient.prefetchInfiniteQuery({
      queryKey: ["teachers", search, major, year, term],
      queryFn: (param) => teacherList(param, search, major, year, term),
      initialPageParam: 1,
    }),
  ]);

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <TeacherTableBar></TeacherTableBar>
        <TeacherTable></TeacherTable>
      </HydrationBoundary>
    </>
  );
};

export default TeacherTablePrefetch;
