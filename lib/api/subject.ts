import axios from "axios";
import { unstable_noStore as noStore } from "next/cache";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_URL;

export const getAllSubjects = async () => {
  const res = await axios.get(`/api/subjects`);
  return res.data;
};

export const createSubject = async (data) => {
  const event = await axios.post("/api/subjects", data);
  return event;
};

export const getSubjects = async (semester_id) => {
  noStore();
  const res = await axios.get(`/api/subjects/${semester_id}`);
  return res.data;
};
