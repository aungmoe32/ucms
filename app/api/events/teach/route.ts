import {
  getEvents,
  getSubjectEvents,
  insertEvent,
} from "@/lib/resources/calendars";
import { db } from "@/lib/drizzle/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const userId = process.env.USER_ID;
    const user = await db.query.users.findFirst({
      where: (table, { and, eq }) => eq(table.id, userId!),
      columns: {
        password: false,
      },
      with: {
        teacher: {
          with: {
            teacher_subject: {
              with: {
                subject: {
                  with: {
                    semester: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!user?.teacher?.teacher_subject.length) return NextResponse.json([]);

    const events = await getSubjectEvents(
      user.teacher.teacher_subject.map((ts) => ts.subject)
    );
    return NextResponse.json(events);
  } catch (e) {
    // console.log(e);
    return NextResponse.json({ error: 1 }, { status: 400 });
  }
}

// export const dynamic = "force-dynamic";
