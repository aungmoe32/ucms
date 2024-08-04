import { calendar_v3, google } from "googleapis";
const { v4: uuidv4 } = require("uuid");

import { unstable_noStore as noStore } from "next/cache";

const auth = new google.auth.GoogleAuth({
  keyFile: "service-account.json",
  scopes: [
    "https://www.googleapis.com/auth/userinfo#email",
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/calendar",
  ], // Adjust scopes as needed,
});

google.options({
  auth,
});

const calendar = google.calendar("v3");

const CalenderID =
  "3d93cb1ef9e3fbbd6e0a9a685c474695ee7ac02c6efccb7a4400b716872a55d5@group.calendar.google.com";

export const getEvents = async (): Promise<calendar_v3.Schema$Event[]> => {
  noStore();
  const resp = await calendar.events.list({
    calendarId: CalenderID,
    maxResults: 100,
  });

  // console.log("items ", resp.data);
  return resp.data.items || [];
};

export const deleteEvent = async (eventId: string) => {
  const resp = await calendar.events.delete({
    eventId,
    calendarId: CalenderID,
  });
  return resp.data;
};

export const updateEvent = async (
  eventId: string,
  requestBody: calendar_v3.Schema$Event
) => {
  const resp = await calendar.events.patch({
    eventId,
    calendarId: CalenderID,
    requestBody,
  });
  return resp.data;
};
export const insertEvent = async (requestBody: calendar_v3.Schema$Event) => {
  const resp = await calendar.events.insert({
    calendarId: CalenderID,
    requestBody,
  });
  return resp.data;
};

export async function wachEvent() {
  const watchResponse = await calendar.events.watch({
    resource: {
      id: uuidv4(),
      type: "web_hook",
      address: `https://modern-opossum-singular.ngrok-free.app/api/noti`, // Expose localhost using a secure tunnel
      token: "31ff9434e0209629561870e493ce27d4",
    },
    calendarId: CalenderID,
  });
  console.log(watchResponse);
}
