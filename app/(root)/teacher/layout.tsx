import { TeacherLinks } from "@/components/Links";
import Nav from "@/components/Nav";
import React from "react";

export default function Layout({ children }) {
  return <Nav links={TeacherLinks}>{children}</Nav>;
}
