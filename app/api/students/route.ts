import { db } from "@/lib/drizzle/db";
import { semesters, students, teachers, users } from "@/lib/drizzle/schema";
import { genSaltSync, hashSync } from "bcrypt-ts";
import { NextRequest, NextResponse } from "next/server";
import { createSemesterIfNotExist } from "./[id]/route";
import { unstable_noStore } from "next/cache";
import { and, count, eq, like } from "drizzle-orm";
import { createStudentFormSchema } from "@/lib/schemas/validationSchemas";
import {
  Majors,
  PageSize,
  SemesterTerms,
  Years,
} from "@/lib/constant/constants";
import { z } from "zod";
import { isTeacher, unauthenticated, unauthorized } from "@/lib/api/validate";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOption";

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return unauthenticated();
  if (!isTeacher(session)) return unauthorized();

  try {
    const body = await request.json();
    const validation = await createStudentFormSchema.safeParseAsync(body);
    if (!validation.success)
      return NextResponse.json(validation.error.format(), { status: 400 });
    let salt = genSaltSync(10);
    let hash = hashSync(body.password, salt);

    const student = await db.transaction(async (tx) => {
      const sem = await tx.query.semesters.findFirst({
        where: eq(semesters.id, body.semester_id),
      });
      const user = await tx
        .insert(users)
        .values({
          name: body.name,
          email: body.email,
          password: hash,
          role: "student",
          major: sem.major,
          gender: body.gender,
        })
        .returning({
          id: users.id,
        });
      const student = await tx
        .insert(students)
        .values({
          year: sem.year,
          userId: user[0].id,
          semesterId: sem.id,
        })
        .returning({
          id: students.id,
        });
      return student;
    });
    return NextResponse.json(student, { status: 201 });
  } catch (e) {
    console.log(e);
    return NextResponse.json(e, { status: 400 });
  }
}

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return unauthenticated();
  if (!isTeacher(session)) return unauthorized();

  const searchParams = request.nextUrl.searchParams;
  const pageSize = PageSize;
  const parsedPage = parseInt(searchParams.get("page")!, 10) || 0;
  const page = parsedPage < 1 ? 1 : parsedPage;
  const search = searchParams.get("search");
  let year = searchParams.get("year");
  let term = searchParams.get("term");
  let major = searchParams.get("major");

  if (year && !z.enum(Years).safeParse(year).success) year = null;
  if (term && !z.enum(SemesterTerms).safeParse(term).success) term = null;
  if (major && !z.enum(Majors).safeParse(major).success) major = null;

  const whereConditions = [];
  if (search) whereConditions.push(like(users.name, `%${search}%`));
  if (year) whereConditions.push(eq(semesters.year, year));
  if (major) whereConditions.push(eq(semesters.major, major));
  if (term) whereConditions.push(eq(semesters.term, term));

  const total = await db
    .select({
      count: count(),
    })
    .from(users)
    .innerJoin(students, eq(students.userId, users.id))
    .innerJoin(semesters, eq(semesters.id, students.semesterId))
    .where(and(...whereConditions))
    .execute();
  const stds = await db
    .select({
      studentId: students.id,
      name: users.name,
      email: users.email,
      gender: users.gender,
      major: semesters.major,
      year: semesters.year,
      term: semesters.term,
    })
    .from(users)
    .innerJoin(students, eq(students.userId, users.id))
    .innerJoin(semesters, eq(semesters.id, students.semesterId))
    .offset((page - 1) * pageSize)
    .limit(pageSize)
    .where(and(...whereConditions))
    .execute();

  return NextResponse.json({ total: total[0].count, data: stds });
}

export const dynamic = "force-dynamic";
