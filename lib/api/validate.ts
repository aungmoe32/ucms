export const isTeacher = (session) => {
  return session.user.role == "teacher";
};

export const isStudent = (session) => {
  return session.user.role == "student";
};
