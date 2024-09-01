import { insertEvent } from "@/lib/calendar";
import { db } from "@/lib/drizzle/db";
import { sendPush } from "@/lib/server-noti";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  //   console.log(data);
  try {
    const data = await request.json();
    const calendar_id = request.nextUrl.searchParams.get("calendar_id");
    if (!calendar_id) throw new Error();
    const event = await insertEvent(calendar_id!, data);

    // console.log(subs);
    const subs = await getNotiSubs(calendar_id);

    await sendPush(
      {
        title: "New Event Created",
        body: event.summary,
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

export const getNotiSubs = async (calendar_id: string) => {
  const sem = await db.query.semesters.findFirst({
    where: (tb, funcs) => funcs.eq(tb.calendar_id, calendar_id),
    with: {
      noti_semester: {
        with: {
          noti: true,
        },
      },
    },
  });

  const subs = sem?.noti_semester.map((ns) => {
    return ns.noti;
  });
  return subs;
};
