import authOptions from "@/app/auth/authOption";
import { isTeacher } from "@/lib/api/validate";
import { db } from "@/lib/drizzle/db";
import { insertEvent } from "@/lib/resources/events";
import { sendPush } from "@/lib/resources/server-noti";
import moment from "moment";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json([], {
      status: 400,
    });
  }
  if (!isTeacher(session))
    return NextResponse.json(
      { error: "Unautorized" },
      {
        status: 400,
      }
    );
  try {
    const data = await request.json();
    const semeseter_id = request.nextUrl.searchParams.get("semester_id");
    if (!semeseter_id) throw new Error("semester_id required!");
    const event = await insertEvent(semeseter_id!, data);

    // console.log(subs);
    const subs = await getNotiSubs(semeseter_id);

    await sendPush(
      {
        title: "Title : " + event[0].title,
        body:
          "A new event created at " + moment(event[0].startDate).format("llll"),
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

export const getNotiSubs = async (semeseter_id: string) => {
  const sem = await db.query.semesters.findFirst({
    where: (tb, funcs) => funcs.eq(tb.id, semeseter_id),
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
