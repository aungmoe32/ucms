"use client";
import Skeleton from "@/components/Skeleton";
import { FormContext } from "@/components/context/FormContext";
import FormProvider from "@/components/context/FormProvider";
import StudentProfileDialog from "@/components/student/StudentProfileDialog";
import StudentFormDialog from "@/components/teacher/StudentFormDialog";
import TeacherDialog from "@/components/teacher/TeacherDialog";
import { Button } from "@/components/ui/button";
import { CircleUser, User } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";

export default function Profile() {
  const { status, data: session } = useSession();
  // console.log(session);
  const { edit, setEdit, setOpen, setDefaultValues, setIsProfile } =
    useContext(FormContext);
  if (status == "loading") return <Skeleton className="h-screen" />;
  return (
    <div className=" w-full flex md:flex-row md:space-x-10 flex-col justify-center  my-5">
      <div className="flex flex-col space-y-2  items-center">
        <div className="bg-neutral-100 dark:bg-gray-400 rounded-full w-28 h-28 flex justify-center items-center">
          <User className="h-10 w-10 text-primary-background" />
        </div>
        <div className="text-lg font-bold text-primary">
          {session?.user?.name}
        </div>
        <div>
          <Button
            variant={"outline"}
            onClick={() => {
              const data = JSON.parse(JSON.stringify(session?.user));
              console.log(data);
              data.experience = session?.user?.teacher.experience;
              data.subjects = session?.user?.teacher.subjects.map((s) => ({
                subject_id: s.id,
                year: s.semester.year,
                major: s.semester.major,
                term: s.semester.term,
              }));
              setDefaultValues(data);
              setIsProfile(true);
              setEdit(true);
              setOpen(true);
            }}
          >
            Edit Profile
          </Button>
          <TeacherDialog
            title={"Profile"}
            description={"Edit Profile"}
          ></TeacherDialog>
        </div>
      </div>

      <div className="flex flex-col space-y-5 px-5 md:px-0">
        <div className="flex flex-col justify-center ">
          <span className="font-bold">Email</span>
          <div className="text-gray-500 text-sm">{session?.user?.email}</div>
        </div>
        <div className="flex flex-col justify-center ">
          <span className="font-bold">Gender</span>
          <div className="text-gray-500 text-sm">{session?.user?.gender}</div>
        </div>

        <div className="flex flex-col justify-center ">
          <span className="font-bold">Major</span>
          <div className="text-gray-500 text-sm">{session?.user?.major}</div>
        </div>
        <div className="flex flex-col justify-center ">
          <span className="font-bold">Experience</span>
          <div className="text-gray-500 text-sm">
            {session?.user?.teacher?.experience}
          </div>
        </div>
        <div className="flex flex-col justify-center ">
          <span className="font-bold">Role</span>
          <div className="text-gray-500 text-sm">{session?.user?.role}</div>
        </div>
      </div>
    </div>
  );
}
