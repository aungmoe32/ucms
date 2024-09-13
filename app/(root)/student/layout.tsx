import { StudentLinks, TeacherLinks } from "@/components/Links";
import Nav from "@/components/Nav";
import React from "react";

export default function Layout({ children }) {
  return <Nav links={StudentLinks}>{children}</Nav>;
}
