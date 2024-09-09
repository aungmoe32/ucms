import React, { ReactNode } from "react";

type Props = {
  title: string;
  value: number;
  icon: ReactNode;
  bgColor: string;
};

const TotalCard = ({ title, value, icon, bgColor }: Props) => {
  return (
    <article className="p-6 bg-white shadow-gray-500 shadow-sm rounded-lg max-w-[280px]">
      <div className={`${bgColor} w-fit p-3 rounded-lg`}>{icon}</div>
      <div className="flex flex-row items-end justify-between mt-3">
        <p className="text-base font">{title}</p>
        <p className="text-2xl font-semibold">{value}</p>
      </div>
    </article>
  );
};

export default TotalCard;
