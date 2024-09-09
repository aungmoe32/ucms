import React from "react";
import { RxCalendar } from "react-icons/rx";
import { MdAccessTime } from "react-icons/md";

type Props = {
  title: string;
  date: string;
  time: string;
};

const ExamCard = ({ title, date, time }: Props) => {
  return (
    <div className="flex flex-row items-start gap-4">
      {/* Circle */}
      <div className="w-[12px] h-[12px] mt-[8px] rounded-full z-10 flex justify-center bg-gray-700 shadow-lg shadow-gray-700">
        <div className="w-[1px] h-[129px] mt-[11px] bg-gray-300"></div>
      </div>

      <div className="space-y-2">
        <p className="font-semibold text-lg">{title}</p>
        <p className="text-base">Learn the fundamentals of React.</p>
        <div className="flex flex-col gap-2 ">
          <div className="flex flex-row items-center gap-2">
            <RxCalendar size={19} />
            <p className="text-sm">{date}</p>
          </div>
          <div className="flex flex-row items-center gap-2">
            <MdAccessTime size={19} />
            <p className="text-sm">{time}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamCard;
