// "use client";
import React from "react";
import delay from "delay";
import { isServer } from "@tanstack/react-query";

const Server = () => {
  console.log("Server", isServer);
  // await delay(3000);
  return <div>server</div>;
};

export default Server;
