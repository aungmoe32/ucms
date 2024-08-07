import { createStudentFormSchema } from "@/app/validationSchemas";
import { db } from "@/lib/drizzle/db";
import { semesters, students, users } from "@/lib/drizzle/schema";
import { genSaltSync, hashSync } from "bcrypt-ts";
import { NextRequest, NextResponse } from "next/server";
import { createSemesterIfNotExist } from "./[id]/route";

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
        id: users.id,
      });
    return NextResponse.json(student, { status: 201 });
  } catch (e) {
    return NextResponse.json(e, { status: 400 });
  }
}
