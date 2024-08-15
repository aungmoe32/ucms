import axios from "axios";
import { unstable_noStore as noStore } from "next/cache";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_URL;
export type ResponseType = {
  id: string;
  user: {
    id: string;
    name: string;
    role: string;
    major: string;
    gender: string;
    image: string;
  };
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

export const createTeacher = async (data) => {
  const res = await axios.post("/api/teachers", data);
  return res;
};

export const teacherList = async () => {
  const res = await axios.get<ResponseType[]>("/api/teachers");
  return res.data;
};
