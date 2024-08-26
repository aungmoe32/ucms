import { createSubjectFormSchema } from "@/app/validationSchemas";
import { db } from "@/lib/drizzle/db";
import { subjects } from "@/lib/drizzle/schema";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const subjects = await db.query.subjects.findMany({
      with: {
        semester: true,
      },
    });
    return NextResponse.json(subjects);
  } catch (e) {
    // console.log(e);
    return NextResponse.json({ error: 1 }, { status: 400 });
  }
}

export async function POST(request: NextRequest) {
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

export const dynamic = "force-dynamic";
