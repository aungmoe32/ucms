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
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        // first signin
        token.user_id = user.id;
        token.role = user.role;
        token.name = user.name;
        token.email = user.email;
        token.gender = user.gender;
        if (user.role == "student") token.semester = user.student.semester;
      }
      if (trigger == "update") {
        const user = await db.query.users.findFirst({
          where: () => eq(users.id, token.user_id),
        });
        token.name = user.name;
        token.email = user.email;
        token.gender = user.gender;
        // console.log("udpated", user);
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
        session.user.semester = token.semester;
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
