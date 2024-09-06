import axios from "axios";
import { unstable_noStore as noStore } from "next/cache";
import toast from "react-hot-toast";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_URL;

export const getEvents = async (semester_id: string) => {
  noStore();
  const res = await axios.get(`/api/events/list?semester_id=${semester_id}`);
  return res.data;
};
export const subjectEvents = async () => {
  noStore();
  const res = await axios.get(`/api/events/teach`);
  return res.data;
};

export const createEvent = async (semester_id: string, e) => {
  // console.log(e);
  let semId = null
  if(e.semesterId) semId = e.semesterId 
  else if(semester_id) semId = semester_id

  if(semId) {
    e.id = undefined;
    const event = await axios.post(
      `/api/events/insert?semester_id=${semId}`,
      e
    );
    return event;
  }
  else {
    toast.error("Currently not supported");
    throw new Error();
  }

};
export const deleteEvent = async (e) => {
  // console.log(e);
  const event = await axios.post(`/api/events/delete/${e.id}`);
  return event;
};

export const updateEvent = async (e) => {
  // console.log(e);
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
