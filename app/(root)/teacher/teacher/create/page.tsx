import React from "react";

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getSubjects } from "@/lib/subject";
import TeacherCreateForm from "./TeacherCreateForm";

export default async function TeacherCreatePage() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["subjects"],
    queryFn: getSubjects,
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TeacherCreateForm></TeacherCreateForm>
    </HydrationBoundary>
  );
}
