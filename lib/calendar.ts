import { calendar_v3, google } from "googleapis";
const { v4: uuidv4 } = require("uuid");

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

export const getEvents = async (): Promise<calendar_v3.Schema$Event[]> => {
  const resp = await calendar.events.list({
    calendarId:
      "73ed6d2c43f31ff9434e0209629561870e493ce27d4e42cf59ba924ced151197@group.calendar.google.com",
  });

  // console.log(resp.data.items);
  return resp.data.items || [];
};

export const deleteEvent = async (eventId: string) => {
  const resp = await calendar.events.delete({
    eventId,
    calendarId:
      "73ed6d2c43f31ff9434e0209629561870e493ce27d4e42cf59ba924ced151197@group.calendar.google.com",
  });
  return resp.data;
};

export const updateEvent = async (
  eventId: string,
  requestBody: calendar_v3.Schema$Event
) => {
  const resp = await calendar.events.patch({
    eventId,
    calendarId:
      "73ed6d2c43f31ff9434e0209629561870e493ce27d4e42cf59ba924ced151197@group.calendar.google.com",
    requestBody,
  });
  return resp.data;
};
export const insertEvent = async (requestBody: calendar_v3.Schema$Event) => {
  const resp = await calendar.events.insert({
    calendarId:
      "73ed6d2c43f31ff9434e0209629561870e493ce27d4e42cf59ba924ced151197@group.calendar.google.com",
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
    calendarId:
      "73ed6d2c43f31ff9434e0209629561870e493ce27d4e42cf59ba924ced151197@group.calendar.google.com",
  });
  console.log(watchResponse);
}
