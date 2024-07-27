import { getEvents, insertEvent } from "@/lib/calendar";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  //   const data = await request.json();
  try {
    const events = await getEvents();
    return NextResponse.json(events);
  } catch (e) {
    // console.log(e);
    return NextResponse.json([], { status: 400 });
  }
}
