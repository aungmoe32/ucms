import {
  BookCheck,
  CalendarClock,
  CalendarDays,
  Home,
  ShoppingCart,
  UserCheck,
  Users,
} from "lucide-react";

export const TeacherLinks = [
  {
    text: "Dashboard",
    path: "/teacher/dashboard",
    icon: <Home className="h-4 w-4" />,
  },
  {
    text: "Timetables",
    path: "/teacher/timetable",
    icon: <CalendarClock className="h-4 w-4" />,
  },
  {
    text: "Teachers",
    path: "/teacher/teachers",
    icon: <UserCheck className="h-4 w-4" />,
  },
  {
    text: "Students",
    path: "/teacher/students",
    icon: <Users className="h-4 w-4" />,
  },
  {
    text: "Events",
    path: "/teacher/events",
    icon: <CalendarDays className="h-4 w-4" />,
  },
  {
    text: "Results",
    path: "/teacher/results",
    icon: <BookCheck className="h-4 w-4" />,
  },
];
export const StudentLinks = [
  {
    text: "Timetable",
    path: "/student/timetable",
    icon: <CalendarClock className="h-4 w-4" />,
  },
  {
    text: "Events",
    path: "/student/events",
    icon: <CalendarDays className="h-4 w-4" />,
  },
];
