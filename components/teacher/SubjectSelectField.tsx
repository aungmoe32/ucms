"use client";
import React, { useContext, useEffect, useState } from "react";

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
import { createTeacherFormSchema } from "@/lib/schemas/formSchema";
import { z } from "zod";
import { getAllSubjects } from "@/lib/api/subject";

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
    queryFn: getAllSubjects,
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
    const found = subjects.find((s) => s.id == subjectValues.subject_id);
    if (!found) return;
    if (
      found.semester.major != subjectValues.major ||
      found.semester.year != subjectValues.year ||
      found.semester.term != subjectValues.term
    )
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

  return (
    <FormField
      control={control}
      name={`subjects.${index}.subject_id`}
      render={({ field }) => (
        <FormItem>
          {/* <FormLabel>{console.log(field.value)}</FormLabel> */}
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
