import axios from "axios";
import { PageSize } from "../constant/constants";
axios.defaults.baseURL = process.env.NEXT_PUBLIC_URL;

export const studentList = async (
  { pageParam },
  search: string,
  major: string,
  year: string,
  term: string
) => {
  const pageSize = PageSize;
  try {
    const res = await axios.get<ResponseType>(
      "/api/students?page=" +
        pageParam +
        "&search=" +
        search +
        "&major=" +
        major +
        "&year=" +
        year +
        "&term=" +
        term
    );
    const hasNext = pageParam * pageSize < res.data.total;
    return {
      nextPage: hasNext ? pageParam + 1 : undefined,
      previousPage: pageParam > 1 ? pageParam - 1 : undefined,
      users: res.data.data,
      total: res.data.total,
    };
  } catch (e) {
    console.log(e);
    throw e;
    // console.log("tr list", res.data);
  }
};

export const deleteStudent = async (id) => {
  const res = await axios.delete("/api/students/" + id);
  return res.data;
};

export const createStudent = async (data) => {
  const res = await axios.post("/api/students", data);
  return res;
};

export const updateStudent = async (id, data) => {
  const res = await axios.patch("/api/students/" + id, data);
  return res.data;
};

export const updateProfile = async (data) => {
  const res = await axios.patch("/api/profile/student", data);
  return res.data;
};
