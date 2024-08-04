import React from "react";
import { CiSearch } from "react-icons/ci";
import { FaPlus } from "react-icons/fa6";
import { FiDownload } from "react-icons/fi";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import StudentTable from "@/components/shared/StudentTable";
import Link from "next/link";

const page = () => {
  return (
    <main className="p-4 bg-gray-100 min-h-screen">
      <h2 className="font-semibold text-2xl">Students</h2>
      {/* Filter Students Card */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center mt-6">
        <Select>
          <SelectTrigger className="h-[50px] focus:ring-0 ring-0 shadow-sm shadow-gray-400 ">
            <SelectValue placeholder="Year" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">1 Year</SelectItem>
            <SelectItem value="2">2 Year</SelectItem>
            <SelectItem value="3">3 Year</SelectItem>
            <SelectItem value="4">4 Year</SelectItem>
            <SelectItem value="5">5 Year</SelectItem>
            <SelectItem value="6">6 Year</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className=" h-[50px] focus:ring-0 ring-0 shadow-sm shadow-gray-400 ">
            <SelectValue placeholder="Term" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="first term">First Term</SelectItem>
            <SelectItem value="second term">Second Term</SelectItem>
          </SelectContent>
        </Select>
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
          <SelectTrigger className=" h-[50px] focus:ring-0 ring-0 shadow-sm shadow-gray-400 ">
            <SelectValue placeholder="Gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Male">Male</SelectItem>
            <SelectItem value="Female">Female</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {/* Search Student */}
      <div className="mt-8 flex flex-row justify-between items-center">
        <div className="border-[1px] bg-white max-w-[260px] flex flex-row items-center rounded-md shadow-gray-400 shadow-sm gap-2 border-gray-300 pl-2">
          <CiSearch size={25} />
          <input
            type="text"
            placeholder="Search Student"
            className="w-full placeholder-gray-500 p-3 border-r-[2px] border-gray-200  focus:outline-none"
          />
        </div>
        <div className="flex flex-row items-center gap-4">
          <Link
            href="/teacher/student/create"
            className="max-w-[200px] min-w-[175px] h-[49px] flex flex-row items-center gap-2 border-primary border-[3px] text-primary font-semibold p-3 rounded-md"
          >
            <FaPlus size={20} />
            Create Student
          </Link>
          <button className="max-w-[200px] px-4 flex flex-row items-center gap-3 bg-primary text-white font-semibold p-[13px] rounded-md">
            <FiDownload size={24} />
            Download
          </button>
        </div>
      </div>

      {/* Student Table */}
      <section className="shadow-gray-500 shadow-sm p-6 rounded-lg mt-6">
        <p className="font-semibold text-lg ml-1 pb-4">Total: 6</p>
        <StudentTable />
      </section>
    </main>
  );
};

export default page;
