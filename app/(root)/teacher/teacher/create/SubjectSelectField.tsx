"use client";
import React, { useEffect, useState } from "react";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  useMutation,
  useQuery,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Control,
  FieldArrayWithId,
  UseFormReturn,
  useWatch,
} from "react-hook-form";
import { createTeacherFormSchema } from "@/lib/formSchema";
import { z } from "zod";
import { getSubjects } from "@/lib/subject";
// import { subjects } from "@/lib/subject";

// const subjects = [
//   {
//     name: "DLD",
//     id: "3433f",
//     semester: {
//       year: "1",
//       major: "IT",
//       term: "First",
//     },
//   },
//   {
//     name: "BEE",
//     id: "34311",
//     semester: {
//       year: "1",
//       major: "IT",
//       term: "First",
//     },
//   },
// ];

type formSchema = z.infer<typeof createTeacherFormSchema>;

const SubjectSelectField = ({
  control,
  form: { watch, setValue },
  field,
  index,
}: // subjects,
{
  control: Control<formSchema>;
  form: UseFormReturn<formSchema>;
  index: number;
  field: FieldArrayWithId<formSchema>;
  // subjects: any;
}) => {
  //   const [subjectList, setSubjectList] = useState<
  //     { name: string; id: string }[]
  //   >([]);

  const {
    data: subjects,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["subjects"],
    queryFn: getSubjects,
    placeholderData: [],
  });
  // console.log(data, isLoading);

  if (error) return null;

  const subjectValues = useWatch({
    control,
    name: `subjects.${index}`,
  });
  // console.log("render ", subjectValues);

  useEffect(() => {
    // console.log("effe");
    setValue(`subjects.${index}.subject_id`, "");
  }, [subjectValues.year, subjectValues.major, subjectValues.term]);

  const filterd = subjects.filter((sub) => {
    return (
      subjectValues?.major == sub.semester.major &&
      subjectValues?.year == sub.semester.year &&
      subjectValues?.term == sub.semester.term
    );
  });
  const subjectList = filterd.map((sub) => {
    return { name: sub.name, id: sub.id };
  });
  // console.log("filtered ", filterd);
  // setSubjectList(subs);

  //   useEffect(() => {
  //     const subscription = watch((data, { name, type }) => {
  //       console.log(name, type, data);
  //       const fieldId = `subjects.${index}`
  //       if(!name?.includes(fieldId)) return
  //       data.subjects?.forEach((fieldInfo, i) => {
  //         if (i == index) {
  //           if (!(fieldInfo?.major && fieldInfo?.year && fieldInfo?.term)) return;
  //           const filterd = subjects.filter((sub) => {
  //             return (
  //               fieldInfo?.major == sub.semester.major &&
  //               fieldInfo?.year == sub.semester.year &&
  //               fieldInfo?.term == sub.semester.term
  //             );
  //           });
  //           console.log("filtered ", filterd);
  //           const subs = filterd.map((sub) => {
  //             return { name: sub.name, id: sub.id };
  //           });
  //           setSubjectList(subs);
  //         }
  //       });
  //     });
  //     return () => {
  //       subscription.unsubscribe();
  //     };
  //   }, [watch]);

  return (
    <FormField
      control={control}
      name={`subjects.${index}.subject_id`}
      render={({ field }) => (
        <FormItem>
          {/* <FormLabel>{field.value}</FormLabel> */}
          <Select onValueChange={field.onChange} value={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select a subject" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {subjectList.map((subject, index) => (
                <SelectItem key={index} value={subject.id}>
                  {subject.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default SubjectSelectField;
