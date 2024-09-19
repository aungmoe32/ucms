import { subjectListQuery } from "@/app/api/subjects/route";
import { studentList } from "@/lib/api/student";
import { teacherList } from "@/lib/api/teacher";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import TableBar from "../teacher/TableBar";
import StudentTable from "./StudentTable";

const TeacherTablePrefetch = async () => {
  const queryClient = new QueryClient();

  const { search, major, year, term } = {
    search: "",
    major: "",
    year: "",
    term: "",
  };

  await Promise.all([
    queryClient.prefetchInfiniteQuery({
      queryKey: ["students", search, major, year, term],
      queryFn: (param) => studentList(param, search, major, year, term),
      initialPageParam: 1,
    }),
  ]);

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <TableBar SBoxPlaceholder={"Search Student"}></TableBar>
        <StudentTable></StudentTable>
      </HydrationBoundary>
    </>
  );
};

export default TeacherTablePrefetch;
