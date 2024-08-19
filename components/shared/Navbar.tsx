"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React from "react";
import { IoMdNotificationsOutline } from "react-icons/io";

const Navbar = () => {
  const pathname = usePathname();

  const title = () => {
    if (pathname.startsWith("/teacher")) {
      return "Teacher";
    } else {
      return "Student";
    }
  };

  // console.log(pathname);

  return (
    <nav className=" px-4  bg-white shadow-gray-300 shadow-sm  w-full h-24 flex items-center justify-between">
      <div className="font-bold text-3xl">{title()}</div>
      <div className="flex flex-row gap-5 items-center">
        <button>
          <IoMdNotificationsOutline size={30} />
        </button>
        <div className="flex gap-3 flex-row items-center px-3 border-gray-400 border-l-[1px]">
          <div>
            <p className="font-semibold">Golden Cat</p>
          </div>

          <Image
            src="https://image.petmd.com/files/styles/978x550/public/2023-09/how-smart-are-cats.jpg"
            width={60}
            height={60}
            className="rounded-full h-10 w-10 overflow-hidden object-cover"
            alt="profile image"
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
