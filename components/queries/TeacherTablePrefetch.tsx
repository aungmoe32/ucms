import { studentList } from "@/lib/resources/student";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import React, { useContext } from "react";
import StudentTable from "../shared/StudentTable";
import { teacherList } from "@/lib/resources/teacher";
import TeacherTable from "../shared/TeacherTable";
import { SearchContext } from "../context/SearchContext";

const TeacherTablePrefetch = async () => {
  const queryClient = new QueryClient();

  const { search, major, year, term } = {
    search: "",
    major: "",
    year: "",
    term: "",
  };
  await queryClient.prefetchInfiniteQuery({
    queryKey: ["teachers", search, major, year, term],
    queryFn: (param) => teacherList(param, search, major, year, term),
    initialPageParam: 1,
  });

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <TeacherTable></TeacherTable>
      </HydrationBoundary>
    </>
  );
};

export default TeacherTablePrefetch;
