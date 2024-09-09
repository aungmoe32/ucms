import axios from "axios";
import { unstable_noStore as noStore } from "next/cache";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_URL;

export const createSubject = async (data) => {
  const event = await axios.post("/api/subjects", data);
  return event;
};
