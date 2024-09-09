import React from "react";
import ProfileImage from "./ProfileImage";

type Props = {
  id: number;
  image: string;
  name: string;
  year: number;
  major: string;
  term: string;
  gender: string;
};

const StudentCard = ({ id, image, name, year, major, term, gender }: Props) => {
  return (
    <article
      className={` mt-4 bg-primary text-white relative flex flex-row gap-8 shadow-gray-500 shadow-sm rounded-lg p-4 items-start`}
    >
      {/* Image */}
      <div>
        <ProfileImage
          image={image}
          name={name}
          width={80}
          height={80}
          textSize="text-3xl"
        />
      </div>

      {/* Details */}
      <div className="w-full z-10">
        <p className="text-3xl font-bold">{name}</p>

        <div className="flex text-lg flex-row font-semibold mt-3">
          <p className="pr-4 border-r-[1px] border-white">{major}</p>
          <p className="px-4 border-r-[1px] border-white">
            {year} Year - {term} Term
          </p>
          <p className="pl-4">{gender}</p>
        </div>
        <div className="mt-4">
          <div className="flex flex-row items-end  justify-between font-semibold">
            <p>Overall Performance</p>
            <p className="font-semibold text-2xl">80%</p>
          </div>
          <div className="w-full h-2 mt-4 bg-gray-400 rounded-md">
            <div className="w-[80%] h-full bg-white rounded-md" />
          </div>
        </div>
      </div>

      {/* Watermark Logo */}
      {/*
        <div className="absolute top-0 right-0">
        <Image
          src={"/images/Hmawbi-logo.png"}
          alt="School logo"
          width={140}
          height={100}
          className="object-cover opacity-50"
          style={{
            filter: "opacity(0.5)",
          }}
        />
      </div>
     */}
    </article>
  );
};

export default StudentCard;
