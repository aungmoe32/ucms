import { NextResponse } from "next/server";

export const isTeacher = (session) => {
  return session.user.role == "teacher";
};

export const isStudent = (session) => {
  return session.user.role == "student";
};

export const unauthenticated = () => {
  return NextResponse.json(
    { error: "Unauthenticated!" },
    {
      status: 400,
    }
  );
};

export const unauthorized = () => {
  return NextResponse.json(
    { error: "Unautorized" },
    {
      status: 400,
    }
  );
};
