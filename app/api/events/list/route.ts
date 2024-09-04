import { eventList } from "@/lib/events";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  // const data = await request.json();
  const semester_id = request.nextUrl.searchParams.get("semester_id");
  try {
    const events = await eventList(semester_id);
    return NextResponse.json(events);
  } catch (e) {
    // console.log(e);
    return NextResponse.json({ error: 1 }, { status: 400 });
  }
}

// export const dynamic = "force-dynamic";
