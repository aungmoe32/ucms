import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import StudentTimetable from "@/components/shared/StudentTimetable";
import { FaSearch } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { FiDownload } from "react-icons/fi";
import Link from "next/link";

const page = () => {
  return (
    <main className="p-4">
      {/* Timetable Title */}
      <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-4">
        <div className="flex flex-row items-center gap-4 mr-4">
          <p className="text-2xl font-semibold">Timetable</p>
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

      {/* Timetable */}
      <div className="p-2 mt-4">
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 justify-between">
          <div>
            <p className="font-semibold text-2xl">IT / 2 Year / 2 Term</p>
          </div>
          <div className="flex flex-row items-center gap-4">
            <Link
              href="/teacher/timetable/create"
              className="max-w-[200px] min-w-[175px] h-[49px] flex flex-row items-center gap-2 border-primary border-[3px] text-primary font-semibold p-3 rounded-md"
            >
              <FaPlus size={20} />
              Create Timetable
            </Link>
            <button className="max-w-[200px] px-4 flex flex-row items-center gap-3 bg-primary text-white font-semibold p-[13px] rounded-md">
              <FiDownload size={24} />
              Download
            </button>
          </div>
        </div>
        <StudentTimetable role="teacher" />
      </div>
    </main>
  );
};

export default page;
