import React from "react";

export default function Layout({ children }) {
  return (
    <div className=" min-h-screen flex items-center px-2 justify-center">
      {children}
    </div>
  );
}
