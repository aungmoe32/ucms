import { db } from "@/lib/drizzle/db";
import { semesters, students, teachers, users } from "@/lib/drizzle/schema";
import { genSaltSync, hashSync } from "bcrypt-ts";
import { NextRequest, NextResponse } from "next/server";
import { createSemesterIfNotExist } from "./[id]/route";
import { unstable_noStore } from "next/cache";
import { and, count, eq, like } from "drizzle-orm";
import {
  createStudentFormSchema,
  studentProfileFormSchema,
} from "@/lib/schemas/validationSchemas";
import {
  Majors,
  PageSize,
  SemesterTerms,
  Years,
} from "@/lib/constant/constants";
import { z } from "zod";
import {
  isStudent,
  isTeacher,
  unauthenticated,
  unauthorized,
} from "@/lib/api/validate";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOption";

export async function PATCH(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return unauthenticated();
  if (!isStudent(session)) return unauthorized();

  try {
    const body = await request.json();
    const validation = await studentProfileFormSchema.safeParseAsync(body);
    if (!validation.success)
      return NextResponse.json(validation.error.format(), { status: 400 });

    await db.transaction(async (tx) => {
      const data = {
        name: body.name,
        email: body.email,
        gender: body.gender,
      };
      if (body.password) {
        const salt = genSaltSync(10);
        const hash = hashSync(body.password, salt);
        data.password = hash;
      }
      await tx
        .update(users)
        .set(data)
        .where(eq(users.id, session?.user?.user_id));
    });

    return NextResponse.json({ success: 1 }, { status: 201 });
  } catch (e) {
    console.log(e);
    return NextResponse.json(e, { status: 400 });
  }
}
