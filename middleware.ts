import withAuth from "next-auth/middleware";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export default withAuth((req) => {
  const nextUrl = req.nextUrl;
  const token = req.nextauth.token;
  console.log("authorized", nextUrl.pathname);
  if (
    token &&
    nextUrl.pathname.startsWith("/student") &&
    token.role != "student"
  ) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }
  if (
    token &&
    nextUrl.pathname.startsWith("/teacher") &&
    token.role != "teacher"
  ) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }
  if (token && nextUrl.pathname == "/dashboard") {
    if (token.role === "student") {
      return NextResponse.redirect(new URL("/student/timetable", req.url));
    } else {
      return NextResponse.redirect(new URL("/teacher/dashboard", req.url));
    }
  }
  // return Boolean(token);
});

export const config = {
  matcher: ["/teacher/:path*", "/student/:path*", "/dashboard"],
};
