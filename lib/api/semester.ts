import axios from "axios";
import { PageSize } from "../constant/constants";
axios.defaults.baseURL = process.env.NEXT_PUBLIC_URL;

export const getSemesters = async () => {
  const res = await axios.get("/api/semesters");
  return res.data;
};
