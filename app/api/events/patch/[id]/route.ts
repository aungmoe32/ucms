import { updateEvent } from "@/lib/calendar";
import { sendPush } from "@/lib/server-noti";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const data = await request.json();
  //   console.log(data);
  const event = await updateEvent(params.id, data);
  sendPush({
    title: "An event updated",
    body: "body",
    icon: "http://image.ibb.co/frYOFd/tmlogo.png",
  });
  return NextResponse.json(event);
}
