"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
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
import { Majors } from "@/lib/constant/constants";
import {
  createTeacherFormSchema,
  updateTeacherFormSchema,
} from "@/lib/schemas/formSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useForm,
  Control,
  useController,
  UseFormProps,
  UseFormReturn,
} from "react-hook-form";
import { FaCheck } from "react-icons/fa";
import { z } from "zod";
import {
  useMutation,
  useQuery,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import SubjectTable from "./SubjectTable";
import { getSubjects } from "@/lib/api/subject";
import axios from "axios";
import { createTeacher, updateTeacher } from "@/lib/api/teacher";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import toast, { Toaster } from "react-hot-toast";
import { FormContext } from "../context/FormContext";

const TeacherCreateForm = () => {
  const { edit, defaultValues } = useContext(FormContext);
  const form = useForm<z.infer<typeof createTeacherFormSchema>>({
    resolver: zodResolver(
      edit ? updateTeacherFormSchema : createTeacherFormSchema
    ),
    defaultValues,
  });

  const queryClient = useQueryClient();

  const {
    setError,
    formState: { errors },
    control,
  } = form;

  async function onSubmit(values: z.infer<typeof createTeacherFormSchema>) {
    // console.log("Values", values);
    try {
      if (edit) await updateTeacher(defaultValues.teacher.id, values);
      else await createTeacher(values);
      queryClient.invalidateQueries(["teachers"], { exact: true });
      if (edit) toast.success("edited");
      else toast.success("created");
    } catch (error) {
      toast.error("Error");
    }
  }

  return (
    <div className="text-left">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Name" {...field} type="text" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" {...field} type="email" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Password */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Password"
                    {...field}
                    type="password"
                    onChange={(event) =>
                      field.onChange(event.target.value || undefined)
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="experience"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Experience</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Experience"
                    {...field}
                    type="number"
                    onChange={(event) => field.onChange(+event.target.value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="major"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Major</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose Major" />
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
          {/* Gender */}
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gender</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Choose Gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <SubjectTable control={form.control} form={form}></SubjectTable>

          <div className="flex justify-end">
            <Button type="submit" disabled={form.formState.isSubmitting}>
              <FaCheck size={18} className="mr-2" />
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default TeacherCreateForm;
