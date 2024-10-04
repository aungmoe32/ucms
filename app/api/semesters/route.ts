import authOptions from "@/app/auth/authOption";
import { unauthenticated } from "@/lib/api/validate";
import { db } from "@/lib/drizzle/db";
import { eventList } from "@/lib/resources/events";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return unauthenticated();
  try {
    const sems = await db.query.semesters.findMany();
    return NextResponse.json(sems);
  } catch (e) {
    console.log(e);
    return NextResponse.json({ error: 1 }, { status: 400 });
  }
}

export const dynamic = "force-dynamic";
