import withAuth from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized({ token, req: { nextUrl } }) {
      console.log("authorized ", nextUrl.pathname);
      if (nextUrl.pathname == "/teacher") {
        return token?.role === "teacher";
      }
      if (nextUrl.pathname == "/student") {
        return token?.role === "student";
      }
      return Boolean(token);
    },
  },
  
});

export const config = {
  matcher: ["/absproxy/3000/protected", "/protected"],
};
