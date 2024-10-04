import authOptions from "@/app/auth/authOption";
import { unauthenticated } from "@/lib/api/validate";
import { eventList } from "@/lib/resources/events";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return unauthenticated();
  const semester_id = request.nextUrl.searchParams.get("semester_id");
  const eventType = request.nextUrl.searchParams.get("eventType");
  try {
    const events = await eventList(semester_id, eventType);
    return NextResponse.json(events);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 1 }, { status: 400 });
  }
}

export const dynamic = "force-dynamic";
