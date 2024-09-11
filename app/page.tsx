import FormProvider from "@/components/context/FormProvider";
import SearchProvider from "@/components/context/SearchProvider";
import TeacherTablePrefetch from "@/components/queries/TeacherTablePrefetch";
import SearchBox from "@/components/shared/SearchBox";
import CreateTeacherBtn from "@/components/teacher/CreateTeacherBtn";
import MajorSelect from "@/components/teacher/MajorSelect";
import TeacherDialog from "@/components/teacher/TeacherDialog";
import TermSelect from "@/components/teacher/TermSelect";
import YearSelect from "@/components/teacher/YearSelect";

const TeacherList = () => {
  return (
    <FormProvider>
      <SearchProvider>
        <div className="">
          <div className=" flex ">
            <MajorSelect></MajorSelect>
            <YearSelect></YearSelect>
            <TermSelect></TermSelect>
          </div>
          <div className=" flex justify-end ">
            <div>
              <SearchBox></SearchBox>
            </div>
          </div>
          <CreateTeacherBtn></CreateTeacherBtn>
          <TeacherDialog></TeacherDialog>
          <TeacherTablePrefetch></TeacherTablePrefetch>
        </div>
      </SearchProvider>
    </FormProvider>
  );
};

export default TeacherList;
