import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import StudentTimetable from "@/components/shared/StudentTimetable";
import { FaCheck } from "react-icons/fa";
import { Button } from "@/components/ui/button";

const page = () => {
  return (
    <main className="p-4">
      {/* Timetable Title */}
      <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-4">
        <div className="flex flex-row items-center gap-4 mr-4">
          <h2 className="text-2xl font-semibold">Create Timetable</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4  gap-4">
          <Select>
            <SelectTrigger className=" h-[50px] w-[140px] focus:ring-0 ring-0 shadow-sm shadow-gray-400 ">
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
            <SelectTrigger className="h-[50px] w-[140px]  focus:ring-0 ring-0 shadow-sm shadow-gray-200 ">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1 Year</SelectItem>
              <SelectItem value="2">2 Year</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className=" h-[50px] w-[140px] focus:ring-0 ring-0 shadow-sm shadow-gray-200 ">
              <SelectValue placeholder="Term" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="first term">First</SelectItem>
              <SelectItem value="second term">Second</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex justify-end">
            <Button
              type="submit"
              className="mt-1 flex text-[16px] flex-row gap-3 text-white px-8 h-[48px] "
            >
              <FaCheck size={18} />
              Submit
            </Button>
          </div>
        </div>
      </div>

      {/* Timetable */}
      <div className="p-2 mt-4">
        <StudentTimetable role="teacher" />
      </div>
    </main>
  );
};

export default page;
