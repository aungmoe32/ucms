"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const NavBar = () => {
  return (
    <div>
      <AuthStatus></AuthStatus>
    </div>
  );
};

const AuthStatus = () => {
  const { status, data: session } = useSession();

  if (status === "loading") return <div>loading...</div>;

  if (status === "unauthenticated")
    return (
      <Link className="nav-link" href="/api/auth/signin">
        Login
      </Link>
    );

  return (
    <div>
      {JSON.stringify(session)}
      <br />
      <button
        onClick={() =>
          signOut({
            redirect: false,
          })
        }
      >
        logout
      </button>
    </div>
  );
};

export default NavBar;
