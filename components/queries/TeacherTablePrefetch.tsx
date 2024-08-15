import { studentList } from "@/lib/resources/student";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import React from "react";
import StudentTable from "../shared/StudentTable";
import { teacherList } from "@/lib/resources/teacher";
import TeacherTable from "../shared/TeacherTable";

const TeacherTablePrefetch = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["teachers"],
    queryFn: teacherList,
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
