import axios from "axios";
import { unstable_noStore as noStore } from "next/cache";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_URL;

export const getSubjects = async (semester_id) => {
  noStore();
  const res = await axios.get(`/api/subjects/${semester_id}`);
  return res.data;
};

// export const subjects = [
//   {
//     text: "Unknown",
//     id: "0",
//     color: "#ef4444",
//   },
//   {
//     text: "Math",
//     id: "1",
//     color: "#00af2c",
//   },
//   {
//     text: "Eng",
//     id: "2",
//     color: "#56ca85",
//   },
//   {
//     text: "DLD",
//     id: "3",
//     color: "#8ecd3c",
//   },
// ];
