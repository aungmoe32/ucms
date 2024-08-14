import axios from "axios";
import { unstable_noStore as noStore } from "next/cache";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_URL;

export const createTeacher = async (data) => {
  const res = await axios.post("/api/teachers", data);
  return res;
};
