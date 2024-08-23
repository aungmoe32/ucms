"use client";
import React, { useEffect, useRef } from "react";
import { sendPush, setUpPush } from "../../lib/notification";

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
    <div className="flex justify-end items-center my-2">
      <label className="mx-2 text-sm font-medium text-gray-900 dark:text-gray-300">
        Notification
      </label>
      <input
        type="checkbox"
        value=""
        ref={checkBoxRef}
        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
      />
    </div>
  );
};

export default Notification;
