import Skeleton from "@/components/Skeleton";
import FormProvider from "@/components/context/FormProvider";
import SearchProvider from "@/components/context/SearchProvider";
import TableBar from "@/components/teacher/TableBar";
import TeacherDialog from "@/components/teacher/TeacherDialog";
import TeacherTable from "@/components/teacher/TeacherTable";
import TeacherTablePrefetch from "@/components/teacher/TeacherTablePrefetch";
import React, { Suspense } from "react";

export default function Teachers() {
  return (
    <FormProvider>
      <SearchProvider>
        <TeacherDialog
          title={"Teacher Form"}
          description={"Create a teacher"}
        ></TeacherDialog>
        <div className="md:mx-5">
          <Suspense fallback={<Skeleton className="h-screen" />}>
            {/* <TeacherTablePrefetch></TeacherTablePrefetch> */}
            <TableBar SBoxPlaceholder={"Search Teacher"}></TableBar>
            <TeacherTable></TeacherTable>
          </Suspense>
        </div>
      </SearchProvider>
    </FormProvider>
  );
}

export const dynamic = "force-dynamic";
