import { getTextColorBasedOnBackground, stringToColor } from "@/lib/utils";
import Image from "next/image";
import React from "react";

type Props = {
  image: string;
  name: string;
  width: number;
  height: number;
  textSize: string;
};

const ProfileImage = ({ image, name, width, height, textSize }: Props) => {
  const avatarColor = stringToColor(name);
  const avatarTextColor = getTextColorBasedOnBackground(avatarColor);

  return (
    <div>
      {image === "" ? (
        <div
          className={`rounded-full flex justify-center items-center`}
          style={{ backgroundColor: avatarColor, width, height }}
        >
          <p
            className={`${textSize} font-semibold`}
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
          width={width + 2}
          height={height + 2}
          className={`rounded-full object-cover`}
          alt="student profile image"
        />
      )}
    </div>
  );
};

export default ProfileImage;
