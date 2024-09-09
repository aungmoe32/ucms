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
import { and, count, desc, eq, SQL, sql } from "drizzle-orm";
import { QueryBuilder } from "drizzle-orm/pg-core";
import { unstable_noStore } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validation = await createTeacherFormSchema.safeParseAsync(body);
    // console.log(validation.success);
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
  const sch = searchParams.get("search");
  const search = sch ? sch : "";
  const major = searchParams.get("major");
  // console.log(search);

  const parsedPage = parseInt(searchParams.get("page")!, 10) || 0;

  const page = parsedPage < 1 ? 1 : parsedPage;
  const pageSize = 7;
  const mainInSql: SQL = sql` users.id IN `;
  const countSql = sql<number>` SELECT COUNT(*) FROM users INNER JOIN "teachers" ON "users"."id" = "teachers"."user_id" `;
  const filterUserSql: SQL = sql` (SELECT users.id FROM users INNER JOIN "teachers" ON "users"."id" = "teachers"."user_id"`;

  // const whereInSql: SQL = sql`users.id IN (SELECT users.id FROM users
  // LEFT JOIN "teachers" ON "users"."id" = "teachers"."user_id"
  // LEFT JOIN "teacher_subject" ON "teacher_subject"."teacher_id" = "teachers"."id"
  // LEFT JOIN "subjects" ON "subjects"."id" = "teacher_subject"."subject_id"
  // LEFT JOIN "semesters" ON "semesters"."id" = "subjects"."semester_id"
  // where "users"."user_role" = 'teacher' `;
  if (search) {
    const searchSql: SQL = sql` WHERE "users"."name" LIKE ${
      "%" + search + "%"
    } `;
    filterUserSql.append(searchSql);
    countSql.append(searchSql);
  }
  if (major) {
    const concatSql: SQL = search ? sql` AND ` : sql` WHERE `;
    filterUserSql.append(concatSql);
    countSql.append(concatSql);
    const majorFilterSql: SQL = sql` users.id IN  (
      SELECT users.id
    FROM
      "semesters"
      LEFT JOIN "subjects" ON "subjects"."semester_id" = "semesters"."id"
      LEFT JOIN "teacher_subject" ON "teacher_subject"."subject_id" = "subjects"."id"
      LEFT JOIN "teachers" ON "teacher_subject"."teacher_id" = "teachers"."id"
      LEFT JOIN "users" ON "users"."id" = "teachers"."user_id"
    WHERE
      "semesters"."major" = ${major}
    ) `;
    filterUserSql.append(majorFilterSql);
    countSql.append(majorFilterSql);
  }

  filterUserSql.append(
    sql` ORDER BY "users"."createdAt"  LIMIT ${pageSize} OFFSET ${
      (page - 1) * pageSize
    }) `
  );

  mainInSql.append(filterUserSql);
  // const total = db.select({ count: count() }).from(teachers);
  const total: { count: string }[] = await db.execute(countSql);
  // console.log(total);

  const urs = await db
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
      // count: sql` COUNT(users.id) AS count `,
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
    .where(mainInSql);
  // .where(and(whereInSql, sql` "users"."name" LIKE ${"%" + search + "%"}`))
  // .orderBy(users.createdAt);

  // const [tt, trl] = await Promise.all([total, urs]);
  // console.log(trl);

  const reducedTrs = reduceTeachers(urs);
  return NextResponse.json({
    total: parseInt(total[0].count, 10),
    users: reducedTrs,
  });
  // return NextResponse.json({ total: tt[0].count, users: trl });
  // return NextResponse.json(reducedTrs);
}
