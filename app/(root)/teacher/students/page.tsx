import FormProvider from "@/components/context/FormProvider";
import SearchProvider from "@/components/context/SearchProvider";
import StudentTable from "@/components/student/StudentTable";
import StudentTablePrefetch from "@/components/student/StudentTablePrefetch";
import StudentFormDialog from "@/components/teacher/StudentFormDialog";
import TableBar from "@/components/teacher/TableBar";
import React from "react";

export default function Students() {
  return (
    <FormProvider>
      <SearchProvider>
        <StudentFormDialog
          title={"Student Form"}
          description={"Create a student"}
        ></StudentFormDialog>
        <div className="md:mx-5">
          {/* <StudentTablePrefetch></StudentTablePrefetch> */}
          <TableBar SBoxPlaceholder={"Search Student"}></TableBar>
          <StudentTable></StudentTable>
        </div>
      </SearchProvider>
    </FormProvider>
  );
}

export const dynamic = "force-dynamic";
