import { updateEvent } from "@/lib/calendar";
import { db } from "@/lib/drizzle/db";
import { sendPush } from "@/lib/server-noti";
import { NextRequest, NextResponse } from "next/server";
import { getNotiSubs } from "../../insert/route";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json();
    const calendar_id = request.nextUrl.searchParams.get("calendar_id");
    //   console.log(data);

    if (!calendar_id) throw new Error();
    const event = await updateEvent(params.id, calendar_id!, data);

    const subs = await getNotiSubs(calendar_id);
    await sendPush(
      {
        title: "Event is updated",
        body: event.summary,
      },
      subs
    );

    return NextResponse.json(event);
  } catch (e) {
    // console.error(e.message);
    return NextResponse.json([], {
      status: 400,
    });
  }
}
