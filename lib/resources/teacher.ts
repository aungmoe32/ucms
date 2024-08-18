import axios from "axios";
import { unstable_noStore as noStore } from "next/cache";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_URL;
export type ResponseType = {
  total: number;
  users: Array<{
    id: string;
    name: string;
    role: string;
    major: string;
    gender: string;
    image: string;
    createdAt: string;
    teacher: {
      id: string;
      experience: number;
      teacher_subject: Array<{
        teacher_id: string;
        subject_id: string;
        subject: {
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
        };
      }>;
    };
  }>;
};

export const createTeacher = async (data) => {
  const res = await axios.post("/api/teachers", data);
  return res;
};

export const teacherList = async ({ pageParam }) => {
  const pageSize = 3;
  const res = await axios.get<ResponseType>("/api/teachers?page=" + pageParam);
  const hasNext = pageParam * pageSize < res.data.total;
  return {
    nextPage: hasNext ? pageParam + 1 : undefined,
    previousPage: pageParam > 1 ? pageParam - 1 : undefined,
    teachers: res.data.users,
    total: res.data.total,
  };
};
