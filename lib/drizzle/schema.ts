import { sql } from "drizzle-orm";
import {
  boolean,
  timestamp,
  pgTable,
  text,
  primaryKey,
  integer,
  pgEnum,
  uuid,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { Majors, SemesterTerms, Years } from "../constants";

export const userRole = pgEnum("user_role", ["student", "teacher"]);
export const major = pgEnum("major", Majors);
export const year = pgEnum("year", Years);
export const term = pgEnum("semester_term", SemesterTerms);
export const users = pgTable(
  "users",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull(),
    email: text("email").notNull(),
    password: text("password").notNull(),
    role: userRole("user_role").default("student"),
    major: major("major").notNull(),
    image: text("image").$default(() => ""),
  },
  (table) => {
    return {
      emailIndex: uniqueIndex("emailIndex").on(table.email),
    };
  }
);

export const teachers = pgTable("teachers", {
  id: uuid("id").primaryKey().defaultRandom(),
  experience: integer("experience").notNull(),
  userId: uuid("user_id")
    .references(() => users.id)
    .notNull(),
});

export const students = pgTable("students", {
  id: uuid("id").primaryKey().defaultRandom(),
  year: year("year").notNull(),
  semesterId: uuid("semester_id")
    .references(() => semesters.id)
    .notNull(),
  userId: uuid("user_id")
    .references(() => users.id)
    .notNull(),
});

export const semesters = pgTable("semesters", {
  id: uuid("id").primaryKey().defaultRandom(),
  term: term("semester_term").notNull(),
  major: major("major").notNull(),
  year: year("year").notNull(),
});

export const subjects = pgTable("subjects", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  code: text("code").notNull(),
  semesterId: uuid("semester_id")
    .references(() => semesters.id)
    .notNull(),
});

export const teacher_semester = pgTable(
  "teacher_semester",
  {
    teacher_id: uuid("teacher_id")
      .references(() => teachers.id)
      .notNull(),
    semester_id: uuid("semester_id")
      .references(() => semesters.id)
      .notNull(),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.teacher_id, table.semester_id] }),
    };
  }
);
