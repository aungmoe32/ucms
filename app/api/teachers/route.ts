import { createTeacherFormSchema } from "@/app/validationSchemas";
import { db } from "@/lib/drizzle/db";
import { reduceTeachers } from "@/lib/dbReducer";
import {
  semesters,
  subjects,
  teacher_subject,
  teachers,
  users,
} from "@/lib/drizzle/schema";
import { genSaltSync, hashSync } from "bcrypt-ts";
import { and, count, desc, eq, sql } from "drizzle-orm";
import { QueryBuilder } from "drizzle-orm/pg-core";
import { unstable_noStore } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validation = await createTeacherFormSchema.safeParseAsync(body);
    console.log(validation.success);
    if (!validation.success)
      return NextResponse.json(validation.error.format(), { status: 400 });

    const teacher = await db.transaction(async (tx) => {
      let salt = genSaltSync(10);
      let hash = hashSync(body.password, salt);
      const user = await tx
        .insert(users)
        .values({
          name: body.name,
          email: body.email,
          password: hash,
          role: "teacher",
          major: body.major,
          gender: body.gender,
        })
        .returning({
          id: users.id,
        });
      const teacher = await tx
        .insert(teachers)
        .values({
          experience: body.experience,
          userId: user[0].id,
        })
        .returning({
          id: teachers.id,
        });

      let datas: {
        teacher_id: string;
        subject_id: string;
      }[] = [];
      body.subjects.forEach((subject) => {
        datas.push({
          teacher_id: teacher[0].id,
          subject_id: subject.subject_id,
        });
      });
      //   console.log(datas);
      await tx.insert(teacher_subject).values(datas);
      return teacher;
    });

    return NextResponse.json(teacher, { status: 201 });
  } catch (e) {
    console.log(e);
    return NextResponse.json(e, { status: 400 });
  }
}

export async function GET(request: NextRequest) {
  unstable_noStore();
  const searchParams = request.nextUrl.searchParams;
  const year = searchParams.get("year");
  const search = searchParams.get("search");
  // console.log(year);

  const page =
    parseInt(searchParams.get("page")!, 10) < 1
      ? 1
      : parseInt(searchParams.get("page")!, 10);
  const pageSize = 2;

  const total = db.select({ count: count() }).from(teachers);

  const urs = db
    .select({
      id: users.id,
      name: users.name,
      role: users.role,
      major: users.major,
      gender: users.gender,
      teachers,
      teacher_subject,
      subjects,
      semesters,
    })
    .from(users)
    .leftJoin(teachers, eq(users.id, teachers.userId))
    .leftJoin(teacher_subject, eq(teacher_subject.teacher_id, teachers.id))
    .leftJoin(subjects, eq(subjects.id, teacher_subject.subject_id))
    .leftJoin(semesters, eq(semesters.id, subjects.semesterId))
    // .where(and(eq(users.userRole, "teacher"), sql`teachers.id IN (SELECT id FROM teachers
    //   LIMIT 2 OFFSET 2 )`))
    // .where(sql`users.id IN (SELECT users.id FROM users LEFT JOIN "teachers" ON "users"."id" = "teachers"."user_id" where "users"."user_role" = 'teacher'
    //    ORDER BY "users"."createdAt" LIMIT 3 OFFSET 3)`)
    .where(
      sql`users.id IN (SELECT users.id FROM users INNER JOIN "teachers" ON "users"."id" = "teachers"."user_id" ORDER BY "users"."createdAt" LIMIT ${pageSize} OFFSET ${
        (page - 1) * pageSize
      })`
    );

  // const urs = db
  //   .select({
  //     id: users.id,
  //     name: users.name,
  //     role: users.role,
  //     major: users.major,
  //     gender: users.gender,
  //     teachers,
  //     teacher_subject,
  //     subjects,
  //     semesters,
  //   })
  //   .from(users)
  //   .leftJoin(teachers, eq(users.id, teachers.userId))
  //   .leftJoin(teacher_subject, eq(teacher_subject.teacher_id, teachers.id))
  //   .leftJoin(subjects, eq(subjects.id, teacher_subject.subject_id))
  //   .leftJoin(semesters, eq(semesters.id, subjects.semesterId))
  // .where(eq(users.role, "teacher"))
  // .where(
  //   and(
  //     eq(users.role, "teacher"),
  //     sql`users.id IN (SELECT id FROM users
  // LIMIT ${pageSize} OFFSET ${(page - 1) * pageSize})`
  //   )
  // )
  // .limit(pageSize)
  // .orderBy(desc(users.createdAt));

  // const usersList = db.query.users.findMany({
  //   limit: pageSize,
  //   offset: (page - 1) * pageSize,
  //   // where: (table, { and, eq, or }) => eq(table.role, "teacher"),
  //   where: (table, { like, and, eq }) =>
  //     and(
  //       like(table.name, `%${search ? search : ""}%`),
  //       eq(table.role, "teacher")
  //     ),
  //   orderBy: (users, { asc, desc }) => [desc(users.createdAt)],
  //   columns: {
  //     email: false,
  //     password: false,
  //   },

  //   with: {
  //     teacher: {
  //       columns: {
  //         id: true,
  //         experience: true,
  //       },
  //       with: {
  //         teacher_subject: {
  //           with: {
  //             subject: {
  //               with: {
  //                 semester: true,
  //               },
  //             },
  //           },
  //         },
  //       },
  //     },
  //   },
  // });

  const [tt, trl] = await Promise.all([total, urs]);
  // console.log(trl);

  return NextResponse.json({ total: tt[0].count, users: reduceTeachers(trl) });
  // return NextResponse.json({ total: tt[0].count, users: trl });
}
