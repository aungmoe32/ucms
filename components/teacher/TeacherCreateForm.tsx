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
import { Majors } from "@/lib/constants";
import { createTeacherFormSchema } from "@/lib/formSchema";
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
import { getSubjects } from "@/lib/subject";
import axios from "axios";
import { createTeacher, updateTeacher } from "@/lib/resources/teacher";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import toast, { Toaster } from "react-hot-toast";
import { FormContext } from "../context/FormContext";

const TeacherCreateForm = () => {
  const { edit, defaultValues } = useContext(FormContext);
  const form = useForm<z.infer<typeof createTeacherFormSchema>>({
    resolver: zodResolver(createTeacherFormSchema),
    defaultValues,
  });

  const queryClient = useQueryClient();

  const {
    setError,
    formState: { errors },
    control,
  } = form;

  const router = useRouter();

  // console.log(form.formState.errors);

  async function onSubmit(values: z.infer<typeof createTeacherFormSchema>) {
    // console.log("Values", values);
    // return;
    try {
      if (edit) await updateTeacher(defaultValues.teacher.id, values);
      else await createTeacher(values);
      // router.push("/teacher/teacher");
      queryClient.invalidateQueries(["teachers"], { exact: true });
      toast.success("created");
      // router.refresh();
    } catch (error) {
      setError("root", {
        message: "Error creation",
      });
      // console.log(error);
    }
  }

  return (
    <div className=" flex flex-col">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                  <Input placeholder="Password" {...field} type="password" />
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
      {errors.root && (
        <div className=" text-white w-full p-4 bg-red-500 mt-2">
          {errors.root.message}
        </div>
      )}
    </div>
  );
};

const ExperienceInput = ({
  form,
  control,
}: {
  form: UseFormReturn<z.infer<typeof createTeacherFormSchema>>;
  control: Control<z.infer<typeof createTeacherFormSchema>>;
}) => {
  const { field } = useController({
    control,
    name: "experience",
  });
  const [value, setValue] = useState(String(field.value));
  const {
    formState: { errors },
  } = form;

  useEffect(() => {
    setValue(String(field.value));
  }, [field.value, setValue]);

  return (
    <div className="space-y-2">
      <Label htmlFor="experienceInput">Experience (year)</Label>

      <input
        placeholder="Add your experience"
        // defaultValue={0}
        ref={field.ref}
        value={value}
        type="number"
        id="experienceInput"
        onChange={(e) => {
          console.log(e.target.value);
          field.onChange(parseInt(e.target.value, 10) || 0); // send data to hook form
          // if (e.target.value === "") setValue("0");
          // else
          setValue(e.target.value);
        }}
        onBlur={field.onBlur}
        className="w-full mt-0 placeholder-gray-500 p-3 border-[2px] border-gray-200 rounded-md   focus:outline-none"
      />
      <p className="text-sm font-medium text-destructive">
        {errors.experience?.message}
      </p>
    </div>
  );
};

export default TeacherCreateForm;
