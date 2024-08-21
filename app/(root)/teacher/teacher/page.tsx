import React, { useState } from "react";
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
import Link from "next/link";
import TeacherTable from "@/components/shared/TeacherTable";
import TeacherTablePrefetch from "@/components/queries/TeacherTablePrefetch";
import Server from "@/components/Server";
import SearchBox from "@/components/shared/SearchBox";
import SearchProvider from "@/components/context/SearchProvider";
import MajorSelect from "./MajorSelect";

const TeacherList = () => {
  return (
    <SearchProvider>
      <main className="p-4 bg-gray-100 min-h-screen">
        <h2 className="font-semibold text-2xl">Teachers</h2>
        {/* Filter Students Card */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center mt-6">
          {/* <Select>
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
          </Select> */}
          <MajorSelect></MajorSelect>
          {/* <Select>
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
          </Select> */}
          {/* <Select>
            <SelectTrigger className=" h-[50px] focus:ring-0 ring-0 shadow-sm shadow-gray-400 ">
              <SelectValue placeholder="Gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Male">Male</SelectItem>
              <SelectItem value="Female">Female</SelectItem>
            </SelectContent>
          </Select> */}
        </div>
        {/* Search Student */}
        <div className="mt-8 flex flex-row justify-between items-center">
          <SearchBox></SearchBox>

          <div className="flex flex-row items-center gap-4">
            <Link
              href="/teacher/teacher/create"
              className="max-w-[200px] min-w-[175px] h-[49px] flex flex-row items-center gap-2 border-primary border-[3px] text-primary font-semibold p-3 rounded-md"
            >
              <FaPlus size={20} />
              Create Teacher
            </Link>
            <button className="max-w-[200px] px-4 flex flex-row items-center gap-3 bg-primary text-white font-semibold p-[13px] rounded-md">
              <FiDownload size={24} />
              Download
            </button>
          </div>
        </div>

        {/* Student Table */}
        <section className="shadow-gray-500 shadow-sm p-6 rounded-lg mt-6">
          <TeacherTablePrefetch></TeacherTablePrefetch>
          {/* <TeacherTable></TeacherTable> */}
          {/* <Server></Server> */}
        </section>
      </main>
    </SearchProvider>
  );
};

export default TeacherList;
