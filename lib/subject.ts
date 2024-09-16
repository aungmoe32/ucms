import axios from "axios";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_URL;

export const getSubjects = async () => {
  const res = await axios.get(`/api/subjects`);
  // console.log("subjects api", res.data);
  return res.data;
};

export const createSubject = async (data) => {
  const event = await axios.post("/api/subjects", data);
  return event;
};