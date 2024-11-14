import withAuth from "next-auth/middleware";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export default withAuth(
  (req) => {
    // this function runs if authenticated
    // https://github.com/nextauthjs/next-auth/discussions/4882

    const nextUrl = req.nextUrl;
    const token = req.nextauth.token;
    console.log("authorized", nextUrl.pathname);
    if (nextUrl.pathname.startsWith("/student") && token.role != "student") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    if (nextUrl.pathname.startsWith("/teacher") && token.role != "teacher") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    if (nextUrl.pathname.startsWith("/dashboard")) {
      if (token.role === "student") {
        return NextResponse.redirect(new URL("/student/timetable", req.url));
      } else {
        console.log("path");
        return NextResponse.redirect(new URL("/teacher/dashboard", req.url));
      }
    }
    if (nextUrl.pathname == "/timetable") {
      if (token.role === "student") {
        return NextResponse.redirect(new URL("/student/timetable", req.url));
      } else {
        return NextResponse.redirect(new URL("/teacher/timetable", req.url));
      }
    }
  },
  {
    pages: {
      signIn: "/login",
    },
  }
);

export const config = {
  matcher: ["/teacher/:path*", "/student/:path*", "/dashboard", "/timetable"],
};
