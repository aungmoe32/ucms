import axios from "axios";

export const events = async () => {
  try {
    const res = await axios.get("http://localhost:3000/api/events/list");
    return res.data;
  } catch (e) {
    console.log(e);
    return [];
  }
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
