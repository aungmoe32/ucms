import axios from "axios";
import { unstable_noStore as noStore } from "next/cache";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_URL;

export const events = async (calendar_id: string) => {
  noStore();
  const res = await axios.get(`/api/events/list?calendar_id=${calendar_id}`);
  return res.data;
};

export const createEvent = async (calendar_id: string, e) => {
  const event = await axios.post(
    `/api/events/insert?calendar_id=${calendar_id}`,
    e
  );
  return event;
};
export const deleteEvent = async (calendar_id: string, e) => {
  const event = await axios.post(
    `/api/events/delete/${e.id}?calendar_id=${calendar_id}`
  );
  return event;
};

export const updateEvent = async (calendar_id: string, e) => {
  const event = await axios.post(
    `/api/events/patch/${e.id}?calendar_id=${calendar_id}`,
    e
  );
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
