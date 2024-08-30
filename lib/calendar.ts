import { calendar_v3, google } from "googleapis";
const { v4: uuidv4 } = require("uuid");

import { unstable_noStore as noStore } from "next/cache";
const credential = JSON.parse(
  Buffer.from(process.env.GOOGLE_SERVICE_KEY, "base64").toString()
);
const auth = new google.auth.GoogleAuth({
  // keyFile: "service-account.json",
  credentials: {
    project_id: credential.project_id,
    client_id: credential.client_id,
    client_email: credential.client_email,
    private_key: credential.private_key,
  },
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

export const getEvents = async (
  calendar_id
): Promise<calendar_v3.Schema$Event[]> => {
  noStore();
  const resp = await calendar.events.list({
    calendarId: calendar_id,
    maxResults: 100,
  });

  // console.log("items ", resp.data);
  return resp.data.items || [];
};

export const deleteEvent = async (eventId: string, calendar_id: string) => {
  const resp = await calendar.events.delete({
    eventId,
    calendarId: calendar_id,
  });
  return resp.data;
};

export const updateEvent = async (
  eventId: string,
  calendar_id: string,
  requestBody: calendar_v3.Schema$Event
) => {
  const resp = await calendar.events.patch({
    eventId,
    calendarId: calendar_id,
    requestBody,
  });
  return resp.data;
};
export const insertEvent = async (
  calendar_id: string,
  requestBody: calendar_v3.Schema$Event
) => {
  // console.log(calendar_id, requestBody);
  const resp = await calendar.events.insert({
    calendarId: calendar_id,
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
