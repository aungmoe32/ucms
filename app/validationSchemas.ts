import { Majors, Role, SemesterTerms, Years } from "@/lib/constants";
import { z } from "zod";

export const createStudentFormSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Email is invalid" }),
  password: z
    .string()
    .min(1, { message: "Password is required" })
    .min(6, { message: "Password must be at least 6 characters" }),
  year: z.enum(Years),
  term: z.enum(SemesterTerms),
  major: z.enum(Majors),
  // gender: z.enum(["Male", "Female"]),
});

export const updateStudentFormSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  year: z.enum(Years),
  term: z.enum(SemesterTerms),
  major: z.enum(Majors),
  // gender: z.enum(["Male", "Female"]),
});
