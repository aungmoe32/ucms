import authOptions from "@/app/auth/authOption";
import { db } from "@/lib/drizzle/db";
import { noti_semester, noti_subscriptions } from "@/lib/drizzle/schema";
import { saveSubscriptionToDatabase } from "@/lib/resources/server-noti";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const subscription = await request.json();
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json([], {
      status: 400,
    });
  }

  const userId = session.user.user_id;
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
      student: {
        with: {
          semester: true,
        },
      },
    },
  });

  if (!user) return;

  /**** START save-sub-api-save-subscription ****/
  try {
    if (user.teacher) {
      const noti = await db
        .insert(noti_subscriptions)
        .values({
          value: subscription,
        })
        .returning({
          id: noti_subscriptions.id,
        });
      const ps = user.teacher.teacher_subject.map((ts) => {
        const semesterId = ts.subject.semester.id;
        return db.insert(noti_semester).values({
          noti_id: noti[0].id,
          semester_id: semesterId,
        });
      });
      await Promise.all(ps);
    } else {
      const noti = await db
        .insert(noti_subscriptions)
        .values({
          value: subscription,
        })
        .returning({
          id: noti_subscriptions.id,
        });
      await db.insert(noti_semester).values({
        noti_id: noti[0].id,
        semester_id: user.student?.semester.id!,
      });
      // const id = await saveSubscriptionToDatabase(
      //   subscription,
      //   user.student?.semester.id
      // );
    }
    // console.log(id);

    return NextResponse.json({ success: 1 });
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      {},
      {
        status: 400,
      }
    );
  }
}
