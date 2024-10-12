import { db } from "@/lib/drizzle/db";
import { users } from "@/lib/drizzle/schema";
import { compare } from "bcrypt-ts";
import { eq } from "drizzle-orm";
import { NextAuthOptions } from "next-auth";

import CredentialsProvider from "next-auth/providers/credentials";

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, req) {
        // console.log("credentials", credentials);
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        const user = await db.query.users.findFirst({
          where: (table, funcs) => funcs.eq(table.email, email),
          with: {
            student: {
              with: {
                semester: true,
              },
            },
            teacher: {
              with: {
                teacher_subject: {
                  with: {
                    subject: {
                      with: {
                        semester: true,
                      },
                    },
                  },
                },
              },
            },
          },
        });
        if (!user) return null;

        let passwordsMatch = await compare(password, user.password!);
        if (passwordsMatch) return user;

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  // events: {
  // signOut: (token, session) => {
  // console.log(token, session);
  // },
  // },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        // first signin
        token.user_id = user.id;
        token.role = user.role;
        token.name = user.name;
        token.email = user.email;
        token.gender = user.gender;
        token.major = user.major;
        if (user.role == "student") {
          token.student = {
            semester: user.student.semester,
          };
        } else {
          token.teacher = {
            id: user.teacher.id,
            experience: user.teacher.experience,
            subjects: user.teacher.teacher_subject.map((ts) => ts.subject),
          };
        }
      }
      if (trigger == "update") {
        const user = await db.query.users.findFirst({
          where: () => eq(users.id, token.user_id),
          with: {
            student: {
              with: {
                semester: true,
              },
            },
            teacher: {
              with: {
                teacher_subject: {
                  with: {
                    subject: {
                      with: {
                        semester: true,
                      },
                    },
                  },
                },
              },
            },
          },
        });
        token.name = user.name;
        token.email = user.email;
        token.gender = user.gender;
        token.major = user.major;
        if (user.role == "student") {
          token.student = {
            semester: user.student.semester,
          };
        } else {
          token.teacher = {
            id: user.teacher.id,
            experience: user.teacher.experience,
            subjects: user.teacher.teacher_subject.map((ts) => ts.subject),
          };
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.user_id = token.user_id;
        session.user.role = token.role;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.gender = token.gender;
        session.user.major = token.major;
        session.user.semester = token.semester;
        session.user.teacher = token.teacher;
        session.user.student = token.student;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
};

export default authOptions;
