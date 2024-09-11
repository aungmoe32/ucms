import { ReactNode } from "react";
import { RxDashboard } from "react-icons/rx";
import { BsFillPeopleFill } from "react-icons/bs";
import { PiStudent } from "react-icons/pi";
import { BsTable } from "react-icons/bs";
import { SlBookOpen } from "react-icons/sl";
import { BiMessageRoundedError } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { BiLogOut } from "react-icons/bi";
import { LuPenSquare } from "react-icons/lu";
import { GrGroup } from "react-icons/gr";

export interface MenuItemType {
  name: string;
  icon: ReactNode;
  teacher: {
    link: string;
  } | null;
  student: {
    link: string;
  } | null;
}

export const menu_items: MenuItemType[] = [
  {
    name: "Dashboard",
    icon: <RxDashboard size={20} />,
    teacher: { link: "/teacher" },
    student: { link: "/student" },
  },
  {
    name: "Student",
    icon: <BsFillPeopleFill size={20} />,
    teacher: { link: "/teacher/student" },
    student: null,
  },
  {
    name: "Teacher",
    icon: <PiStudent size={25} />,
    teacher: { link: "/teacher/teacher" },
    student: null,
  },
  {
    name: "Timetable",
    icon: <BsTable size={20} />,
    teacher: { link: "/teacher/timetable" },
    student: null,
  },
  {
    name: "Classroom",
    icon: <GrGroup size={20} />,
    teacher: null,
    student: { link: "/student/classroom" },
  },
  {
    name: "Exam",
    icon: <LuPenSquare size={20} />,
    teacher: { link: "/teacher/exam" },
    student: { link: "/student/exam" },
  },
  {
    name: "Result",
    icon: <SlBookOpen size={20} />,
    teacher: { link: "/teacher/result" },
    student: { link: "/student/result" },
  },
];

export const account_menu_items: MenuItemType[] = [
  {
    name: "Help and support",
    icon: <BiMessageRoundedError size={25} />,
    teacher: { link: "/" },
    student: { link: "/" },
  },
  {
    name: "Profile",
    icon: <CgProfile size={23} />,
    teacher: { link: "/teacher/profile" },
    student: { link: "/student/profile" },
  },
  {
    name: "Logout",
    icon: <BiLogOut size={25} />,
    teacher: { link: "/teacher/logout" },
    student: { link: "/student/logout" },
  },
];

export const majorColor = {
  English: "bg-blue-100",
  Math: "bg-red-200",
  Web: "bg-yellow-100",
  "C++": "bg-green-100",
  Dld: "bg-orange-100",
  Dc: "bg-violet-200",
  Be: "bg-pink-100",
  Library: "bg-lime-100",
};

export const Subjects = [
  "Math",
  "English",
  "C++",
  "Web",
  "Dld",
  "Dc",
  "Be",
  "Library",
];

export type TimetableDataType = {
  time: string;
  year: number;
  term: string;
  majors: {
    id: number;
    day: string;
    subject: string;
    code: string;
    status: string;
  }[];
};

export const timetableData: TimetableDataType[] = [
  {
    time: "9:00",
    year: 2,
    term: "Second",
    majors: [
      {
        id: 1,
        day: "Mon",
        subject: "English",
        code: "E-22011",
        status: "Present",
      },
      {
        id: 2,
        day: "Tue",
        subject: "Math",
        code: "EM-22088",
        status: "Present",
      },
      {
        id: 3,
        day: "Wed",
        subject: "Web",
        code: "IT-22025",
        status: "Present",
      },
      {
        id: 4,
        day: "Thu",
        subject: "C++",
        code: "IT-22015",
        status: "Present",
      },
      {
        id: 5,
        day: "Fri",
        subject: "Web",
        code: "IT-22025",
        status: "Present",
      },
    ],
  },
  {
    time: "10:00",
    year: 2,
    term: "Second",
    majors: [
      {
        id: 6,
        day: "Mon",
        subject: "English",
        code: "E-22011",
        status: "Present",
      },
      {
        id: 7,
        day: "Tue",
        subject: "Math",
        code: "EM-22088",
        status: "Present",
      },
      {
        id: 8,
        day: "Wed",
        subject: "Web",
        code: "IT-22025",
        status: "Present",
      },
      {
        id: 9,
        day: "Thu",
        subject: "C++",
        code: "IT-22015",
        status: "Present",
      },
      {
        id: 10,
        day: "Fri",
        subject: "Web",
        code: "IT-22025",
        status: "Present",
      },
    ],
  },
  {
    time: "11:00",
    year: 2,
    term: "Second",
    majors: [
      {
        id: 11,
        day: "Mon",
        subject: "Dld",
        code: "IT-22021",
        status: "Present",
      },
      {
        id: 12,
        day: "Tue",
        subject: "Dc",
        code: "IT-22012",
        status: "Present",
      },
      {
        id: 13,
        day: "Wed",
        subject: "Math",
        code: "EM-22088",
        status: "Present",
      },
      {
        id: 14,
        day: "Thu",
        subject: "Be",
        code: "IT-22011",
        status: "Present",
      },
      { id: 15, day: "Fri", subject: "Library", code: "", status: "Present" },
    ],
  },
  {
    time: "1:00",
    year: 2,
    term: "Second",
    majors: [
      {
        id: 16,
        day: "Mon",
        subject: "Dld",
        code: "IT-22021",
        status: "Present",
      },
      {
        id: 17,
        day: "Tue",
        subject: "Dc",
        code: "IT-22012",
        status: "Present",
      },
      {
        id: 18,
        day: "Wed",
        subject: "Math",
        code: "EM-22088",
        status: "Present",
      },
      {
        id: 19,
        day: "Thu",
        subject: "Be",
        code: "IT-22011",
        status: "Present",
      },
      { id: 20, day: "Fri", subject: "Library", code: "", status: "Present" },
    ],
  },
  {
    time: "2:00",
    year: 2,
    term: "Second",
    majors: [
      {
        id: 21,
        day: "Mon",
        subject: "Dc",
        code: "IT-22012",
        status: "Present",
      },
      {
        id: 22,
        day: "Tue",
        subject: "C++",
        code: "IT-22015",
        status: "Present",
      },
      {
        id: 23,
        day: "Wed",
        subject: "Dld",
        code: "IT-22021",
        status: "Present",
      },
      {
        id: 24,
        day: "Thu",
        subject: "Math",
        code: "EM-22088",
        status: "Present",
      },
      {
        id: 25,
        day: "Fri",
        subject: "Be",
        code: "IT-22011",
        status: "Present",
      },
    ],
  },
  {
    time: "3:00",
    year: 2,
    term: "Second",
    majors: [
      {
        id: 26,
        day: "Mon",
        subject: "Dc",
        code: "IT-22012",
        status: "Present",
      },
      {
        id: 27,
        day: "Tue",
        subject: "C++",
        code: "IT-22015",
        status: "Present",
      },
      {
        id: 28,
        day: "Wed",
        subject: "Dld",
        code: "IT-22021",
        status: "Present",
      },
      {
        id: 29,
        day: "Thu",
        subject: "Math",
        code: "EM-22088",
        status: "Present",
      },
      {
        id: 30,
        day: "Fri",
        subject: "Be",
        code: "IT-22011",
        status: "Present",
      },
    ],
  },
];
