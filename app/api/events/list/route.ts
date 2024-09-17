import { eventList } from "@/lib/resources/events";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  // const data = await request.json();
  const semester_id = request.nextUrl.searchParams.get("semester_id");
  const eventType = request.nextUrl.searchParams.get("eventType");
  try {
    const events = await eventList(semester_id, eventType);
    return NextResponse.json(events);
  } catch (e) {
    // console.log(e);
    return NextResponse.json({ error: 1 }, { status: 400 });
  }
}

export const dynamic = "force-dynamic";
