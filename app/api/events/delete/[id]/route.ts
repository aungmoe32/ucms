import { NextRequest, NextResponse } from "next/server";
import { getNotiSubs } from "../../insert/route";
import { deleteEvent } from "@/lib/resources/events";
import { sendPush } from "@/lib/resources/server-noti";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOption";
import { isTeacher } from "@/lib/api/validate";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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
