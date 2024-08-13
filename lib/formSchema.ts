import { z } from "zod";
import { Majors, SemesterTerms, Years } from "./constants";

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
  year: z.enum(["1", "2", "3", "4", "5", "6"]),
  term: z.enum(["First", "Second"]),
  major: z.enum(["It", "Civil", "Archi", "Ep", "Ec", "Mc"]),
  gender: z.enum(["Male", "Female"]),
});

const subjectSchema = z.object({
  subject_id: z.string().min(1, { message: "Required" }),
  year: z.enum(Years),
  major: z.enum(Majors),
  term: z.enum(SemesterTerms),
});

export const createTeacherFormSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Email is invalid" }),
  password: z
    .string()
    .min(1, { message: "Password is required" })
    .min(6, { message: "Password must be at least 6 characters" }),
  major: z.enum(["It", "Civil", "Archi", "Ep", "Ec", "Mc"]),
  // subjects: z.array(z.any()).nonempty(),
  subjects: z.array(subjectSchema),
  // teachYear: z.array(z.any()).nonempty(),
  gender: z.enum(["Male", "Female"]),
  role: z.enum(["teacher", "admin"]).default("teacher"),
});

export const editTimetableFormSchema = z.object({
  major: z
    .string()
    .max(30, { message: "Major must be less than 50 characters" }),
  majorCode: z
    .string()
    .max(20, { message: "Major Code must be less than 20 characters" }),
});

export const createExamFormSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  year: z.enum(["1", "2", "3", "4", "5", "6"]),
  term: z.enum(["First", "Second"]),
  major: z.enum(["It", "Civil", "Archi", "Ep", "Ec", "Mc"]),
  description: z.string().max(200),
  date: z.date(),
  time: z
    .string()
    .min(1, { message: "Time is required" })
    .max(10, { message: "Time is invalid" }),
  examType: z.enum(["Final", "Tutorial", "Assignment"]),
});

export const createEventFormSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  description: z.string().max(200),
  date: z.date(),
  time: z
    .string()
    .min(1, { message: "Time is required" })
    .max(10, { message: "Time is invalid" }),
});
