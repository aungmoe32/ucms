"use client";
import React from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
    BarChart,
Bar,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { convertGrades, convertToGrades } from "@/lib/utils";

const ResultChart = () => {
  const data = [
    { name: "English", mark: "B" },
    { name: "Maths", mark: "C" },
    { name: "Be", mark: "B" },
    { name: "Dc", mark: "D" },
    { name: "Dld", mark: "A" },
    { name: "Web", mark: "C" },
    { name: "C++", mark: "C" },
  ].map((item) => ({ ...item, mark: convertGrades(item.mark) }));

  return (
    <div className="mt-6 ml-[-50px]">
      <ResponsiveContainer width={"100%"} height={350}>
        <LineChart data={data}>
          <Tooltip formatter={convertToGrades} />
          <Line
            enableBackground={"#2C80FF"}
            type="monotone"
            dataKey="mark"
            stroke="#2C80FF"
            strokeWidth={2}
          />
          <CartesianGrid stroke="#E1E5EB" />
          <XAxis dataKey="name" />
          <YAxis dataKey="mark" tickFormatter={convertToGrades} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ResultChart;
