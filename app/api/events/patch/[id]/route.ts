import { db } from "@/lib/drizzle/db";
import { sendPush } from "@/lib/resources/server-noti";
import { NextRequest, NextResponse } from "next/server";
import { getNotiSubs } from "../../insert/route";
import { updateEvent } from "@/lib/resources/events";
import authOptions from "@/app/auth/authOption";
import { getServerSession } from "next-auth";
import { isTeacher, unauthenticated, unauthorized } from "@/lib/api/validate";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) return unauthenticated();
  if (!isTeacher(session)) return unauthorized();
  try {
    const data = await request.json();
    const event = await updateEvent(params.id, data);
    // console.log(event);
    let subs = await getNotiSubs(event.semesterId);
    subs = [...new Map(subs.map((sub) => [sub.id, sub])).values()];
    await sendPush(
      {
        title: "Title : " + event.title,
        body: "An event is updated.",
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
