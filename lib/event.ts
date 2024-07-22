import axios from "axios";

export const posts = async () => {
  return axios.get("/api/events/list").then((res) => res.data);
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
