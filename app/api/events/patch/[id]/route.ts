import { updateEvent } from "@/lib/calendar";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const data = await request.json();
  //   console.log(data);
  const event = await updateEvent(params.id, data);
  return NextResponse.json(event);
}
