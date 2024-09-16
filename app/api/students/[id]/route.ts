import { db } from "@/lib/drizzle/db";
import { semesters, students, users } from "@/lib/drizzle/schema";
import { updateStudentFormSchema } from "@/lib/schemas/validationSchemas";
import { genSaltSync, hashSync } from "bcrypt-ts";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const validation = updateStudentFormSchema.safeParse(body);
    if (!validation.success)
      return NextResponse.json(validation.error.format(), { status: 400 });

    const student = await db.query.students.findFirst({
      where: (table, { and, eq }) => eq(table.id, params.id),
      with: {
        semester: true,
        user: true,
      },
    });

    if (!student)
      return NextResponse.json({ error: "Invalid user" }, { status: 404 });

    if (
      body.major != student.semester.major ||
      body.year != student.semester.year ||
      body.term != student.semester.term
    ) {
      // console.log("run exist");
      const semesterId = await createSemesterIfNotExist(body);
      await db
        .update(students)
        .set({
          year: body.year,
          semesterId: semesterId,
        })
        .where(eq(students.id, params.id));
    }
    const updated = await db
      .update(users)
      .set({
        name: body.name,
        major: body.major,
        gender: body.gender,
      })
      .where(eq(users.id, student.user.id))
      .returning({
        id: users.id,
      });

    return NextResponse.json(updated, { status: 201 });
  } catch (e) {
    return NextResponse.json(e, { status: 400 });
  }
}

export const createSemesterIfNotExist = async (body: any) => {
  let semesterId: string;

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

  return semesterId;
};

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const student = await db.query.students.findFirst({
      where: (table, { and, eq }) => eq(table.id, params.id),
    });

    if (!student)
      return NextResponse.json({ error: "Invalid student" }, { status: 404 });

    await db.delete(students).where(eq(students.id, params.id));
    await db.delete(users).where(eq(users.id, student.userId));

    return NextResponse.json({});
  } catch (e) {
    return NextResponse.json({ error: "server error" }, { status: 404 });
  }
}
