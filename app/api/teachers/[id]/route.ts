import {
  createStudentFormSchema,
  createTeacherFormSchema,
  updateStudentFormSchema,
} from "@/app/validationSchemas";
import { db } from "@/lib/drizzle/db";
import {
  semesters,
  students,
  teacher_subject,
  teachers,
  users,
} from "@/lib/drizzle/schema";
import { genSaltSync, hashSync } from "bcrypt-ts";
import { eq, inArray } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const validation = await createTeacherFormSchema.safeParseAsync(body);
    if (!validation.success)
      return NextResponse.json(validation.error.format(), { status: 400 });

    const teacher = await db.query.teachers.findFirst({
      where: (table, { and, eq }) => eq(table.id, params.id),
      with: {
        user: true,
        teacher_subject: true,
      },
    });

    if (!teacher) throw new Error();

    const out = await db.transaction(async (tx) => {
      const salt = genSaltSync(10);
      const hash = hashSync(body.password, salt);
      await tx
        .update(users)
        .set({
          name: body.name,
          email: body.email,
          password: hash,
          role: "teacher",
          major: body.major,
          gender: body.gender,
        })
        .where(eq(users.id, teacher.user.id));

      await tx
        .update(teachers)
        .set({
          experience: body.experience,
        })
        .where(eq(teachers.id, teacher.id));
      const ts = teacher.teacher_subject.map((ts) => ts.id);
      await tx.delete(teacher_subject).where(inArray(teacher_subject.id, ts));
      let datas: {
        teacher_id: string;
        subject_id: string;
      }[] = [];
      body.subjects.forEach((subject) => {
        datas.push({
          teacher_id: teacher.id,
          subject_id: subject.subject_id,
        });
      });
      //   console.log(datas);
      if (datas.length > 0) await tx.insert(teacher_subject).values(datas);
    });

    return NextResponse.json([], { status: 201 });
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
