import { eq } from "drizzle-orm";
import { db } from "./drizzle/db";
import { events } from "./drizzle/schema";

export const eventList = async (semester_id: string) => {
  // console.log(semester_id, requestBody);

  const data = await db.query.events.findMany({
    where: (tb, funcs) => funcs.eq(tb.semesterId, semester_id),
    with: {
      subject: true,
    },
  });
  return data;
};
export const insertEvent = async (semester_id: string, requestBody) => {
  // console.log(semester_id, requestBody);

  const data = await db
    .insert(events)
    .values({
      ...requestBody,
      // subjectId : requestBody.subject
      semesterId: semester_id,
    })
    .returning({
      title: events.title,
    });
  return data;
};

export const deleteEvent = async (eventId: string) => {
  const event = await db
    .delete(events)
    .where(eq(events.id, eventId))
    .returning({
      semesterId: events.semesterId,
      title: events.title,
    });
  return event[0];
};

export const updateEvent = async (eventId: string, requestBody: any) => {
  const event = await db
    .update(events)
    .set({
      ...requestBody,
      // title: requestBody.text,
    })
    .where(eq(events.id, eventId))
    .returning({
      title: events.title,
      semesterId: events.semesterId,
    });
  return event[0];
};
