import { deleteEvent, updateEvent } from "@/lib/calendar";
import { sendPush } from "@/lib/server-noti";
import { NextRequest, NextResponse } from "next/server";
import { getNotiSubs } from "../../insert/route";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // const data = await request.json();
    //   console.log(data);
    const calendar_id = request.nextUrl.searchParams.get("calendar_id");

    if (!calendar_id) throw new Error();
    await deleteEvent(params.id, calendar_id!);
    const subs = await getNotiSubs(calendar_id);
    await sendPush(
      {
        title: "Event is deleted",
        body: "",
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
