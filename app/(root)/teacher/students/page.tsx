import FormProvider from "@/components/context/FormProvider";
import SearchProvider from "@/components/context/SearchProvider";
import StudentTable from "@/components/student/StudentTable";
import StudentTablePrefetch from "@/components/student/StudentTablePrefetch";
import StudentFormDialog from "@/components/teacher/StudentFormDialog";
import React from "react";

export default function Students() {
  return (
    <FormProvider>
      <SearchProvider>
        <StudentFormDialog></StudentFormDialog>
        <div className="md:mx-5">
          <StudentTablePrefetch></StudentTablePrefetch>
        </div>
      </SearchProvider>
    </FormProvider>
  );
}
