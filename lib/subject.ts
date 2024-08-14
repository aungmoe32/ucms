import axios from "axios";
import { unstable_noStore as noStore } from "next/cache";

// axios.defaults.baseURL = process.env.NEXT_PUBLIC_URL;

export const getSubjects = async () => {
  noStore();
  const res = await axios.get(`/api/subjects`);
  console.log("subjects api", res.data);
  return res.data;
};
