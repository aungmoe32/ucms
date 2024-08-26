import { db } from "@/lib/drizzle/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
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

  if (!user) return NextResponse.json({});

  return NextResponse.json(user);
}
