import { subjectListQuery } from "@/app/api/subjects/route";
import { teacherList } from "@/lib/api/teacher";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import TeacherTable from "./TeacherTable";
import TeacherTableBar from "./TeacherTableBar";

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
