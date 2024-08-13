"use client";
import Image from "next/image";
import React from "react";
import { account_menu_items, menu_items, MenuItemType } from "@/lib/constant";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Menu = ({ role }: { role: "teacher" | "student" }) => {
  const pathname = usePathname();

  return (
    <section className="fixed w-[300px] h-full bg-primary">
      {/* Menu Header */}
      <div className="flex flex-row items-center gap-5 p-5">
        <Image
          src="/images/Hmawbi-logo.png"
          alt="Hmawbi logo"
          width={40}
          height={40}
        />
        <div className="text-white flex flex-col gap-1">
          <h3 className="font-semibold text-lg">
            Technological University (Hmawbi)
          </h3>
        </div>
      </div>

      <div className="divider" />

      {/* Menu Body */}
      <div className="h-[85dvh] overflow-y-scroll no-scrollbar">
        {/* Menu Items */}
        <div className="px-10 pt-8">
          <p className="text-white font-thin text-sm">MENU</p>
          {menu_items.map((menu_item: any, index) => {
            return (
              <div key={index}>
                {menu_item[role] && (
                  <Link
                    href={menu_item[role].link}
                    key={index}
                    className={`menu-item-container ${
                      pathname === menu_item[role].link
                        ? "bg-white bg-opacity-10"
                        : ""
                    }`}
                  >
                    <div className="text-white flex flex-row items-center gap-3 ">
                      <div>{menu_item.icon}</div>
                      <h3 className="font-semibold text-base">
                        {menu_item.name}
                      </h3>
                    </div>
                  </Link>
                )}
              </div>
            );
          })}
        </div>

        {/* Account Items */}
        <div className="px-10 pt-4">
          <p className="text-white font-thin text-sm">ACCOUNT</p>
          {account_menu_items.map((menu_item: any, index) => (
            <Link
              href={menu_item[role].link}
              key={index}
              className="menu-item-container"
            >
              <div className="text-white flex flex-row items-center gap-3">
                <div>{menu_item.icon}</div>
                <h3 className="font-semibold text-base">{menu_item.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Menu;
