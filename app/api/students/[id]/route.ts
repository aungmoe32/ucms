import { db } from "@/lib/drizzle/db";
import { semesters, students, users } from "@/lib/drizzle/schema";
import { updateStudentFormSchema } from "@/lib/schemas/validationSchemas";
import { genSaltSync, hashSync } from "bcrypt-ts";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { isTeacher, unauthenticated, unauthorized } from "@/lib/api/validate";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOption";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) return unauthenticated();
  if (!isTeacher(session)) return unauthorized();
  try {
    const body = await request.json();
    const validation = await updateStudentFormSchema.safeParseAsync(body);
    if (!validation.success)
      return NextResponse.json(validation.error.format(), { status: 400 });
    // throw new Error();

    const student = await db.query.students.findFirst({
      where: (table, { and, eq }) => eq(table.id, params.id),
      with: {
        user: true,
      },
    });

    if (!student) throw new Error();

    await db.transaction(async (tx) => {
      const sem = await tx.query.semesters.findFirst({
        where: eq(semesters.id, body.semester_id),
      });
      const data = {
        name: body.name,
        email: body.email,
        gender: body.gender,
        major: sem.major,
      };
      if (body.password) {
        const salt = genSaltSync(10);
        const hash = hashSync(body.password, salt);
        data.password = hash;
      }
      await tx.update(users).set(data).where(eq(users.id, student.user.id));

      await tx
        .update(students)
        .set({
          semesterId: sem?.id,
          year: sem?.year,
        })
        .where(eq(students.id, student.id));
    });
    return NextResponse.json({ success: true }, { status: 201 });
  } catch (e) {
    console.log(e);
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
  const session = await getServerSession(authOptions);
  if (!session) return unauthenticated();
  if (!isTeacher(session)) return unauthorized();
  try {
    const student = await db.query.students.findFirst({
      where: (table, { and, eq }) => eq(table.id, params.id),
    });

    if (!student)
      return NextResponse.json({ error: "Invalid student" }, { status: 404 });

    await db.transaction(async (tx) => {
      await db.delete(students).where(eq(students.id, params.id));
      await db.delete(users).where(eq(users.id, student.userId));
    });

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "server error" }, { status: 404 });
  }
}
