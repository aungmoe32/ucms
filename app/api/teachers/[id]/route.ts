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
    const validation = await updateTeacherFormSchema.safeParseAsync(body);
    if (!validation.success)
      return NextResponse.json(validation.error.format(), { status: 400 });
    // throw new Error();

    const teacher = await db.query.teachers.findFirst({
      where: (table, { and, eq }) => eq(table.id, params.id),
      with: {
        user: true,
        teacher_subject: true,
      },
    });

    if (!teacher) throw new Error();

    const out = await db.transaction(async (tx) => {
      const data = {
        name: body.name,
        email: body.email,
        role: "teacher",
        major: body.major,
        gender: body.gender,
      };
      if (body.password) {
        const salt = genSaltSync(10);
        const hash = hashSync(body.password, salt);
        data.password = hash;
      }
      await tx.update(users).set(data).where(eq(users.id, teacher.user.id));

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
  try {
    const teacher = await db.query.teachers.findFirst({
      where: (table, { and, eq }) => eq(table.id, params.id),
      with: {
        teacher_subject: true,
      },
    });

    if (!teacher)
      return NextResponse.json({ error: "Invalid teacher" }, { status: 404 });

    await db.transaction(async (tx) => {
      await tx.delete(teacher_subject).where(
        inArray(
          teacher_subject.id,
          teacher.teacher_subject.map((ts) => ts.id)
        )
      );
      await tx.delete(teachers).where(eq(teachers.id, params.id));
      await tx.delete(users).where(eq(users.id, teacher.userId));
    });

    return NextResponse.json({ success: true });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ error: "server error" }, { status: 404 });
  }
}
