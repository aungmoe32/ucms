import { insertEvent } from "@/lib/calendar";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  // const data = await request.json();
  console.log("noti ", request);
  return NextResponse.json({});
}
