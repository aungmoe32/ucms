import { eq } from "drizzle-orm";
import { db } from "../drizzle/db";
import { events } from "../drizzle/schema";

export const eventList = async (semester_id: string, eventType) => {
  // console.log(semester_id, requestBody);
  let isAll = eventType == "0" || !eventType;

  const data = await db.query.events.findMany({
    where: (tb, { eq, and }) =>
      isAll
        ? eq(tb.semesterId, semester_id)
        : and(eq(tb.semesterId, semester_id), eq(tb.eventTypeId, eventType)),
    with: {
      subject: true,
      eventType: true,
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
      startDate: events.startDate,
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
      startDate: events.startDate,
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
