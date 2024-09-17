import { NextRequest, NextResponse } from "next/server";
import { getNotiSubs } from "../../insert/route";
import { deleteEvent } from "@/lib/resources/events";
import { sendPush } from "@/lib/resources/server-noti";

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
    console.error(e);
    return NextResponse.json([], {
      status: 400,
    });
  }
}
