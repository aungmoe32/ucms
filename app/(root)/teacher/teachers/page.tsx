import FormProvider from "@/components/context/FormProvider";
import SearchProvider from "@/components/context/SearchProvider";
import TeacherDialog from "@/components/teacher/TeacherDialog";
import TeacherTablePrefetch from "@/components/teacher/TeacherTablePrefetch";
import React from "react";

export default function Teachers() {
  return (
    <FormProvider>
      <SearchProvider>
        <TeacherDialog></TeacherDialog>
        <div className="my-10 mx-5">
          <TeacherTablePrefetch></TeacherTablePrefetch>
        </div>
      </SearchProvider>
    </FormProvider>
  );
}
