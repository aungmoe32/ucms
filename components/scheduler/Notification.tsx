"use client";
import React, { useEffect, useRef, useState } from "react";
import { sendPush, setUpPush } from "../../lib/notification";
import { IoMdNotifications, IoMdNotificationsOff } from "react-icons/io";
import { Button } from "../ui/button";

const Notification = () => {
  const checkBoxRef = useRef(null);
  const [isChecked, setIsChecked] = useState(false);
  const [disabled, setDisabled] = useState(false);
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
    // checkBoxRef?.current?.addEventListener("change", function (event) {
    //   console.log(event.target.checked)
    //   setIsChecked(event.target.checked);
    // });
    // Push is supported.
    setUpPush(checkBoxRef.current, setIsChecked, setDisabled);
  }, []);

  const onClick = () => {
    checkBoxRef.current.checked = !isChecked;
    checkBoxRef.current?.dispatchEvent(new Event("change"));
  };

  return (
    <div className="flex justify-center items-center my-2">
      <Button variant="ghost" size="icon" onClick={onClick} disabled={disabled}>
        {isChecked ? (
          <IoMdNotifications size={25} className="text-primary" />
        ) : (
          <IoMdNotificationsOff size={25} className="text-neutral" />
        )}
      </Button>
      {/* <label className="mx-2 text-sm font-medium text-gray-900 dark:text-gray-300">
        Notification
      </label> */}
      <input
        type="checkbox"
        value=""
        ref={checkBoxRef}
        className="w-4 h-4 hidden  text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
      />
    </div>
  );
};

export default Notification;
