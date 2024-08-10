import { Gender, Majors, Role, SemesterTerms, Years } from "@/lib/constants";
import { db } from "@/lib/drizzle/db";
import { semesters, subjects } from "@/lib/drizzle/schema";
import { inArray } from "drizzle-orm";
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
  gender: z.enum(Gender),
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
  major: z.enum(Majors),
  gender: z.enum(Gender),
  experience: z.number(),
  subjects: z
    .string()
    .array()
    .optional()
    .refine(
      async (arr) => {
        if (!arr) return true;
        if (arr.length == 0) return true;

        const sems = await db.query.subjects.findMany({
          where: inArray(subjects.id, arr),
        });
        return sems.length == arr.length;
      },
      {
        message: "Invalid subjects!",
      }
    ),
});

export const updateStudentFormSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  year: z.enum(Years),
  term: z.enum(SemesterTerms),
  major: z.enum(Majors),
  gender: z.enum(Gender),
});
