import { getTextColorBasedOnBackground, stringToColor } from "@/lib/utils";
import Image from "next/image";
import React from "react";

type Props = {
  id: number;
  image: string;
  name: string;
  major: string;
};

const TeacherCard = ({ id, image, name, major }: Props) => {
  const avatarColor = stringToColor(name);
  const avatarTextColor = getTextColorBasedOnBackground(avatarColor);

  return (
    <article className=" mt-4 relative flex flex-row gap-4 shadow-gray-500 shadow-sm rounded-lg p-4 items-center">
      {/* Image */}
      <div>
        {image === "" ? (
          <div
            className={`rounded-full w-12 h-12 flex justify-center items-center`}
            style={{ backgroundColor: avatarColor }}
          >
            <p
              className="text-lg font-semibold"
              style={{ color: avatarTextColor }}
            >
              {name.split(" ").length > 1
                ? name.split(" ")[0][0] + name.split(" ")[1][0]
                : name[0]}
            </p>
          </div>
        ) : (
          <Image
            src={image}
            width={60}
            height={60}
            className="rounded-full object-cover h-12 w-12"
            alt="student profile image"
          />
        )}
      </div>

      {/* Detail */}
      <div className="space-y-1">
        <h2 className="font-semibold text-lg">{name}</h2>
        <p>{major}</p>
      </div>
    </article>
  );
};

export default TeacherCard;
