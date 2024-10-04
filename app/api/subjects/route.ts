import { db } from "@/lib/drizzle/db";
import { subjects } from "@/lib/drizzle/schema";
import { createSubjectFormSchema } from "@/lib/schemas/validationSchemas";
import { NextRequest, NextResponse } from "next/server";
import { isTeacher, unauthenticated, unauthorized } from "@/lib/api/validate";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOption";

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return unauthenticated();
  try {
    return NextResponse.json(await subjectListQuery());
  } catch (e) {
    // console.log(e);
    return NextResponse.json({ error: 1 }, { status: 400 });
  }
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return unauthenticated();
  if (!isTeacher(session)) return unauthorized();
  try {
    const body = await request.json();
    const validation = await createSubjectFormSchema.safeParseAsync(body);
    // console.log(validation.success);
    if (!validation.success)
      return NextResponse.json(validation.error.format(), { status: 400 });

    const subject = await db.transaction(async (tx) => {
      const sem = await db.query.semesters.findFirst({
        where: (table, { and, eq }) =>
          and(
            eq(table.major, body.major),
            eq(table.year, body.year),
            eq(table.term, body.term)
          ),
      });

      if (!sem) throw new Error("Invalid Semester!");

      const sub = await tx
        .insert(subjects)
        .values({
          name: body.name,
          code: body.code,
          color: body.color,
          semesterId: sem?.id,
        })
        .returning({
          id: subjects.id,
        });
      return sub;
    });
    return NextResponse.json(subject, { status: 201 });
  } catch (e) {
    console.log(e);
    return NextResponse.json(e, { status: 400 });
  }
}
export const subjectListQuery = async () => {
  const subjects = await db.query.subjects.findMany({
    with: {
      semester: true,
    },
  });
  return subjects;
};

export const dynamic = "force-dynamic";
