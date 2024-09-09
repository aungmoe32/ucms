import { sendPush } from "@/lib/server-noti";
import { NextRequest, NextResponse } from "next/server";
import { getNotiSubs } from "../../insert/route";
import { deleteEvent } from "@/lib/events";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // const data = await request.json();
    //   console.log(data);
    // const calendar_id = request.nextUrl.searchParams.get("calendar_id");

    // if (!calendar_id) throw new Error();
    const event = await deleteEvent(params.id);
    const subs = await getNotiSubs(event.semesterId);
    await sendPush(
      {
        title: "Event is deleted",
        body: event.title,
      },
      subs
    );

    return NextResponse.json({});
  } catch (e) {
    // console.error(e.message);
    return NextResponse.json([], {
      status: 400,
    });
  }
}
