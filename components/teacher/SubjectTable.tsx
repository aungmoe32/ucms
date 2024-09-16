"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Control, useFieldArray, UseFormReturn } from "react-hook-form";
import { createTeacherFormSchema } from "@/lib/schemas/formSchema";
import { z } from "zod";
import { Majors, SemesterTerms, Years } from "@/lib/constant/constants";
import SubjectSelectField from "./SubjectSelectField";

const SubjectTable = ({
  control,
  form,
}: {
  control: Control<z.infer<typeof createTeacherFormSchema>>;
  form: UseFormReturn<z.infer<typeof createTeacherFormSchema>>;
}) => {
  const { fields, append, remove } = useFieldArray({
    name: "subjects",
    control,
  });

  return (
    <div className=" grid grid-cols-1">
      <div className="flex justify-between">
        <FormLabel className="text-lg font-semibold">
          Teaching Subjects
        </FormLabel>

        <Button
          type="button"
          onClick={() => {
            append({
              major: "IT",
              year: "2",
              term: "Second",
              subject_id: "",
            });
          }}
        >
          Add Subject
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Major</TableHead>
            <TableHead>Year</TableHead>
            <TableHead>Semester Term</TableHead>
            <TableHead>Subject</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {fields.map((field, index) => (
            <TableRow key={field.id}>
              <TableCell>
                <FormField
                  control={control}
                  name={`subjects.${index}.major`}
                  render={({ field }) => (
                    <FormItem>
                      {/* <FormLabel>Major</FormLabel> */}
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a major" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Majors.map((major, index) => (
                            <SelectItem key={index} value={major}>
                              {major}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TableCell>
              <TableCell>
                <FormField
                  control={control}
                  name={`subjects.${index}.year`}
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a year" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Years.map((year, index) => (
                            <SelectItem key={index} value={year}>
                              {year}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TableCell>
              <TableCell>
                <FormField
                  control={control}
                  name={`subjects.${index}.term`}
                  render={({ field }) => (
                    <FormItem>
                      {/* <FormLabel>Major</FormLabel> */}
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a term" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {SemesterTerms.map((term, index) => (
                            <SelectItem key={index} value={term}>
                              {term}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TableCell>
              <TableCell>
                <SubjectSelectField
                  form={form}
                  control={control}
                  field={field}
                  index={index}
                ></SubjectSelectField>
              </TableCell>
              <TableCell>
                <Button
                  className="text-white bg-red-500"
                  type={"button"}
                  onClick={() => {
                    remove(index);
                  }}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default SubjectTable;
