import {
  BookCheck,
  CalendarDays,
  Home,
  ShoppingCart,
  UserCheck,
  Users,
} from "lucide-react";

export const TeacherLinks = [
  {
    text: "Dashboard",
    path: "/dashboard",
    icon: <Home className="h-4 w-4" />,
  },
  {
    text: "Teachers",
    path: "/teachers",
    icon: <UserCheck className="h-4 w-4" />,
  },
  {
    text: "Students",
    path: "/students",
    icon: <Users className="h-4 w-4" />,
  },
  {
    text: "Events",
    path: "/events",
    icon: <CalendarDays className="h-4 w-4" />,
  },
  {
    text: "Results",
    path: "/results",
    icon: <BookCheck className="h-4 w-4" />,
  },
];
