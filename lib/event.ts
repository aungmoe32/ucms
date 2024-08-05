import axios from "axios";

export const events = async () => {
  // try {
  //   const res = await fetch(`${process.env.URL}/api/events/list`, {
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //     },
  //     cache: "no-cache",
  //   });

  //   const events = await res.json();

  //   return events;
  // } catch (e) {
  //   console.error(e, "hee");
  //   return [];
  // }
  const res = await axios.get(`${process.env.NEXT_PUBLIC_URL}/api/events/list`);
  return res.data;
};

export const createEvent = async (e) => {
  const event = await axios.post("/api/events/insert", e);
  return event;
};
export const deleteEvent = async (e) => {
  const event = await axios.post(`/api/events/delete/${e.id}`);
  return event;
};

export const updateEvent = async (e) => {
  const event = await axios.post(`/api/events/patch/${e.id}`, e);
  return event;
};

export const formatDateTime = (date) => {
  const year = date.getUTCFullYear();
  const month = pad(date.getUTCMonth() + 1);
  const day = pad(date.getUTCDate());
  const hour = pad(date.getUTCHours());
  const minute = pad(date.getUTCMinutes());
  const second = pad(date.getUTCSeconds());
  return `${year}${month}${day}T${hour}${minute}${second}Z`;
};

function pad(i) {
  return i < 10 ? `0${i}` : `${i}`;
}
