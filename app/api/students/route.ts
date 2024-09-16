import { db } from "@/lib/drizzle/db";
import { semesters, students, teachers, users } from "@/lib/drizzle/schema";
import { genSaltSync, hashSync } from "bcrypt-ts";
import { NextRequest, NextResponse } from "next/server";
import { createSemesterIfNotExist } from "./[id]/route";
import { unstable_noStore } from "next/cache";
import { count } from "drizzle-orm";
import { createStudentFormSchema } from "@/lib/schemas/validationSchemas";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validation = createStudentFormSchema.safeParse(body);
    if (!validation.success)
      return NextResponse.json(validation.error.format(), { status: 400 });
    let salt = genSaltSync(10);
    let hash = hashSync(body.password, salt);
    const user = await db
      .insert(users)
      .values({
        name: body.name,
        email: body.email,
        password: hash,
        role: "student",
        major: body.major,
        gender: body.gender,
      })
      .returning({
        id: users.id,
      });

    const semesterId = await createSemesterIfNotExist(body);

    const student = await db
      .insert(students)
      .values({
        year: body.year,
        userId: user[0].id,
        semesterId: semesterId,
      })
      .returning({
        id: students.id,
      });
    return NextResponse.json(student, { status: 201 });
  } catch (e) {
    return NextResponse.json(e, { status: 400 });
  }
}

export async function GET(request: NextRequest) {
  unstable_noStore();
  const searchParams = request.nextUrl.searchParams;
  const page =
    parseInt(searchParams.get("page")!, 10) < 1
      ? 1
      : parseInt(searchParams.get("page")!, 10);
  const pageSize = 3;

  const total = db.select({ count: count() }).from(students);

  const usersList = db.query.users.findMany({
    limit: pageSize,
    offset: (page - 1) * pageSize,
    where: (table, { and, eq }) => eq(table.role, "student"),
    orderBy: (users, { asc, desc }) => [desc(users.createdAt)],
    columns: {
      email: false,
      password: false,
    },

    with: {
      student: {
        columns: {
          id: true,
          year: true,
        },
        with: {
          semester: true,
        },
      },
    },
  });
  const [tt, trl] = await Promise.all([total, usersList]);

  return NextResponse.json({ total: tt[0].count, users: trl });
}
