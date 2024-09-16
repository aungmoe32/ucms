import { db } from "@/lib/drizzle/db";
import { sendPush } from "@/lib/resources/server-noti";
import { NextRequest, NextResponse } from "next/server";
import { getNotiSubs } from "../../insert/route";
import { updateEvent } from "@/lib/resources/events";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json();
    // const calendar_id = request.nextUrl.searchParams.get("calendar_id");
    //   console.log(data);

    // if (!calendar_id) throw new Error();
    const event = await updateEvent(params.id, data);
    // console.log(event);
    let subs = await getNotiSubs(event.semesterId);
    subs = [...new Map(subs.map((sub) => [sub.id, sub])).values()];
    // console.log(subs);
    await sendPush(
      {
        title: "Event is updated",
        body: event.title,
      },
      subs
    );

    return NextResponse.json(event);
  } catch (e) {
    console.error(e);
    return NextResponse.json([], {
      status: 400,
    });
  }
}
