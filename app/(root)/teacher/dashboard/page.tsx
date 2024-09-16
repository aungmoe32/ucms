import Link from "next/link";
import {
  Bell,
  CircleUser,
  Home,
  LineChart,
  Menu,
  Package,
  Package2,
  Search,
  ShoppingCart,
  Users,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import TeacherTimelinePrefetch from "@/components/scheduler/Timetable/teacher/TeacherTimelinePrefetch";
import { Suspense } from "react";
import Skeleton from "@/components/Skeleton";

export default function Dashboard() {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>
            <span className=" font-bold text-2xl">Today's Timeline</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<Skeleton height={"20rem"} />}>
            <TeacherTimelinePrefetch></TeacherTimelinePrefetch>
          </Suspense>
        </CardContent>
      </Card>
    </>
  );
}
