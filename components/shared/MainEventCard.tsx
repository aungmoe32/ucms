import Image from "next/image";
import React from "react";
import { RxCalendar } from "react-icons/rx";
import { MdAccessTime } from "react-icons/md";

type Props = {
  image: string;
  title: string;
  date: string;
  time: string;
};

const MainEventCard = ({ image, title, date, time }: Props) => {
  return (
    <article className="">
      <div className="flex flex-row gap-5">
        <div>
          <Image
            src={image}
            alt="Event Image"
            width={200}
            height={200}
            className="object-cover rounded-lg"
          />
        </div>

        <div className="">
          <div className="flex flex-col gap-2 ">
            <h2 className="font-semibold text-lg">{title}</h2>
            <div className="flex flex-row items-center gap-2">
              <RxCalendar size={17} />
              <p className="text-sm">{date}</p>
            </div>
            <div className="flex flex-row items-center gap-2">
              <MdAccessTime size={17} />
              <p className="text-sm">{time}</p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default MainEventCard;
