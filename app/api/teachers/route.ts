import { createTeacherFormSchema } from "@/app/validationSchemas";
import { db } from "@/lib/drizzle/db";
import { teacher_subject, teachers, users } from "@/lib/drizzle/schema";
import { genSaltSync, hashSync } from "bcrypt-ts";
import { count } from "drizzle-orm";
import { unstable_noStore } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validation = await createTeacherFormSchema.safeParseAsync(body);
    console.log(validation.success);
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
          experience: body.experience,
          userId: user[0].id,
        })
        .returning({
          id: teachers.id,
        });

      let datas: {
        teacher_id: string;
        subject_id: string;
      }[] = [];
      body.subjects.forEach((subject) => {
        datas.push({
          teacher_id: teacher[0].id,
          subject_id: subject.subject_id,
        });
      });
      //   console.log(datas);
      await tx.insert(teacher_subject).values(datas);
      return teacher;
    });

    return NextResponse.json(teacher, { status: 201 });
  } catch (e) {
    console.log(e);
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
  // console.log(page - 1);
  // console.log(page);
  const pageSize = 3;

  const promises = [];

  const total = db.select({ count: count() }).from(teachers);

  const teacherList = db.query.teachers.findMany({
    limit: pageSize,
    offset: (page - 1) * pageSize,
    columns: {
      id: true,
      experience: true,
    },
    with: {
      user: {
        columns: {
          email: false,
          password: false,
        },
      },
      teacher_subject: {
        with: {
          subject: {
            with: {
              semester: true,
            },
          },
        },
      },
    },
  });
  promises.push(total, teacherList);
  const [tt, trl] = await Promise.all(promises);

  return NextResponse.json({ total: tt[0].count, teachers: trl });
}
