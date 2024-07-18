import { deleteEvent, updateEvent } from "@/lib/calendar";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // const data = await request.json();
  //   console.log(data);
  await deleteEvent(params.id);
  return NextResponse.json({ success: 1 });
}
