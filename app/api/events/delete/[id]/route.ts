import { deleteEvent, updateEvent } from "@/lib/calendar";
import { sendPush } from "@/lib/server-noti";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // const data = await request.json();
  //   console.log(data);
  const calendar_id = request.nextUrl.searchParams.get("calendar_id");
  await deleteEvent(params.id, calendar_id!);
  sendPush({
    title: "An event deleted",
    body: "body",
    icon: "http://image.ibb.co/frYOFd/tmlogo.png",
  });
  return NextResponse.json({ success: 1 });
}
