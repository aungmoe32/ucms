import axios from "axios";

const url = "http://localhost:3000";

export const posts = async () => {
  const path = `${url}/api/events/list`;
  // const url = baseUrl + path;

  //   console.log("fettch posts");
  return axios.get(path).then((res) => res.data);
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
