import Skeleton from "@/components/Skeleton";
import FormProvider from "@/components/context/FormProvider";
import SearchProvider from "@/components/context/SearchProvider";
import TeacherDialog from "@/components/teacher/TeacherDialog";
import TeacherTablePrefetch from "@/components/teacher/TeacherTablePrefetch";
import React, { Suspense } from "react";

export default function Teachers() {
  return (
    <FormProvider>
      <SearchProvider>
        <TeacherDialog></TeacherDialog>
        <div className="md:mx-5">
          <Suspense fallback={<Skeleton className="h-screen" />}>
            <TeacherTablePrefetch></TeacherTablePrefetch>
          </Suspense>
        </div>
      </SearchProvider>
    </FormProvider>
  );
}
