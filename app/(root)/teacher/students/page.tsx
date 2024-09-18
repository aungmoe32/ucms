import FormProvider from "@/components/context/FormProvider";
import SearchProvider from "@/components/context/SearchProvider";
import StudentTable from "@/components/student/StudentTable";
import StudentFormDialog from "@/components/teacher/StudentFormDialog";
import React from "react";

export default function Students() {
  return (
    <FormProvider>
      <SearchProvider>
        <StudentFormDialog></StudentFormDialog>
        <div className="md:mx-5">
          <StudentTable></StudentTable>
        </div>
      </SearchProvider>
    </FormProvider>
  );
}
