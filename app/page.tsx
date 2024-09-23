import { getServerSession } from "next-auth";
import React from "react";
import authOptions from "./auth/authOption";
import { signOut } from "next-auth/react";

export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <div>
      {JSON.stringify(session)}

      <div>
        {/* <button
          className="w-full text-left"
          onClick={async () => {
            const data = await signOut({
              redirect: false,
              callbackUrl: "/login",
            });
            // router.push(data.url);
          }}
        >
          Logout
        </button> */}
      </div>
    </div>
  );
}
