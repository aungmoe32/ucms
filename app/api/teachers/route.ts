import {
  createStudentFormSchema,
  createTeacherFormSchema,
} from "@/app/validationSchemas";
import { db } from "@/lib/drizzle/db";
import {
  semesters,
  students,
  teacher_semester,
  teachers,
  users,
} from "@/lib/drizzle/schema";
import { genSaltSync, hashSync } from "bcrypt-ts";
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
          experience: 1,
          userId: user[0].id,
        })
        .returning({
          id: teachers.id,
        });

      let datas: {
        teacher_id: string;
        semester_id: string;
      }[] = [];
      body.semesters.forEach((semesterId) => {
        datas.push({
          teacher_id: teacher[0].id,
          semester_id: semesterId,
        });
      });
      //   console.log(datas);
      await db.insert(teacher_semester).values(datas);

      return teacher;
    });

    return NextResponse.json(teacher, { status: 201 });
  } catch (e) {
    console.log(e);
    return NextResponse.json(e, { status: 400 });
  }
}

async function createUser(body, role) {
  let salt = genSaltSync(10);
  let hash = hashSync(body.password, salt);
  const user = await db
    .insert(users)
    .values({
      name: body.name,
      email: body.email,
      password: hash,
      role: role,
      major: body.major,
      gender: body.gender,
    })
    .returning({
      id: users.id,
    });

  return user[0];
}
