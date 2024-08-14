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
import { createTeacher } from "@/lib/resources/teacher";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";

const TeacherCreateForm = () => {
  const form = useForm<z.infer<typeof createTeacherFormSchema>>({
    resolver: zodResolver(createTeacherFormSchema),
    defaultValues: {
      subjects: [],
    },
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
    console.log("Values", values);
    try {
      await createTeacher(values);
      router.push("/teacher/teacher");
      // queryClient.invalidateQueries(["teachers"], { exact: true });
      // router.refresh();
    } catch (error) {
      setError("root", {
        message: "Error creation",
      });
      // console.log(error);
    }
  }

  return (
    <main className="p-4 bg-gray-100 min-h-screen">
      <div className="flex items-center justify-center">
        <article className="mt-8 p-6 py-0 w-[600px] overflow-hidden bg-white shadow-gray-500 shadow-sm rounded-lg relative">
          <div className="py-10 text-white z-10 relative mt-2">
            <h3 className="font-semibold text-3xl">Create Teacher</h3>
            <p className="text-gray-200 mt-2">
              Only the admin can create teacher.
            </p>
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 py-14"
            >
              {/* Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-semibold">
                      Name
                    </FormLabel>
                    <FormControl>
                      <input
                        type="text"
                        placeholder="Create your name"
                        {...field}
                        className="w-full placeholder-gray-500 p-3 border-[2px] border-gray-200 rounded-md   focus:outline-none"
                      />
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
                    <FormLabel className="text-lg font-semibold">
                      Email
                    </FormLabel>
                    <FormControl>
                      <input
                        type="text"
                        {...field}
                        placeholder="Add your email"
                        className="w-full placeholder-gray-500 p-3 border-[2px] border-gray-200 rounded-md   focus:outline-none"
                      />
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
                    <FormLabel className="text-lg font-semibold">
                      Password
                    </FormLabel>
                    <FormControl>
                      <input
                        type="password"
                        {...field}
                        placeholder="Add your password"
                        className="w-full placeholder-gray-500 p-3 border-[2px] border-gray-200 rounded-md   focus:outline-none"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Experience */}
              <ExperienceInput control={control} form={form}></ExperienceInput>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                {/* Major */}
                <FormField
                  control={form.control}
                  name="major"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-semibold">
                        Major
                      </FormLabel>
                      <Select onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger className=" h-[45px] focus:ring-0 ring-0 border-[2px] border-gray-200">
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
                      <FormLabel className="text-lg font-semibold">
                        Gender
                      </FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange}>
                          <SelectTrigger className=" h-[45px] focus:ring-0 ring-0 border-[2px] border-gray-200">
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
              </div>

              <div>
                <SubjectTable control={form.control} form={form}></SubjectTable>
              </div>

              <div className="flex justify-end">
                <Button
                  type="submit"
                  className="mt-1 flex text-[16px] flex-row gap-3 text-white px-8 h-[48px] "
                  disabled={form.formState.isSubmitting}
                >
                  <FaCheck size={18} />
                  Submit
                </Button>
              </div>
            </form>
          </Form>
          {errors.root && (
            <div className=" text-red-500">{errors.root.message}</div>
          )}
          {/* Blue Background */}
          <div
            className="absolute top-0 left-0 right-[0px] bg-primary h-44"
            style={{ borderRadius: "0 0 300px 0" }}
          />
        </article>
      </div>
    </main>
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
      <Label htmlFor="experienceInput" className="text-lg font-semibold">
        Experience
      </Label>

      <input
        placeholder="Add your experience"
        defaultValue={0}
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
