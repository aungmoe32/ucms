import { Many, relations, sql } from "drizzle-orm";
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
  date,
  foreignKey,
} from "drizzle-orm/pg-core";
import {
  Gender,
  Majors,
  Marks,
  Role,
  SemesterTerms,
  Years,
} from "../constants";

export const userRole = pgEnum("user_role", Role);
export const mark = pgEnum("user_role", Marks);
export const major = pgEnum("major", Majors);
export const year = pgEnum("year", Years);
export const term = pgEnum("semester_term", SemesterTerms);
export const gender = pgEnum("gender", Gender);
export const users = pgTable(
  "users",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull(),
    email: text("email").notNull(),
    password: text("password").notNull(),
    role: userRole("user_role").default("student"),
    major: major("major").notNull(),
    gender: gender("gender").notNull(),
    image: text("image").$default(() => ""),
    createdAt: timestamp("createdAt").notNull().defaultNow(),
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
  color: text("color").notNull(),
  semesterId: uuid("semester_id")
    .references(() => semesters.id)
    .notNull(),
});

export const teacher_subject = pgTable(
  "teacher_subject",
  {
    teacher_id: uuid("teacher_id")
      .references(() => teachers.id)
      .notNull(),
    subject_id: uuid("subject_id")
      .references(() => subjects.id)
      .notNull(),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.teacher_id, table.subject_id] }),
    };
  }
);

export const exams = pgTable("exams", {
  id: uuid("id").primaryKey().defaultRandom(),
  date: date("date"),
  semesterId: uuid("semester_id")
    .references(() => semesters.id)
    .notNull(),
});
export const timetables = pgTable("timetables", {
  id: uuid("id").primaryKey().defaultRandom(),
  calendarId: text("calendar_id").notNull(),
  semesterId: uuid("semester_id")
    .references(() => semesters.id)
    .notNull(),
});

export const results = pgTable("results", {
  id: uuid("id").primaryKey().defaultRandom(),
  mark: mark("mark").notNull(),
  studentId: uuid("student_id")
    .references(() => students.id)
    .notNull(),
  subjectId: uuid("subject_id")
    .references(() => subjects.id)
    .notNull(),
  examId: uuid("exam_id")
    .references(() => exams.id)
    .notNull(),
});

// Relationships

export const usersRelations = relations(users, ({ one, many }) => {
  return {
    student: one(students),
    teacher: one(teachers),
  };
});

export const semestersRelations = relations(semesters, ({ one, many }) => {
  return {
    students: many(students),
    subjects: many(subjects),
    exams: many(exams),
    timetable: one(timetables),
  };
});

export const studentsRelations = relations(students, ({ one, many }) => {
  return {
    user: one(users, {
      fields: [students.userId],
      references: [users.id],
    }),
    semester: one(semesters, {
      fields: [students.semesterId],
      references: [semesters.id],
    }),

    results: many(results),
  };
});
export const teachersRelations = relations(teachers, ({ one, many }) => {
  return {
    user: one(users, {
      fields: [teachers.userId],
      references: [users.id],
    }),
    teacher_subject: many(teacher_subject),
  };
});

export const subjectsRelations = relations(subjects, ({ one, many }) => {
  return {
    semester: one(semesters, {
      fields: [subjects.semesterId],
      references: [semesters.id],
    }),
    results: many(results),
    teacher_subject: many(teacher_subject),
  };
});
export const examsRelations = relations(exams, ({ one, many }) => {
  return {
    semester: one(semesters, {
      fields: [exams.semesterId],
      references: [semesters.id],
    }),
    results: many(results),
  };
});
export const timetablesRelations = relations(timetables, ({ one, many }) => {
  return {
    semester: one(semesters, {
      fields: [timetables.semesterId],
      references: [semesters.id],
    }),
  };
});

export const TeacherSubjectRelations = relations(teacher_subject, ({ one }) => {
  return {
    teacher: one(teachers, {
      fields: [teacher_subject.teacher_id],
      references: [teachers.id],
    }),
    subject: one(subjects, {
      fields: [teacher_subject.subject_id],
      references: [subjects.id],
    }),
  };
});

export const resultsRelations = relations(results, ({ one }) => {
  return {
    subject: one(subjects, {
      fields: [results.subjectId],
      references: [subjects.id],
    }),
    student: one(students, {
      fields: [results.studentId],
      references: [students.id],
    }),
    exam: one(exams, {
      fields: [results.examId],
      references: [exams.id],
    }),
  };
});
