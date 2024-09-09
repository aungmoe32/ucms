import { db } from "@/lib/drizzle/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { semester_id: string } }
) {
  const subs = await db.query.subjects.findMany({
    where: (tb, funcs) => funcs.eq(tb.semesterId, params.semester_id),
  });
  return NextResponse.json(subs);
}

export const subjectsListQuery = async (semester_id) => {
  const subs = await db.query.subjects.findMany({
    where: (tb, funcs) => funcs.eq(tb.semesterId, semester_id),
  });
  return subs;
};
