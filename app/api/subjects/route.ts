import { db } from "@/lib/drizzle/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    return NextResponse.json(await subjectListQuery());
  } catch (e) {
    // console.log(e);
    return NextResponse.json({ error: 1 }, { status: 400 });
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
