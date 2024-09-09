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
