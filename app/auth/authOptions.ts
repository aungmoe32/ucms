import { db } from "@/lib/drizzle/db";
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

        if (email == "pogoka9717@maxturns.com" && password == "1234")
          return {
            id: "1234",
            name: "John Doe",
            email: "pogoka9717@maxturns.com",
            role: "admin",
          };
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token }) {
      // console.log(token);
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
};

export default authOptions;
