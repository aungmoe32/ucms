import { db } from "@/lib/drizzle/db";
import { compare } from "bcrypt-ts";
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
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.user_id = user.id;
      }
      // console.log("first signin ", user);
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.role = token.role;
        session.user.user_id = token.user_id;
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
