import FormProvider from "@/components/context/FormProvider";
import SearchProvider from "@/components/context/SearchProvider";
import TeacherTablePrefetch from "@/components/queries/TeacherTablePrefetch";
import CreateTeacherBtn from "@/components/teacher/CreateTeacherBtn";
import MajorSelect from "@/components/teacher/MajorSelect";
import SearchBox from "@/components/teacher/SearchBox";
import TeacherDialog from "@/components/teacher/TeacherDialog";
import TermSelect from "@/components/teacher/TermSelect";
import YearSelect from "@/components/teacher/YearSelect";

const TeacherList = () => {
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
};

export default TeacherList;
