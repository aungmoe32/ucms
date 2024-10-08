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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateProfile } from "@/lib/api/student";
import {
  createTeacherFormSchema,
  studentProfileFormSchema,
} from "@/lib/schemas/formSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaCheck } from "react-icons/fa";
import { z } from "zod";

import { useSession } from "next-auth/react";
const StudentProfileForm = ({
  defaultValues,
}: {
  defaultValues: {
    name: string;
    email: string;
    password: string;
    gender: "Male" | "Female";
  };
}) => {
  const form = useForm<z.infer<typeof studentProfileFormSchema>>({
    resolver: zodResolver(studentProfileFormSchema),
    defaultValues,
  });

  const queryClient = useQueryClient();

  const { update } = useSession();

  const {
    setError,
    formState: { errors },
    control,
  } = form;

  async function onSubmit(values: z.infer<typeof createTeacherFormSchema>) {
    try {
      await updateProfile(values);
      update();
      toast.success("profile updated");
    } catch (error) {
      toast.error("profile update failed");
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
                  <Input disabled placeholder="Email" {...field} type="email" />
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

export default StudentProfileForm;
