import React, { useRef, useState } from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import toast from "react-hot-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Majors, SemesterTerms, Years } from "@/lib/constants";
import { Input } from "../ui/input";
import color from "color-string";
import SubjectColorPicker from "./SubjectColorPicker";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createSubject } from "@/lib/subject";
import { Plus } from "lucide-react";

const FormSchema = z.object({
  year: z.enum(Years),
  major: z.enum(Majors),
  term: z.enum(SemesterTerms),
  name: z.string().min(1),
  code: z.string().min(1),
  color: z.string().refine(colorValidator),
});

const CreateSubjectBtn = ({ refreshSubjects }) => {
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      code: "",
    },
  });
  const formRef = useRef<HTMLFormElement>(null);
  const createSubjectMutation = useMutation({
    mutationFn: createSubject,
    onSuccess: (data, variables, toastId) => {
      // queryClient.setQueryData(["Events", data.id], data)
      toast.dismiss(toastId);
      toast.success("created");
      refreshSubjects();
    },
    onError: (error, variables, context) => {
      toast.dismiss(context);
      toast.error("error");
      // queryClient.invalidateQueries(["events"], { exact: true });
    },
    onMutate: () => {
      return toast.loading("creating...");
    },
  });

  // const [openDelDialog, setOpenDelDialog] = useState(false);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
    await createSubjectMutation.mutateAsync(data);
  }
  return (
    // <AlertDialog open={openDelDialog} onOpenChange={setOpenDelDialog}>
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className=" rounded-full md:rounded-md">
          <Plus />
          <span className="pl-2 hidden md:block">Create Subject</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className=" ">
        <AlertDialogHeader>
          <AlertDialogTitle>Create subject</AlertDialogTitle>
          <AlertDialogDescription>
            Create a subject for a semester
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="max-h-[500px] p-3 overflow-scroll">
          <Form {...form}>
            <form
              ref={formRef}
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-6"
            >
              <FormField
                control={form.control}
                name="year"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Year</FormLabel>
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
                    {/* <FormDescription>
                    You can manage email addresses in your{" "}
                  </FormDescription> */}
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
                    {/* <FormDescription>
                    You can manage email addresses in your{" "}
                  </FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="term"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Semester Term</FormLabel>
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
                    {/* <FormDescription>
                    You can manage email addresses in your{" "}
                  </FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="subject name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Code</FormLabel>
                    <FormControl>
                      <Input placeholder="subject code" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="color"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subject Color</FormLabel>
                    <FormControl>
                      {/* <Input placeholder="subject color" {...field} /> */}
                      <SubjectColorPicker
                        onChange={field.onChange}
                      ></SubjectColorPicker>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          {/* <AlertDialogAction> */}
          <Button
            type="button"
            disabled={form.formState.isSubmitting}
            onClick={() => {
              // console.log(formRef);
              if (formRef.current) {
                formRef.current.dispatchEvent(
                  new Event("submit", { bubbles: true })
                );
              }
            }}
          >
            Create
          </Button>
          {/* </AlertDialogAction> */}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export function colorValidator(val: string) {
  try {
    return color.get(val) != null;
  } catch {
    return false;
  }
}

export default CreateSubjectBtn;
