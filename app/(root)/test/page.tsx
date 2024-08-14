import React from "react";

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getSubjects } from "@/lib/subject";
import Sample from "./Sample";
import { QueryProvider } from "@/components/QueryProvider";

const page = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["subjects"],
    queryFn: getSubjects,
  });
  // console.log("pagej", queryClient.getQueriesData());
  return (
    <QueryProvider>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Sample></Sample>
      </HydrationBoundary>
    </QueryProvider>
  );
};

export default page;
