import React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { editTimetableFormSchema } from "@/lib/formSchema";
import { z } from "zod";
import { SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { FaCheck } from "react-icons/fa";

type Props = {
  major: string;
  majorCode: string;
  time: string;
  day: number;
};

const EditTimetableRow = ({ major, majorCode, time, day }: Props) => {
  // 1. Define create student form.
  const form = useForm<z.infer<typeof editTimetableFormSchema>>({
    resolver: zodResolver(editTimetableFormSchema),
    defaultValues: {
      major: major,
      majorCode: majorCode,
    },
  });

  // 2. Handle form submission.
  function onSubmit(values: z.infer<typeof editTimetableFormSchema>) {
    // Do something with the form values.
    console.log(values);
  }

  return (
    //@ts-ignore
    <SheetContent>
      <SheetHeader>
        <SheetTitle className="text-3xl">Edit Timetable Row</SheetTitle>
        {/* 
        <div>
          <p className="text-2xl">Day: {day}</p>
          <p className="text-2xl">Time: {time}</p>
          <p className="text-2xl">Major: {major}</p>
          <p className="text-2xl">Major Code: {majorCode}</p>
        </div>
        */}
        <div className="">
          <h2 className="text-2xl font-semibold mt-2">Mon - 9:00</h2>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 py-1"
          >
            {/* Major */}
            <FormField
              control={form.control}
              name="major"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold">Major</FormLabel>
                  <FormControl>
                    <input
                      type="text"
                      placeholder="Change major"
                      {...field}
                      className="w-full placeholder-gray-500 p-3 border-[2px] border-gray-200 rounded-md   focus:outline-none"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            {/* Major Code */}
            <FormField
              control={form.control}
              name="majorCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold">
                    Major Code
                  </FormLabel>
                  <FormControl>
                    <input
                      type="text"
                      placeholder="Change major code"
                      {...field}
                      className="w-full placeholder-gray-500 p-3 border-[2px] border-gray-200 rounded-md   focus:outline-none"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="flex justify-start">
              <Button
                type="submit"
                className="mt-3 flex text-[14px] flex-row gap-3 text-white px-6 h-[45px] "
              >
                <FaCheck size={18} />
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </SheetHeader>
    </SheetContent>
  );
};

export default EditTimetableRow;
