"use client";
import React, { useEffect, useRef } from "react";
import { sendPush, setUpPush } from "../lib/notification";

const Notification = () => {
  const checkBoxRef = useRef(null);
  useEffect(() => {
    if (!("serviceWorker" in navigator)) {
      // Service Worker isn't supported on this browser, disable or hide UI.
      return;
    }

    if (!("PushManager" in window)) {
      // Push isn't supported on this browser, disable or hide UI.
      return;
    }
    /**** END feature-detect ****/

    // Push is supported.
    setUpPush(checkBoxRef.current);
  }, []);

  return (
    <div>
      <label>Get notification : </label>
      <input type="checkbox" name="" id="" ref={checkBoxRef} />
    </div>
  );
};

export default Notification;
