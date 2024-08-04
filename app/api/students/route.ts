import { createStudentFormSchema } from "@/app/validationSchemas";
import { db } from "@/lib/drizzle/db";
import { semesters, students, users } from "@/lib/drizzle/schema";
import { genSaltSync, hashSync } from "bcrypt-ts";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = createStudentFormSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  try {
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
      })
      .returning({
        id: users.id,
      });

    let semesterId;

    const semester = await db.query.semesters.findFirst({
      where: (table, { and, eq }) =>
        and(
          eq(table.term, body.term),
          eq(table.year, body.year),
          eq(table.major, body.major)
        ),
    });

    if (!semester) {
      const semester = await db
        .insert(semesters)
        .values({
          year: body.year,
          major: body.major,
          term: body.term,
        })
        .returning({
          id: semesters.id,
        });
      semesterId = semester[0].id;
    } else semesterId = semester.id;

    const student = await db
      .insert(students)
      .values({
        year: body.year,
        userId: user[0].id,
        semesterId: semesterId,
      })
      .returning({
        id: users.id,
      });
    return NextResponse.json(student, { status: 201 });
  } catch (e) {
    return NextResponse.json(e, { status: 400 });
  }
}
