import { db } from "@/lib/drizzle/db";
import { eventList } from "@/lib/resources/events";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const sems = await db.query.semesters.findMany();
    return NextResponse.json(sems);
  } catch (e) {
    console.log(e);
    return NextResponse.json({ error: 1 }, { status: 400 });
  }
}

export const dynamic = "force-dynamic";
