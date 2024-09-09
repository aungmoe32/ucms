import React from "react";
import { RxCalendar } from "react-icons/rx";
import { MdAccessTime } from "react-icons/md";
import { CiEdit } from "react-icons/ci";

type Props = {
    title: string;
    date: string;
    time: string;
};

const EventCard = ({ title, date, time }: Props) => {
    return (
        <article className="bg-gray-200 shadow-gray-300 shadow-sm p-5 rounded-lg">
            <h2 className="text-base font-semibold">{title}</h2>
            <div className="mt-3 flex flex-row justify-between items-start ">
                <div className="flex flex-col gap-2 ">
                    <div className="flex flex-row items-center gap-2">
                        <RxCalendar size={17} />
                        <p className="text-sm">{date}</p>
                    </div>
                    <div className="flex flex-row items-center gap-2">
                        <MdAccessTime size={17} />
                        <p className="text-sm">{time}</p>
                    </div>
                </div>
                <button>
                    <CiEdit size={25} />
                </button>
            </div>
        </article>
    );
};

export default EventCard;
