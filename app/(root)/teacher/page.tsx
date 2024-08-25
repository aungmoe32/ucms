import EventCalander from "@/components/shared/EventCalander";
import TotalCard from "@/components/shared/TotalCard";
import React from "react";
import { IoPeopleOutline } from "react-icons/io5";
import { PiStudent } from "react-icons/pi";
import { MdAccessTime } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import EventCard from "@/components/shared/EventCard";
import TeacherTimelineTable from "@/components/shared/TeacherTimelineTable";

const Admin = () => {
  const totalCardItems = [
    {
      title: "Total Students",
      value: 102,
      icon: <IoPeopleOutline size={28} />,
      bgColor: "bg-green-100",
    },
    {
      title: "Total Teacher",
      value: 40,
      icon: <PiStudent size={28} />,
      bgColor: "bg-pink-100",
    },
    {
      title: "Total Timeline",
      value: 5,
      icon: <MdAccessTime size={28} />,
      bgColor: "bg-red-100",
    },
  ];

  return (
    <main className="p-6 bg-gray-100">
      <h2 className="text-xl font-semibold">Overview</h2>
      <div className=" flex flex-row">
        <section className=" w-[74%] max-[1350px]:w-full h-full pr-5">
          {/* Total Card */}
          <article className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3  gap-6">
            {totalCardItems.map((item, index) => (
              <TotalCard
                key={index}
                title={item.title}
                value={item.value}
                icon={item.icon}
                bgColor={item.bgColor}
              />
            ))}
          </article>

          {/* Timeline Table */}
          <article className="mt-6 overflow-x-scroll no-scrollbar  p-6 bg-white shadow-gray-500 shadow-sm rounded-lg">
            <p className=" text-xl font-semibold">Today's Timeline</p>
            <TeacherTimelineTable />
          </article>
        </section>

        <section className="w-[26%] max-[1350px]:hidden h-full">
          {/* Event Calander */}
          <article className=" flex flex-col  ">
            <EventCalander />
          </article>

          {/* Event Card */}
          <article className="mt-4 p-4 bg-white shadow-gray-500 shadow-sm rounded-lg">
            <div className="flex flex-row justify-between items-center">
              <h2 className="text-lg font-semibold">Upcoming Events</h2>
              <button className="bg-blue-300 p-2 rounded-lg">
                <FaPlus size={20} />
              </button>
            </div>
            <div className="mt-4 flex flex-col gap-3">
              <EventCard
                title={"Water Festival"}
                date={"11 of October 2024"}
                time={"2:00 - 4:00 PM"}
              />
              <EventCard
                title={"GSI Speaking"}
                date={"23 of January 2025"}
                time={"2:00 - 4:00 PM"}
              />
            </div>
          </article>
        </section>
      </div>
    </main>
  );
};

export default Admin;
