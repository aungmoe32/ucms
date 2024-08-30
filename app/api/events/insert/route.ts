import { insertEvent } from "@/lib/calendar";
import { sendPush } from "@/lib/server-noti";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const data = await request.json();
  const calendar_id = request.nextUrl.searchParams.get("calendar_id");
  //   console.log(data);
  try {
    const event = await insertEvent(calendar_id!, data);
    sendPush({
      title: "New Event Inserted",
      body: "lorem fdsfmk",
      icon: "http://image.ibb.co/frYOFd/tmlogo.png",
    });
    return NextResponse.json(event);
  } catch (e) {
    // console.error(e.message);
    return NextResponse.json([], {
      status: 400,
    });
  }
}
