import axios from "axios";
import { unstable_noStore as noStore } from "next/cache";
import { PageSize } from "../constant/constants";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_URL;
export type ResponseType = {
  total: number;
  users: Array<{
    id: string;
    name: string;
    role: string;
    major: string;
    gender: string;
    teacher: {
      id: string;
      experience: number;
      userId: string;
    };
    subjects: Array<{
      id: string;
      name: string;
      code: string;
      semesterId: string;
      semester: {
        id: string;
        term: string;
        major: string;
        year: string;
      };
    }>;
  }>;
};

export const createTeacher = async (data) => {
  const res = await axios.post("/api/teachers", data);
  return res;
};

export const updateTeacher = async (id, data) => {
  const res = await axios.patch("/api/teachers/" + id, data);
  return res.data;
};

export const deleteTeacher = async (id) => {
  const res = await axios.delete("/api/teachers/" + id);
  return res.data;
};

export const teacherList = async (
  { pageParam },
  search: string,
  major: string,
  year: string,
  term: string
) => {
  const pageSize = PageSize;
  try {
    const res = await axios.get<ResponseType>(
      "/api/teachers?page=" +
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
      teachers: res.data.users,
      total: res.data.total,
    };
  } catch (e) {
    console.log(e);
    throw e;
    // console.log("tr list", res.data);
  }
};
