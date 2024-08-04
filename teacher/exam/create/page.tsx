"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createExamFormSchema } from "@/lib/formSchema";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FaCheck } from "react-icons/fa";

const page = () => {
  // 1. Define create student form.
  const form = useForm<z.infer<typeof createExamFormSchema>>({
    resolver: zodResolver(createExamFormSchema),
  });

  // 2. Handle form submission.
  function onSubmit(values: z.infer<typeof createExamFormSchema>) {
    // Do something with the form values.
    console.log(values);
  }

  return (
    <main className="p-4 bg-gray-100 min-h-screen">
      <div className="flex items-center justify-center">
        <article className="mt-8 p-6 py-0 w-[600px] overflow-hidden bg-white shadow-gray-500 shadow-sm rounded-lg relative">
          <div className="py-10 text-white z-10 relative mt-2">
            <h3 className="font-semibold text-3xl">Create Exam</h3>
            <p className="text-gray-200 mt-2">
              Only the teacher can create exam.
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
                        placeholder="Enter name"
                        {...field}
                        className="w-full placeholder-gray-500 p-3 border-[2px] border-gray-200 rounded-md   focus:outline-none"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              {/* Description */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-semibold">
                      Description
                    </FormLabel>
                    <FormControl>
                      <input
                        type="text"
                        {...field}
                        placeholder="Enter Description"
                        className="w-full placeholder-gray-500 p-3 border-[2px] border-gray-200 rounded-md   focus:outline-none"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              {/* Date */}
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-semibold">
                      Date
                    </FormLabel>
                    <FormControl>
                      <input
                        type="text"
                        {...field}
                        placeholder="Enter Date (11 of October 2024)"
                        className="w-full placeholder-gray-500 p-3 border-[2px] border-gray-200 rounded-md   focus:outline-none"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              {/* Time */}
              <FormField
                control={form.control}
                name="time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-semibold">
                      Time
                    </FormLabel>
                    <FormControl>
                      <input
                        type="text"
                        {...field}
                        placeholder="Enter time (2:00 - 4:00 PM)"
                        className="w-full placeholder-gray-500 p-3 border-[2px] border-gray-200 rounded-md   focus:outline-none"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                {/* Year */}
                <FormField
                  control={form.control}
                  name="year"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-semibold">
                        Year
                      </FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange} {...field}>
                          <SelectTrigger className="h-[45px] focus:ring-0 ring-0 border-[2px] border-gray-200">
                            <SelectValue placeholder="Choose Year" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1 Year</SelectItem>
                            <SelectItem value="2">2 Year</SelectItem>
                            <SelectItem value="3">3 Year</SelectItem>
                            <SelectItem value="4">4 Year</SelectItem>
                            <SelectItem value="5">5 Year</SelectItem>
                            <SelectItem value="6">6 Year</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  )}
                />
                {/* Term */}
                <FormField
                  control={form.control}
                  name="term"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-semibold">
                        Term
                      </FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange} {...field}>
                          <SelectTrigger className=" h-[45px] focus:ring-0 ring-0 border-[2px] border-gray-200">
                            <SelectValue placeholder="Choose Term" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="First">First Term</SelectItem>
                            <SelectItem value="Second">Second Term</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  )}
                />
                {/* Major */}
                <FormField
                  control={form.control}
                  name="major"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-semibold">
                        Major
                      </FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange} {...field}>
                          <SelectTrigger className=" h-[45px] focus:ring-0 ring-0 border-[2px] border-gray-200">
                            <SelectValue placeholder="Choose Major" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="It">It</SelectItem>
                            <SelectItem value="Civil">Civil</SelectItem>
                            <SelectItem value="Archi">Archi</SelectItem>
                            <SelectItem value="Ep">Ep</SelectItem>
                            <SelectItem value="Ec">Ec</SelectItem>
                            <SelectItem value="Mc">Mc</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  )}
                />
                {/* Exam Type */}
                <FormField
                  control={form.control}
                  name="examType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-semibold">
                        Exam
                      </FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange} {...field}>
                          <SelectTrigger className=" h-[45px] focus:ring-0 ring-0 border-[2px] border-gray-200">
                            <SelectValue placeholder="Choose Exam Type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Final">Final</SelectItem>
                            <SelectItem value="Tutorial">Tutorial</SelectItem>
                            <SelectItem value="Assignment">
                              Assignment
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex justify-end">
                <Button
                  type="submit"
                  className="mt-1 flex text-[16px] flex-row gap-3 text-white px-8 h-[48px] "
                >
                  <FaCheck size={18} />
                  Submit
                </Button>
              </div>
            </form>
          </Form>
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

export default page;
