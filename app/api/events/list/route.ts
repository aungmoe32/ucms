import { getEvents, insertEvent } from "@/lib/calendar";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  //   const data = await request.json();
  //   console.log(data);
  const events = await getEvents();
  return NextResponse.json(events);
}
