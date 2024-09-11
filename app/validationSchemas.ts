import { Gender, Majors, Role, SemesterTerms, Years } from "@/lib/constants";
import { db } from "@/lib/drizzle/db";
import { semesters, subjects } from "@/lib/drizzle/schema";
import { inArray } from "drizzle-orm";
import { z } from "zod";
import color from "color-string";

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

const subjectSchema = z.object({
  subject_id: z.string().min(1, { message: "Required" }),
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
  experience: z.number().gte(0),
  subjects: z
    // .string()
    .array(subjectSchema)
    .optional()
    .refine(
      async (arr) => {
        if (!arr) return true;
        if (arr.length == 0) return true;

        const subs = arr.map((sub) => sub.subject_id);

        const sems = await db.query.subjects.findMany({
          where: inArray(subjects.id, subs),
        });
        return sems.length == subs.length;
      },
      {
        message: "Invalid subjects!",
      }
    ),
});

export const updateTeacherFormSchema = createTeacherFormSchema.extend({
  password: z
    .string()
    // .min(1, { message: "Password is required" })
    .min(6, { message: "Password must be at least 6 characters" })
    .optional(),
});

export const updateStudentFormSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  year: z.enum(Years),
  term: z.enum(SemesterTerms),
  major: z.enum(Majors),
  gender: z.enum(Gender),
});

export const createSubjectFormSchema = z.object({
  year: z.enum(Years),
  major: z.enum(Majors),
  term: z.enum(SemesterTerms),
  name: z.string().min(1),
  code: z.string().min(1),
  color: z.string().refine(colorValidator),
});

export function colorValidator(val: string) {
  try {
    return color.get(val) != null;
  } catch {
    return false;
  }
}
