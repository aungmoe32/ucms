import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FaSearch } from "react-icons/fa";
import ExamCard from "@/components/shared/ExamCard";
import { FaPlus } from "react-icons/fa6";
import Link from "next/link";

const page = () => {
  return (
    <main className="p-4">
      {/* Timetable Title */}
      <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-4">
        <div className="flex flex-row items-center gap-4">
          <h2 className="text-2xl font-semibold">Exam</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <Select>
            <SelectTrigger className=" h-[50px] focus:ring-0 ring-0 shadow-sm shadow-gray-400 ">
              <SelectValue placeholder="Major" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="it">It</SelectItem>
              <SelectItem value="civil">Civil</SelectItem>
              <SelectItem value="archi">Archi</SelectItem>
              <SelectItem value="ep">Ep</SelectItem>
              <SelectItem value="ec">Ec</SelectItem>
              <SelectItem value="mc">Mc</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="h-[50px]  focus:ring-0 ring-0 shadow-sm shadow-gray-200 ">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1 Year</SelectItem>
              <SelectItem value="2">2 Year</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className=" h-[50px] focus:ring-0 ring-0 shadow-sm shadow-gray-200 ">
              <SelectValue placeholder="Term" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="first term">First</SelectItem>
              <SelectItem value="second term">Second</SelectItem>
            </SelectContent>
          </Select>
          <button className="search-button">
            <FaSearch size={18} />
            <p className="font-semibold">Search</p>
          </button>
        </div>
      </div>

      <div className="mt-8">
        {/* Guide */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 justify-between ">
          <div>
            <p className="font-semibold text-2xl">IT / 2 Year / 2 Term</p>
          </div>
          <Link
            href="/teacher/exam/create"
            className="max-w-[200px] min-w-[175px] h-[49px] flex flex-row items-center gap-2 border-primary border-[3px] text-primary font-semibold p-3 rounded-md"
          >
            <FaPlus size={20} />
            Create Exam
          </Link>
        </div>
        <div className="flex flex-row items-center gap-6 mr-2 mt-2">
          <div className="flex flex-row gap-2 items-center">
            <div className="w-3 h-3 rounded-full bg-gray-800" />
            <p className="font-semibold">Upcoming</p>
          </div>
          <div className="flex flex-row gap-2 items-center">
            <div className="w-3 h-3 rounded-full bg-primary" />
            <p className="font-semibold">Today</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mt-2 xl:h-screen lg:h-full pb-10">
          {/* Exam Card */}
          <article className="mt-6 bg-white shadow-gray-500 shadow-sm rounded-lg overflow-hidden h-full">
            <div className="bg-gray-900 p-4">
              <p className=" text-2xl text-white font-semibold">Final Exam</p>
            </div>
            <div className="p-6 space-y-6  overflow-y-scroll no-scrollbar">
              <ExamCard
                title="English 1"
                date="11 of October 2024"
                time="2:00 - 4:00 PM"
              />
              <ExamCard
                title="English 1"
                date="11 of October 2024"
                time="2:00 - 4:00 PM"
              />
            </div>
          </article>

          {/* Tuto Card */}
          <article className="mt-6 bg-white shadow-gray-500 shadow-sm rounded-lg overflow-hidden h-full">
            <div className="bg-gray-200 p-4">
              <p className=" text-2xl font-semibold">Tutorial</p>
            </div>
            <div className=" p-6 space-y-6 overflow-y-scroll no-scrollbar">
              <ExamCard
                title="English 1"
                date="11 of October 2024"
                time="2:00 - 4:00 PM"
              />
              <ExamCard
                title="English 1"
                date="11 of October 2024"
                time="2:00 - 4:00 PM"
              />
            </div>
          </article>

          {/* Assignment Card */}
          <article className="mt-6 bg-white shadow-gray-500 shadow-sm rounded-lg overflow-hidden h-full">
            <div className="bg-gray-200 p-4">
              <p className=" text-2xl font-semibold">Assignment</p>
            </div>
            <div className="p-6 space-y-6 overflow-y-scroll no-scrollbar">
              <ExamCard
                title="English 1"
                date="11 of October 2024"
                time="2:00 - 4:00 PM"
              />
              <ExamCard
                title="English 1"
                date="11 of October 2024"
                time="2:00 - 4:00 PM"
              />
            </div>
          </article>
        </div>
      </div>
    </main>
  );
};

export default page;
