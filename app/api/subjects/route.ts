import { db } from "@/lib/drizzle/db";
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

export const dynamic = "force-dynamic";
